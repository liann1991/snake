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
    <div class="rules">
    <div class="tooltip_rules">&#9432;
        <span class="tooltiptext">Gebruik de pijltjestoetsen om de slang te laten eten. <br>Kom je tegen de wanden of tegen jezelf aan?<br>
        Jammer, dan heb je verloren. Gelukkig kun je het gewoon nog een keer proberen.<br> Succes!</span>
    </div>
    <div id="rules_mobile"><p>Gebruik de knoppen op het scherm om de slang te laten eten.<br>  Kom je tegen de wanden of tegen jezelf aan?<br>
            Jammer, dan heb je verloren. Gelukkig kun je het gewoon nog een keer proberen.<br>  Succes!</p></div>
    </div>
</header>

<div id="content">

<div id="gameBegin" class="hidden_start">

    <div class="ready">
    <h1>Ben je klaar om Snake te spelen?</h1>
    <div id="buttons_play" class="buttons">
    <button class="btn btn-dark btn_yes" onclick="showGame(this)">Ja!</button>
    <button class="btn btn-dark btn_no" onclick="showGame(this)">Nee!</button>
        <div class="btn_no_clicked hiddenText"><h2>Kun je niet tegen je verlies?</h2></div>
    </div>
    </div>
    <div id="level" class="hideLevel">
    <h1>Ben je een beginner of een pro?</h1>
    <div id="buttons_level" class="buttons">
        <button class="btn btn-dark btn_beginner" onclick="level(this)">Ik ben een beginner</button>
        <button class="btn btn-dark btn_pro" onclick="level(this)">Ik ben een pro</button>
    </div>
    </div>

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
        <p> Jammer, je hebt het niet gehaald. Vul je naam in en sla je score op.</p>
        <form id="save_score" method="post" action="store_data.php">
            <input type="text" id="formName" name="formName" value="" required><br>
            <label for="formName"></label><br>
            <input type="hidden" id="levelDiv" class="levelDiv" name="levelDiv" value=""><br>
            <input type="hidden" id="totalScoreBeginner" name="totalScoreBeginner" value=""><br>
            <input type="hidden" id="totalScorePro" name="totalScorePro" value=""><br>
            <input type="submit" id="submit" name="submit" value="Submit">
        </form>
    </div>

<div id="game" class="hideGame">
    <canvas id="gameBoard">Sorry, helaas lijkt het niet te werken in je huidige browser.</canvas>
    <div id="firstStart" class="firstStartDiv"><p>Druk op een toets om te beginnen</p></div>
    <div class="showMobile"></div>
    <div class="grid-container">
        <button class="btn_empty grid-item"></button>
        <button id="button_up" class="playBtn grid-item button_up btn btn-dark" onclick="change_direction_mobile(this)">up</button>
        <button class="btn_empty grid-item"></button>
        <button id="button_left" class="playBtn grid-item button_left btn btn-dark" onclick="change_direction_mobile(this)">left</button>
        <button id="button_down" class="playBtn grid-item button_down btn btn-dark" onclick="change_direction_mobile(this)">down</button>
        <button id="button_right" class="playBtn grid-item button_right btn btn-dark" onclick="change_direction_mobile(this)">right</button>
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