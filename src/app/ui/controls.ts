import {App} from "../App";
import {Mountable} from "../types";

export class Controls implements Mountable {
    private root: HTMLSelectElement | null = null

    constructor(private app: App) {}

    mount (el: HTMLElement) {
        const combobox = document.createElement('select')
        const options: HTMLOptionElement[] = this.app.pixelProviders.map(provider => {
            const option = document.createElement('option')
            option.text = provider.name
            return option
        })

        options.forEach(option => combobox.appendChild(option))

        combobox.addEventListener('change', (e) => {
            if (e.currentTarget instanceof HTMLSelectElement) {
                this.app.changePixelProvider(e.currentTarget.value)
            }
        })

        el.appendChild(combobox)
        this.root = combobox
    }

    unmount () {
        if (this.root) {
            this.root.remove()
        }
    }
}