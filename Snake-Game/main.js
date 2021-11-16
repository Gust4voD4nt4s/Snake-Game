let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let iniciar = 1;
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let snakex = snake[0].x;
let snakey = snake[0].y;

let direction;

let food = {
    x: Math.floor(Math.random() * 16) * box,
    y: Math.floor(Math.random() * 16) * box
};

let cont = 0;
let record = 0;

document.addEventListener('keydown', movimentacao);

function criarCaixa() {
    context.fillStyle = "rgba(200, 255, 255, 0.7)";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green"
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function criarComida() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function movimentacao(event) {
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 40 && direction != "down") direction = "up";
    if (event.keyCode == 38 && direction != "up") direction = "down";
}

function reset() {
    alert("Game Over");
    if (cont > record) {
        record = 0;
        record += cont;
        document.getElementById('armazen').innerHTML = "Record: " + record;
    }
    snake.length = 1;
    snakex = 8 * box;
    snakey = 8 * box;
    cont = 0;
    document.getElementById('contador').innerHTML = "Score: " + cont;
    direction = "";
}

function main() {
    criarCaixa();
    criarCobrinha();
    criarComida();

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            reset();
        }
    }

    if (direction == "right") snakex += box;
    if (direction == "left") snakex -= box;
    if (direction == "up") snakey += box;
    if (direction == "down") snakey -= box;

    if (snakex > 15 * box && direction == "right") snakex = 0;
    if (snakex < 0 && direction == "left") snakex = 15 * box;
    if (snakey > 15 * box && direction == "up") snakey = 0;
    if (snakey < 0 && direction == "down") snakey = 15 * box;

    let head = { x: snakex, y: snakey };
    snake.unshift(head);
    if (snake[0].x != food.x || snake[0].y != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 16) * box,
            food.y = Math.floor(Math.random() * 16) * box
        document.getElementById('contador').innerHTML = "Score: " + ++cont;
    }
}

function iniciarGame() {
    document.getElementById('snake').style.cssText = "border: 1px solid black;";
    if (iniciar == 1) {
        iniciar = 2;
        setInterval(main, 100);
    }else {
        reset();
    }
}