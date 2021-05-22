export interface User {
    username: string,
    email: string,
    name: string,
    lastname: string,
    address: string,
    phone: string
}

export type RegsiterInput = {
    username: string,
    password: string,
    confirmpassword: string,
    email: string,
    name: string,
    lastname: string,
    address: string,
    phone: string,
    type: string  
}

export type LoginInput = {
    username: string,
    password: string
}