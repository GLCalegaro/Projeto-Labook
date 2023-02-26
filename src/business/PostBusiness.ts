import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { PostsDB, ROLE_USER } from "../interfaces/types";
import { BadRequestError } from "../errors/BadRequestError";
import { Post } from "../models/Posts";
import { PostDTO, InsertInputPostDTO, EditInputDTO, RemoveInputPostDTO, LikeDislikeDTO, GetAllPostsInputDTO } from "../dtos/PostDTO";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { HashManager } from "../services/HashManager";

export class PostsBusiness{
    constructor(
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
        private postsDTO: PostDTO,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ){}

    public getAllPosts =async ( input: GetAllPostsInputDTO ) => {
        const {q, token} = input

        if(typeof token !== "string"){
            throw new BadRequestError("'Token' não informado!")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'Token' inválido!")
        }

        const {
            postsDB,
            creatorsDB,
        } = await this.postDatabase.getPostsWithUsers()
            const posts = postsDB.map((postDB)=>{ 
            const post = new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            getCreator(postDB.creator_id)       
    )
    return post.toBusinessModel()
})

   function getCreator(creatorID: string){
    const creator = creatorsDB.find((creatorDB)=>{
        return creatorDB.id ===  creatorID
    })
    return{
        id: creator.id,
        name: creator.name
   }
}
    return posts  


    }

    public createNewPost =async (input:InsertInputPostDTO) => {
        const {content, token} = input

        if(typeof token !== "string"){
            throw new BadRequestError("'Token' não informado!")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'Token' inválido!")
        }

        const id = this.idGenerator.generate()
        const created_at = (new Date()).toISOString()
        const updated_at = (new Date()).toISOString()
        const likes = 0
        const dislikes = 0
        const creator_id = payload.id

        if (content !== undefined){
            if(typeof content !== "string"){
                throw new BadRequestError("'Content' precisa ser uma string")
            }
        }else{
            throw new BadRequestError("Erro, favor informar o 'content'")
        }

        const newPost = new Post (
            id,
            content,
            likes,
            dislikes,
            created_at,
            updated_at,
            {id:creator_id,
            name: payload.name}
            )

        const newPostDB = newPost.toDBModel()
        await this.postDatabase.createNewPost(newPostDB)

        const output = {
            message: "Post realizado com sucesso!",
            post: newPost,
        }

        return output
    }

    public editPost =async (input:EditInputDTO) => {
        const {id,content,token} = input

        if(typeof token !== "string"){
            throw new BadRequestError("'Token' não informado!")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'Token' inválido!")
        }

        const findPostToUpdate = await this.postDatabase.getPostsById(id)

        if (!findPostToUpdate){
            throw new BadRequestError("'Id' não consta na base de dados.")
        }

        
        if(payload.role !== ROLE_USER.ADMIN){
            if(findPostToUpdate.creator_id !== payload.id){
                throw new BadRequestError("Usuário não possui autorização para editar este post.")
            }
        }

        if (content !== undefined){
            if(typeof content !== "string"){
                throw new BadRequestError("'content' precisa ser uma string")
            }
        }else{
            throw new BadRequestError("Favor, informar o 'content'")
        }

        const editedAt = (new Date()).toISOString()

        const postToEdit = new Post(
            id,
            content,
            findPostToUpdate.likes,
            findPostToUpdate.dislikes,
            findPostToUpdate.created_at,
            editedAt,
            {
                id: findPostToUpdate.creator_id,
                name: payload.name
            }
        )

        const postToEditDB = postToEdit.toDBModel()
        await this.postDatabase.editPostById(postToEditDB, id)
    
        const output = {
            message: "Update realizado com sucesso!",
            post: postToEdit,
        }

        return output
    }

    public removePost = async (input: RemoveInputPostDTO) =>{
        const {id, token} = input

        if(typeof token !== "string"){
            throw new BadRequestError("'Token' não informado!")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'Token' inválido!")
        }

        const findPostToRemove = await this.postDatabase.getPostsById(id)
        const findUserDB = await this.userDatabase.getUserById(findPostToRemove.creator_id)
    
        if(findUserDB.role !== ROLE_USER.ADMIN){
            if(findUserDB.id !== payload.id){
                throw new BadRequestError("Usuário não possui autorização para remover Posts.")
            }
        }
        
        if(findPostToRemove){
            await this.postDatabase.removePostById(id)
            const output = {
                message: "Publicação removida com sucesso!",
                post: findPostToRemove
            }
            return output
        }else{
            throw new BadRequestError("Publicação não consta na base de dados.")
        }
    }

    public likeDislike = async (input: LikeDislikeDTO)=>{
        const {id, like, token} = input

        if(typeof token !== "string"){
            throw new BadRequestError("'Token' não informado!")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'Token' inválido!")
        }

        const findPostToLike = await this.postDatabase.getPostsById(id)
        const findIdLD = await this.postDatabase.likeDislike(payload.id, id)

        if(!findPostToLike){
            throw new BadRequestError("Publicação não encontrada.")
        }

        const updateAt = (new Date()).toISOString()
        let likes = 0
        let dislikes = 0

        if(like === 0){
            
            findPostToLike.dislikes == 1 ? dislikes = 0 : dislikes = 1
            
        }else if(like === 1){
            findPostToLike.likes == 1 ? likes = 0 : likes = 1
        }else{
            throw new BadRequestError("Erro, informe um número válido((1) like, (0) dislike).")
        }

        const postToLike = new Post(
            id,
            findPostToLike.content,
            likes,
            dislikes,
            findPostToLike.created_at,
            updateAt,
            {id: findPostToLike.creator_id,
            name: ""}
        )

        const updateLikeDB = {
            user_id: payload.id,
            post_id: id,
            like: 1
        } 

        const postToLikeDB = postToLike.toDBModel()
        await this.postDatabase.editPostById(postToLikeDB,id)
        await this.postDatabase.editLikeDislike(updateLikeDB)

        if(like === 0){
            const output = {
                message: "Você descurtiu essa publicação!", 
                post: postToLikeDB}
            return output
        }else if(like===1){
            const output = {
                message: "Você curtiu essa publicação!", 
                post: postToLikeDB}
            return output
        }

    }
}





