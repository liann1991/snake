<?php

$servername = "servernaam";
$database = "databasenaam";
$username = "gebruikersnaam";
$password = "wachtwoord";


// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


$result_beginner = mysqli_query($conn,"SELECT * FROM snake_beginner ORDER BY score DESC LIMIT 5");

echo "<table>
<h5>Beginners</h5>
<tr>
<th>Naam</th>
<th>Score</th>
</tr>";

while($row = mysqli_fetch_array($result_beginner))
{
    echo "<tr>";
    echo "<td>" . strtolower($row['name']) . "</td>";
    echo "<td>" . $row['score'] . "</td>";
    echo "</tr>";
}
echo "</table>";

$result_pro = mysqli_query($conn,"SELECT * FROM snake_pro ORDER BY score DESC LIMIT 5");


echo "<table>
<h5>Pro's</h5>
<tr>
<th>Naam</th>
<th>Score</th>
</tr>";

while($row = mysqli_fetch_array($result_pro))
{
    echo "<tr>";
    echo "<td>" . strtolower($row['name']) . "</td>";
    echo "<td>" . $row['score'] . "</td>";
    echo "</tr>";
}
echo "</table>";

$highscore_pro = mysqli_query($conn,"SELECT * FROM snake_pro ORDER BY score DESC LIMIT 1");
$highscore_beginner = mysqli_query($conn,"SELECT * FROM snake_beginner ORDER BY score DESC LIMIT 1");
$highest_score_pro = mysqli_fetch_array($highscore_pro);
$highest_score_beginner = mysqli_fetch_array($highscore_beginner);


echo "<div id='highscore-beginner'>";
echo  $highest_score_beginner['score'];
echo "</div>";
echo "<div id='highscore-pro'>";
echo  $highest_score_pro['score'] ;
echo "</div>";


mysqli_close($conn);//Make sure to close out the database connection
