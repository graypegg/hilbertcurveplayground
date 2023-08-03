import {PixelProvider} from "./api/PixelProvider";
import {Painter} from "./Painter";
import sketch from "./sketch";
import {TempPixelProvider} from "./api/TempPixelProvider";
import {RainPixelProvider} from "./api/RainPixelProvider";

export class App {
    protected pixelProvider: PixelProvider = new RainPixelProvider()
    protected painter = new Painter(this.pixelProvider)

    mount () {
        this.painter.paint(sketch)
    }
}