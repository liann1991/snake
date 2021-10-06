<!DOCTYPE html>
<html lang="nl">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <link rel="shortcut icon" type="image/jpg" href="img/favicon_snake.ico"/>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
</head>
<body>
<header>
    <audio loop id="music">
        <source src="snd/annoying_song.mp3" type="audio/mpeg"></audio>
    <div>
        <button class="btn btn-dark mute-btn" onclick="document.getElementById('music').muted=!document.getElementById('music').muted">&#128263</button>
    </div>
<h1>Snake!</h1>
    <!--regels voor het spel.-->
    <div class="rules">
    <div class="tooltip-rules">&#9432;
        <span class="tooltip-text">Gebruik de pijltjestoetsen om de slang te laten eten. <br>Kom je tegen de wanden of tegen jezelf aan?<br>
        Jammer, dan heb je verloren. Gelukkig kun je het gewoon nog een keer proberen.<br> Succes!</span>
    </div>
    <div id="rules-mobile">
        <button id="info-rules" class="info-rules btn btn-dark" onclick="showRulesMobile()">regels</button></div>
         <div id="info-rules-text" class="info-rules-text">
          <p>Gebruik de knoppen op het scherm om de slang te laten eten.<br> Kom je tegen de wanden of tegen jezelf aan?<br>
            Dan heb je verloren. Succes!</p>
         </div>
    </div>
</header>

<div id="content">
    <div id="game-begin">
        <!--Ben je er klaar voor?-->
        <div class="ready">
            <div id="play-again" class="play-again">
                <h1>Play Again</h1>
                <p>Je score is succesvol opgeslagen. Wil je nog een keer spelen?</p>
            </div>
            <div id="play-first-time">
                <h1>Ben je klaar om Snake te spelen?</h1>
            </div>
            <div id="buttons-play" class="buttons">
                <button class="btn btn-dark btn-yes" onclick="showGame(this)">Ja!</button>
                <button class="btn btn-dark btn-no" onclick="showGame(this)">Nee!</button>
                <div class="btn-no-clicked hidden-text"><h2>Kun je niet tegen je verlies?</h2></div>
            </div>
        </div>
            <!--Welk level?-->
            <div id="level" class="hide-level">
                <h1>Ben je een beginner of een pro?</h1>
                <div id="buttons-level" class="buttons">
                    <button class="btn btn-dark btn-beginner" onclick="level(this)">Ik ben een beginner</button>
                    <button class="btn btn-dark btn-pro" onclick="level(this)">Ik ben een pro</button>
                </div>
            </div>
        <!--Wat zijn de highscores?-->
        <div id="highscores">
            <div id="scores">
                <p>Uw score is:</p>
                <div id="score">0</div>
                <h1>Highscores</h1>
                <?php include 'highscores.php';?>
            </div>
        </div>
    </div>

    <div id="game" class="hide-game">
        <!--Hier wordt het spel in getekend-->
        <canvas id="game-board">Sorry, helaas lijkt het niet te werken in je huidige browser.</canvas>
        <!--Wanneer er op een toets wordt gedrukt, begint het spel-->
        <div id="start-div" class="first-start-info"><p>Druk op een toets om te beginnen</p>
        </div>
        <div id="start-div-mobile" class="first-start-info"><p>Druk op start om te beginnen</p>
        </div>
        <!--De knoppen voor de mobiele browser-->
        <div class="grid-container">
            <button id="button-start" class="grid-item button-start btn btn-dark" onclick="firstStartMobile(this)">START</button>
            <button id="button-up" class="button-up grid-item btn btn-dark" onclick="change_direction_mobile(this)">up</button>
            <button class="btn-empty grid-item"></button>
            <button id="button-left" class="button-left grid-item btn btn-dark" onclick="change_direction_mobile(this)">left</button>
            <button id="button-down" class="button-down grid-item btn btn-dark" onclick="change_direction_mobile(this)">down</button>
            <button id="button-right" class="button-right grid-item btn btn-dark" onclick="change_direction_mobile(this)">right</button>
        </div>
    </div>
    <!--Game over, en formulier om je score op te kunnen slaan.-->
    <div class="game-over">
        <audio id="music-game-over" src="snd/game_over.mp3"></audio>
        <button id="music-button-game-over" hidden>Play</button>
        <img src="img/game_over.png" alt="game_over"/>
        <div id="game-over-text"></div>
        <form id="save-score" method="post" action="store_data.php">
            <input type="text" maxlength="15" id="form-name" name="form-name" value="" required>
            <label for="form-name"></label>
            <input type="hidden" id="level-div" name="level-div" value="">
            <input type="hidden" id="total-score-beginner" name="total-score-beginner" value="">
            <input type="hidden" id="total-score-pro" name="total-score-pro" value="">
            <input type="submit" id="submit" name="submit" value="Submit">
        </form>
    </div>
</div>

<footer>Lianne strik, <?php echo date("Y"); ?></footer>
</body>
<script type="text/javascript" src="node_modules/jquery/dist/jquery.js"></script>
<script type="text/javascript" src="js/script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js" integrity="sha384-skAcpIdS7UcVUC05LJ9Dxay8AXcDYfBJqt1CJ85S/CFujBsIzCIv+l9liuYLaMQ/" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>
</html>