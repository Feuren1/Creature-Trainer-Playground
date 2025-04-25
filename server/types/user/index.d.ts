
enum Rank {
    BRONZE = "BRONZE",
    SILVER = "SILVER",
    GOLD = "GOLD"
}

export type RegisterUser = {
    username: string
    password: string
    email: string
}

export type User = {
    user_id: string
    username: string
    password_hash: string
    rank: Rank;
}

export interface UserPayload {
    id: number;
    username: string;
}

export type Trainer = {
    userName: string;
    
    //profilpicture
}