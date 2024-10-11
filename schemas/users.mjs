import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
   name: {
    type: mongoose.Schema.Types.String,
    required: true
   },
   email: {
      type: mongoose.Schema.Types.String,
      required: true

   },
   password: {
    type: mongoose.Schema.Types.String,
    required: true
   },
   role: mongoose.Schema.Types.String

})

const userModel = mongoose.model("users",userSchema)

export default userModel