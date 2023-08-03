import p5 from "p5";

export abstract class Fractal {
    abstract BASE_SHAPE: p5.Vector[]
    constructor(protected order: number = 7) {}

    private refineEdge (index: number, edge: p5.Vector, order = 1): p5.Vector {
        if (order >= this.order) return edge

        let newEdge = edge.copy()
        let len = Math.pow(2, order)

        let nextIndex = index >>> Math.log2(this.BASE_SHAPE.length)
        let indexInRepeatingBaseShape = nextIndex & (Math.log2(this.BASE_SHAPE.length) + 1)

        switch (indexInRepeatingBaseShape) {
            case 0:
                newEdge.reflect(new p5.Vector(-1, 1))
                break
            case 1:
                newEdge.y += len
                break
            case 2:
                newEdge.x += len
                newEdge.y += len
                break
            case 3:
                let temp = len - 1 - newEdge.x
                newEdge.x = len - 1 - newEdge.y
                newEdge.y = temp
                newEdge.x += len
                break
        }

        return this.refineEdge(nextIndex, newEdge, order + 1)
    }

    getPointAt (index: number) {
        let indexInRepeatingBaseShape = index & (Math.log2(this.BASE_SHAPE.length) + 1)
        const baseEdge = this.BASE_SHAPE[indexInRepeatingBaseShape].copy()

        return this.refineEdge(index, baseEdge)
    }
}