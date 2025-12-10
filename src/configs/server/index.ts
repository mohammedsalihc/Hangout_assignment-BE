import express ,{ Application } from "express";

const app:Application = express()
const startServer = ()=>{
    let port = process.env.port || 8080;
    const server = app.listen(port, () => console.log("server connected"))
}


export {startServer,app}