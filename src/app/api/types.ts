export type WeatherDataType = 'temperature_2m' | 'rain' | 'cloudcover' | 'pressure_msl'

interface TimestampEntries {
    time: string[]
}

type ReadingEntries = {
    [Key in WeatherDataType]: number[]
}

type HourlyEntries = ReadingEntries & TimestampEntries;

export interface SuccessfulResponse {
    error: undefined
    latitude: number
    longitude: number
    hourly: HourlyEntries
}

export interface FailedResponse {
    error: true
    reason: string
}

export type Response = SuccessfulResponse | FailedResponse
