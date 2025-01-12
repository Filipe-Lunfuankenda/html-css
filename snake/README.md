# Snake Game

Este projeto é uma implementação do clássico jogo da cobrinha utilizando HTML5, CSS e JavaScript.

## Estrutura do Projeto

O projeto é composto por três arquivos principais:
- `index.html`: Contém a estrutura HTML do jogo.
- `snake.css`: Contém os estilos CSS para a aparência do jogo.
- `snake.js`: Contém a lógica do jogo em JavaScript.

## index.html

Este arquivo define a estrutura básica da página web. Ele inclui um elemento `<canvas>` onde o jogo será desenhado, botões para controlar o jogo e um elemento `<p>` para exibir a pontuação.

```html
<!-- ...existing code... -->
<canvas id="gameCanvas" width="900" height="500"></canvas>
<!-- ...existing code... -->
```

## snake.css

Este arquivo define os estilos para a página do jogo. Ele centraliza o conteúdo na tela, estiliza o canvas e os botões, e define um fundo gradiente.

```css
/* ...existing code... */
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background: linear-gradient(to bottom, #f0f0f0, #4CAF50, #4d101f);
    font-family: Arial, sans-serif;
    color: white;
    font-weight: bold;
}
/* ...existing code... */
```

## snake.js

Este arquivo contém toda a lógica do jogo. Abaixo está uma explicação detalhada das principais partes do código:

### Inicialização

Obtém o elemento canvas e o contexto 2D, define o tamanho das células e a grade, e inicializa as variáveis do jogo.

```javascript
// ...existing code...
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const CELL_SIZE = 20;
const GRID_SIZE = 20;
const GRID_HEIGHT = canvas.height / CELL_SIZE;
// ...existing code...
```

### Direções

Define as direções possíveis para a cobra.

```javascript
// ...existing code...
const UP = { x: 0, y: -1 };
const DOWN = { x: 0, y: 1 };
const LEFT = { x: -1, y: 0 };
const RIGHT = { x: 1, y: 0 };
// ...existing code...
```

### Estado do Jogo

Inicializa a cobra, direção, comida, pontuação e estado do jogo.

```javascript
// ...existing code...
let snake = [{ x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 }];
let direction = UP;
let food = { x: 10, y: 10 };
let score = 0;
let gameStarted = false;
let gamePaused = false;
// ...existing code...
```

### Controle do Jogo

Adiciona event listeners para os botões de iniciar, pausar, retomar e reiniciar o jogo, além de capturar as teclas de direção.

```javascript
// ...existing code...
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('restartButton').addEventListener('click', resetGame);
document.getElementById('pauseButton').addEventListener('click', pauseGame);
document.getElementById('resumeButton').addEventListener('click', resumeGame);
document.addEventListener('keydown', changeDirection);
// ...existing code...
```

### Funções do Jogo

Define as funções principais do jogo, incluindo iniciar, reiniciar, pausar, retomar, mudar direção, mover a cobra, verificar colisões, crescer a cobra, posicionar comida e desenhar o jogo.

```javascript
// ...existing code...
function startGame() {
    gameStarted = true;
    resetGame();
    gameLoop();
}

function resetGame() {
    snake = [{ x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 }];
    direction = UP;
    food = { x: 10, y: 10 };
    score = 0;
    document.getElementById('score').innerText = `Score: ${score}`;
}

function pauseGame() {
    gamePaused = true;
}

function resumeGame() {
    if (gamePaused) {
        gamePaused = false;
        gameLoop();
    }
}

function changeDirection(event) {
    if (!gameStarted) return;
    const key = event.key;
    if (key === 'ArrowUp' && direction !== DOWN) direction = UP;
    if (key === 'ArrowDown' && direction !== UP) direction = DOWN;
    if (key === 'ArrowLeft' && direction !== RIGHT) direction = LEFT;
    if (key === 'ArrowRight' && direction !== LEFT) direction = RIGHT;
}

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

function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);
    snake.pop();
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_HEIGHT) return true;
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) return true;
    }
    return false;
}

function checkFoodCollision() {
    return snake[0].x === food.x && snake[0].y === food.y;
}

function growSnake() {
    const tail = snake[snake.length - 1];
    snake.push({ x: tail.x, y: tail.y });
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
    };
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}
// ...existing code...
```

## Como Jogar

1. Abra o arquivo `index.html` em um navegador web.
2. Clique no botão "Start" para iniciar o jogo.
3. Use as setas do teclado para mover a cobra.
4. Clique em "Pause" para pausar o jogo e "Resume" para retomar.
5. Clique em "Restart" para reiniciar o jogo a qualquer momento.

## Conclusão

Este projeto demonstra como criar um jogo simples utilizando HTML5, CSS e JavaScript. Ele cobre conceitos importantes como manipulação de canvas, controle de eventos e lógica de jogo.
