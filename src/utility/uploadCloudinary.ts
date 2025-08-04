import { v2 as cloudinary } from 'cloudinary';



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
// file: must be of type File or Blob
export const uploadImage = async (file: File): Promise<string> => {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'avatars' }, 
      (err, result) => {
        if (err || !result) return reject(err);
        resolve(result.secure_url);
      }
    );

    stream.end(buffer); // send the buffer into the stream
  });
};
