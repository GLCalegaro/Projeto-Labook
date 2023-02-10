import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{
    public static TABLE_USERS = "users"

    public getAllUsers =async ( q:string | undefined ) => {
        let usersDB
    if(q){
            const result = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where("name", "LIKE", `%${q}%`)
            usersDB = result
        }else{
            const result = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            usersDB = result
        }
        return usersDB
    }
}