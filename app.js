'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

ctx.strokeStyle = '#151515';
ctx.lineWidth = 3;

//canvas의 css 크기와 별도로 canvas.width와 height를 js에서 지정해주어야 한다.
canvas.width = 500;
canvas.height = 500;

let painting = false;

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

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove, false);
  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', stopPainting, false);
  canvas.addEventListener('mouseleave', stopPainting, false);
}

//펜 색 변경하기
const colors = document.getElementsByClassName('jsColor');

function changeColor(color) {
  ctx.strokeStyle = color;
}

function onHandleClick(event) {
  const bgcolor = event.target.style.backgroundColor;
  changeColor(bgcolor);
}

Array.from(colors).forEach((color) =>
  color.addEventListener('click', onHandleClick, false)
);

//브러시 크기 변경하기
const range = document.querySelector('#JsRange');

function changeLineWidth(width) {
  ctx.lineWidth = width;
}

function onHandleUp(event) {
  //console.log(event.target.value);
  const width = event.target.value;
  changeLineWidth(width);
}
range.addEventListener('mouseup', onHandleUp, false);
