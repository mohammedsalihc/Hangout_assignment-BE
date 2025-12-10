import { Router } from "express";
import { AuthController } from "../../controllers/auth/auth-controller";

const router = Router()
const auth = new AuthController
router.post('/register',(req,res)=>auth.Register(req,res))
router.post('/login',(req,res)=>auth.Login(req,res))
export default router;