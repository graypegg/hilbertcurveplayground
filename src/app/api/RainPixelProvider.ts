import {WeatherPixelProvider} from "./WeatherPixelProvider";
import {Pixel} from "./PixelProvider";
import {WeatherDataType} from "./types";

export class RainPixelProvider extends WeatherPixelProvider {
    name = 'Rainfall'
    WEATHER_DATA_TYPE: WeatherDataType = 'rain'

    protected valueToColour(reading: number): Pixel["colour"] {
        return {
            r: 0,
            g: 0,
            b: Math.sqrt(reading * 2) * 200
        }
    }
}
