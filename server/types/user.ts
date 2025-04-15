export type RegisterUser = {
    username: string
    password: string
    email: string
}

export type User = {
    user_id: string
    username: string
    password_hash: string
}

export interface UserPayload {
    id: number;
    username: string;
  }