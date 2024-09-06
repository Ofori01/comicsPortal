import mongoose, { Schema } from "mongoose";

const comicsSchema = mongoose.Schema({
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

const comics = mongoose.model('comics', comicsSchema);

export default comics