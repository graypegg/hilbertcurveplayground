import {Pixel, PixelProvider} from "./PixelProvider";

export interface HourlyEntries {
    time: string[];
    temperature_2m: number[];
}

export interface Response {
    latitude: number;
    longitude: number;
    hourly: HourlyEntries;
}


export class TempPixelProvider implements PixelProvider {
    static BASE_URL = 'https://archive-api.open-meteo.com'
    private pixels: Pixel[] = []

    private makeHistoricalTempUri() {
        return `${TempPixelProvider.BASE_URL}/v1/era5?latitude=52.52&longitude=13.41&start_date=2021-01-01&end_date=2021-12-31&hourly=temperature_2m`
    }

    async fetch(): Promise<void> {
        const response = await (fetch(this.makeHistoricalTempUri()).then(async res => await res.json() as Response))
        this.pixels = response.hourly.temperature_2m.map((reading, index) => ({
            intensity: (reading + 50),
            tooltip: response.hourly.time[index],
            index
        }))
    }

    get isReady() {
        return this.totalPixels > 0
    }

    getPixel(index: number): Pixel | undefined {
        return this.pixels[index]
    }

    get totalPixels() {
        return this.pixels.length
    }
}