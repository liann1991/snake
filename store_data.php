<?php

$level = $_POST['level-div'];
$name = $_POST['form-name'];
$total_score_beginner = $_POST['total-score-beginner'];
$total_score_pro = $_POST['total-score-pro'];
$servername = "rdbms.strato.de";
$database = "dbs4273916";
$username = "dbu1530745";
$password = "Lianne1991!";

if ($_SERVER["REQUEST_METHOD"] == "POST" && $level == 'beginner') {
    // collect value of input field
// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "INSERT INTO `snake_beginner` (`name`, `score`) VALUES ('$name', '$total_score_beginner')";
if (!mysqli_query($conn, $sql))  {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
mysqli_close($conn);
} elseif ($_SERVER["REQUEST_METHOD"] == "POST" && $level == 'pro') {
    // collect value of input field
// Create connection
    $conn = mysqli_connect($servername, $username, $password, $database);
// Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "INSERT INTO `snake_pro` (`name`, `score`) VALUES ('$name', '$total_score_pro')";
    if (!mysqli_query($conn, $sql))  {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
} else{
    echo "Sorry, er klopt even iets niet.";
}

if (isset($_POST['submit']))
{
    ?>
    <script type="text/javascript">
        alert("Je score is succesvol opgeslagen. Bedankt voor het spelen!");
        window.location = "index.php";
    </script>
    <?php
}



