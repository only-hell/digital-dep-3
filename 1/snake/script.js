const boardSize = 10;
const gameBoard = document.getElementById('game-board');
const cells = [];
const scoreElement = document.getElementById('score');
const speedInput = document.getElementById('speed-control');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const joystickButtons = document.querySelectorAll('.joystick button');

let snake = [{ x: 0, y: 0 }];
let food = { x: 5, y: 5 };
let direction = 'right';
let speed = 800;
let paused = false;
let gameLoopId;

function initializeGameBoard() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cells.push(cell);
      gameBoard.appendChild(cell);
    }
  }
}

function render() {
  cells.forEach((cell) => cell.classList.remove('snake', 'food'));

  snake.forEach((segment) => {
    const index = segment.x + segment.y * boardSize;
    cells[index].classList.add('snake');
  });

  const foodIndex = food.x + food.y * boardSize;
  cells[foodIndex].classList.add('food');
}

function update() {
  if (paused) return;

  const head = { ...snake[0] };

  switch (direction) {
    case 'up':
      head.y -= 1;
      break;
    case 'down':
      head.y += 1;
      break;
    case 'left':
      head.x -= 1;
      break;
    case 'right':
      head.x += 1;
      break;
  }

  if (
    head.x < 0 ||
    head.x >= boardSize ||
    head.y < 0 ||
    head.y >= boardSize ||
    isCollisionWithSelf(head)
  ) {
    resetGame();
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    snake.unshift(head);
    generateFood();
  } else {
    snake.pop();
    snake.unshift(head);
  }
}

function isCollisionWithSelf(head) {
  return snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y);
}

function generateFood() {
  do {
    food = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  } while (snake.some((s) => s.x === food.x && s.y === food.y));
}

function resetGame() {
  snake = [{ x: 0, y: 0 }];
  direction = 'right';
  paused = false;
  pauseButton.textContent = 'Пауза';
  generateFood();
  updateScore(snake.length);
}

function gameLoop() {
  update();
  render();
  updateScore(snake.length);
  clearTimeout(gameLoopId);
  gameLoopId = setTimeout(gameLoop, speed);
}

function updateScore(score) {
  scoreElement.textContent = `Очки: ${score}`;
}

// Слушатели клавиш
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();

  if (key === 'arrowup') direction = 'up';
  if (key === 'arrowdown') direction = 'down';
  if (key === 'arrowleft') direction = 'left';
  if (key === 'arrowright') direction = 'right';
  if (key === 'r') resetGame();
  if (key === 'p') togglePause();
});

// Кнопки джойстика
joystickButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    direction = btn.getAttribute('data-dir');
  });
});

// Кнопка паузы
pauseButton.addEventListener('click', togglePause);

function togglePause() {
  paused = !paused;
  pauseButton.textContent = paused ? 'Продолжить' : 'Пауза';
}

// Изменение скорости
speedInput.addEventListener('change', () => {
  const value = parseInt(speedInput.value, 10);
  if (!isNaN(value) && value > 0) {
    speed = value;
  }
});

// Кнопка сброса
resetButton.addEventListener('click', resetGame);

initializeGameBoard();
generateFood();
gameLoop();
