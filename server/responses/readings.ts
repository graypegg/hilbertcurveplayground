import {FailedResponse, SuccessfulResponse} from "./response";

export interface ReadingEntry {
    /**
     * The meter that made the recording
     */
    meter_id: number,
    /**
     * The millimeters of rain recorded in the meter at this snapshot
     */
    rainfall: number,
    /**
     * Time of recording snapshot
     */
    created_at: string
}

export type ReadingsResponse = FailedResponse | SuccessfulResponse<ReadingEntry[]>