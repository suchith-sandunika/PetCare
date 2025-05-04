const multer = require('multer');
const path = require('path');
const fs = require('fs');

const imagePath = path.join(__dirname, '../uploads');
if (!fs.existsSync(imagePath)) fs.mkdirSync(imagePath, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, imagePath),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('Only image files are allowed'), false);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = upload;



// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
//
// // Create __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//
// // Declare a specific path ...
// const imagePath = path.join(__dirname, '../uploads');
//
// // Ensure directory exists or create it ...
// if(!fs.existsSync(imagePath)) {
//     fs.mkdirSync(imagePath, { recursive: true });
// }
//
// // Configure multer for image uploads with path ...
// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, imagePath);
//     },
//     filename: (req, file, callback) => {
//         const fileName = Date.now() + '-' + file.originalname;
//         callback(null, fileName); // Create a unique file name ...
//     }
// });
//
// const fileFilter = (req, file, callback) => {
//     const allowedExtensions = /jpeg|jpg|png|gif/;
//     const extName = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
//     const mimeType = allowedExtensions.test(file.mimetype);
//
//     if (extName && mimeType) {
//         callback(null, true);
//     } else {
//         callback(new Error('Only image files are allowed!'), false);
//     }
// }
//
// // Configure the upload middleware with file size limit and filter
// const upload = multer({
//     storage: storage,
//     fileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
// });
//
// // Export the upload middleware
// export default upload;