import {PixelProvider} from "./api/PixelProvider"
import p5 from "p5"

export abstract class PaintableSketch {
    constructor(
        protected pixelProvider: PixelProvider
    ) { }

    abstract setup (): Promise<void>

    abstract draw (): void

    bindToP5 (p5: p5) {
        p5.setup = this.setup.bind(this)
        p5.draw = this.draw.bind(this)
    }
}

export class Painter {
    constructor(
        protected pixelProvider: PixelProvider
    ) { }

    async paint(sketch: PaintableSketch, el: HTMLElement) {
        if (!this.pixelProvider.isReady) {
            await this.pixelProvider.fetch()
        }

        new p5((p5) => {
            sketch.bindToP5(p5)
        }, el)
    }
}