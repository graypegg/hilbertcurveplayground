export interface Pixel {
    intensity: number,
    index: number,
    tooltip: string
}

export interface PixelProvider {
    fetch (): Promise<void>
    isReady: boolean
    getPixel (index: number): Pixel | undefined
    totalPixels: number
}