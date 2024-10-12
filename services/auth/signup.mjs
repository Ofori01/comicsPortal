import userModel from "../../schemas/users.mjs";
import { generateHash } from "../../utils/passwordHashing.mjs";


async function signupService(userDetails){    
    try {
        userDetails.password = generateHash(userDetails.password)
        const findExistingUser  = await userModel.findOne({email: userDetails.email})
        if(findExistingUser) throw new Error('User already Exists, Please use a different email')
        const newUser = new userModel(userDetails)
        const savedUser  = await newUser.save()
        if (!savedUser) throw new Error("Error saving user, please try again");
        return savedUser
        
    } catch (error) {
        throw error
        
    }

}

export default signupService