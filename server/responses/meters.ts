import {FailedResponse, SuccessfulResponse} from "./response";

export interface MeterEntry {
    meter_id: number,
    lat: number,
    lon: string
}

export type MetersResponse = FailedResponse | SuccessfulResponse<MeterEntry[]>