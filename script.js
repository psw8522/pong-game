// pong-game JavaScript Logic

// Constants
const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
const playerSpeed = 4;
const aiSpeed = 4;

// Variables
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let aiPaddleY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

let playerScore = 0;
let aiScore = 0;

// Draw paddle
function drawPaddle(x, y) {
    context.fillStyle = 'white';
    context.fillRect(x, y, paddleWidth, paddleHeight);
}

// Draw ball
function drawBall(x, y) {
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(x, y, ballSize, 0, Math.PI * 2, true);
    context.fill();
}

// Display scores
function displayScore() {
    context.fillStyle = 'white';
    context.font = '32px Arial';
    context.fillText(playerScore, canvas.width / 4, 30);
    context.fillText(aiScore, 3 * canvas.width / 4, 30);
}

// Update frame
function update() {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom
    if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - ballSize < paddleWidth && ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX + ballSize > canvas.width - paddleWidth && ballY > aiPaddleY && ballY < aiPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Scoring
    if (ballX + ballSize > canvas.width) {
        playerScore++;
        resetBall();
    } else if (ballX - ballSize < 0) {
        aiScore++;
        resetBall();
    }

    // AI movement
    if (ballY > aiPaddleY + paddleHeight / 2) {
        aiPaddleY += aiSpeed;
    } else {
        aiPaddleY -= aiSpeed;
    }
    aiPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, aiPaddleY));
}

// Reset ball
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

// Game loop
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    update();
    drawPaddle(0, playerPaddleY);
    drawPaddle(canvas.width - paddleWidth, aiPaddleY);
    drawBall(ballX, ballY);
    displayScore();
    requestAnimationFrame(gameLoop);
}

// Key event listeners
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        playerPaddleY -= playerSpeed;
    } else if (event.key === 'ArrowDown') {
        playerPaddleY += playerSpeed;
    }
});

// Start game
requestAnimationFrame(gameLoop);
