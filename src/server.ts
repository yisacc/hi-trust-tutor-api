
import express,{ NextFunction, Request, Response } from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from "./modules/auth";
import { register, signin } from "./handlers/user";

const app=express()

app.use(cors())
app.use(morgan('dev'))

//enables user to send json data
app.use(express.json())

//enables a client to use query parameters without this it will treat it as a string
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
console.log('hello from express')
res.status(200)
res.json({message:'hello'})
})
 
app.use("/api", protect, router);
app.post("/signup", register);
app.post("/signin", signin);
export default app