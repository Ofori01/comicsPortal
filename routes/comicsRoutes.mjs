import { response, Router } from "express"
import { bucket } from "../server/index.mjs";
import {Readable} from 'stream'
import multer from 'multer'
import comics from "../schemas/comicsSchema.mjs";

const comicsRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

comicsRouter.get('/comics', async (request, response)=>{
    let newComic
    try {
        newComic = new comics({
            title: "test",
            description: "Ofori"
        })
       const savedComic = await newComic.save()
       response.send({msg: "comic saved", savedComic})

    } catch (error) {
        return response.status(401).send({msg: "error saving to db"})
        
    }
    // response.send('Comics route')
})

//upload files
comicsRouter.post('/comics/upload', upload.single('file'), async (request, response)=>{
    // response.send({file: request.file});
    const {title, description} = request.body;
    console.log(title,description);

    if (!title || !description) {
        return response.status(400).send({ error: 'Title and description are required' });
      }

    if(!request.file) return response.status(400).send('Please upload a file');
    const readableFileStream = new Readable();
    readableFileStream.push(request.file.buffer);
    readableFileStream.push(null);

    const uploadStream =  bucket.openUploadStream(request.file.originalname, 
        {
            chunkSizeBytes: 1048576, // 1MB chunk size
            metadata: { field: 'uploadDate', value: `${Date.now()}`, }
        
    });

    readableFileStream.pipe(uploadStream).on('error', (error)=>{
        console.log('Error uploading file', error);
        response.status(500).send('Error uploading file');
    }).on('finish', async ()=>{
        const id = uploadStream.id;
        console.log('File uploaded to bucket successfully with object id', id);

        const newComic = new comics({
            title : title,
            description : description,
            file: id 
        })

        let savedComic;
        try {
            savedComic = await newComic.save();
            console.log('File uploaded successfully');
            return  response.status(201).send({savedComic, message: 'File uploaded successfully'});
            
        } catch (error) {
            console.log('Error saving comic to database', error);
            return response.status(500).send('Error saving comic to database');
            
        }
        
    })

})



//download files
comicsRouter.get('/comics/download/:comicName', async (request, response)=>{
    const {comicName} = request.params;

    const comic = await comicsSchema.findOne({title: comicName});




})


export default comicsRouter