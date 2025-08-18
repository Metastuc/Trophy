import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET } from "./env";
import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuid } from "uuid";
import sharp from "sharp";

let S3: S3Client | null = null;

const getS3Client = () => {
  if (!S3) {
    S3 = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  return S3;
};

export const uploadImg = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const savePfp = async (pfpBuffer: Buffer, originalName: string) => {
  let quality = 80;
  let compressedBuffer = await sharp(pfpBuffer).jpeg({ quality }).toBuffer();

  while (compressedBuffer.length > 1024 * 1024 && quality > 10) {
    quality -= 10;
    compressedBuffer = await sharp(pfpBuffer).jpeg({ quality }).toBuffer();
  }

  const key = `profile-pics/${uuid()}-${originalName}`;
  const s3 = getS3Client();
  await s3.send(
    new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: key,
      Body: compressedBuffer,
      ACL: "public-read",
      ContentType: "image/jpeg",
    }),
  );

  return `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}`;
};


export const deleteImg = async (pfpUrl: string) => {
  if (!pfpUrl) return;

  const s3 = getS3Client();
  const key = pfpUrl.split(".com/")[1];

  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: AWS_S3_BUCKET,
        Key: key,
      }),
    );
  } catch (error) {
    console.error("Failed to delete profile picture:", error);
  }
};

export const saveThumbnail = async (thumbnailBuffer: Buffer, originalName: string) => {
  const key = `thumbnails/${uuid()}-${originalName}`;
  const s3 = getS3Client();
  await s3.send(
    new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: key,
      Body: thumbnailBuffer,
      ACL: "public-read",
      ContentType: "image/jpeg",
    }),
  );

  return `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}`;
}
