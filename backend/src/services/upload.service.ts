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
    file: Express.Multer.File
) {
    if (!isR2Configured || !r2) {
        const base64 = file.buffer.toString("base64");
        return `data:${file.mimetype};base64,${base64}`;
    }

    const extension =
        file.originalname.split(".").pop();

    const fileName =
        `${uuid()}.${extension}`;

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

export async function deleteImage(
    imageUrl: string
) {
    if (!imageUrl || !isR2Configured || !r2) return;

    const key =
        imageUrl.split("/").pop();

    if (!key) return;

    await r2.send(
        new DeleteObjectCommand({
            Bucket:
                process.env.R2_BUCKET_NAME,
            Key: key,
        })
    );
}