export class PxClass{
    ctx:CanvasRenderingContext2D;
    dctx:CanvasRenderingContext2D;
    cv:HTMLCanvasElement;
    drawState:number;
    imgData:any;
    constructor(){
        this.drawState = 0;
    }
}