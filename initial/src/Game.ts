import { Application, Container, Graphics, Resource, Sprite, Text, Texture, Ticker } from "pixi.js";

import { preloader } from "./preloader";
import list from './assets';
import { FOOD, food_Position, points, snake_eaten_food, time, timeUpdate } from "./food";
import { drawSnake, gameOver, addBlock, move } from "./snake";
import { selectTexture } from "./texture";
export class Game {
    app: Application;
    stage: Container;
    fps: Text;
    image1: Sprite | undefined;
    index: number;
    food: Graphics | undefined;
    food_radi: number;
    snake: Container | undefined;
    vert: number | undefined;
    hori: number | undefined;
    direction: string | undefined;
    starting: Sprite | undefined;
    bg1: Graphics | undefined;
    bg2: Graphics | undefined;
    bg3: Graphics | undefined;
    score: Text | undefined;
    timer: Text | undefined;
    // timer:number=20000;
    constructor(app: Application) {
        this.index = 1;
        this.app = app;
        this.stage = app.stage;
        this.food_radi = 10;
        // this.fps = this.createText("", 0, 0, 0);
        this.fps = this.createText("CLICK TO START THE GAME", this.app.view.width / 2, 15, 0.5);
        preloader(list, () => {
            this.starting = this.createSprite(selectTexture('i2') as Texture, this.app.view.width / 2, this.app.view.height / 2);
            this.starting.scale.set(1.1, 1.2);
            this.starting.interactive = true;
            this.starting.addListener('click', () => {
                if (this.starting)
                    this.starting.visible = false;

                this.bg1 = this.createBorder(0, 0, this.app.view.width, this.app.view.height, 0xeefee);
                this.bg2 = this.createBorder(20, 20, this.app.view.width - 40, this.app.view.height - 40, 0xFF0000);
                this.bg3 = this.createBorder(20, 50, this.app.view.width - 40, this.app.view.height - 70, 0xa);
                this.score = this.createText("", 30, 20, 0);
                this.timer = this.createText("", this.app.view.width - 200, 20, 0);
                setInterval(() => {
                    timeUpdate();
                }, 1000);
                this.food = FOOD(this.app, this.food_radi)
            });
        });
    }
    events(e: KeyboardEvent) {
        console.log(e);

        console.log(this.vert, this.hori)
        if (this.vert && (e.code == "ArrowLeft" || e.code == "ArrowRight")) {
            clearInterval(this.vert);
            this.vert = undefined;
        }
        if (this.hori && (e.code == "ArrowUp" || e.code == "ArrowDown")) {
            clearInterval(this.hori);
            this.hori = undefined;
        }
        if (this.hori == undefined) {
            if (e.code == 'ArrowLeft') {
                this.direction = 'left';
                addBlock(-30, 0);
                this.hori = Number(setInterval(() => move(), 300));
            }
            if (e.code == 'ArrowRight') {
                this.direction = 'right';
                addBlock(30, 0);
                this.hori = Number(setInterval(() => move(), 300));
            }
        }
        if (this.vert == undefined) {
            if (e.code == 'ArrowDown') {
                this.direction = 'down';
                addBlock(0, 30);
                this.vert = Number(setInterval(() => move(), 300));
            }
            if (e.code == 'ArrowUp') {
                this.direction = 'up';
                addBlock(0, -30);
                this.vert = Number(setInterval(() => move(), 300));
            }
        }

    }

    // test() {
    //     console.log("test called");
    //     this.createGameOver();
    // }
    createGameOver(): Sprite | undefined {
        if (gameOver()) {
            this.app.ticker.stop();
            let text = this.createSprite(selectTexture('gameover') as Texture, this.app.view.width / 2, this.app.view.height / 2);
            text.scale.set(2, 1.2);
            console.log(text);
            this.stage.removeChildren();
            return this.stage.addChild(text);
        }
    }
    createText(entry: string, x: number, y: number, a: number): Text {
        let text: Text = new Text(entry);
        text.position.set(x, y);
        text.anchor.set(a);
        return this.stage.addChild(text);
    }
    createBorder(x: number, y: number, w: number, h: number, color: any): Graphics {
        let bord = new Graphics();
        bord.beginFill(color);
        bord.drawRect(x, y, w, h);
        bord.endFill();
        return this.stage.addChild(bord);
    }
    createSprite(texture: Texture<Resource>, x: number, y: number): Sprite {
        let img = Sprite.from(texture);
        img.position.set(x, y);
        img.anchor.set(0.5);
        return this.stage.addChild(img);
    }
    animate() {
        if (this.score)
            this.score.text = "Score :- " + points;
        if (this.timer)
            this.timer.text = "Time Left :- " + time;
        // console.log(this.index,this.food_radi);

        // if(this.food){
        //     this.food.destroy();
        //     this.food = FOOD(this.app,this.food_radi);
        // }
        if (this.food) {
            if (this.index <= 50) {
                this.food_radi += 0.3
                this.food.destroy();
                this.food = FOOD(this.app, this.food_radi)
                this.index++;
            }
            else if (this.index <= 100) {
                this.food_radi -= 0.3
                this.food.destroy();
                this.food = FOOD(this.app, this.food_radi)
                this.index++;
            }
            if (this.index > 100) {
                this.index = 1;
                this.food.destroy();
                this.food = FOOD(this.app, this.food_radi)
            }
        }


        if (this.snake) {
            this.snake.destroy();
        }
        if (this.starting?.visible == false) {

            this.snake = drawSnake(this.app);
            this.createGameOver();
        }

        if (this.food)
            snake_eaten_food();
    }
}