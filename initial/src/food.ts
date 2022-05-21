import { Application, Graphics } from "pixi.js";
import { eat_and_grow, snake } from "./snake";

export let points: number = 0;
export let time: number = 20;
let can: Application;
let radius: number;
export let x: number = 100;
export let y: number = 100;
export function food_Position(app: Application, radi: number) {

    radius = radi;
    x = 40 +Math.floor( Math.random() * (app.view.width - 80));
    y =90+Math.floor(Math.random() * (app.view.height-120));
    // console.log(x,y);

    return FOOD(app, radi);
}
export function FOOD(app: Application, radi: number): Graphics {
    can = app;
    let food = new Graphics();
    food.beginFill(0xff00f,1);
    food.lineStyle(0xa,0.1,0.4);
    food.drawCircle(x, y, radi);
    food.endFill()
    return app.stage.addChild(food);
}
export function snake_eaten_food() {
    let dis = Math.sqrt(Math.pow(Math.abs(snake[0].x - x), 2) + Math.pow(Math.abs(snake[0].y - y), 2));
    if (dis < 25) {
        const audio=document.querySelector("audio")as HTMLAudioElement;
        audio.src='../assets/audio/jump.wav';
        audio.play();
        points++;
        time=20;
       
        eat_and_grow();
        console.log("eaten");
        food_Position(can, radius);
    }
}
export function timeUpdate(){
time--;
if(time<0){
    const audio=document.querySelector("audio") as HTMLAudioElement;
    audio.src='../assets/audio/food.wav';
    audio.play();
    time=20;
    food_Position(can,radius);
}
}