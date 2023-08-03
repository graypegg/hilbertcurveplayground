import p5 from 'p5'
import {Pixel, PixelProvider} from "./api/PixelProvider";
import {Fractal} from "./curves/Fractal";
import {HilbertCurve} from "./curves/HilbertCurve";

export default function (p: p5, pixelProvider: PixelProvider) {
    const curve: Fractal = new HilbertCurve(7)

    const order = 7
    let frame = 0
    const scalingFactor = Math.pow(2, order)
    const maximumPoints = Math.pow(scalingFactor, 2)
    const baseSize = 512 / scalingFactor
    const points: p5.Vector[] = Array(maximumPoints).fill(0).map((_, index) => curve.getPointAt(index))

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


}