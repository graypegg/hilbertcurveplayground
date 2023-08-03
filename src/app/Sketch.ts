import p5 from 'p5'
import {Pixel, PixelProvider} from "./api/PixelProvider";

export default function (p: p5, pixelProvider: PixelProvider) {
    const order = 7
    const scalingFactor = p.int(p.pow(2, order))
    const maximumPoints = p.pow(scalingFactor, 2)
    const baseSize = 512 / scalingFactor
    const points: p5.Vector[] = Array(maximumPoints).fill(0).map((_, index) => hilbert(index))

    let hoveredPixel: Pixel | null = null

    p.setup = async () => {
        p.createCanvas(512, 512);

        updateCurve(0);
    }

    p.draw = () => {
        p.background(0)
        updateCurve(0)
        p.fill(255)
        p.text(hoveredPixel?.tooltip?? '', p.mouseX, p.mouseY - 2)
    }

    function updateCurve(offset: number) {
        p.noStroke()
        p.noSmooth()
        points.forEach((point, index) => {
            const pixel = pixelProvider.getPixel(index + offset)
            p.fill((pixel?.intensity ?? 0))

            if (
                p.mouseX > (point.x * baseSize) + (baseSize / 2) &&
                p.mouseX < (point.x * baseSize) + (baseSize / 2) + baseSize &&
                p.mouseY > (point.y * baseSize) + (baseSize / 2) &&
                p.mouseY < (point.y * baseSize) + (baseSize / 2) + baseSize &&
                pixel
            ) {
                hoveredPixel = pixel
                p.fill('#FF0000')
            }

            p.square((point.x * baseSize) + (baseSize / 2), (point.y * baseSize) + (baseSize / 2), baseSize)

        })
    }

    function hilbert (i: number) {
        const points = [
            new p5.Vector(0, 0),
            new p5.Vector(0, 1),
            new p5.Vector(1, 1),
            new p5.Vector(1, 0)
        ];

        let index = i & 3;
        let v = points[index];

        for (let j = 1; j < order; j++) {
            i = i >>> 2;
            index = i & 3;
            let len = p.pow(2, j);
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