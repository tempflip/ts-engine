import {Player, World} from "./engine";

let canvas = document.getElementById('canv');

let p = new Player(100, 150);
let w = new World(canvas);
w.registerObj(p);

document.addEventListener('keydown',(ev) => { p.onKeypress(ev) });

w.fire(window, 10);

