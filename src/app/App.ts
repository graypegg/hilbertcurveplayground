import {PixelProvider} from "./api/PixelProvider";
import {TorontoRainPixelProvider} from "./api/TorontoRainPixelProvider";
import {Painter} from "./Painter";
import {Sketch} from "./Sketch";

export class App {
    protected pixelProvider: PixelProvider = new TorontoRainPixelProvider()
    protected painter = new Painter(this.pixelProvider)

    mount (el: HTMLElement) {
        const sk = new Sketch(this.pixelProvider)
        this.painter.paint(sk, el)
    }
}