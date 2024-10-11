import { Router } from "express";
import loginController from "../controllers/login.mjs";
const loginRoutes = Router()


loginRoutes.post('/login',loginController)


export default loginRoutes