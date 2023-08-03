import {PixelProvider} from "./api/PixelProvider"
import p5 from "p5"

export class Painter {
    constructor(
        protected pixelProvider: PixelProvider,
    ) { }

    async paint (sketch: (p: p5, pixelProvider: PixelProvider) => void) {
        new p5(p => sketch(p, this.pixelProvider))
    }
}
