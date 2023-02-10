import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/Users";

export class UserBusiness{
    constructor(
        private userDatabase : UserDatabase
    ) {}

        public getUsers =async ( q:string | undefined ) => {
            const usersDB = await this.userDatabase.getAllUsers(q)
        const users = usersDB.map((userDB) =>{
            return {
                id: userDB.id,
                name: userDB.name,
                email: userDB.email,
                password: userDB.password,
                role: userDB.role,
                created_at: userDB.created_at
            }
        })
        }





}