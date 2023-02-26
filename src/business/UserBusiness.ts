import { UserDatabase } from "../database/UserDatabase";
import { GetAllUsersInputDTO, LoginDTO, SignUpDTO } from "../dtos/UserDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { ROLE_USER, TokenPayload } from "../interfaces/types";
import { User } from "../models/Users";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness{
    constructor(
        private userDatabase : UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) {}

        public getAllUsers =async ( input: GetAllUsersInputDTO ) => {
            const {q, token} = input
        
            if(typeof token !== "string"){
                throw new BadRequestError("'Token' não informado!")
            }
    
            const payload = this.tokenManager.getPayload(token)
    
            if (payload === null){
                throw new BadRequestError("'Token' inválido!")
            }
    
            if(payload.role !== ROLE_USER.ADMIN ){
                throw new BadRequestError('Somente usuários com perfil ADMIN podem acessar este recurso!')
            }
    
            console.log(payload)
            const usersDB = await this.userDatabase.getAllUsers()
        const users = 
        usersDB.map((userDB)=>{ 
            const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at,       
        )
        return user.toDBModel()
    })

        return users
    }

        public signUp = async (input:SignUpDTO) => {
            const { name, email, password} = input

            const id = this.idGenerator.generate()

            const passwordHash = await this.hashManager.hash(password)

            const created_at = (new Date()).toISOString()

            const filterUserByEmail = await this.userDatabase.findUserByEmail(email)

            if(filterUserByEmail){
                throw new BadRequestError("'E-mail' já consta na base de dados, tente novamente ou efetue o login.")
            }

            if(typeof name !== "string"){
                throw new BadRequestError("'Name' precisa ser uma string.")
            }
    
            if(typeof email !== "string"){
                throw new BadRequestError("'E-mail' precisa ser uma string.")
            }
    
            if(typeof password !== "string"){
                throw new BadRequestError("'Password' precisa ser uma string.")
            }

            const newUser = new User(
                id,
                name,
                email,
                passwordHash,
                ROLE_USER.NORMAL,
                created_at
            )

            const tokenPayload: TokenPayload = {
                id: newUser.getId(),
                name: newUser.getName(),
                role: newUser.getRole()
            }

            const token = this.tokenManager.createToken(tokenPayload)
            const newUserDB = newUser.toDBModel()
            await this.userDatabase.signUp(newUserDB)

            const output = {
                message: "Usuário cadastrado com sucesso!", 
                token
            }
            return output
        }
        
        public async login (input: LoginDTO){
            const {email, password} = input

            if(typeof email !== "string"){        
                throw new BadRequestError("'E-mail' precisa ser uma string.")
            }
    
            if(password === undefined){            
                throw new BadRequestError("Favor, informar o 'password'")
            }
            
            const findUserByLogin = await this.userDatabase.findUserByEmail(email)

            if(!findUserByLogin){
                throw new NotFoundError("'E-mail' não cadastrado!")
            }

            const passwordHash = this.hashManager.compare(password, findUserByLogin.password)

        if(!passwordHash){
            throw new BadRequestError("'E-mail' ou 'Senha' inválidos") 
        }

            if(findUserByLogin){
                const userLogin = new User(
                    findUserByLogin.id,
                    findUserByLogin.name,
                    findUserByLogin.email,
                    findUserByLogin.password,
                    findUserByLogin.role,
                    findUserByLogin.created_at
                )

                const tokenPayload: TokenPayload = {
                    id: userLogin.getId(),
                    name: userLogin.getName(),
                    role: userLogin.getRole()
                }
                
                const token = this.tokenManager.createToken(tokenPayload)
                const newUserDB = userLogin.toDBModel()
                await this.userDatabase.login(newUserDB.email, newUserDB.password)
    
                const output = {
                    message: "Login efetuado com sucesso!", 
                    token
                }
                return output
            }else{
                const output = {message:"Dados incorretos!"}
                return output
            }  
    
        }
    
    }
