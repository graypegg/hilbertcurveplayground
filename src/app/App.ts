import {PixelProvider} from "./api/PixelProvider";
import {TorontoRainPixelProvider} from "./api/TorontoRainPixelProvider";
import {Painter} from "./Painter";

export class App {
    protected pixelProvider: PixelProvider = new TorontoRainPixelProvider()
    protected painter = new Painter()

    mount (el: HTMLElement) {
    }
}