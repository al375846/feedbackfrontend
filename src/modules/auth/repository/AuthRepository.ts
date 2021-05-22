import { AxiosResponse } from "axios";

import api from "../../../api/Api";
import { CHECK_USERNAME, LOGIN, LOGOUT, ONESIGNAL, REGISTER, USERTYPE } from "./AuthEndpoints";
import { CheckUsernameResponse, LoginPostResponse, NotificationsParams, NotificationsResponse, RegisterParams, RegisterResponse, UsertypeResponse } from "./AuthRequestType";

export class AuthRepository {

    public async login(username: string, password: string): Promise<AxiosResponse<LoginPostResponse>> {
        return await api.post<LoginPostResponse>(LOGIN, {
            username: username,
            password: password
        })
    }

    public async usertype(): Promise<AxiosResponse<UsertypeResponse>> {
        return await api.get<UsertypeResponse>(USERTYPE)
    }

    public async logout(notificationData: NotificationsParams): Promise<AxiosResponse<NotificationsResponse>> {
        return await api.post<NotificationsResponse>(LOGOUT, notificationData)
    }

    public async onesignal(notificationData: NotificationsParams): Promise<AxiosResponse<NotificationsResponse>> {
        return await api.post<NotificationsResponse>(ONESIGNAL, notificationData)
    }

    public async register(registerData: RegisterParams, type: string): Promise<AxiosResponse<RegisterResponse>> {
        return await api.post<RegisterResponse>(REGISTER.replace(':type', type), registerData)
    }

    public async checkUsername(username: string): Promise<AxiosResponse<CheckUsernameResponse>> {
        return await api.post<CheckUsernameResponse>(CHECK_USERNAME, {
            username: username
        })
    }
}