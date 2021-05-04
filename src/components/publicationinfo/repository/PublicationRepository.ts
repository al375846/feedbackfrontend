import {Publication} from "../../../entities/Publication";
import api from "../../../api/Api";
import {AxiosResponse} from "axios";

export class PublicationRepository {

    public async findById(id: string, token: string): Promise<AxiosResponse<Publication>> {
        return await api.get<Publication>(`/api/publication/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}
