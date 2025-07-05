import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
    api_key: "", //insert api key,
    secure:false, // insert secure key,
    api_secret:""
})


const uploadImage = async(file:File)=>{
  const response = await cloudinary.uploader.upload_stream(file.stream)
  return response.secureUrl!
}
