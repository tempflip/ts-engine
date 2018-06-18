abstract class Obj {
    x : number;
    y : number;
    v : number;
    timeStamp : number;


    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
        this.v = 0;
        this.updateTimestamp();
    }

    public updateTimestamp() : void {
        this.timeStamp = new Date().getTime();
    }

    public step() : void {
        let t = new Date().getTime() - this.timeStamp;
        this.stepBehavior();
        this.updateTimestamp();
        console.log('v', this.v);
    }

    public stepBehavior() : void {
    }

}

export class Player extends Obj {
    constructor(x : number, y : number) {
        super(x,y);
    }

    public onKeypress(ev : KeyboardEvent) {
        let vv = 5;
        if (ev.key == 'ArrowRight') {
            this.v += vv;
        }
        if (ev.key == 'ArrowLeft') {
            this.v -= vv;
        }
    }

    public stepBehavior() : void {
        this.v *= 0.8;
        this.x += this.v * 2;
    }
}

export class World {
    public objList : Obj[] = [];
    private canvas;
    private ctx : CanvasRenderingContext2D; 

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    public registerObj(objToRegister : Obj) : void {
        this.objList.push(objToRegister);
    }

    public draw() : void {
        for (let o of this.objList) {
            this.ctx.fillRect(o.x, o.y, 15, 15);
        }
    }

    public step() : void {
        for (let o of this.objList) {
            o.step();
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
    }

    public fire(win : Window, ms : number) : void {
        win.setInterval(() => {this.step();}, ms);
    }
}







