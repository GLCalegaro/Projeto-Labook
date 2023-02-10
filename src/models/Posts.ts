import { PostModel, PostsDB } from "../interfaces/types"

export class Post{
    constructor(
        private id: string,
        private creator_id: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private created_at: string,
        private updated_at: string,
        private users: {
            id: string,
            name: string
        }
    ) {}

    public toDBModel(): PostsDB {
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.created_at,
            updated_at: this.updated_at,
            creator_id: this.users.id,
        }
    }

    public toBusinessModel(): PostModel {
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.created_at,
            updated_at: this.updated_at,
            users: this.users
        }
    }

    public getId(): string {
        return this.id
    }

    public setId(value: string) {
        this.id = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string) {
        this.content = value
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number) {
        this.likes = value
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number) {
        this.likes = value
    }

    public getUsers(): {
        id: string
        name: string
    } {
        return this.users
    }

    public setUsers(value: {
        id: string
        name: string
    }) {
        this.users = value;
    }
}