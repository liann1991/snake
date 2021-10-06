$(document).ready(function() {
    $(".game-over").hide();
    $(".play-again").hide();
    $(".hide-game").hide();
    $(".hide-level").hide();
    $(".rules").show();
    $(".first-start-info").hide();
    $(".hidden-text").hide();
    $(".info-rules-text").hide();
});

const board_background = 'rgba(123,126,133,0.8)';
const snake_border = 'white';
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
let timeOutFast = 100;
let timeOutSlow = 200;
const game_board = document.getElementById("game-board");
const game_board_context = game_board.getContext("2d");
const heightRatio = 1;
game_board.height = game_board.width * heightRatio;

//positie van de slang
let snake = [
    {x: 60, y: 200},
    {x: 50, y: 200},
    {x: 40, y: 200},
    {x: 30, y: 200},
    {x: 20, y: 200}
]

function showRulesMobile() {
    let x = document.getElementById("info-rules-text");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

//wil je spelen? Ja/Nee
function showGame(element) {
    if ($(element).hasClass('btn-yes')) {
        $(".hide-level").show();
        level();
        document.querySelector("#music").play();
        $(".ready").hide();
    }   else if ($(element).hasClass('btn-no')) {
            $(".hidden-text").show();
        }
    }

//Welke level?
    function level(element){
        if ($(element).hasClass('btn-beginner')) {
            player_level = "beginner";
            $(".rules").hide();
            $(".hide-level").hide();
            $(".hide-game").show();
            startSnake();
            gen_food();
        } else if ($(element).hasClass('btn-pro')) {
            player_level = "pro";
            $(".rules").hide();
            $(".hide-level").hide();
            $(".hide-game").show();
            startSnake();
            gen_food();
        }
    }

    //Start het spel
function startSnake(){
    $(".first-start-info").show();
    if (has_game_ended()) return;
    changing_direction = false;
    switch (player_level){
        case "beginner":
            setTimeout(function onTick() {
                clearBoard();
                makeFood();
                firstStartBrowser();
                firstStartMobile();
                move_snake();
                drawSnake();
                // Repeat
                startSnake();
                }, timeOutSlow);
            break;
            case "pro":
                setTimeout(function onTick() {
                    clearBoard();
                    makeFood();
                    firstStartBrowser();
                    firstStartMobile();
                    move_snake();
                    drawSnake();
                    startSnake();
                }, timeOutFast);
                break;
            default:
                setTimeout(function onTick() {
                    clearBoard();
                    makeFood();
                    firstStartBrowser();
                    firstStartMobile();
                    move_snake();
                    drawSnake();
                    startSnake();
                }, 100);
        }
    }

    //Start het spel? Op een knop op het toetsenbord drukken voor de slang beweegt.
document.addEventListener('keydown', firstStartBrowser);
function firstStartBrowser(KeyboardEvent) {
    if (!has_started) {
        move_snake();
        drawSnake();
        if (KeyboardEvent.code!== null) {
            has_started = true;
            $(".first-start-info").hide();
            startSnake();
        } else {
            startSnake();
        }
    }
}

//Start het spel? Op een knop op het scherm drukken voor de slang beweegt.
document.addEventListener("click", firstStartMobile);
function firstStartMobile(element) {
    if (!has_started) {
        $(".first-start-info").show();
        move_snake();
        drawSnake();
        if ($(element).hasClass('button-start')) {
            has_started = true;
            startSnake();
        } else {
            startSnake();
        }
    }
}

    // maak het bord leeg
function clearBoard() {
    game_board_context.fillStyle = board_background;
    game_board_context.fillRect(0, 0, game_board.width, game_board.height);
    }
    // teken de slang
function drawSnake() {
    snake.forEach(makeSnakePart);
    }

    // zoek afbeeldingen voor de slang
const img2 = new Image();
img2.src = 'img/snake_skin.jpg';
const img3 = new Image();
img3.src = 'img/snake_head.png';
// teken de slang
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
// zoek afbeelding voor het eten
const img = new Image();
img.src = 'img/fire.png';
// maak het eten
function makeFood() {
    img.onload = game_board_context.fillStyle = game_board_context.createPattern(img, 'repeat');
    game_board_context.fillRect(food_x, food_y, 10, 10);
}
// zet het eten random ergens neer
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

// zorg dat de slang van richting kan veranderen met de knoppen op het toetsenbord
document.addEventListener("keydown", change_direction);
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
// zorg dat de slang van richting kan veranderen met de knoppen op het scherm
document.addEventListener("click", change_direction_mobile);
function change_direction_mobile(element) {
    if (changing_direction) return;
    changing_direction = true;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if ($(element).hasClass('button-left') && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if ($(element).hasClass('button-up') && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if ($(element).hasClass('button-right') && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if ($(element).hasClass('button-down') && !goingUp) {
        dx = 0;
        dy = 10;
    }
}
// bereken de score, lengte van de slang en de snelheid.
function move_snake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
        score += 10;
        setTimeOut();
        document.getElementById('score').innerHTML = score;
        gen_food();
    } else {
        snake.pop();
    }
}

// sneller wanneer score hoger is
function setTimeOut(){
    if (score <= 300){
    timeOutFast -= 2;
    timeOutSlow -= 5;
    }
}

//Tegen zichzelf of tegen een wand aan? Game over
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
// game over. slag score op bij het goede level en speel mp3 af.
function gameOver(){
    gameOverText();
    if (game_over){
        $(".game-over").show(900);
        $(".hide-game").hide(900);
        game_over = true;
        document.getElementById('level-div').value = player_level;
        if (player_level === 'beginner'){
            document.getElementById('total-score-beginner').value = score;
        } else if (player_level === 'pro'){
            document.getElementById('total-score-pro').value = score;
        }
        document.querySelector('#music').pause();
        return document.querySelector('#music-game-over').play();
    }
}

let game_over_text = $('#game-over-text');
let data_highscore_1= document.getElementById("highscore-beginner");
let highest_score_beginner = data_highscore_1.innerHTML;
let data_highscore_2= document.getElementById("highscore-pro");
let highest_score_pro = data_highscore_2.innerHTML;

function gameOverText(){
    if (player_level === "beginner" && score > highest_score_beginner){
        game_over_text.html("Gefeliciteerd, je hebt de nieuwe highscore! Vul je naam in om je score op te slaan.");
    } else if (player_level === "pro" && score > highest_score_pro){
        game_over_text.html("Gefeliciteerd, je hebt de nieuwe highscore! Vul je naam in om je score op te slaan.");
    } else if (score < 100 && score > 0) {
        game_over_text.html('Kom op! Je kan toch zeker wel beter dan dit? Vul je naam in om je score op te slaan.');
    } else if (score < 200 && score > 90){
            game_over_text.html("Bijna 200 punten. Dit kan beter. Probeer je het nog eens? Vul je naam in om je score op te slaan.");
    } else if (score < 300 && score > 190){
            game_over_text.html("Bijna 300 punten! Dit gaat de goede kant op! Vul je naam in om je score op te slaan.");
    } else if (score < 400 && score > 290){
            game_over_text.html("Bijna 400 punten! Goed gedaan! Vul je naam in om je score op te slaan.");
    }  else {
        game_over_text.html("Helaas, je bent af. Volgende keer beter. Vul je naam in om je score op te slaan.");
    }
}

function playAgain(){
    $(".play-again").show();
    $(".play-first-time").hide();
}
    