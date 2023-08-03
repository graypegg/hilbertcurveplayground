import {Fractal} from "./Fractal";
import p5 from "p5";

export class HilbertCurve extends Fractal {
    BASE_SHAPE = [
        new p5.Vector(0, 0),
        new p5.Vector(0, 1),
        new p5.Vector(1, 1),
        new p5.Vector(1, 0),
    ];
}