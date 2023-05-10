import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../config/s3client";

export const uploadImageToS3 = async (folder: string, file: Express.Multer.File) => {
	const params = {
		Bucket: "gift-basket-bucket",
		Key: folder + Date.now(),
		Body: Buffer.from(file.buffer),
		ACL: "public-read"
	};

	const response = await s3Client.send(new PutObjectCommand(params));
	const imageUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
	console.log(imageUrl);
	return imageUrl;
};
