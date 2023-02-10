import { CreatePostDB, PostsDB, UsersDB } from "../interfaces/types";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"

    public getAllPosts = async () =>{
        const postsDB = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select()

    return postsDB
    }

    public getPostsByContent =async ( q:string ) => {
        const postsDB = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select()
        .where("content", "LIKE", `%${q}%`)

    return postsDB
    }

    public createPost = async ( newPostDB:CreatePostDB ) => {
         await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .insert(newPostDB)
    }

    public editPostById = async ( id:string, editedPost:PostsDB ) => {
         await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .update(editedPost)
        .where({id})
    }

    public removePostById = async ( id:string ) => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .del()
        .where({id})
    }

    public getPostsWithUsers =async ( q:string | undefined) => {
        let postsDB: PostsDB[]

        if(q){
            postsDB = await this.getPostsByContent(q)
        } else{
            postsDB = await this.getAllPosts()
        }
        const usersDB = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()

        return {
        postsDB,
        usersDB
        }
    }
}