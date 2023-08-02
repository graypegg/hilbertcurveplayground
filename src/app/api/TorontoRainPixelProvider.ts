import {Pixel, PixelProvider} from "./PixelProvider";
import {ReadingsResponse} from "../../../server/responses/readings";

export class TorontoRainPixelProvider implements PixelProvider {
    static BASE_URL = 'http://localhost:3000'

    constructor(protected meterId = 7674) {}
    private pixels: Pixel[] = []

    private makeMeterReadingsUri () {
        return `${TorontoRainPixelProvider.BASE_URL}/meters/${this.meterId}`
    }

    async fetch(): Promise<void> {
        const response = await (fetch(this.makeMeterReadingsUri()).then(async res => await res.json() as ReadingsResponse))
        if (response.success) {
            this.pixels = response.data.map((reading, index) => ({
                intensity: reading.rainfall * 510,
                tooltip: reading.created_at,
                index
            }))
        }
    }

    get isReady () {
        return this.totalPixels > 0
    }

    getPixel(index: number): Pixel | undefined {
        return this.pixels[index]
    }

    get totalPixels () {
        return this.pixels.length
    }
}