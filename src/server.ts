import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'

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

app.use('/api',router)

export default app