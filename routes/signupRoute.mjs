import { Router } from "express";
import signupController from "../controllers/signup.mjs";

const signupRouter = Router()

signupRouter.post('/signup',signupController);

export default signupRouter