import {
    S3Client,
    PutObjectCommand,
} from "@aws-sdk/client-s3";


import {
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { v4 as uuid } from "uuid";

const r2 = new S3Client({
    region: "auto",

    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,

    credentials: {
        accessKeyId:
            process.env.R2_ACCESS_KEY_ID!,

        secretAccessKey:
            process.env.R2_SECRET_ACCESS_KEY!,
    },
});

export async function uploadImage(
    file: Express.Multer.File
) {
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
    if (!imageUrl) return;

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