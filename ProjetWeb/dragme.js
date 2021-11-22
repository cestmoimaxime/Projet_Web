'use strict';

const $draggable = document.getElementById("draggable");

let startX;
let startY;
let variationX;
let variationY;
let moveX = 0;
let moveY = 0;

function moveDiv(event) {
    let currentX = event.clientX;
    let currrentY = event.clientY;
    let deltaX = currentX - startX;
    let deltaY = currrentY - startY;

    variationX = moveX + deltaX;
    variationY = moveY + deltaY;
    $draggable.style.transform = 'translate( ' + variationX + 'px,' + variationY + 'px)';
}

$draggable.addEventListener("mousedown", function(event) {
    startX = event.clientX;
    startY = event.clientY;
    event.target.addEventListener('mousemove', moveDiv);
});


$draggable.addEventListener('mouseup', function(event) {
    moveX = variationX;
    moveY = variationY;
    event.target.removeEventListener('mousemove', moveDiv);
})
