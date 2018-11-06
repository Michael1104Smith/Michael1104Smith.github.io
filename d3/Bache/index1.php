<?php

$url = 'https://docs.google.com/spreadsheets/d/1qnx-J0Vu8WTudlTa3HJrpRzM44S7VqDl4W3LjAXkcyA/edit#gid=0';
$file= file_get_contents($url);
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
		if(strlen($tds->item(1)->nodeValue) > 0){
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
?>
<!DOCTYPE html>
<meta charset="utf-8">
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/jquery-ui.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">
<html>
<body>
	<div class="container">
		<div class="panel first-panel">
			<label>APPOINTMENTS</label>
			<select id="Appointments-Select">
				<option selected value="0">This Week</option>
				<option value="1">This Month</option>
				<option value="2">Custom</option>
			</select>
			<div class="gauge gauge1" id="Appointments_House"></div>
			<div class="gauge gauge2" id="Appointments_Phone"></div>
		</div>
		<div class="panel first-panel marginLeft30">
			<label>PHONE vs IN HOUSE</label>
			<select id="PvH-Select">
				<option selected value="0">This Week</option>
				<option value="1">This Month</option>
				<option value="2">Custom</option>
			</select>
			<div id="PvH"></div>
		</div>
		<div class="panel first-panel marginLeft30">
			<label>CLOSED RATIO</label>
			<select id="Closed-Ratio-Select">
				<option selected value="0">This Week</option>
				<option value="1">This Month</option>
				<option value="2">Custom</option>
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
				<option value="2">Custom</option>
			</select>
			<div id="Revenue" class="barchart"></div>
		</div>
		<div class="panel second-panel marginLeft30">
			<label>QUOTED: <span class="total-val" id="QuotedTotal">$32156 </span>Total</label>
			<select id="Quoted-Select">
				<option selected value="0">This Week</option>
				<option value="1">This Month</option>
				<option value="2">Custom</option>
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
				<option value="2">Custom</option>
			</select>
			<div id="RQ" class="barchart"></div>
		</div>
		<div class="panel first-panel marginLeft30">
			<label>LISTED APPOINTMENTS</label>
			<select id="List-Select">
				<option selected value="0">This Week</option>
				<option value="1">This Month</option>
				<option value="2">Custom</option>
			</select>
			<div id="List"></div>
		</div>
	</div>
</body>

<script type="text/javascript">
	var ImportData = [], today;
	var MonthCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var thisWeekFirstDay, thisWeekLastDay, thisMonthFirstDay, ThisMonthLastDay;
	var WeekMaxHouseValue = 10, MonthMaxHouseValue = 40;
	var WeekMaxPhoneValue = 20, MonthMaxPhoneValue = 80;
	var selDate, selMonth, selYear;
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
<script src="js/script.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	var colors = ['#ff6893', '#735ac5']
	today = new Date();
	var first = today.getDate() - today.getDay();
	var last = first + 6;
	thisWeekFirstDay = getFromDate(new Date(today.setDate(first)));
	thisWeekLastDay = getFromDate(new Date(today.setDate(last)));
	thisMonthFirstDay = getFromDate(new Date(today.getFullYear(), today.getMonth(), 1));
	ThisMonthLastDay = getFromDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));

	$('#appointments-datepicker').datepicker();
	$( "#datepicker" ).datepicker();
	selDate = today.getDate(), selMonth = today.getMonth()+1, selYear = today.getFullYear();
	$('#datepicker').val(selMonth+"/"+selDate+"/"+selYear);
    $('#datepicker').on('change', function(){
    	var selVal = $(this).val();
    	createDayChart(selVal);
    })
    $('#Appointments-Select').on('change', function(){
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
    	}
		drawGauge('Appointments_House', "IN HOUSE", WeekMaxHouseValue, AppointmentsHouse,'#735ac5');
		drawGauge('Appointments_Phone', "PHONE", WeekMaxPhoneValue, AppointmentsPhone,'#ff6893');
    });
    $('#PvH-Select').on('change', function(){
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
    	}
		drawDonut('PvH', 'APPOINTMENTS TOTAL',[['In House', AppointmentsHouse], ['Phone', AppointmentsPhone]]);
    });
    $('#Closed-Ratio-Select').on('change', function(){
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
    	}
		drawGauge('Closed_Ratio_House', "IN HOUSE", AppointmentsHouse, AppointmentsDateHouse,'#979797');
		drawGauge('Closed_Ratio_Phone', "PHONE", AppointmentsPhone, AppointmentsDatePhone,'#ff6893');
    });
    $('#Revenue-Select').on('change', function(){
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
    	}
		drawBarChart('Revenue', TotalRevenueCategories, TotalRevenueValues, '', '');
    });
    $('#Quoted-Select').on('change', function(){
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
    	}
		drawBarChart('Quoted', TotalRevenueCategories, TotalRevenueValues, '', '');
    });
    $('#RQ-Select').on('change', function(){
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
    	}
		createChart('RQ', seriesOptions);
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
		ImportData = dt;
		ImportData.sort(compare);
		//getAllData(thisWeekFirstDay, thisWeekLastDay);
		getAllData(ImportData[0].Date_of_Appointment, ImportData[ImportData.length-1].Date_of_Appointment);
		drawGauge('Appointments_House', "IN HOUSE", WeekMaxHouseValue, AppointmentsHouse,'#735ac5');
		drawGauge('Appointments_Phone', "PHONE", WeekMaxPhoneValue, AppointmentsPhone,'#ff6893');
		drawDonut('PvH', 'APPOINTMENTS TOTAL',[['In House', AppointmentsHouse], ['Phone', AppointmentsPhone]],'#DF5353');
		drawGauge('Closed_Ratio_House', "IN HOUSE", AppointmentsHouse, AppointmentsDateHouse,'#979797');
		drawGauge('Closed_Ratio_Phone', "PHONE", AppointmentsPhone, AppointmentsDatePhone,'#ff6893');
		drawBarChart('Revenue', TotalRevenueCategories, TotalRevenueValues, '', '');
		drawBarChart('Quoted', TotalQuotedCategories, TotalQuotedValues, '', '');
		createChart('RQ', seriesOptions);
		createTable('List', CustomerName, CustomerDate);
});
</script>
</html>