import express from 'express'
import{registeration,login} from "../controlers/authController.js";
const authRoutes = express.Router();

authRoutes.post('/register', registeration)
authRoutes.post('/login', login)

export default authRoutes

