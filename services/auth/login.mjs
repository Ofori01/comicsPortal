import generateToken from "../../utils/jwtUtil.mjs";
import userModel from "../../schemas/users.mjs";
import bcrypt from 'bcrypt';
import { verifyPassword } from "../../utils/passwordHashing.mjs";



async function loginService(email, password){
    try {
        const findUser = await userModel.findOne({email})
        if (!findUser) throw new Error("User not found");
        if(!verifyPassword(password, findUser.password)) throw new Error("Incorrect Password");

        
        return generateToken(findUser)
        

    } catch (error) {
        console.log(error)
        throw error;
        
        
    }

}

export default loginService
