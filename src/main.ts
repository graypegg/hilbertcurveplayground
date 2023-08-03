import './style.css'
import {App} from "./app/App";

const app = new App()

const el = document.querySelector('#app');
if (el) {
    app.mount(el)
}