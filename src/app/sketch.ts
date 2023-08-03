import p5 from 'p5'
import {Pixel, PixelProvider} from "./api/PixelProvider";
import {Fractal} from "./curves/Fractal";
import {HilbertCurve} from "./curves/HilbertCurve";

export default function (p: p5, pixelProvider: PixelProvider) {
    /**
     * How many orders of recursion to be used when rendering the fractal.
     * Higher = Worse performance, prettier shapes.
     */
    const order = 7

    /**
     * The size of the canvas, minimally affects performance.
     */
    const size = 512

    // == Implementation

    const scalingFactor = Math.pow(2, order)
    const maximumPoints = Math.pow(scalingFactor, 2)
    const baseSize = size / scalingFactor

    // TODO: This sketch should accept any Fractal class as a parameter rather than just building it's own. If it wasn't currently 2am, maybe.
    const curve: Fractal = new HilbertCurve(order)
    const points: p5.Vector[] = Array(maximumPoints).fill(0).map((_, index) => curve.getPointAt(index))

    let frame = 0
    let hoveredPixel: Pixel | null = null

    p.setup = async () => {
        p.createCanvas(size, size);

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