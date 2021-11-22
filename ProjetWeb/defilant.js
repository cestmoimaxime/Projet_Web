'use strict';

const banniere = document.getElementById('banniere');
let texte = banniere.firstElementChild;
let tailleTexte = banniere.scrollWidth;

let color = 255;

function defile(){
    let pos = texte.style.marginLeft.replace('px','');
    pos -= 1;
    color -= 1;
    if (color < 0){
        color = 255;
    } 
    if(pos < -tailleTexte){
        pos = 200;
    }
    let inverseColor = 255 - color;
    texte.style.marginLeft = pos+"px";
    texte.style.color = "rgb(" + color + "," + color + "," + color + ")" 
    texte.style.backgroundColor = "rgb(" + inverseColor + "," + inverseColor + "," + inverseColor + ")" 
    requestAnimationFrame(defile);
}

defile();