import {PixelProvider} from "./api/PixelProvider"
import p5 from "p5"

export class Painter {
    private instance: p5 | null = null

    async paint (sketch: (p: p5, pixelProvider: PixelProvider) => void, pixelProvider: PixelProvider, el: HTMLElement) {
        this.instance = new p5(p => sketch(p, pixelProvider), el)
    }

    stop () {
        this.instance?.remove()
    }
}
