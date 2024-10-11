import crypto from 'crypto'

const secret = crypto.randomBytes(16).toString("hex");

export default secret