import { RequestOptions } from "@/types/api";
import { makeRequest } from "./fetch";

interface createVoteParams {
    voteType: "up" | "down",
    severityRating: "low" | "medium" | "high" | null,
    potholeId: number,
}

export async function createVote(params: createVoteParams) {
    const { voteType,
        severityRating,
        potholeId,
    } = params;

    const dataToSend = { voteType, severityRating };

    const requestOptions: RequestOptions = {
        endpoint: `/votes/${potholeId}`,
        method: "POST",
        dataToSend
    };

    return await makeRequest(requestOptions);
}