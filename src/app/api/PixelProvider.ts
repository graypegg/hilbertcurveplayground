import p5 from "p5";

export interface Pixel {
    colour: {
        r: number,
        g: number,
        b: number
    }
    index: number
    tooltip: string
}

export interface PixelProvider {
    fetch (): Promise<void>
    isReady: boolean
    getPixel (index: number): Pixel | undefined
    totalPixels: number
}