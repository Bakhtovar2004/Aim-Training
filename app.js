const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;
let screenIndex = 0;
let intervalId;
const colors = ['#e74c3c', '#8e44ad', '#1f9aed', '#e89143', '#48f08f'];

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    up()
})

timeList.addEventListener('click', (e) => {
if(e.target.classList.contains('time-btn')){
    time = parseInt(e.target.getAttribute('data-time'))
    up()
    startGame()
}
})

board.addEventListener('click', (e) => {
    if(e.target.classList.contains('circle')){
        score++;
        e.target.remove();
        createRandomCircle();
    }else if(e.target.classList.contains('restart')){
        restart();
    }
})

function startGame(){
   intervalId = setInterval(decreaseTime, 1000)
    createRandomCircle()
    timeEl.parentNode.classList.remove('hide');
    setTime(time)
}

function decreaseTime(){
if(time === 0){
    finishGame()
}else{
    let current = --time;
    if(current < 10){
        current = `0${current}`;
    }
    setTime(current)
}
}

function setTime(value){
    timeEl.innerHTML = `00:${value}`;
}

function finishGame(){
timeEl.parentNode.classList.add('hide');
board.innerHTML = `<h1>Счёт: <span class = 'primary'>${score}</span></h1> </br> <img class = 'restart' src="https://iconsplace.com/wp-content/uploads/_icons/40e0d0/256/png/restart-icon-17-256.png" width="50" alt="">`;
board.style.flexDirection = 'column';
clearInterval(intervalId)
}

function createRandomCircle(){
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color = getRandomColor();
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = color;
    board.append(circle);
}

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor(){
    return colors[Math.floor(Math.random()*colors.length)];
}

function restart(){
score = 0;
board.innerHTML = '';
up()
}

function up(){
if(screenIndex === 2){
    screenIndex = 0;
    screens.forEach(el =>{
        el.classList.remove('up')
    })
}
    screens[screenIndex].classList.add('up')
    screenIndex++;
}