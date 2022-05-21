import { Application } from "pixi.js";
import { Game } from "./Game";

import '../css/style.css'


const audio=document.createElement("audio");
audio.style.visibility='none';
document.body.append(audio);
const canvas:HTMLCanvasElement=document.getElementById("canvas")as HTMLCanvasElement;
const app= new Application({
    view:canvas,
    width:innerWidth*0.91,
    height:innerHeight*0.96,
    backgroundColor:0xC1D579,
    sharedTicker:true,
    sharedLoader:true
});
addEventListener('resize',()=>{
    app.view.width=innerWidth*0.91;
    app.view.height=innerHeight*0.96;
    location.reload();
})
const task=new Game(app);
app.ticker.add(task.animate.bind(task));
window.addEventListener('keydown',task.events.bind(task));


