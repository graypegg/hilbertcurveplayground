import {PixelProvider} from "./api/PixelProvider";
import {Painter} from "./Painter";
import sketch from "./sketch";
import {TempPixelProvider} from "./api/TempPixelProvider";
import {RainPixelProvider} from "./api/RainPixelProvider";
import {CloudPixelProvider} from "./api/CloudPixelProvider";
import {Controls} from "./ui/controls";
import {Mountable} from "./types";
import {AirPressurePixelProvider} from "./api/AirPressurePixelProvider";

export class App implements Mountable {
    readonly pixelProviders: PixelProvider[] = [
        new TempPixelProvider(),
        new RainPixelProvider(),
        new CloudPixelProvider(),
        new AirPressurePixelProvider()
    ]

    private pixelProvider: PixelProvider = this.pixelProviders[0]
    private painter = new Painter()
    private controls = new Controls(this)
    private mountedElement: HTMLElement | null = null

    mount (el: HTMLElement) {
        this.mountedElement = el

        this.startPainter()
        this.controls.mount(el)
    }

    unmount () {
        this.painter.stop()
        this.controls.unmount()
    }

    changePixelProvider (pixelProviderName: string) {
        const provider = this.pixelProviders.find(provider => provider.name === pixelProviderName)
        if (provider) {
            this.painter.stop()
            this.pixelProvider = provider
            this.startPainter()
        }
    }

    private startPainter () {
        if (this.mountedElement) {
            this.painter.paint(sketch, this.pixelProvider, this.mountedElement)
        }
    }
}