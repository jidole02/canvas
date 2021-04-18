export class PxClass{
    ctx:CanvasRenderingContext2D;
    dctx:CanvasRenderingContext2D;
    cv:HTMLCanvasElement;
    drawState:number;
    imgData:any;
    MAX_SIZE:number;
    PX_SIZE:number;
    constructor(){
        this.drawState = 0;
        this.MAX_SIZE = 500;
        this.PX_SIZE = 15;
    }
}