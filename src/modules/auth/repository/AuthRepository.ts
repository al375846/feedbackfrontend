import { AxiosResponse } from "axios";

import api from "../../../api/Api";
import { CHECK_USERNAME, LOGIN, LOGOUT, ONESIGNAL, USERTYPE } from "./AuthEndpoints";

export interface RegisterParams {
    username: string,
    password: string,
    email: string,
    name: string,
    lastname: string,
    address: string,
    phone: string
}

export interface NotificationsParams {
    onesignal: string
}

interface AuthLoginResponseData {
    token: string
}

interface AuthUsertypeResponseData {
    usertype: string
}

interface CheckUsernameResponseData {
    exists: boolean
}

export class AuthRepository {

    public async login(username: string, password: string): Promise<AxiosResponse<AuthLoginResponseData>> {
        return await api.post<AuthLoginResponseData>(LOGIN, {
            username: username,
            password: password
        })
    }

    public async usertype(token: string): Promise<AxiosResponse<AuthUsertypeResponseData>> {
        return await api.get<AuthUsertypeResponseData>(USERTYPE, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async logout(notificationData: NotificationsParams, token: string): Promise<void> {
        await api.post<void>(LOGOUT, notificationData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async onesignal(notificationData: NotificationsParams, token: string): Promise<void> {
        await api.post(ONESIGNAL, notificationData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async register(registerData: RegisterParams): Promise<void> {
        await api.post<void>(LOGOUT, registerData)
    }

    public async checkUsername(username: string): Promise<AxiosResponse<CheckUsernameResponseData>> {
        return await api.post<CheckUsernameResponseData>(CHECK_USERNAME, {
            username: username
        })
    }
}