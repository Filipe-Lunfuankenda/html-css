// Obtém o elemento canvas e o contexto 2D
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const CELL_SIZE = 20;
const GRID_SIZE = 20; // Revertido para 20
const GRID_HEIGHT = canvas.height / CELL_SIZE; // Adiciona a altura da grade
const UP = { x: 0, y: -1 };
const DOWN = { x: 0, y: 1 };
const LEFT = { x: -1, y: 0 };
const RIGHT = { x: 1, y: 0 };

// Inicializa a cobra, direção, comida, pontuação e estado do jogo
let snake = [{ x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 }];
let direction = UP;
let food = { x: 10, y: 10 };
let score = 0;
let gameStarted = false;
let gamePaused = false;

// Adiciona event listeners para os botões de iniciar e reiniciar, e para as teclas de direção
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('restartButton').addEventListener('click', resetGame);
document.getElementById('pauseButton').addEventListener('click', pauseGame);
document.getElementById('resumeButton').addEventListener('click', resumeGame);
document.addEventListener('keydown', changeDirection);

// Função para iniciar o jogo
function startGame() {
    gameStarted = true;
    resetGame();
    gameLoop();
}

// Função para reiniciar o jogo
function resetGame() {
    snake = [{ x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 }];
    direction = UP;
    food = { x: 10, y: 10 };
    score = 0;
    document.getElementById('score').innerText = `Score: ${score}`;
}

// Função para pausar o jogo
function pauseGame() {
    gamePaused = true;
}

// Função para retomar o jogo
function resumeGame() {
    if (gamePaused) {
        gamePaused = false;
        gameLoop();
    }
}

// Função para mudar a direção da cobra com base na tecla pressionada
function changeDirection(event) {
    if (!gameStarted) return;
    const key = event.key;
    if (key === 'ArrowUp' && direction !== DOWN) direction = UP;
    if (key === 'ArrowDown' && direction !== UP) direction = DOWN;
    if (key === 'ArrowLeft' && direction !== RIGHT) direction = LEFT;
    if (key === 'ArrowRight' && direction !== LEFT) direction = RIGHT;
}

// Função principal do loop do jogo
function gameLoop() {
    if (!gameStarted || gamePaused) return;
    setTimeout(() => {
        moveSnake();
        if (checkCollision()) {
            alert('Game Over');
            gameStarted = false;
            return;
        }
        if (checkFoodCollision()) {
            growSnake();
            placeFood();
            score++;
            document.getElementById('score').innerText = `Score: ${score}`;
        }
        drawGame();
        gameLoop();
    }, 200);
}

// Função para mover a cobra
function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);
    snake.pop();
}

// Função para verificar colisões com as bordas ou com o próprio corpo
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_HEIGHT) return true; // Ajusta a verificação de colisão
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) return true;
    }
    return false;
}

// Função para verificar colisão com a comida
function checkFoodCollision() {
    return snake[0].x === food.x && snake[0].y === food.y;
}

// Função para fazer a cobra crescer
function growSnake() {
    const tail = snake[snake.length - 1];
    snake.push({ x: tail.x, y: tail.y });
}

// Função para posicionar a comida em um local aleatório
function placeFood() {
    food = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
    };
}

// Função para desenhar o jogo
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}
