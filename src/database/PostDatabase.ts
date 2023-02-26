import { CreatePostDB, LikeDislikeDB, PostsDB, UsersDB } from "../interfaces/types";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKEDISLIKE = "likes_dislikes"

    public getAllPosts = async () =>{
        const postsDB = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select()

    return postsDB
    }

    public getPostsById =async ( id:string ) => {
        const [postsDB]:PostsDB[] | undefined = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select()
        .where({id: id})

    return postsDB
    }

    public createNewPost = async ( newPostDB:CreatePostDB ) => {
         await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .insert(newPostDB)
    }

    public editPostById = async ( editedPost:PostsDB, id:string ) => {
         await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .update(editedPost)
        .where({id:id})
    }

    public removePostById = async ( id:string ) => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .del()
        .where({id:id})
    }

    public getPostsWithUsers =async () => {
        const postsDB = await this.getAllPosts()
        const creatorsDB = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()

        return {
        postsDB,
        creatorsDB
        }
    }

    public likeDislike =async ( user_id:string, post_id:string ) => {
        const [likeDislikeDB]: LikeDislikeDB[] | undefined = await BaseDatabase
        .connection(PostDatabase.TABLE_LIKEDISLIKE)
        .select()
        .where({user_id: user_id, post_id: post_id})
        return likeDislikeDB
    }

    public editLikeDislike = async (editLD: LikeDislikeDB) => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_LIKEDISLIKE)
        .insert(editLD)
    }
}