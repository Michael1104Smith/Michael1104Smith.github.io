<?php

$Opportunity_Number = array();
$Customer_Name = array();
$Date_of_Appointment = array();
$Quoted = array();
$Phone_Appointment = array();
$In_Home_Appointment = array();
$Date_Sold = array();
$Revenue = array();

$spreadsheet_url="https://docs.google.com/spreadsheet/pub?key=1qnx-J0Vu8WTudlTa3HJrpRzM44S7VqDl4W3LjAXkcyA&single=true&gid=0&output=csv";
$ind = 0;

if(!ini_set('default_socket_timeout', 15)) echo "<!-- unable to change socket timeout -->";

if (($handle = fopen($spreadsheet_url, "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        if($ind > 0){
			array_push($Opportunity_Number, str_replace("'","\'", $data[0]));
			array_push($Customer_Name, str_replace("'","\'", $data[1]));
			array_push($Date_of_Appointment, str_replace("'","\'", $data[2]));
			array_push($Quoted, str_replace("'","\'", $data[3]));
			array_push($Phone_Appointment, str_replace("'","\'", $data[4]));
			array_push($In_Home_Appointment, str_replace("'","\'", $data[5]));
			array_push($Date_Sold, str_replace("'","\'",$data[6]));
			array_push($Revenue, str_replace("'","\'", $data[7]));
        }
		$ind ++;
    }
    fclose($handle);
}
else
    die("Problem reading csv");
echo "<pre>";
print_r($Date_Sold);
echo "</pre>";
?>