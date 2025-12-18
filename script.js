const board= document.querySelector('.board');
const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

const blocks = []
const snake = [{
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
    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.add('fill');
    })
}

setInterval(() =>{
    let head = null
    if (direction === "left"){
        head = {x:snake[ 0 ].x, y: snake[ 0 ].y -1};
    } else if (direction === "right"){
        head = {x:snake[ 0 ].x, y: snake[ 0 ].y +1};
    } else if (direction === "up"){
        head = {x:snake[ 0 ].x -1, y: snake[ 0 ].y };
    } else if (direction === "down"){
        head = {x:snake[ 0 ].x +1, y: snake[ 0 ].y };
    }
    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
    })
    snake.unshift(head);
    snake.pop();
    renderSnake();

}, 500);

addEventListener('keydown', e =>{
    if (e.key === "Arrowleft"){
        direction = "left";
    } else if (e.key === "ArrowRight"){
        direction = "right";
    } else if (e.key === "ArrowUp"){
        direction = "up";
    } else if (e.key === "ArrowDown"){
        direction = "down";
    }
})