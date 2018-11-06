<?php

$url = 'https://docs.google.com/spreadsheets/d/1qnx-J0Vu8WTudlTa3HJrpRzM44S7VqDl4W3LjAXkcyA/edit#gid=0';
$file= file_get_contents($url);
echo $file;exit;
$dom = new domDocument;
@$dom->loadHTML($file);
$dom->preserveWhiteSpace = false;
$finder = new DomXPath($dom);
$classname="waffle";
$table = $finder->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $classname ')]");
$xpath = new DOMXpath($dom);
$temp_dom = new DOMDocument();
foreach($table as $n) {
	$temp_dom->appendChild($temp_dom->importNode($n,true));
}
$trs = $temp_dom->getElementsByTagName('tr');
$Opportunity_Number = array();
$Customer_Name = array();
$Date_of_Appointment = array();
$Quoted = array();
$Phone_Appointment = array();
$In_Home_Appointment = array();
$Date_Sold = array();
$Revenue = array();
$cnt = 0;
foreach($trs as $tr){
	if($cnt > 1){
		$tds = $tr->getElementsByTagName('td');
		//if(strlen($tds->item(1)->nodeValue) > 0)
		{
			array_push($Opportunity_Number, str_replace("'","\'", $tds->item(0)->nodeValue));
			array_push($Customer_Name, str_replace("'","\'", $tds->item(1)->nodeValue));
			array_push($Date_of_Appointment, str_replace("'","\'", $tds->item(2)->nodeValue));
			array_push($Quoted, str_replace("'","\'", $tds->item(3)->nodeValue));
			array_push($Phone_Appointment, str_replace("'","\'", $tds->item(4)->nodeValue));
			array_push($In_Home_Appointment, str_replace("'","\'", $tds->item(5)->nodeValue));
			array_push($Date_Sold, str_replace("'","\'", $tds->item(6)->nodeValue));
			array_push($Revenue, str_replace("'","\'", $tds->item(7)->nodeValue));
		}
	}
	$cnt++;
}
echo "<pre>";
print_r($Date_of_Appointment);
echo "</pre>";
exit;
?>
<!DOCTYPE html>
<meta charset="utf-8">
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/jquery-ui.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">
<html>
<body>
	<div class="wrapper" id="wrapper-appointments">
	   <div id="jrange-appointments" class="dates">
	    <input />
	    <div></div>
	   </div>
	</div>
	<div class="wrapper" id="wrapper-pvh">
	   <div id="jrange-pvh" class="dates">
	    <input />
	    <div></div>
	   </div>
	</div>
	<div class="wrapper" id="wrapper-cr">
	   <div id="jrange-cr" class="dates">
	    <input />
	    <div></div>
	   </div>
	</div>
	<div class="wrapper" id="wrapper-revenue">
	   <div id="jrange-revenue" class="dates">
	    <input />
	    <div></div>
	   </div>
	</div>
	<div class="wrapper" id="wrapper-quoted">
	   <div id="jrange-quoted" class="dates">
	    <input />
	    <div></div>
	   </div>
	</div>
	<div class="wrapper" id="wrapper-rvq">
	   <div id="jrange-rvq" class="dates">
	    <input />
	    <div></div>
	   </div>
	</div>
	<div class="wrapper" id="wrapper-list">
	   <div id="jrange-list" class="dates">
	    <input />
	    <div></div>
	   </div>
	</div>
	<div class="container">
		<div class="panel first-panel">
			<label>APPOINTMENTS</label>
			<select id="Appointments-Select">
				<option selected value="0">This Week</option>
				<option value="1">This Month</option>
				<option value="2">Custom Range</option>
			</select>
			<div class="gauge gauge1" id="Appointments_House"></div>
			<div class="gauge gauge2" id="Appointments_Phone"></div>
		</div>
		<div class="panel first-panel marginLeft30">
			<label>PHONE vs IN HOUSE</label>
			<select id="PvH-Select">
				<option selected value="0">This Week</option>
				<option value="1">This Month</option>
				<option value="2">Custom Range</option>
			</select>
			<div id="PvH"></div>
		</div>
		<div class="panel first-panel marginLeft30">
			<label>CLOSED RATIO</label>
			<select id="Closed-Ratio-Select">
				<option selected value="0">This Week</option>
				<option value="1">This Month</option>
				<option value="2">Custom Range</option>
			</select>
			<div class="gauge gauge1" id="Closed_Ratio_House"></div>
			<div class="gauge gauge2" id="Closed_Ratio_Phone"></div>
		</div>
	</div>
	<div class="container">
		<div class="panel second-panel">
			<label>REVENUE: <span class="total-val" id="RevenueTotal">$32156 </span>Total</label>
			<select id="Revenue-Select">
				<option selected value="0">This Week</option>
				<option value="1">This Month</option>
				<option value="2">Custom Range</option>
			</select>
			<div id="Revenue" class="barchart"></div>
		</div>
		<div class="panel second-panel marginLeft30">
			<label>QUOTED: <span class="total-val" id="QuotedTotal">$32156 </span>Total</label>
			<select id="Quoted-Select">
				<option selected value="0">This Week</option>
				<option value="1">This Month</option>
				<option value="2">Custom Range</option>
			</select>
			<div id="Quoted" class="barchart"></div>
		</div>
	</div>
	<div class="container">
		<div class="panel third-panel">
			<label>REVENUE vs. QUOTED</label>
			<select id="RQ-Select">
				<option selected value="0">This Week</option>
				<option value="1">This Month</option>
				<option value="2">Custom Range</option>
			</select>
			<div id="RQ" class="barchart"></div>
		</div>
		<div class="panel first-panel marginLeft30">
			<label>LISTED APPOINTMENTS</label>
			<select id="List-Select">
				<option selected value="0">This Week</option>
				<option value="1">This Month</option>
				<option value="2">Custom Range</option>
			</select>
			<div id="List"></div>
		</div>
	</div>
</body>

<script type="text/javascript">
	var ImportData = [], today;
	var RangeMode = 0;
	var Colors = ['#ff6893', '#735ac5', '#2c92eb', '#7c92a7', '#3bdbd0'];
	var MonthCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var thisWeekFirstDay, thisWeekLastDay, thisMonthFirstDay, ThisMonthLastDay;
	var WeekMaxHouseValue = 10, MonthMaxHouseValue = 40;
	var WeekMaxPhoneValue = 20, MonthMaxPhoneValue = 80;
	var AppointmentsHouse = 0, AppointmentsPhone = 0;
	var AppointmentsDateHouse = 0, AppointmentsDatePhone = 0;
	var TotalRevenueValues = [], TotalRevenueCategories = [];
	var TotalQuotedValues = [], TotalQuotedCategories = [];
	var seriesOptions = [], xAxisCategories = [];
	var CustomerName = [], CustomerDate = [];
</script>
<script src="js/jquery.js"></script>
<script src="js/jquery-ui.js"></script>
<script src="js/highstock.js"></script>
<script src="js/highcharts-more.js"></script>
<script src="js/solid-gauge.js"></script>
<script src="js/d3.v4.js"></script>
<script src="js/customrange.js"></script>
<script src="js/script.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	today = new Date();
	var first = today.getDate() - today.getDay();
	var last = first + 6;
	thisWeekFirstDay = getFromDate(new Date(today.setDate(first)));
	thisWeekLastDay = getFromDate(new Date(today.setDate(last)));
	thisMonthFirstDay = getFromDate(new Date(today.getFullYear(), today.getMonth(), 1));
	ThisMonthLastDay = getFromDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
    $('#Appointments-Select').on('change', function(){
    	$('#wrapper-appointments').hide();
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
			drawGauge('Appointments_House', "IN HOUSE", WeekMaxHouseValue, AppointmentsHouse,'#735ac5');
			drawGauge('Appointments_Phone', "PHONE", WeekMaxPhoneValue, AppointmentsPhone,'#ff6893');
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
			drawGauge('Appointments_House', "IN HOUSE", MonthMaxHouseValue, AppointmentsHouse,'#735ac5');
			drawGauge('Appointments_Phone', "PHONE", MonthMaxPhoneValue, AppointmentsPhone,'#ff6893');
    	}else{
    		$('#wrapper-appointments').show();
    		$('#wrapper-appointments').css('left', ($(this).offset().left+$(this).width()-200)+'px');
    		$('#wrapper-appointments').css('top', ($(this).offset().top+$(this).height()+10)+'px');
    	}
    });
    $('#PvH-Select').on('change', function(){
    	$('#wrapper-pvh').hide();
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
			drawDonut('PvH', 'APPOINTMENTS TOTAL',[['In House', AppointmentsHouse], ['Phone', AppointmentsPhone]]);
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
			drawDonut('PvH', 'APPOINTMENTS TOTAL',[['In House', AppointmentsHouse], ['Phone', AppointmentsPhone]]);
    	}else{
    		$('#wrapper-pvh').show();
    		$('#wrapper-pvh').css('left', ($(this).offset().left+$(this).width()-200)+'px');
    		$('#wrapper-pvh').css('top', ($(this).offset().top+$(this).height()+10)+'px');
    	}
    });
    $('#Closed-Ratio-Select').on('change', function(){
    	$('#wrapper-cr').hide();
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
			drawGauge('Closed_Ratio_House', "IN HOUSE", AppointmentsHouse, AppointmentsDateHouse,'#979797');
			drawGauge('Closed_Ratio_Phone', "PHONE", AppointmentsPhone, AppointmentsDatePhone,'#ff6893');
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
			drawGauge('Closed_Ratio_House', "IN HOUSE", AppointmentsHouse, AppointmentsDateHouse,'#979797');
			drawGauge('Closed_Ratio_Phone', "PHONE", AppointmentsPhone, AppointmentsDatePhone,'#ff6893');
    	}else{
    		$('#wrapper-cr').show();
    		$('#wrapper-cr').css('left', ($(this).offset().left+$(this).width()-200)+'px');
    		$('#wrapper-cr').css('top', ($(this).offset().top+$(this).height()+10)+'px');
    	}
    });
    $('#Revenue-Select').on('change', function(){
    	$('#wrapper-revenue').hide();
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
			drawBarChart('Revenue', TotalRevenueCategories, TotalRevenueValues, '', '', Colors[2]);
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
			drawBarChart('Revenue', TotalRevenueCategories, TotalRevenueValues, '', '', Colors[2]);
    	}else{
    		$('#wrapper-revenue').show();
    		$('#wrapper-revenue').css('left', ($(this).offset().left-$('.dates input').width()-10)+'px');
    		$('#wrapper-revenue').css('top', ($(this).offset().top)+'px');
    	}
    });
    $('#Quoted-Select').on('change', function(){
    	$('#wrapper-quoted').hide();
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
			drawBarChart('Quoted', TotalRevenueCategories, TotalRevenueValues, '', '', Colors[4]);
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
			drawBarChart('Quoted', TotalRevenueCategories, TotalRevenueValues, '', '', Colors[4]);
    	}else{
    		$('#wrapper-quoted').show();
    		$('#wrapper-quoted').css('left', ($(this).offset().left-$('.dates input').width()-10)+'px');
    		$('#wrapper-quoted').css('top', ($(this).offset().top)+'px');
    	}
    });
    $('#RQ-Select').on('change', function(){
    	$('#wrapper-rvq').hide();
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
			createChart('RQ', seriesOptions);
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
			createChart('RQ', seriesOptions);
    	}else{
    		$('#wrapper-rvq').show();
    		console.log($(this).offset().left, $(this).width());
    		$('#wrapper-rvq').css('left', ($(this).offset().left-$('.dates input').width()-10)+'px');
    		$('#wrapper-rvq').css('top', ($(this).offset().top)+'px');
    	}
    });
    $('#List-Select').on('change', function(){
    	$('#wrapper-list').hide();
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
			createTable('List', CustomerName, CustomerDate);
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
			createTable('List', CustomerName, CustomerDate);
    	}else{
    		$('#wrapper-list').show();
    		$('#wrapper-list').css('left', ($(this).offset().left+$(this).width()-200)+'px');
    		$('#wrapper-list').css('top', ($(this).offset().top+$(this).height()+10)+'px');
    	}
    });

	var dt = [];
	<?php
		for($i = 0; $i < count($Opportunity_Number); $i++){
			echo "var tmp={'Opportunity_Number':'".$Opportunity_Number[$i]."',"
							."'Customer_Name':'".$Customer_Name[$i]."',"
							."'Date_of_Appointment':'".$Date_of_Appointment[$i]."',"
							."'Quoted':'".$Quoted[$i]."',"
							."'Phone_Appointment':'".$Phone_Appointment[$i]."',"
							."'In_Home_Appointment':'".$In_Home_Appointment[$i]."',"
							."'Date_Sold':'".$Date_Sold[$i]."',"
							."'Revenue':'".$Revenue[$i]."'};";
			echo "dt.push(tmp);";
		}
	?>
	//d3.csv("data/data3.csv",function(dt)
	{
		ImportData = dt;
		ImportData.sort(compare);
		console.log(ImportData);
		//getAllData(thisWeekFirstDay, thisWeekLastDay);
		getAllData(ImportData[0].Date_of_Appointment, ImportData[ImportData.length-1].Date_of_Appointment);
		drawGauge('Appointments_House', "IN HOUSE", WeekMaxHouseValue, AppointmentsHouse,'#735ac5');
		drawGauge('Appointments_Phone', "PHONE", WeekMaxPhoneValue, AppointmentsPhone,'#ff6893');
		drawDonut('PvH', 'APPOINTMENTS TOTAL',[['In House', AppointmentsHouse], ['Phone', AppointmentsPhone]],'#DF5353');
		drawGauge('Closed_Ratio_House', "IN HOUSE", AppointmentsHouse, AppointmentsDateHouse,'#979797');
		drawGauge('Closed_Ratio_Phone', "PHONE", AppointmentsPhone, AppointmentsDatePhone,'#ff6893');
		drawBarChart('Revenue', TotalRevenueCategories, TotalRevenueValues, '', '', Colors[2]);
		drawBarChart('Quoted', TotalQuotedCategories, TotalQuotedValues, '', '', Colors[4]);
		createChart('RQ', seriesOptions);
		createTable('List', CustomerName, CustomerDate);
	}
	//);
});
</script>
</html>