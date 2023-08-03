import {WeatherPixelProvider} from "./WeatherPixelProvider";
import {Pixel} from "./PixelProvider";
import {WeatherDataType} from "./types";

export class AirPressurePixelProvider extends WeatherPixelProvider {
    name = 'Air Pressure'
    WEATHER_DATA_TYPE: WeatherDataType = 'pressure_msl'

    protected valueToColour(reading: number): Pixel["colour"] {
        const intensity = (reading - 1000) * 10
        return {
            r: intensity,
            g: intensity,
            b: intensity
        }
    }
}
