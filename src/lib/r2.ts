// src/lib/r2.ts
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.NEXT_PUBLIC_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToR2(file: File, path: string) {
  const buffer = await file.arrayBuffer();

  const upload = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_R2_BUCKET_NAME!,
    Key: path,
    Body: Buffer.from(buffer),
    ContentType: file.type,
  });

  await r2.send(upload);

  return `${process.env.NEXT_PUBLIC_R2_PUBLIC_BASE}/${path}`;
}
