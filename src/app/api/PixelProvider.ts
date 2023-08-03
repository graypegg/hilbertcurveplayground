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
    name: string,
    fetch (): Promise<void>
    getPixel (index: number): Pixel | undefined
}