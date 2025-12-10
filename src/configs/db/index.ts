import mongoose from "mongoose";
import dotenv from "dotenv"
import { startServer } from "../server";
dotenv.config()
const startMongoServer = ()=>{
    const url = process.env.DBURL ;
    mongoose.connect(url)
    var db = mongoose.connection
    db.on('error', console.error.bind(console, 'db connection error'))
    db.once('open', () => {
        console.log("Db connected")
        startServer()
    })
}

export default startMongoServer