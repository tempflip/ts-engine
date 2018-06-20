const G : number = 3;
     
abstract class Obj {
    x : number;
    y : number;
    w : number = 50;
    h : number = 50;
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
            this.vy -= vv * 5;
        }    
        if (ev.key == 'ArrowDown') {
            this.vy += vv;
        }               
    }

    public stepBehavior() : void {
        this.vx *= 0.8;
        this.vy *= 0.8;
        
        let dx = Math.floor(this.vx * 2);
        let dy = Math.floor(this.vy * 2 + G);
        // console.log(this.up, dy);

        while (true) {
            let newX = this.x + dx;
            let newY = this.y + dy;
            if (!this.world.isItCollision(this, newX, newY, newX + this.w, newY + this.h)) {
                this.x = newX;
                this.y = newY;
                break;
            } else if (dy != 0) {
                if (dy > 0) dy -= 1;
                else if (dy < 0) dy += 1;
            } else {
                break;
            }
            
        }
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

    public isItCollision(obj : Obj, x1, y1, x2, y2) {
        for (let o of this.objList) {
            if (o == obj) continue;
            let ox1 = o.x;
            let oy1 = o.y;
            let ox2 = o.x + o.w;
            let oy2 = o.y + o.h;
            
            let ruleY1 = y1 >= oy1 && y1 <= oy2;
            let ruleY2 = y2 >= oy1 && y2 <= oy2;

            let ruleX1 = x1 >= ox1 && x1 <= ox2;
            let ruleX2 = x2 >= ox1 && x2 <= ox2;

            // and the inverted rules

            let iruleY1 = oy1 >= y1 && oy1 <= y2;
            let iruleY2 = oy2 >= y1 && oy2 <= y2;

            let iruleX1 = ox1 >= x1 && ox1 <= x2;
            let iruleX2 = ox2 >= x1 && ox2 <= x2;            

            if (   (ruleY1 || ruleY2) && (ruleX1 || ruleX2)
                || (iruleY1 || iruleY2) && (iruleX1 || iruleX2)
                ) return true;
        }
        return false;
    }
}







