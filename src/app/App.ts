import {PixelProvider} from "./api/PixelProvider";
import {Painter} from "./Painter";
import sketch from "./Sketch";
import {TempPixelProvider} from "./api/TempPixelProvider";

export class App {
    protected pixelProvider: PixelProvider = new TempPixelProvider()
    protected painter = new Painter(this.pixelProvider)

    mount () {
        this.painter.paint(sketch)
    }
}