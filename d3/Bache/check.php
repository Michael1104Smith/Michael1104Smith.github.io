<?php
	$users = ["Richmond", "Grand Rapids", "North Carolina", "Tennessee", "KC South", "New York/Hartford"
				, "Minnesota", "Dayton", "Cincy", "Indiana"];
	$password = "password";
	$gids = ["0", "731426214", "2047740919", "612201275", "1375422765", "158610077"
				, "2071545650", "348908009", "1453096161", "1814075551"];
	$user = $_POST["user"];
	$pass = $_POST["pass"];
	$mode = 0;
	for($i = 0; $i < count($users); $i++){
		if(strcmp($user, $users[$i]) == 0){
			break;
		}
	}
	if($i == count($users)){
		echo 'Wrong Username';
		exit;
	}
	if($pass != $password){
		echo 'Wrong Password';
		exit;
	}
	echo $gids[$i];	
?>