import fileupload from 'express-fileupload';

export const FilesImage= () => {
    return fileupload({
        useTempFiles: true,
        tempFileDir: './Uploads'
    })
}