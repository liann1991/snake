$(document).ready(function() {
    $(".gameOver").hide();
    $(".playAgain").hide();
    $(".hideGame").hide();
    $(".hideLevel").hide();
    $(".rules").show();
    $(".firstStartDiv").hide();
    $(".hiddenText").hide();
    scrollTo(0,0)
});

const board_background = 'rgba(123,126,133,0.8)';
const snake_border = 'white';

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
let total_score = score;
let has_started = false;
let player_level = "";


const game_board = document.getElementById("gameBoard");
const game_board_context = game_board.getContext("2d");
const heightRatio = 1;
game_board.height = game_board.width * heightRatio;
//wil je spelen?
function showGame(element) {
    if ($(element).hasClass('btn_yes')) {
        $(".hideLevel").show();
        level();
        $(".ready").hide();
    }   else if ($(element).hasClass('btn_no')) {
            $(".hiddenText").show();
        }
    }

//beginner of pro?
    function level(element){
        if ($(element).hasClass('btn_beginner')) {
            player_level = "beginner";
            $(".rules").hide();
            $(".hideLevel").hide();
            $(".hideGame").show();
            startSnakeSlow();
            gen_food();
        } else if ($(element).hasClass('btn_pro')) {
            player_level = "pro";
            $(".rules").hide();
            $(".hideLevel").hide();
            $(".hideGame").show();
            startSnakeFast();
            gen_food();
        }
    }

// start snake voor beginner
    function startSnakeSlow() {
        if (has_game_ended()) return;
        changing_direction = false;
        setTimeout(function onTick() {
            clearBoard();
            makeFood();
            firstStartSlow();
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
        makeFood();
        firstStartFast();
        move_snake();
        drawSnake();
        startSnakeFast();
    }, 100)
}

window.addEventListener("keydown", firstStartSlow);
window.addEventListener("keydown", firstStartFast);

    function firstStartSlow(KeyboardEvent) {
        if (!has_started) {
            $(".firstStartDiv").show();
            move_snake();
            drawSnake();
            //const keyPressed = event.code;
            if (KeyboardEvent.key) {
                has_started = true;
                startSnakeSlow();
                $(".firstStartDiv").hide();
            } else {
                startSnakeSlow();
            }
        }
    }

function firstStartFast(KeyboardEvent) {
    if (!has_started) {
        $(".firstStartDiv").show();
        move_snake();
        drawSnake();
        //const keyPressed = event.code;
        if (KeyboardEvent.key) {
            has_started = true;
            startSnakeFast();
            $(".first_start").hide();
        } else {
            startSnakeFast();
        }
    }
}


    function clearBoard() {
        game_board_context.fillStyle = board_background;
        game_board_context.fillRect(0, 0, game_board.width, game_board.height);
    }

    function drawSnake() {
        snake.forEach(makeSnakePart);
    }

const img = new Image();
img.src = 'img/deBrand.png';

    function makeFood() {
        img.onload = game_board_context.fillStyle = game_board_context.createPattern(img, 'repeat');
        game_board_context.fillRect(food_x, food_y, 10, 10);
    }

const img2 = new Image();
img2.src = 'img/snake_skin.jpg';
const img3 = new Image();
img3.src = 'img/snake_head.png';

    function makeSnakePart(snakePart) {
        img2.onload = game_board_context.fillStyle = game_board_context.createPattern(img2, 'repeat');
        game_board_context.strokestyle = snake_border;
        game_board_context.fillRect(snakePart.x, snakePart.y, 10, 10);
        game_board_context.strokeRect(snakePart.x, snakePart.y, 10, 10);
        if (snake[0]){
            img3.onload = game_board_context.fillStyle = game_board_context.createPattern(img3, 'repeat');
            game_board_context.fillRect(snake[0].x, snake[0].y, 10, 10);
            game_board_context.strokeRect(snake[0].x, snake[0].y, 10, 10);
        }
    }

    function random_food(min, max) {
        return Math.round((Math.random() * (max - min) + min) / 10) * 10;
    }

    function gen_food() {
        food_x = random_food(0, game_board.width - 10);
        food_y = random_food(0, game_board.height - 10);
        snake.forEach(function has_snake_eaten_food(part) {
            const has_eaten = part.x === food_x && part.y === food_y;
            if (has_eaten) gen_food();
        });
    }

document.addEventListener("keydown", change_direction);
document.addEventListener("click", change_direction);

function change_direction(event) {
    if (changing_direction) return;
    changing_direction = true;
    const keyPressed = event.code;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === 'ArrowLeft' && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === 'ArrowUp' && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === 'ArrowRight' && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === 'ArrowDown' && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

function change_direction_mobile(element) {
    if (changing_direction) return;
    changing_direction = true;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if ($(element).hasClass('button_left') && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if ($(element).hasClass('button_up') && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if ($(element).hasClass('button_right') && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if ($(element).hasClass('button_down') && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

    function move_snake() {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
        if (has_eaten_food) {
            score += 10;
            document.getElementById('score').innerHTML = score;
            gen_food();
        } else {
            snake.pop();
        }
}

//Game over?

function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        const has_hit = (snake[i].x === snake[0].x && snake[i].y === snake[0].y);
        if (has_hit === true){
            gameOver();
            game_over = true;
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
        $(".gameOver").show(900);
        $(".hideGame").hide(900);
        game_over = true;
        document.getElementById('levelDiv').value = player_level;
        if (player_level === 'beginner'){
            document.getElementById('totalScoreBeginner').value = score;
            console.log("beginner");
        } else if (player_level === 'pro'){
            document.getElementById('totalScorePro').value = score;
            console.log("pro");
        }
        return document.querySelector('#music').play();
    }
}
    