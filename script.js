const board= document.querySelector('.board');
const startButton = document.querySelector('.btn-start');
const modal = document.querySelector('.modal');
const startGameModal = document.querySelector('.start-game');
const gameOverModal = document.querySelector('.game-over');
const restartButton = document.querySelector('.btn-restart');
const highScoreElement = document.querySelector('#high-score');
const scoreElement = document.querySelector('#score');
const blockHeight = 50;
const blockWidth = 50;

let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
let score = 0;

highScoreElement.innerText = highScore;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let intervalId = null;
let food =    {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}

const blocks = []
let snake = [{
    x:1, y:3
}];
let direction = 'down';


// for(let i = 0; i <rows * cols; i++) {
//     const block = document.createElement('div');
//     block.classList.add('block');
//     board.appendChild(block);
// }

for (let row =0 ;  row < rows; row++){
    for (let col = 0; col <cols; col++){
            const block = document.createElement('div');
           block.classList.add('block');
           board.appendChild(block);
           block.innerText = `${row}-${col}`;
           blocks[`${row}-${col}`] = block;
    }
}

function renderSnake(){
    let head = null

    blocks[`${food.x}-${food.y}`].classList.add('food');

    if (direction === "left"){
        head = {x:snake[ 0 ].x, y: snake[ 0 ].y -1};
    } else if (direction === "right"){
        head = {x:snake[ 0 ].x, y: snake[ 0 ].y +1};
    } else if (direction === "up"){
        head = {x:snake[ 0 ].x -1, y: snake[ 0 ].y };
    } else if (direction === "down"){
        head = {x:snake[ 0 ].x +1, y: snake[ 0 ].y };
    }
    
    if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        clearInterval(intervalId)
        modal.style.display = 'flex';
        gameOverModal.style.display = 'flex';
        startGameModal.style.display = 'none';
       return;
    }

    if(head.x === food.x && head.y === food.y){
        blocks[`${food.x}-${food.y}`].classList.remove('food');
        food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}
        snake.unshift(head);

        score += 10;
        scoreElement.innerText = score;
        if(score > highScore){
            highScore = score;
            localStorage.setItem('highScore', highScore.toString());
        }
    }

    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
    })
    snake.unshift(head);
    snake.pop();


    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.add('fill');
    })
}

// intervalId = setInterval(() =>{
//     renderSnake();
// }, 500);

startButton.addEventListener('click', () =>{
    modal.style.display = 'none';
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() =>{
        renderSnake();
    }, 400);
})

restartButton.addEventListener('click', restartGame);

function restartGame(){
    const foodBlock = blocks[`${food.x}-${food.y}`];
    if (foodBlock) foodBlock.classList.remove('food');
    snake.forEach(segment =>{
        const b = blocks[`${segment.x}-${segment.y}`];
        if (b) b.classList.remove('fill');
    })
    score = 0;
    scoreElement.innerText = score;
    highScoreElement.innerText = highScore;

    modal.style.display = 'none';
    gameOverModal.style.display = 'none';
    startGameModal.style.display = 'none';
    snake = [{x:1, y:3}];
    food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() =>{
        renderSnake();
    }, 400);
}

addEventListener('keydown', e =>{
    if (e.key === "ArrowLeft"){
        direction = "left";
    } else if (e.key === "ArrowRight"){
        direction = "right";
    } else if (e.key === "ArrowUp"){
        direction = "up";
    } else if (e.key === "ArrowDown"){
        direction = "down";
    }
})