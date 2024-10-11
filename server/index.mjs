import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import comicsRouter from '../routes/comicsRoutes.mjs';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import multer from 'multer';
import "../schemas/comicsSchema.mjs"
import loginRoutes from '../routes/loginRoutes.mjs';



const app= express();

app.use(express.json());
app.use(cors())

app.listen(process.env.PORT, ()=>{ console.log(`Server is running on http://localhost:${process.env.PORT}`)});


//create database connection 
mongoose.connect(process.env.DATABASE_CONNECTION)
const db_connection = mongoose.connection

//Initialize bucket
let bucket;

db_connection.on('error', (error) => {
    console.error('Database connection error:', error);
  });

db_connection.once('open',  () => {
    console.log('Database connected');
    bucket = new GridFSBucket(db_connection.db, { bucketName: 'uploads' });
});






export {bucket}


app.use(comicsRouter);
app.use('/api/auth',loginRoutes)
