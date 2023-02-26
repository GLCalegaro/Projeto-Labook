import express from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { UserController } from '../controller/UserController';
import { UserDatabase } from '../database/UserDatabase';
import { UserDTO } from '../dtos/UserDTO';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()), 
    new UserDTO)


//Endpoint para buscar todos os clientes cadastrados
userRouter.get("/", userController.getUsers)

//Endpoint para cadastro de novos usuários
userRouter.post("/signup", userController.signUp)

// //Endpoint para login de usuários
userRouter.post("/login", userController.login)