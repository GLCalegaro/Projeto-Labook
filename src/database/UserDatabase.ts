import { UsersDB } from "../interfaces/types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{
    public static TABLE_USERS = "users"

    public getAllUsers = async () => {
            const usersDB = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            return usersDB
    }

    public signUp = async (newUser: UsersDB) =>{
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .insert(newUser)
}

    public findUserByEmail =async (email:string) => {
        const [userDB]: UsersDB[] | undefined[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .where({email: email})
        return userDB
    }

    public async login ( email: string, password: string ){
        const [userDB]: UsersDB[] | undefined[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()
        .where({email} && {password})
        return userDB
    }

    public getUserById = async (id: string)=>{
        const [userDB]:UsersDB[] | undefined = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select().where({id:id})

        return userDB
    }

}