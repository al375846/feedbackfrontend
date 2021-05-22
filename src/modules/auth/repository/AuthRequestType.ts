import { User } from "../../../entities/User";

export interface RegisterParams {
    username: string,
    password: string,
    email: string,
    name: string,
    lastname: string,
    address: string,
    phone: string
}

export interface RegisterResponse {
    user: User
}

export interface NotificationsParams {
    onesignal: string
}

export interface NotificationsResponse {
    done: boolean
}

export interface LoginPostResponse {
    token: string
}

export interface UsertypeResponse {
    usertype: string
}

export interface CheckUsernameResponse {
    exists: boolean
}