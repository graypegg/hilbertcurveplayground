import './style.css'
import {App} from "./app/App";

const app = new App()

const el = document.querySelector('#app') as HTMLElement | null;
if (el) {
    app.mount(el)
}