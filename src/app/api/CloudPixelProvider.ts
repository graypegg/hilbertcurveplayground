import {WeatherPixelProvider} from "./WeatherPixelProvider";
import {Pixel} from "./PixelProvider";
import {WeatherDataType} from "./types";

export class CloudPixelProvider extends WeatherPixelProvider {
    WEATHER_DATA_TYPE: WeatherDataType = 'cloudcover'

    protected valueToColour(reading: number): Pixel["colour"] {
        const intensity = Math.pow(reading / 7, 2)
        return {
            r: intensity,
            g: intensity,
            b: intensity
        }
    }
}