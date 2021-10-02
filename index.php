<!DOCTYPE html>
<html lang="nl">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <link href="https://fonts.googleapis.com/css?family=Antic+Slab" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
</head>
<body>
<header>
<h1>Snake!</h1>
</header>
<div id="content">
<div id="gameBegin" class="hidden_start">
    <div class="ready">
    <h1>Ben je klaar om Snake te spelen?</h1>
    <div id="buttons_play" class="buttons">
    <button class="btn btn-dark btn_yes" onclick="showGame(this)">Ja!</button>
    <button class="btn btn-dark btn_no" onclick="showGame(this)">Nee!</button>
    </div>
    </div>
    <div id="level" class="hideLevel">
    <h1>Ben je een beginner of een pro?</h1>
    <div id="buttons_level" class="buttons">
        <button class="btn btn-dark btn_beginner" onclick="level(this)">Ik ben een beginner</button>
        <button class="btn btn-dark btn_pro" onclick="level(this)">Ik ben een pro</button>
    </div>
    </div>

    <div class="btn_no_clicked hidden_txt"><p>Nou, mooi is dat!</p></div>

    <div id="highScores">
        <div id="scores">
            <p>Uw score is:</p>
            <div id="score">0</div>
        <h1>Highscores</h1>
        <?php include 'highscores.php';?>
    </div>
    </div>
</div>
    <div class="gameOver">
        <audio id="music" src="snd/game_over.mp3"></audio>
        <button id="play_game_over" hidden>Play</button>
        <img src="img/game_over.png" alt="game_over"/>
        <p> Jammer, je hebt het niet gehaald. wil je je score opslaan?</p>
        <form id="save_score" method="post" action="store_data.php">
            <input type="text" id="formName" name="formName" value="gast"><br>
            <label for="formName">Naam</label>
            <input type="hidden" id="totalScore" name="totalScore" value=""><br>
            <input type="submit" name="submit" value="Submit">
        </form>
    </div>

<div id="game" class="hideGame">
    <canvas id="gameBoard"></canvas>
    <div class="showMobile"></div>
    <div class="grid-container">
        <button class="btn_empty grid-item"></button>
        <button id="button_up" class="grid-item button_up btn btn-dark" onclick="change_direction_mobile(this)">up</button>
        <button class="btn_empty grid-item"></button>
        <button id="button_left" class="grid-item button_left btn btn-dark" onclick="change_direction_mobile(this)">left</button>
        <button id="button_down" class="grid-item button_down btn btn-dark" onclick="change_direction_mobile(this)">down</button>
        <button id="button_right" class="grid-item button_right btn btn-dark" onclick="change_direction_mobile(this)">right</button>
    </div>
</div>
</div>
<footer><p>Lianne strik, <?php echo date("Y"); ?></p> </footer>
</body>
<script type="text/javascript" src="node_modules/jquery/dist/jquery.js"></script>
<script type="text/javascript" src="js/script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js" integrity="sha384-skAcpIdS7UcVUC05LJ9Dxay8AXcDYfBJqt1CJ85S/CFujBsIzCIv+l9liuYLaMQ/" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>
</html>