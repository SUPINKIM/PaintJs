'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const fill = document.getElementById('JsMode');
const colors = document.getElementsByClassName('jsColor');
const range = document.querySelector('#JsRange');
const saveBnt = document.getElementById('JsSave');

//canvas의 css 크기와 별도로 canvas.width와 height를 js에서 지정해주어야 한다.
const CanvasW_H = 600;

canvas.width = CanvasW_H;
canvas.height = CanvasW_H;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CanvasW_H, CanvasW_H);

const initalColor = '#151515';
ctx.strokeStyle = initalColor;
ctx.fillStyle = initalColor;

ctx.lineWidth = 3;

let painting = false;
let f_ill = false;

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function stopPainting(event) {
  painting = false;
}

function onMouseDown(event) {
  painting = true;
}

//fill <-> paint

function clickFill() {
  if (!f_ill) {
    f_ill = true;
    fill.innerText = 'Paint';
  } else {
    f_ill = false;
    fill.innerText = 'Fill';
  }
}
function changeBgColor(event) {
  if (f_ill) {
    ctx.fillRect(0, 0, CanvasW_H, CanvasW_H);
  }
}
fill.addEventListener('click', clickFill, false);

//펜 색 변경하기
function changeColor(color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function onHandleClick(event) {
  const bgcolor = event.target.style.backgroundColor;
  changeColor(bgcolor);
}

Array.from(colors).forEach((color) =>
  color.addEventListener('click', onHandleClick, false)
);

//브러시 크기 변경하기

function changeLineWidth(width) {
  ctx.lineWidth = width;
}

function onHandleUp(event) {
  //console.log(event.target.value);
  const width = event.target.value;
  changeLineWidth(width);
}
range.addEventListener('mouseup', onHandleUp, false);

function onHandleCM(event) {
  event.preventDefault();
}
//save image
function saveImg(event) {
  const img = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = img;
  link.download = 'SavingImg!🎨';
  link.click();
}

saveBnt.addEventListener('click', saveImg, false);

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove, false);
  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', stopPainting, false);
  canvas.addEventListener('mouseleave', stopPainting, false);
  canvas.addEventListener('click', changeBgColor, false);
  canvas.addEventListener('contextmenu', onHandleCM, false);
}
