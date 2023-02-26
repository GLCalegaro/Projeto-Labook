export interface GetAllPostsInputDTO{
    q: string,
    token: string
}
    
    export interface InsertInputPostDTO{
        content: string,
        token: string,
    }

    export interface EditInputDTO{
        id: string,
        content: string,
        token: string,
    }

    export interface RemoveInputPostDTO{
        id: string,
        token: string,
    }

    export interface LikeDislikeDTO{
        id: string,
        like: number,
        token: string,
    }

   export class PostDTO {

    getAllPostsInput = (q:string, token:string ):GetAllPostsInputDTO=>{
        const result:GetAllPostsInputDTO={
            q,
            token,
        }
        return result
    }

    insertInputPost = (content: string, token:string ) :InsertInputPostDTO =>{

        const result: InsertInputPostDTO={
            content,
            token,
        }

        return result
    }

    removeInputPost = (id: string, token:string ) :RemoveInputPostDTO =>{

        const result: RemoveInputPostDTO={
            id,
            token,
        }

        return result
    }

    editInputPost = (id:string, content: string, token:string ): EditInputDTO =>{

        const result:EditInputDTO={
            id,
            content,
            token,
        }

        return result
    }

    likeDislike = (id:string,like:number, token:string ):LikeDislikeDTO=>{
        const result:LikeDislikeDTO={
            id,
            like,
            token,
        }

        return result
    }

    
   } 