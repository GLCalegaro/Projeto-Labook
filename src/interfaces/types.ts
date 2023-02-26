export enum ROLE_USER{
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface PostsDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}

export interface UsersDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: ROLE_USER,
    created_at: string
}

export interface PostModel {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator: {
        id: string,
        name: string
    }
}

// Tipagem para criação (POST) somente com content

export interface CreatePostDB {
    content: string
}

export interface SignupUser {
    name: string,
    email: string,
    password: string
}

export interface LoginUser {
    email: string,
    password: string
}

export interface InfoUsers{
    id: string,
    name: string
}

export interface PostModel {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator: {
        id: string,
        name: string
    }
}

export interface LikeDislikeDB{
    user_id: string,
    post_id: string,
    like: number,
}

export interface TokenPayload {
    id: string,
	name: string,
    role: ROLE_USER
}