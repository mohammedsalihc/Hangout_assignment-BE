import express ,{ Application } from "express";
import middlewares from "../middlewares/middlewares";
import { ApiEndPoints } from "../../routes";
import addSocketConnection from "../socket-io/socket";

const app:Application = express()
const startServer = ()=>{
    let port = process.env.port || 8080;
    middlewares(app)
    ApiEndPoints(app)
    const server = app.listen(port, () => console.log("server connected"))
    const socket_connection = addSocketConnection(server)
    app.set('socketConnection',socket_connection)
}


export {startServer,app}