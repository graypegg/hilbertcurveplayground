import {Pixel, PixelProvider} from "./PixelProvider";
import {WeatherDataType, Response, SuccessfulResponse} from "./types";

export class ApiError extends Error {}

export abstract class WeatherPixelProvider implements PixelProvider {
    /**
     * Name of this pixel provider scheme. Will be displayed in the UI.
     */
    abstract name: string

    /**
     * The weather type requested from the open-meteo.com api.
     * This only applies to data types they provide with an hourly historical endpoint.
     */
    protected abstract WEATHER_DATA_TYPE: WeatherDataType

    /**
     * Map a reading from the api to a colour to display on screen.
     * Readings will vary in scale depending on the type, so be careful not to completely blow past 255 per colour channel.
     */
    protected abstract valueToColour(reading: number): Pixel["colour"]

    // == Constants

    static readonly BASE_URL = 'https://archive-api.open-meteo.com'
    static readonly ONE_DAY = 86400000

    // == State

    private pixels: Pixel[] = []

    // == Implementing PixelProvider

    async fetch(): Promise<void> {
        const aDay = 1691031970401;
        const fiveYearsAgo = aDay - ((365 * 5) * WeatherPixelProvider.ONE_DAY);

        const rawResponse = await fetch(
            this.makeHistoricalDataUri(
                this.WEATHER_DATA_TYPE,
                fiveYearsAgo,
                aDay
            )
        )
        const response = await rawResponse.json() as Response
        if (response.error) throw new ApiError(response.reason)

        this.pixels = this.parseResponse(response);
    }

    getPixel(index: number): Pixel | undefined {
        return this.pixels[index % this.pixels.length]
    }

    // == Private methods

    protected parseResponse(response: SuccessfulResponse): Pixel[] {
        return response.hourly[this.WEATHER_DATA_TYPE].map((reading, index) => ({
            colour: this.valueToColour(reading),
            tooltip: response.hourly.time[index],
            index
        }))
    }

    protected makeDateString(timestamp: number): string {
        const date = new Date(timestamp)
        return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    }

    protected makeHistoricalDataUri(type: WeatherDataType, start: number, end: number) {
        return `${WeatherPixelProvider.BASE_URL}/v1/era5?latitude=45.5148742&longitude=-73.5180036&start_date=${this.makeDateString(start)}&end_date=${this.makeDateString(end)}&hourly=${type}`
    }
}
