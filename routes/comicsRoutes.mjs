import { response, Router } from "express"
import { bucket } from "../server/index.mjs";
import {Readable} from 'stream'
import multer from 'multer'
import {comicsModel} from "../schemas/comicsSchema.mjs";
import { ObjectId } from "mongodb";
const comicsRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

comicsRouter.get('/api/comics', async (request, response)=>{
    // const comics = comics.find()
    let allComics;
    try {
         allComics = await comicsModel.find()
         return response.send(allComics)
        
    } catch (error) {
        console.log('Error Loading comics', error)
        return response.status(500).send({msg: 'Error loading comics'})
        
    }
})




// Route to upload both an image and a file
comicsRouter.post('/api/comics/upload', upload.fields([
    { name: 'file', maxCount: 1 }, // File field (e.g., a PDF or comic file)
    { name: 'image', maxCount: 1 } // Image field (e.g., a cover image)
]), async (request, response) => {
    const { title, description } = request.body;
    
    if (!title || !description) {
        return response.status(400).send({ error: 'Title and description are required' });
    }

    // Check if both files are provided
    if (!request.files || !request.files.file || !request.files.image) {
        return response.status(400).send('Both a file and an image are required');
    }

    // Helper function to upload a file to GridFS
    const uploadToGridFS = (file) => {
        return new Promise((resolve, reject) => {
            const readableFileStream = new Readable();
            readableFileStream.push(file.buffer);
            readableFileStream.push(null);
    
            const uploadStream = bucket.openUploadStream(file.originalname, {
                chunkSizeBytes: 1048576, // 1MB chunk size
                metadata: { field: 'uploadDate', value: `${Date.now()}` }
            });
    
            readableFileStream.pipe(uploadStream).on('error', (error) => {
                reject(error);
            }).on('finish', () => {
                resolve(uploadStream.id);
            });
        });
    };

    try {
        // Upload both the file and the image to GridFS
        const fileId = await uploadToGridFS(request.files.file[0]);
        const imageId = await uploadToGridFS(request.files.image[0]);

        // Create a new comic entry in the database
        const newComic = new comicsModel({
            title: title,
            description: description,
            file: fileId, 
            image: imageId
        });

        // Save the comic entry to the database
        const savedComic = await newComic.save();
        console.log('File and image uploaded successfully');
        return response.status(201).send({ savedComic, message: 'File and image uploaded successfully' });

    } catch (error) {
        console.error('Error uploading file and image:', error);
        return response.status(500).send('Error uploading file and image');
    }
});



//download files
comicsRouter.get('/api/download/:fileId', async (request, response)=>{
    const {fileId} = request.params;

    try {
        const id = new ObjectId(fileId);
        const file  = await bucket.find({_id: id}).toArray()


        const fileMetadata = file[0];
        const contentType = fileMetadata.filename.endsWith('.pdf') ? 'application/pdf' : 'application/octet-stream'; // Default to binary if no contentType
        const filename = fileMetadata.filename || 'downloaded_file'; 

        const downloadStream = bucket.openDownloadStream(id);

        downloadStream.on('error', (error) => {
            console.error('Error downloading file:', error);
            return response.status(500).send('Error downloading file');
        });

        // response.setHeader('Content-Type', contentType);
        // response.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        downloadStream.pipe(response);
    } catch (error) {
        console.error('Error retrieving file:', error);
        response.status(500).send('Error retrieving file');

        
    }



})


export default comicsRouter