// https://source.unsplash.com/random/800x600

const body = document.querySelector("body");
const IMG_NUMBER = 3; // total number of images

function handleImgLoad(){
    console.log("finish image loading")
}

function paintImage(imgNumber){
    const image = new Image();
    image.src = '/images/${imgNumber + 1}.jpg';
    image.src = "https://source.unsplash.com/random/";
    
    image.classList.add('bgImage');
    body.appendChild(image);
}

function genRandom(){
    return Math.floor(Math.random() * IMG_NUMBER);
}

function init(){
    const randNum = genRandom();
    paintImage(randNum);
}

init();