import p5 from 'p5'
import {TorontoRainPixelProvider} from "./api/TorontoRainPixelProvider";
import {Pixel} from "./api/PixelProvider";

export class Sketch extends p5 {
    readonly order = 7
    frame = 0
    scalingFactor = this.int(this.pow(2, this.order))
    maximumPoints = this.pow(this.scalingFactor, 2)
    baseSize = 512 / this.scalingFactor
    points: p5.Vector[] = []

    hoveredPixel: Pixel | null = null

    pixelProvider = new TorontoRainPixelProvider(14210)
    constructor() { super(() => {}) }

    async setup () {
        this.createCanvas(512, 512);

        this.points = Array(this.maximumPoints).fill(0).map((_, index) => this.hilbert(index))

        await this.pixelProvider.fetch()

        this.updateCurve(0);
    }

    draw() {
        this.background(0)
        this.updateCurve(this.frame)
        this.fill(255)
        this.text(this.hoveredPixel?.tooltip?? '', this.mouseX, this.mouseY - 2)
    }

    private updateCurve(offset: number) {
        this.noStroke()
        this.noSmooth()
        this.points.forEach((point, index) => {
            const pixel = this.pixelProvider.getPixel(index + offset)
            this.fill((pixel?.intensity ?? 0))

            if (
                this.mouseX > (point.x * this.baseSize) + (this.baseSize / 2) &&
                this.mouseX < (point.x * this.baseSize) + (this.baseSize / 2) + this.baseSize &&
                this.mouseY > (point.y * this.baseSize) + (this.baseSize / 2) &&
                this.mouseY < (point.y * this.baseSize) + (this.baseSize / 2) + this.baseSize &&
                pixel
            ) {
                this.hoveredPixel = pixel
                this.fill('#FF0000')
            }

            this.square((point.x * this.baseSize) + (this.baseSize / 2), (point.y * this.baseSize) + (this.baseSize / 2), this.baseSize)

        })
    }

    private hilbert (i: number) {
        const points = [
            new p5.Vector(0, 0),
            new p5.Vector(0, 1),
            new p5.Vector(1, 1),
            new p5.Vector(1, 0)
        ];

        let index = i & 3;
        let v = points[index];

        for (let j = 1; j < this.order; j++) {
            i = i >>> 2;
            index = i & 3;
            let len = this.pow(2, j);
            if (index == 0) {
                let temp = v.x;
                v.x = v.y;
                v.y = temp;
            } else if (index == 1) {
                v.y += len;
            } else if (index == 2) {
                v.x += len;
                v.y += len;
            } else if (index == 3) {
                let temp = len - 1 - v.x;
                v.x = len - 1 - v.y;
                v.y = temp;
                v.x += len;
            }
        }
        return v;
    }
}