import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET } from "./env";
import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuid } from "uuid";

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

export const uploadPfp = multer({
  storage: multerS3({
    s3: getS3Client(),
    bucket: AWS_S3_BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (_req: any, file: { originalname: any }, cb: (arg0: null, arg1: string) => void) => {
      const filename = `profile-pics/${uuid()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
});

export const deletePfp = async (pfpUrl: string) => {
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
