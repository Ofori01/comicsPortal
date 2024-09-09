import mongoose, { Schema } from "mongoose";

const comicsSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    image: {
        type: mongoose.Schema.ObjectId,
    },
    file: {
        type: mongoose.Schema.ObjectId,
    }
})  



export  const comicsModel = mongoose.model('comics', comicsSchema);