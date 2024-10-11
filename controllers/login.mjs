import loginService from "../services/auth/login.mjs"

async function loginController(req,res){
    try {
        const {email, password} = req.body
        const token = await loginService(email,password)

        return res.send(token)
        


    } catch (error) {
        res.status(401).send({message: error.message})
    }
}

export default loginController