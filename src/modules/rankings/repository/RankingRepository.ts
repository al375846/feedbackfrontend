import { AxiosResponse } from "axios";

import api from "../../../api/Api";
import { Ranking } from "../../../entities/Ranking";
import { RANKING } from "./RankingEndpoint";

interface RankingResponseData {
    ranking: Ranking[]
}

export class RankingRepository {
    public async getRanking(type:string, token: string): Promise<AxiosResponse<RankingResponseData>> {
        return await api.get<RankingResponseData>(RANKING.replace(':type', type), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}