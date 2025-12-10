import { Application } from "express";
import auth_routes from "./auth/auth-routes"
import room_routes from './room/room-routes'
const ApiEndPoints = (app:Application)=>{
    app.get('/', (req, res) => {
        res.send('Welcome to Hangout-BE');
    });
    app.use('/auth',auth_routes)
    app.use('/rooms',room_routes)
}


export {ApiEndPoints}