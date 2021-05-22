import { AxiosResponse } from "axios"
import api from "../../../api/Api"
import { RANKING } from "./RankingEndpoint"
import { RankingGetResponse } from './RankingRequestTypes'

export class RankingRepository {
    public async getRanking(type:string): Promise<AxiosResponse<RankingGetResponse>> {
        return await api.get<RankingGetResponse>(RANKING.replace(':type', type))
    }
}