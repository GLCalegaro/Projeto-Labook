import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../database/UserDatabase";
import { UserDTO } from "../dtos/UserDTO";

export class UserController {
    constructor(
        private userBusiness : UserBusiness,
        private userDTO : UserDTO,
    ){}

        public getUsers = async (req: Request, res: Response) => {
            try{
                const input ={
                    q:req.query.q as string,
                    token: req.headers.authorization as string
                }         

                // Antes de passar o dado pra frente, modelar o DTO
                // Valida a tipagem
    
                const output = await this.userBusiness.getAllUsers(input)
    
                res.status(201).send(output)
    
            } catch (error) {
                console.log(error)
        
                if (error instanceof Error) {
                    res.status(500).send(error.message)
                } else {
                    res.status(500).send("Erro inesperado")
                }
            }
        }

        public signUp = async(req: Request, res: Response)=>{
            try {
                const {id, name, email, password} = req.body
                
                const input = this.userDTO.signUp(id, name,email,password)
    
                const output = await this.userBusiness.signUp(input)
    
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

        public login = async(req: Request, res: Response)=>{
            try {
                const {email, password} = req.body
                
                const input = this.userDTO.login(email,password)
    
                const output = await this.userBusiness.login(input)
    
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