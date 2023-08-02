import {PixelProvider} from "./api/PixelProvider";
import {TorontoRainPixelProvider} from "./api/TorontoRainPixelProvider";
import {Sketch} from "./Sketch";

export class App {
    protected pixelProvider: PixelProvider = new TorontoRainPixelProvider()
    protected painter = new Sketch()

    mount (el: HTMLElement) {
    }
}