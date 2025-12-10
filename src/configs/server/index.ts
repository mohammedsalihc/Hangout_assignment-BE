import express ,{ Application } from "express";
import middlewares from "../middlewares/middlewares";
import { ApiEndPoints } from "../../routes";

const app:Application = express()
const startServer = ()=>{
    let port = process.env.port || 8080;
    middlewares(app)
    ApiEndPoints(app)
    const server = app.listen(port, () => console.log("server connected"))
}


export {startServer,app}