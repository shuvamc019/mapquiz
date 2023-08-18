$scores = json_decode($_POST['scoresJSON'], true); 

$fw = fopen("scores.csv", "w")
fwrite($fw, $scores)
fclose($fw)
