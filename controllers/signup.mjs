import signupService from "../services/auth/signup.mjs"

async function signupController(req, res){
    try {
        let {name, email, password, role} = req.body
        if(!role) role = 'user'
        const user = await signupService({name,email,password,role})
        return res.send({message: `Successfully created user ${user.name}`})

    } catch (error) {
        res.status(401).send({message: error.message})
    }
}

export default signupController