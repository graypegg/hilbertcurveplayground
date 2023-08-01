import {PixelProvider} from "./PixelProvider";

export class TorontoRainPixelProvider implements PixelProvider {
    static BASE_URL = 'https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/f2933501-0373-4734-b50c-4e4f39646180/resource/2132aa90-2fac-484a-9608-758c4ec10900/download/precipitation-data-2023.csv'

    private values = []

    async fetch(): Promise<void> {
        const response = await fetch(TorontoRainPixelProvider.BASE_URL)
        const csv = await response.text()
        csv.split('\n').splice(1).map(row => row.split(','))
        debugger
        this.values.push()
    }
}