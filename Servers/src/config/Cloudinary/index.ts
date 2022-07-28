import {v2 as cloudinary} from 'cloudinary';
import config from '../ConfigEntorno/config';

cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
    secure: true
})

export const  Uploadimage = async (filepath: string, folderpath: string) => {
    return await cloudinary.uploader.upload(filepath, {
        folder: folderpath
    })
}