$(document).ready(function() {
    $(".gameOver").hide();
    $(".playAgain").hide();
    //$(".hideGame").hide();
    $(".hideLevel").hide();
    $(".hidden_txt").hide();
    scrollTo(0,0)
});

const board_border = 'black';
const board_background = '#6c757d';
const snake_col = 'mediumPurple';
const snake_border = 'purple';

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
//let game_over_sound = new Audio('snd/game_over.mp3');
//let game_over_sound = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');


const game_board = document.getElementById("gameBoard");
const game_board_context = game_board.getContext("2d");
const heightRatio = 1;
game_board.height = game_board.width * heightRatio;
//wil je spelen?
function showGame(element) {
    if ($(element).hasClass('btn_yes')) {
        $(".hideLevel").show();
        level();
        $(".ready").hide();}
         else if ($(element).hasClass('btn_no')) {
            $(".hidden_txt").show();
        }
    }

document.addEventListener("keydown", change_direction);
document.addEventListener("click", change_direction);

//beginner of pro?
    function level(element){
        if ($(element).hasClass('btn_beginner')) {
            $(".hideLevel").hide();
            $(".hideGame").show();
            startSnakeSlow();
            gen_food();
        } else if ($(element).hasClass('btn_pro')) {
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
            move_snake();
            drawSnake();
            startSnakeFast();
        }, 100)
    }

    function clearBoard() {
        game_board_context.fillStyle = board_background;
        game_board_context.strokestyle = board_border;
        game_board_context.fillRect(0, 0, game_board.width, game_board.height);
        game_board_context.strokeRect(0, 0, game_board.width, game_board.height);
    }

    function drawSnake() {
        snake.forEach(makeSnakePart);
    }

    function makeFood() {
        game_board_context.fillStyle = 'lightgreen';
        game_board_context.strokestyle = 'darkgreen';
        game_board_context.fillRect(food_x, food_y, 10, 10);
        game_board_context.strokeRect(food_x, food_y, 10, 10);
    }

    function makeSnakePart(snakePart) {
        game_board_context.fillStyle = snake_col;
        game_board_context.strokestyle = snake_border;
        game_board_context.fillRect(snakePart.x, snakePart.y, 10, 10);
        game_board_context.strokeRect(snakePart.x, snakePart.y, 10, 10);
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
            $(".gameOver").show(900);
            //game_over_sound.play();
            $(".hideGame").hide(900);
            document.getElementById('totalScore').value = score;
            return document.querySelector('#music').play();
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
    function change_direction(event, element) {
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;

        if (changing_direction) return;
        changing_direction = true;
        const keyPressed = event.keyCode;
        const goingUp = dy === -10;
        const goingDown = dy === 10;
        const goingRight = dx === 10;
        const goingLeft = dx === -10;
        if (keyPressed === LEFT_KEY || $(element).hasClass('button_left') && !goingRight) {
            dx = -10;
            dy = 0;
        }
        if (keyPressed === UP_KEY || $(element).hasClass('button_up') && !goingDown) {
            dx = 0;
            dy = -10;
        }
        if (keyPressed === RIGHT_KEY || $(element).hasClass('button_right') && !goingLeft) {
            dx = 10;
            dy = 0;
        }
        if (keyPressed === DOWN_KEY || $(element).hasClass('button_down') && !goingUp) {
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
    