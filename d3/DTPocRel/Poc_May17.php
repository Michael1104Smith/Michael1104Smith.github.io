<?php require('includes/config.php'); 

//if not logged in redirect to login page
if(!$user->is_logged_in()){ header('Location: login.php'); } 

//define page title
$title = 'Members Page';

//include header template
require('layout/header.php'); 
?>
<?php
  function getDataFromUrl($url){
    $row = 0;
    $dt = array();
    if (($handle = fopen($url, "r")) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            if($row > 0){
                array_push($dt, $data);
            }
            $row++;
        }
        fclose($handle);
    }
    return $dt;
  }
  function setJavascriptValue($data, $var_name){
    for($i = 0; $i < count($data); $i++){
        echo $var_name.'.push([';
        for($j = 0; $j < count($data[$i]); $j++){
          echo '"'.$data[$i][$j].'"';
          if($j == count($data[$i])-1){
              echo ']);';
          }else{
              echo ',';
          }
        }
    }
  }


  //$data1 = getDataFromUrl("data/DBStage02_1.csv");
  $data1 = getDataFromUrl("data/metricsglmsbudget.csv");
  $data2 = getDataFromUrl("data/metricslgmsjitter.csv");
  $data3 = getDataFromUrl("data/metricslgmsbudget.csv");
  $data4 = getDataFromUrl("data/metricsormsbudget.csv");

  //$data2 = getDataFromUrl("data/DBStage02_2.csv");
  //$data3 = getDataFromUrl("data/DBStage02_3.csv");
?>

<div id="container"></div>
<div id="page">
  <div class="header">
    <a href="#menu"><span></span></a>
  </div>
  <nav id="menu">
    <ul>
      <li><a href="#">Home</a></li>
      <li><span>About us</span>
        <ul>
          <li><a href="#about/history">History</a></li>
          <li><span>The team</span>
            <ul>
              <li><a href="#about/team/management">Management</a></li>
              <li><a href="#about/team/sales">Sales</a></li>
              <li><a href="#about/team/development">Development</a></li>
            </ul>
          </li>
          <li><a href="#about/address">Our address</a></li>
        </ul>
      </li>
      <li><a href="#contact">Contact</a></li>
      <li><a class="logout" href="logout.php">Logout</a></li>
    </ul>
  </nav>
</div>
<?php 
//include header template
require('layout/footer.php'); 
?>
