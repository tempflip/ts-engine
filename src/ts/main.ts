import {Player, World, Brick, View} from "./engine";

var imgBrick = new Image();
imgBrick.src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2ODApLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAHgAeAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A8j0XxBqkWj2KJqd2iLBGFVZ2AA2jgc1T8aazf3/g7WoLq+ubmBrVi0csrMpwQRkE44IBrAbw9p8fgq6kihmhuINJlnS4W+uSwdIGdTgyFeqjIxirln4d0q80qBbiwafzYV8zffXXz5AzkCbFfnChTjLn7Pt8z9dlUrTg6XLvHv8ALsdVH4l1cRrjVb0cf8/D/wCNb3g/Vb3UtTlivL2e7jEJYJNKzgHcvOCevJ/OvLvFGhWNt4euri2hmtZoXt9rx3tychriKNgQ0hGCrn3966bQfAek6/ePbkXthtjMnm2WpXSOeQMEmU8c/oKwqU6apuV7fL0OmnVrOpycl7W05t9+68jnLLS9bvfDYtm1TSI1urBrd8W05KrJEUbB3dQGNJqceu6BoE9zDfaRdfY4Q3lGCdSyjAPOcZxzVXS/Gtium2imK4yIkH3V/uj3qp4s8c2C+F9VBhuMvblBhV6kgf3q7oxm5qLjpft/wTz5ulGm5qo7pd/K/bubuo6LrOq6bLaSatpCRzGNmK2s+RskSQY+b1QD6Zrb0C18Yx3jnRr/AMOTXXlnct5b3KpsyMkbWznOP1rmk8bWOxf3Vx0/ur/8VWz4Y+Jul6NfyTTW92ytEUAjRCc5B7sPSueoqvI0oJ+Vv+CdNP2POm6jXnf/AIB//9k=';

var pusheen = new Image();
pusheen.src = '../assets/pusheen2_50x30.png';


var pusheen2 = new Image();
pusheen2.src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2ODApLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAHgAeAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/VHAr5t+P3x3lttfvfBOlyXelraR/adU1mJ2gMUQUP5SOdpVjkMzoThCOQXBX234l+OLT4beA9b8S3uwwadbNKEZtokkPEaZ7bnKrn3r4z0htV/sx7nW5or/AFy5eS6vJrfhZZnYsdue3IA6AAAcACuSvNpcqN6UU3dnVWv7SvjKPRF0hta8PqscEajWxJuvVi/hkZHzGXZdnzEbcuTtOAD9BfBX4ljx54WgivZJ5desVNvqDm1dI2kQ4D79ojy67JNinIEg4FfCDabfyaNaCTwtJNqogggliLReQHWRS10MxFvOOATmT5stvABIH03+zhf2Oj+P9dtpYbaObUbBblLlkUODE6pIC/XDCSDAzj92a5qFaUpanbiqFOnFezlfqdn+1RGl74E0nT7iNbiyvNXiS4hkXKSKkU0qhgeoDxxn6gV4LXd+Jfgv8dvGsqxa7450K606O4juEtYk8qPckxYcLbbwCmEwZGI55OcUt5+z38QjCwtH8NJLkbXmv7hl685Atx2z3q6ilOXMkzmg4xVro4P8a5P4k6heaZo1vcWEjxXH2gRl4zg7SrEjI7ZC/lXtv/DP3jvPTw7/AODKf/5GrqPhd8CtV0TxVd6n4rTRr6z+xfZrazgke4COXDM53xoOQqjoT6EZbdn7KctLWK9pGOt7n//Z";

var background = new Image();
background.src = '../assets/background1.jpeg';

let w = new World();

let p = new Player(100, 0);
p.setImage(pusheen);
p.w = 50;
p.h = 30;

w.registerObj(p);

let drawBrick = function(world: World, x: number, y: number) {
    let b = new Brick(x, y);
    b.setImage(imgBrick);
    b.w = 30;
    b.h = 30;
    world.registerObj(b); 
}

for (var i = 0; i < 20; i++) {
    drawBrick(w, i * 30, 320); 
}

for (var i = 20; i < 30; i++) {
    drawBrick(w, i * 30, 350); 
}

for (var i = 30; i < 35; i++) {
    drawBrick(w, i * 30, 320); 
}
for (var i = 35; i < 50; i++) {
    drawBrick(w, i * 30, 200); 
}

for (var i = 0; i < 20; i++) {
    drawBrick(w, 5, i * 30); 
}
for (var i = 5; i < 20; i++) {
    drawBrick(w, 700, i * 30); 
}

let canvas = document.getElementById('canv');
let cnv = document.getElementById('canv');
let v = new View(canvas, w);
v.anchor = p;
v.background = background;

document.addEventListener('keydown',(ev) => {  p.onKeypress(ev) });
document.addEventListener('keyup',(ev) => {  });

v.fire(window, 10);

// var ctx = cnv.getContext('2d');
// console.log(cnv);
// console.log(ctx);

// ctx.save();
// ctx.scale(-1, 1);
// ctx.drawImage(pusheen2, -100, 50);
// ctx.restore();

// ctx.drawImage(pusheen2, 100, 250);
