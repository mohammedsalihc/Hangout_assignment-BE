import express, { Application } from "express";
import cors from 'cors'
const middlewares = (app:Application) =>{
    app.use(cors()),
    app.use((req, res, next) => {
        req.body = req.body || {};
        next();
      });
    app.use(express.urlencoded({ extended: false})),
    app.use(express.json( {limit: '10mb' } ))
}
export default middlewares