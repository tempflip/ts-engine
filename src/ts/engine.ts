const G : number = 3;
     
abstract class Obj {
    x : number;
    y : number;
    vx : number = 0;
    vy : number = 0;
    timeStamp : number;


    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
        this.updateTimestamp();
    }

    public updateTimestamp() : void {
        this.timeStamp = new Date().getTime();
    }

    public step() : void {
        let t = new Date().getTime() - this.timeStamp;
        this.stepBehavior();
        this.updateTimestamp();
        console.log('vx', this.vx);
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
            this.vx += vv;
        }
        if (ev.key == 'ArrowLeft') {
            this.vx -= vv;
        }
        if (ev.key == 'ArrowUp') {
            this.vy -= vv;
        }    
        if (ev.key == 'ArrowDown') {
            this.vy += vv;
        }               
    }

    public stepBehavior() : void {
        this.vx *= 0.8;
        this.vy *= 0.8;
        this.x += this.vx * 2;
        this.y += G + this.vy * 2;

        if (this.y > 500) this.y = 500;

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







