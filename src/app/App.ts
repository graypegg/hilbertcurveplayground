import {PixelProvider} from "./api/PixelProvider";
import {TorontoRainPixelProvider} from "./api/TorontoRainPixelProvider";
import {Painter} from "./Painter";
import sketch from "./Sketch";

export class App {
    protected pixelProvider: PixelProvider = new TorontoRainPixelProvider()
    protected painter = new Painter(this.pixelProvider)

    mount () {
        this.painter.paint(sketch)
    }
}