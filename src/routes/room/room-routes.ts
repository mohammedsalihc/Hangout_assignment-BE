import { Router } from "express";
import { JwtHandler } from "../../utilities/jwt/jwt";
import { ERole } from "../../types/enums/enum";
import { RoomController } from "../../controllers/room/room-controller";

const router = Router()
const jwt = new JwtHandler()
const room = new RoomController()
router.post('/room',jwt.accessPermission([ERole.USER]),(req,res)=> room.CreateRoom(req,res))
router.post('/join',jwt.accessPermission([ERole.USER]),(req,res)=>room.JoinRoom(req,res))
export default router;