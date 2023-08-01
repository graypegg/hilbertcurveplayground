import './style.css'
import {TorontoRainPixelProvider} from "./app/api/TorontoRainPixelProvider";

const pixelProvider = new TorontoRainPixelProvider()

pixelProvider.fetch()