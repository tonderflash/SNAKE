const gameArea = document.getElementById("gameArea");
const context = gameArea.getContext("2d");
const size = 20;
const gameAreaSize = gameArea.width;
let snake = [
  { x: 160, y: 160 },
  { x: 140, y: 160 },
  { x: 120, y: 160 },
];
let direction = "RIGHT";
let food = { x: 80, y: 80 };

document
  .getElementById("up")
  .addEventListener("click", () => setDirection("UP"));
document
  .getElementById("down")
  .addEventListener("click", () => setDirection("DOWN"));
document
  .getElementById("left")
  .addEventListener("click", () => setDirection("LEFT"));
document
  .getElementById("right")
  .addEventListener("click", () => setDirection("RIGHT"));

function setDirection(newDirection) {
  const oppositeDirections = {
    UP: "DOWN",
    DOWN: "UP",
    LEFT: "RIGHT",
    RIGHT: "LEFT",
  };
  if (direction !== oppositeDirections[newDirection]) {
    direction = newDirection;
  }
}

function drawPart(snakePart) {
  context.fillStyle = "lightgreen";
  context.strokeStyle = "darkgreen";
  context.fillRect(snakePart.x, snakePart.y, size, size);
  context.strokeRect(snakePart.x, snakePart.y, size, size);
}

function drawSnake() {
  snake.forEach(drawPart);
}

function moveSnake() {
  const head = { x: snake[0].x, y: snake[0].y };

  switch (direction) {
    case "RIGHT":
      head.x += size;
      break;
    case "LEFT":
      head.x -= size;
      break;
    case "UP":
      head.y -= size;
      break;
    case "DOWN":
      head.y += size;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    generateFood();
  } else {
    snake.pop();
  }

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= gameAreaSize ||
    head.y >= gameAreaSize
  ) {
    resetGame();
  }
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, size, size);
}

function generateFood() {
  food.x = Math.floor(Math.random() * (gameAreaSize / size)) * size;
  food.y = Math.floor(Math.random() * (gameAreaSize / size)) * size;
}

function clearCanvas() {
  context.fillStyle = "white";
  context.fillRect(0, 0, gameArea.width, gameArea.height);
}

function resetGame() {
  snake = [
    { x: 160, y: 160 },
    { x: 140, y: 160 },
    { x: 120, y: 160 },
  ];
  direction = "RIGHT";
}

function gameLoop() {
  clearCanvas();
  drawFood();
  moveSnake();
  drawSnake();
}

setInterval(gameLoop, 100);
