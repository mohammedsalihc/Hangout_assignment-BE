import { Router } from "express";
import { AuthController } from "../../controllers/auth/auth-controller";
import { JwtHandler } from "../../utilities/jwt/jwt";

const router = Router()
const auth = new AuthController
const jwt = new JwtHandler()
router.post('/register',(req,res)=>auth.Register(req,res))
router.post('/login',(req,res)=>auth.Login(req,res))
router.get('/profile',jwt.accessPermission(),(req,res)=>auth.Profile(req,res))
export default router;