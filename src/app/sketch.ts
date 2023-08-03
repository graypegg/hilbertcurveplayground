import p5 from 'p5'
import {Pixel, PixelProvider} from "./api/PixelProvider";

export default function (p: p5, pixelProvider: PixelProvider) {
    const order = 7
    let frame = 0
    const scalingFactor = p.int(p.pow(2, order))
    const maximumPoints = p.pow(scalingFactor, 2)
    const baseSize = 512 / scalingFactor
    const points: p5.Vector[] = Array(maximumPoints).fill(0).map((_, index) => hilbert(index))

    let hoveredPixel: Pixel | null = null

    p.setup = async () => {
        p.createCanvas(512, 512);

        await pixelProvider.fetch()

        updateCurve(0);
    }

    p.draw = () => {
        updateCurve(++frame);
        p.fill(255)
        if (hoveredPixel) {
            p.text(new Date(hoveredPixel.tooltip).toLocaleDateString('en', {dateStyle: 'medium'}), p.mouseX, p.mouseY - 2)
        }
    }

    function updateCurve(offset: number) {
        p.noStroke()
        p.noSmooth()
        points.forEach((point, index) => {
            const pixel = pixelProvider.getPixel(index + offset)
            if (pixel) {
                p.fill(pixel.colour.r, pixel.colour.g, pixel.colour.b)
            }

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

        let index = i & 0b00000011;
        let vector = points[index];

        for (let j = 1; j < order; j++) {
            i = i >>> 2;
            index = i & 0b00000011;
            let len = p.pow(2, j);
            if (index == 0) {
                vector.reflect(new p5.Vector(-1, 1))
            } else if (index == 1) {
                vector.y += len;
            } else if (index == 2) {
                vector.x += len;
                vector.y += len;
            } else if (index == 3) {
                let temp = len - 1 - vector.x;
                vector.x = len - 1 - vector.y;
                vector.y = temp;
                vector.x += len;
            }
        }
        return vector;
    }
}