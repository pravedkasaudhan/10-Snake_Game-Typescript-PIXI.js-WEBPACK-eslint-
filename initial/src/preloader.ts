import { Loader } from "pixi.js";
import { loadtexture } from "./texture";


export function preloader(list:any,xyz:()=>void):Loader{
    const loader=Loader.shared;
    if(list.baseurl){
        loader.baseUrl=list.baseurl;
    }
   
    (list.data).forEach((ele:{key:string,img:string})=>{
        // console.log(ele);
        loader.add(ele.key,ele.img);
    })
    loader.load();
    loader.onProgress.add(load_inProgress);
    loader.onComplete.add(()=>{loadComplete(loader,xyz)});
    console.log(loader);
    return loader;
}
let dd:HTMLDivElement=document.getElementById('loader')as HTMLDivElement;
let bar:HTMLDivElement
function load_inProgress(e:any){
if(bar==undefined){
    bar=document.createElement("div");
    bar.id="loaderBar";
    bar.style.height='10px';
    bar.style.backgroundColor='green';
}

    console.log(e.progress,"% loaded");
    bar.style.width=`${e.progress}%`;
   dd.append(bar);
}
function loadComplete(l:Loader,xyz:()=>void):any{
console.log("loader",l.resources);
console.log("texture",loadtexture(l.resources));
xyz();
}
