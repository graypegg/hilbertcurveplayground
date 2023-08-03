import {WeatherPixelProvider} from "./WeatherPixelProvider";
import {Pixel} from "./PixelProvider";
import {WeatherDataType} from "./types";

export class TempPixelProvider extends WeatherPixelProvider {
    name = 'Temperature'
    WEATHER_DATA_TYPE: WeatherDataType = 'temperature_2m'

    protected valueToColour(reading: number): Pixel["colour"] {
        return {
            r: reading > 0 ? (reading / 35) * 255 : 0,
            g: 0,
            b: reading < 0 ? (Math.abs(reading) / 20) * 255 : 0,
        }
    }
}