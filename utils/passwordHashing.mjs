import bcrypt from 'bcrypt'

function generateHash(password){
    const rounds = 10
    const saltRounds = bcrypt.genSaltSync(rounds);

    return bcrypt.hashSync(password,saltRounds)

}

function verifyPassword(password,hashedPassword){
    return bcrypt.compareSync(password,hashedPassword)
}

export {generateHash,verifyPassword}