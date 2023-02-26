import { PostDatabase } from "../database/PostDatabase";
import { PostsDB } from "../interfaces/types";
import { Request, Response } from "express";
import { PostsBusiness } from "../business/PostBusiness";
import { PostDTO } from "../dtos/PostDTO";

export class PostsController{
constructor(
    private postBusiness: PostsBusiness,
    private postDTO: PostDTO
){}

    public getAllPosts = async (req:Request, res:Response) => {
        try{
            const input ={
                q:req.query.q as string,
                token: req.headers.authorization as string
            }  
            const output = await this.postBusiness.getAllPosts(input)

            res.status(201).send(output)   
                      
        } catch (error) {
            console.log(error)
        
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }  
        }
    }

    public createNewPost = async (req:Request, res:Response) => {
        try{

        const content = req.body.content
        const token = req.headers.authorization as string
        
        const input = this.postDTO.insertInputPost(content, token)

            const output = await this.postBusiness.createNewPost(input)
            
            res.status(200).send(output)
    
        } catch (error) {
            console.log(error)
        
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }  
        }
    }

    public editPosts = async (req:Request, res: Response)=>{
        try {
            
        const id = req.params.id
        const content = req.body.content
        const token = req.headers.authorization as string

        const input = await this.postDTO.editInputPost(id, content, token)

        const output = await this.postBusiness.editPost(input)

           res.status(201).send(output)
        } catch (error) {
            console.log(error)
        
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }    
        }
    }

    public removePost = async (req:Request, res: Response)=>{
        try {

            const id = req.params.id
            const token = req.headers.authorization as string

            const input = await this.postDTO.removeInputPost(id, token)

            const output = await this.postBusiness.removePost(input)

            res.status(201).send(output)
    
        } catch (error) {
            console.log(error)
        
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }   
        }
    }

    public likeDislike = async (req:Request, res: Response)=>{
        try {

            const input = {
                id: req.params.id,
                like: req.body.like,
                token: req.headers.authorization as string,
            }

            const output = await this.postBusiness.likeDislike(input)

            res.status(201).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }  
        }
    }
}