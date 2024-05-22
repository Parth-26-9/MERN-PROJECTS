import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
require("dotenv").config();

const uploadOnCloudinary = async (localfilePath) => {
  cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
  });

  try {
    if (!localfilePath) return null;
    const response = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    console.log("File is Uploaded on Cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localfilePath); // remove the locally save temporary file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
