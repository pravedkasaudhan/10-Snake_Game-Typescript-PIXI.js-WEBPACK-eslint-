import { Application, Container, Graphics } from "pixi.js";
import { Game } from "./Game";
// let dx=30,dy=30;
let dx: number;
let dy: number;
export let snake = [{ x: 400, y: 100 }];
let can: Application;
let container: Container;


export function drawSnake(app: Application) {
    container = new Container();
    can = app;
    snake.forEach((block) => {
       
        fillCircle(block.x, block.y,);
    });
    return app.stage.addChild(container);
}
export function fillCircle(x: number, y: number) {
    let cir = new Graphics();
    cir.beginFill(0xeeffaa);
    cir.lineStyle(0xa,0.1,0.1);
    cir.drawCircle(x, y, 15);
    cir.endFill();
    container.addChild(cir);
}

export function addBlock(x: number, y: number) {
    dx = x;
    dy = y;
}

export function move() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    }
    snake.unshift(head);
    snake.pop();
}
export function eat_and_grow() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    }
    snake.unshift(head);
    
}


export function gameOver() {
    const audio=document.querySelector("audio") as HTMLAudioElement;
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            audio.src='../assets/audio/gameover.wav';
            audio.play();
            return true;
        }
    }
    if (snake[0].x < 25 || snake[0].y < 50 || snake[0].x > can.view.width-20 || snake[0].y > can.view.height - 20) {
        audio.src='../assets/audio/gameover.wav';
        audio.play();
        return true;
    }
}