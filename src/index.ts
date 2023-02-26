import express from 'express';
import cors from 'cors';
import { userRouter } from './routers/userRouter'
import { postsRouter } from './routers/postsRouter';
import dotenv from 'dotenv';

dotenv.config()

//invocando a função express() dentro da variável app
const app = express();
const local = process.env.PORT

app.use(cors())
app.use(express.json())

// aqui temos o uso da variável PORT
// ela vem como string e então convertemos para um número com Number()
// deixamos um valor de backup com || caso não exista a variável
app.listen(local,()=>{ 
    console.log(`Servidor iniciado na porta ${local}`)})


app.use("/posts", postsRouter)
app.use("/users", userRouter)

