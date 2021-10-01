$(document).ready(function() {
    $(".gameOver").hide();
    $(".hidden").hide();
    $(".hidden_txt").hide();
    scrollTo(0,0)
});

const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
]

let score = 0;
let changing_direction = false;
let food_x;
let food_y;
let dx = 10;
let dy = 0;
let game_over = false;

const game_board = document.getElementById("gameBoard");
const snakeboard_context = game_board.getContext("2d");
//wil je spelen?
function showGame(element) {
    if ($(element).hasClass('btn_yes')) {
        $(".hidden").show();
        level();
        $(".btn_yes", ".btn_no").hide();}
         else {
            $(".hidden_txt").show();
        }
    }
//beginner of pro?
    function level(element){
        if ($(element).hasClass('btn_beginner')) {
            startSnakeSlow();
            gen_food();
        } else if ($(element).hasClass('btn_pro')) {
            startSnakeFast();
            gen_food();
        }
    }

    document.addEventListener("keydown", change_direction);


// start snake voor beginner
    function startSnakeSlow() {
        if (has_game_ended()) return;
        changing_direction = false;
        setTimeout(function onTick() {
            clearBoard();
            drawFood();
            move_snake();
            drawSnake();
            // Repeat
            startSnakeSlow();
        }, 160)
    }
// start snake voor pro
    function startSnakeFast() {
        if (has_game_ended()) return;
        changing_direction = false;
        setTimeout(function onTick() {
            clearBoard();
            drawFood();
            move_snake();
            drawSnake();
            // Repeat
            startSnakeFast();
        }, 100)
    }



// border om de canvas
    function clearBoard() {
        snakeboard_context.fillStyle = board_background;
        snakeboard_context.strokestyle = board_border;
        snakeboard_context.fillRect(0, 0, game_board.width, game_board.height);
        snakeboard_context.strokeRect(0, 0, game_board.width, game_board.height);
    }

// Draw the snake on the canvas
    function drawSnake() {
        // Draw each part
        snake.forEach(drawSnakePart);
    }

    function drawFood() {
        snakeboard_context.fillStyle = 'lightgreen';
        snakeboard_context.strokestyle = 'darkgreen';
        snakeboard_context.beginPath();
        snakeboard_context.arc(food_x, food_y, 5, 0, 2 * Math.PI);
        snakeboard_context.lineWidth = 2;
        snakeboard_context.stroke();
        snakeboard_context.fill();
    }

// Maak slang
    function drawSnakePart(snakePart) {
        snakeboard_context.fillStyle = snake_col;
        snakeboard_context.strokestyle = snake_border;
        snakeboard_context.beginPath();
        snakeboard_context.arc(snakePart.x, snakePart.y, 5, 0, 2 * Math.PI);
        snakeboard_context.lineWidth = 1;
        snakeboard_context.stroke();
        snakeboard_context.fill();
    }



//Game over?
function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        const has_hit = (snake[i].x === snake[0].x && snake[i].y === snake[0].y);
        if (has_hit === true){
            game_over = true;
            gameOver();
            return true;
        }
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > game_board.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > game_board.height - 10;
    if (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall){
        game_over = true;
        gameOver();
    }
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function gameOver(){
        if (game_over){
            $(".gameOver").show();
        }
}


//Maak eten
    function random_food(min, max) {
        return Math.round((Math.random() * (max - min) + min) / 10) * 10;
    }

    function gen_food() {
        // Generate a random number the food x-coordinate
        food_x = random_food(0, game_board.width - 20);
        // Generate a random number for the food y-coordinate
        food_y = random_food(0, game_board.height - 20);
        // if the new food location is where the snake currently is, generate a new food location
        snake.forEach(function has_snake_eaten_food(part) {
            const has_eaten = part.x === food_x && part.y === food_y;
            if (has_eaten) gen_food();
        });
    }

    function change_direction(event) {
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;

        // Kan niet terug

        if (changing_direction) return;
        changing_direction = true;
        const keyPressed = event.keyCode;
        const goingUp = dy === -10;
        const goingDown = dy === 10;
        const goingRight = dx === 10;
        const goingLeft = dx === -10;
        if (keyPressed === LEFT_KEY && !goingRight) {
            dx = -10;
            dy = 0;
        }
        if (keyPressed === UP_KEY && !goingDown) {
            dx = 0;
            dy = -10;
        }
        if (keyPressed === RIGHT_KEY && !goingLeft) {
            dx = 10;
            dy = 0;
        }
        if (keyPressed === DOWN_KEY && !goingUp) {
            dx = 0;
            dy = 10;
        }
    }

    function move_snake() {
        // Create the new Snake's head
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        // Add the new head to the beginning of snake body
        snake.unshift(head);
        const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
        if (has_eaten_food) {
            // Increase score
            score += 10;
            // Display score on screen
            document.getElementById('score').innerHTML = score;
            // Generate new food location
            gen_food();
        } else {
            // Remove the last part of snake body
            snake.pop();
        }
}
    