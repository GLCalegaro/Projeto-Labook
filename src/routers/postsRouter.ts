import express from "express";
import { PostsBusiness } from "../business/PostBusiness";
import { PostsController } from "../controller/PostController";
import { PostDatabase } from "../database/PostDatabase";
import { PostDTO } from "../dtos/PostDTO";
import { UserDatabase } from "../database/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { HashManager } from "../services/HashManager";

export const postsRouter = express.Router()

const postsController = new PostsController(
    new PostsBusiness(
        new PostDatabase(),
        new UserDatabase(),
        new PostDTO(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()      
    ),
    new PostDTO())

//Endpoint para buscar todos os posts
postsRouter.get("/", postsController.getAllPosts)

//Endpoint para criação de posts
postsRouter.post("/", postsController.createNewPost)

// //Endpoint para atualização de post
postsRouter.put("/:id", postsController.editPosts)

//Endpoint para remover post
postsRouter.delete("/:id", postsController.removePost)

//Endpoint de like/dislike
postsRouter.put("/:id/like", postsController.likeDislike)