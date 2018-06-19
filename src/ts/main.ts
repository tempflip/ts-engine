import {Player, World, Brick} from "./engine";

let canvas = document.getElementById('canv');

let p = new Player(300, 50);
let w = new World(canvas);
w.registerObj(p);

for (var i = 10; i < 20; i++) {
    let b = new Brick(i * 30, 300);
    b.w = 25;
    b.h = 30;
    w.registerObj(b);   
}



document.addEventListener('keydown',(ev) => { p.onKeypress(ev) });
w.fire(window, 10);

