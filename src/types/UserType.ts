export enum USER_ROLE {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export type UserType = {
    name: string
    email: string
    password: string
    role: USER_ROLE
    
}