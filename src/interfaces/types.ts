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
    role: string,
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
    users: {
        id: string,
        name: string
    }
}