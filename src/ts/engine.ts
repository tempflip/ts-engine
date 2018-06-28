const G : number = 10;
     
abstract class Obj {
    x : number;
    y : number;
    w : number = 50;
    h : number = 50;
    vx : number = 0;
    vy : number = 0;
    ax : number = 0;
    ay : number = 0;
    timeStamp : number;
    public t : number; // t between last step and this
    world : World;
    img : HTMLImageElement;
    public toMirror : Boolean = false;

    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
        this.updateTimestamp();
    }

    public setImage(img :HTMLImageElement) {
        this.img = img;
        this.w = img.width;
        this.h = img.height;
    }

    public updateTimestamp() : void {
        let currentTimestamp = new Date().getTime();
        this.t = currentTimestamp - this.timeStamp;
        this.timeStamp = currentTimestamp;
    }

    public step() : void {
        this.updateTimestamp();
        this.stepBehavior();
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
        let AAx = 10;
        let AAy = 10;
        let vJump = 8;
        let vRun = 3;

        if (ev.key == 'ArrowRight') {
            this.ax += AAx;
            this.vx += vRun;
            this.toMirror = false;
        }
        if (ev.key == 'ArrowLeft') {
            this.ax -= AAx;
            this.vx -= vRun;
            this.toMirror = true;
        }
        if (ev.key == 'ArrowUp') {
            this.ay -= AAy;
            this.vy -= vJump;
        }    
        if (ev.key == 'ArrowDown') {
            this.ay += AAy;
        } 
        this.cutAcceleration(); 
        this.roundAllParams();            
    }

    private cutAcceleration() : void {
        let aMax = 20;
        let aMin = -20;
        if (this.ax > aMax ) this.ax = aMax;
        if (this.ax < aMin ) this.ax = aMin;            
        if (this.ay > aMax ) this.ay = aMax;
        if (this.ay < aMin ) this.ay = aMin;   
    }

    private roundAllParams() : void {
        // if (this.ay < 1 && this.ay > -1) this.ay = 0;
        // if (this.ax < 1 && this.ax > -1) this.ax = 0;
        // if (this.vy < 0.01 && this.vy > -0.01) this.vy = 0;
        // if (this.vx < 0.01 && this.vx > -0.01) this.vx = 0;
    }

    public stepBehavior() : void {
        this.ax *= 0.97;
        this.ay *= 0.97;
        this.vx *= 0.97;
        this.vy *= 0.97;
        // console.log('# ax, ay', this.ax, this.ay);
        // console.log('# t', this.t);

        this.cutAcceleration();              
        this.roundAllParams();

        this.vx = this.vx + this.ax * (this.t / 1000);
        this.vy = this.vy + (this.ay + G ) * (this.t / 1000);


        let roundFunc : any;
        if (this.vx >= 0) roundFunc = Math.floor;
        else roundFunc = Math.ceil;

        let dx = roundFunc(this.vx);
        let dy = roundFunc(this.vy);

        while (true) {
            let newX = this.x + dx;
            let newY = this.y + dy;

            if (!this.world.isItCollision(this, newX, newY, newX + this.w, newY + this.h)) {
                this.x = newX;
                this.y = newY;
                break;
            } else if (dy != 0) {
                // it a collision so we need to null the V
                this.vy = 0;
                this.ay = 0;
                if (dy > 0) dy -= 1;
                else if (dy < 0) dy += 1;
            } else {
                // can't be any lower
                break;
            }
            
        }
        this.showData();
    }

    private showData() : void {
        document.getElementById('ax').innerText = Math.round(this.ax).toString();
        document.getElementById('ay').innerText = Math.round(this.ay).toString();
        document.getElementById('vx').innerText = Math.round(this.vx).toString();
        document.getElementById('vy').innerText = Math.round(this.vy).toString();
    }
}

export class Brick extends Obj {
    constructor(x : number, y : number) {
        super(x,y);
    }    
}

export class World {
    public objList : Obj[] = [];

    constructor() {

    }

    public registerObj(objToRegister : Obj) : void {
        this.objList.push(objToRegister);
        objToRegister.subscribeToWorld(this);
    }

    public step() : void {
        for (let o of this.objList) {
            o.step();
        }
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

export class View {
    public startX : number = 0;
    public startY : number = 0;

    private canvas;
    private ctx : CanvasRenderingContext2D; 
    private world : World;
    public anchor : Obj;
    public anchorPosX : number= 300;
    public anchorToleranceX = 50;
    public background : HTMLImageElement;

    constructor(canvas, world : World) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.world = world;
    }

    private adjustRenderingPosition() {
        if (!this.anchor) return;

        let posDiffAbs = Math.abs((this.anchor.x - this.startX) - this.anchorPosX);
        // console.log(posDiffAbs);
        // if (posDiffAbs < this.anchorToleranceX) return;


        // if (posDiffAbs > 100) {
            this.startX = this.anchor.x - this.anchorPosX;
        // }
            
        if (this.startX < 0) this.startX = 0;
    }

    public draw() : void {
        this.adjustRenderingPosition();        
        for (let o of this.world.objList) {
            let renderedX = o.x - this.startX;
            let renderedY = o.y - this.startY;

            if (o.img) {
                this.drawImg(o, renderedX, renderedY);
            } else {
                this.ctx.fillRect(renderedX, renderedY, o.w, o.h);
            }
        }
    }

    private drawImg(o, renderedX, renderedY) : void {
        if (o.toMirror == false) {
            this.ctx.drawImage(o.img, renderedX, renderedY);
        } else {
            this.ctx.save();
            // this.ctx.scale(-1, 1);

            this.ctx.translate(renderedX + 50, renderedY + 30);
            this.ctx.rotate(Math.PI);
            this.ctx.drawImage(o.img, 0, 0);
            this.ctx.restore();
        }        
    }
    
    public renderBackground() {
        this.ctx.drawImage(this.background, 0 - this.startX / 3, 0, 5000, 1000);
    }

    public fire(win : Window, ms : number) : void {
        win.setInterval(() => {this.step();}, ms);
    }

    public step() : void {
        this.world.step();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderBackground();
        this.draw();        
    }
}





