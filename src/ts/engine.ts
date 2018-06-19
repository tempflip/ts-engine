const G : number = 3;
     
abstract class Obj {
    x : number;
    y : number;
    w : number = 19;
    h : number = 19;
    vx : number = 0;
    vy : number = 0;
    timeStamp : number;
    world : World;

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
        // console.log('vx', this.vx);
    }

    public stepBehavior() : void {
    }

    public subscribeToWorld(world : World) : void {
        this.world = world;
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
        let newX = this.x + this.vx * 2;
        let newY = this.y + this.vy * 2 + G;
        
        // if (!this.world.isItCollision(newX, newY, this.w, this.h)) {
        if (!this.world.isItCollision(this)) {
            this.x = newX;
            this.y = newY;
        }
        
        // if (this.y > 500) this.y = 500;

    }
}

export class Brick extends Obj {
    constructor(x : number, y : number) {
        super(x,y);
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
        objToRegister.subscribeToWorld(this);
    }

    public draw() : void {
        for (let o of this.objList) {
            this.ctx.fillRect(o.x, o.y, o.w, o.h);
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

    public isItCollision(obj : Obj) {
        for (let o of this.objList) {

            if (o == obj) continue;
            let oxx = o.x + o.w;
            let oyy = o.y + o.h;

            let objxx = obj.x + obj.w
            let objyy = obj.y + obj.h;



            let xrule1 : Boolean = objxx > o.x && obj.x < oxx;
            let xrule2 : Boolean= obj.x > o.x && obj.x < oxx;
            let yrule1 : Boolean = obj.y < o.y && objyy >= o.y;
            let yrule2 : Boolean= obj.y > o.y && obj.y < oyy;

            if ((yrule1 || yrule2) && (xrule1)) {
                console.log(yrule1, yrule2, o.y, oyy, obj.y, objyy);
                return true;
            }
        }
        return false;
    }
}







