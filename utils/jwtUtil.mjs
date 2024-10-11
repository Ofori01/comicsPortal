import jsonwebtoken from "jsonwebtoken";

import secret from "../configurations/jwt.config.mjs";


function generateToken(user){
    const payload  = {
        id: user.id,                    
        role: user.role ? user.role : 'user'
    }
    return jsonwebtoken.sign(payload,secret,{expiresIn: '1hr'})
    
}

export default generateToken