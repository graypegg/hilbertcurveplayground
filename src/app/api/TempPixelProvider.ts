import {Pixel, PixelProvider} from "./PixelProvider";

const ONE_DAY = 86400000

export interface HourlyEntries {
    time: string[]
    temperature_2m: number[]
}

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

type Response = SuccessfulResponse | FailedResponse

export class TempApiError extends Error {
}

export class TempPixelProvider implements PixelProvider {
    static BASE_URL = 'https://archive-api.open-meteo.com'
    private pixels: Pixel[] = []

    private makeDateString(timestamp: number): string {
        const date = new Date(timestamp)
        return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    }

    private makeHistoricalTempUri(start: number, end: number) {
        return `${TempPixelProvider.BASE_URL}/v1/era5?latitude=45.5148742&longitude=-73.5180036&start_date=${this.makeDateString(start)}&end_date=${this.makeDateString(end)}&hourly=temperature_2m`
    }

    async fetch(): Promise<void> {
        const rawResponse = await fetch(this.makeHistoricalTempUri(1691031970401 - ((365 * 5) * ONE_DAY), 1691031970401))
        const response = await rawResponse.json() as Response

        if (!response.error) {
            this.pixels = response.hourly.temperature_2m.map((reading, index) => ({
                colour: this.valueToColour(reading),
                tooltip: response.hourly.time[index],
                index
            }))
        }
    }

    get isReady() {
        return this.pixels.length !== 0
    }

    getPixel(index: number): Pixel | undefined {
        return this.pixels[index % this.pixels.length]
    }

    get totalPixels() {
        return this.pixels.length
    }

    private valueToColour(reading: number): Pixel['colour'] {
        return {
            r: reading > 0 ? (reading / 35) * 255 : 0,
            g: 0,
            b: reading < 0 ? (Math.abs(reading) / 20) * 255 : 0,
        }
    }
}