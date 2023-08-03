import {PixelProvider} from "./api/PixelProvider";
import {Painter} from "./Painter";
import sketch from "./sketch";
import {TempPixelProvider} from "./api/TempPixelProvider";
import {RainPixelProvider} from "./api/RainPixelProvider";
import {CloudPixelProvider} from "./api/CloudPixelProvider";

export class App {
    protected pixelProvider: PixelProvider = new CloudPixelProvider()
    protected painter = new Painter(this.pixelProvider)

    mount () {
        this.painter.paint(sketch)
    }
}