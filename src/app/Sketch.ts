import p5 from 'p5'
import {Pixel} from "./api/PixelProvider";
import {PaintableSketch} from "./Painter";

export class Sketch extends PaintableSketch {
    readonly order = 7
    frame = 0
    scalingFactor = this.p5.int(this.p5.pow(2, this.order))
    maximumPoints = this.p5.pow(this.scalingFactor, 2)
    baseSize = 512 / this.scalingFactor
    points: p5.Vector[] = []

    hoveredPixel: Pixel | null = null

    async setup () {
        this.p5.createCanvas(512, 512);

        this.points = Array(this.maximumPoints).fill(0).map((_, index) => this.hilbert(index))

        this.updateCurve(0);
    }

    draw() {
        this.p5.background(0)
        this.updateCurve(this.frame)
        this.p5.fill(255)
        this.p5.text(this.hoveredPixel?.tooltip?? '', this.p5.mouseX, this.p5.mouseY - 2)
    }

    private updateCurve(offset: number) {
        this.p5.noStroke()
        this.p5.noSmooth()
        this.points.forEach((point, index) => {
            const pixel = this.pixelProvider.getPixel(index + offset)
            this.p5.fill((pixel?.intensity ?? 0))

            if (
                this.p5.mouseX > (point.x * this.baseSize) + (this.baseSize / 2) &&
                this.p5.mouseX < (point.x * this.baseSize) + (this.baseSize / 2) + this.baseSize &&
                this.p5.mouseY > (point.y * this.baseSize) + (this.baseSize / 2) &&
                this.p5.mouseY < (point.y * this.baseSize) + (this.baseSize / 2) + this.baseSize &&
                pixel
            ) {
                this.hoveredPixel = pixel
                this.p5.fill('#FF0000')
            }

            this.p5.square((point.x * this.baseSize) + (this.baseSize / 2), (point.y * this.baseSize) + (this.baseSize / 2), this.baseSize)

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
            let len = this.p5.pow(2, j);
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