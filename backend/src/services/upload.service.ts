import {
    S3Client,
    PutObjectCommand,
} from "@aws-sdk/client-s3";


import {
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { v4 as uuid } from "uuid";

const isR2Configured = !!(
    process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET_NAME &&
    process.env.R2_PUBLIC_URL
);

const r2 = isR2Configured
    ? new S3Client({
        region: "auto",

        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,

        credentials: {
            accessKeyId:
                process.env.R2_ACCESS_KEY_ID!,

            secretAccessKey:
                process.env.R2_SECRET_ACCESS_KEY!,
        },
    })
    : null;

export async function uploadImage(
    file: Express.Multer.File,
    keyPrefix = ""
) {
    if (!isR2Configured || !r2) {
        const base64 = file.buffer.toString("base64");
        return `data:${file.mimetype};base64,${base64}`;
    }

    const extensionByMimeType: Record<string, string> = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
    };

    const extension =
        extensionByMimeType[file.mimetype] || file.originalname.split(".").pop() || "bin";

    const normalizedKeyPrefix = keyPrefix.replace(/^\/+|\/+$/g, "");
    const fileName =
        `${normalizedKeyPrefix ? `${normalizedKeyPrefix}/` : ""}${uuid()}.${extension}`;

    await r2.send(
        new PutObjectCommand({
            Bucket:
                process.env.R2_BUCKET_NAME,

            Key: fileName,

            Body: file.buffer,

            ContentType:
                file.mimetype,
        })
    );

    return `${process.env.R2_PUBLIC_URL}/${fileName}`;
}

export async function deleteImage(imageUrl: string) {
    if (!imageUrl) return;

    // R2 configured nasel tar kahi karaycha nahi
    if (!isR2Configured || !r2) return;

    const key = getManagedStorageKey(imageUrl);

    if (!key) return;

    await r2.send(
        new DeleteObjectCommand({
            Bucket:
                process.env.R2_BUCKET_NAME,
            Key: key,
        })
    );
}

function getManagedStorageKey(imageUrl: string) {
    try {
        const publicUrl = new URL(process.env.R2_PUBLIC_URL!);
        const assetUrl = new URL(imageUrl);

        if (assetUrl.origin !== publicUrl.origin) return null;

        const publicPath = publicUrl.pathname.replace(/\/+$/, "");
        const publicPrefix = publicPath ? `${publicPath}/` : "/";

        if (!assetUrl.pathname.startsWith(publicPrefix)) return null;

        const key = decodeURIComponent(assetUrl.pathname.slice(publicPrefix.length));

        if (
            !key ||
            key.split("/").some((part) => !part || part === "." || part === "..")
        ) {
            return null;
        }

        return key;
    } catch {
        return null;
    }
}
