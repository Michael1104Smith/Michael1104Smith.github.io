<?php
$username = "Richmond";
if(!isset($_POST['gid'])){
	exit;
}
$gid = $_POST['gid'];
$username = $_POST['username'];
$slackName = "hatchify";
switch($username){
	case "Richmond":
		$slackName = "pellarichmond";
		break;
	case "Minnesota":
		$slackName = "pellamn";
		break;
	case "New York/Hartford":
		$slackName = "pellanyhartford";
		break;
	case "North Carolina":
		$slackName = "pellanc";
		break;
	case "Tennessee":
		$slackName = "pellatn";
		break;
	case "KC South":
		$slackName = "pellakcsouth";
		break;
	case "Cincy":
		$slackName = "pellacincykentucky";
		break;
	case "Grand Rapids":
		$slackName = "pellagrandrapids";
		break;
	case "Dayton":
		$slackName = "pelladayton";
		break;
	case "Indiana":
		$slackName = "pellaindiana";
		break;
}
$Opportunity_Number = array();
$Customer_Name = array();
$Date_of_Appointment = array();
$Quoted = array();
$Phone_Appointment = array();
$In_Home_Appointment = array();
$Date_Sold = array();
$Revenue = array();

$spreadsheet_url="https://docs.google.com/spreadsheet/pub?key=1qnx-J0Vu8WTudlTa3HJrpRzM44S7VqDl4W3LjAXkcyA&single=true&gid=".$gid."&output=csv";
$ind = 0;

if(!ini_set('default_socket_timeout', 15)) echo "<!-- unable to change socket timeout -->";

function setFullYear($date){
	if(strlen($date) < 2) return $date;
	$arr = explode("/", $date);
	$end = count($arr)-1;
	$len = strlen($arr[$end]);
	if($len > 2){
		return $date;
	}
	$arr[$end] = "20".$arr[$end];
	if($end == 2){
		return $arr[0]."/".$arr[1]."/".$arr[2];
	}
	return $arr[0]."/".$arr[1];
}

if (($handle = fopen($spreadsheet_url, "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        if($ind > 0){
			array_push($Opportunity_Number, str_replace("'","\'", $data[0]));
			array_push($Customer_Name, str_replace("'","\'", $data[1]));
			array_push($Date_of_Appointment, setFullYear(str_replace("'","\'", $data[2])));
			array_push($Quoted, str_replace("'","\'", $data[3]));
			array_push($Phone_Appointment, str_replace("'","\'", $data[4]));
			array_push($In_Home_Appointment, str_replace("'","\'", $data[5]));
			array_push($Date_Sold, setFullYear(str_replace("'","\'",$data[6])));
			array_push($Revenue, str_replace("'","\'", $data[7]));
        }
		$ind ++;
    }
    fclose($handle);
}
else
    die("Problem reading csv");
?>
<!DOCTYPE html>
<meta charset="utf-8">
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/jquery-ui.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Raleway" />
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lato" />
<link href="css/style.css" rel="stylesheet">
<html>
<body>
	<div id="header">
		<div id="logo">
			<div id="firstLogo"></div>
			<div id="secondLogo"></div>
		</div>
		<label><?php echo $username; ?></label>
		<div id="slack"></div>
	</div>
	<div class="clearfix"></div>
	<div id="body">
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
				<div class="select-div">
					<select id="Appointments-Select">
						<option selected value="0">This Week</option>
						<option value="1">This Month</option>
						<option value="2">Custom Range</option>
					</select>
				</div>
				<div class="gauge gauge1" id="Appointments_House"></div>
				<div class="divider"></div>
				<div class="gauge gauge2" id="Appointments_Phone"></div>
			</div>
			<div class="panel first-panel marginLeft30">
				<label>PHONE vs IN HOUSE</label>
				<div class="select-div">
					<select id="PvH-Select">
						<option selected value="0">This Week</option>
						<option value="1">This Month</option>
						<option value="2">Custom Range</option>
					</select>
				</div>
				<div id="PvH"></div>
			</div>
			<div class="panel first-panel marginLeft30">
				<label>CLOSED RATIO</label>
				<div class="select-div">
					<select id="Closed-Ratio-Select">
						<option selected value="0">This Week</option>
						<option value="1">This Month</option>
						<option value="2">Custom Range</option>
					</select>
				</div>
				<div class="gauge gauge1" id="Closed_Ratio_House"></div>
				<div class="divider"></div>
				<div class="gauge gauge2" id="Closed_Ratio_Phone"></div>
			</div>
		</div>
		<div class="container">
			<div class="panel second-panel">
				<label>REVENUE: <span class="bartotal"><span class="total-val" id="RevenueTotal">$0 </span>Total</span></label>
				<div class="select-div">
					<select id="Revenue-Select">
						<option selected value="0">This Week</option>
						<option value="1">This Month</option>
						<option value="2">Custom Range</option>
					</select>
				</div>
				<div id="Revenue" class="barchart"></div>
			</div>
			<div class="panel second-panel marginLeft30">
				<label>QUOTED: <span class="bartotal"><span class="total-val" id="QuotedTotal">$0 </span>Total</span></label>
				<div class="select-div">
					<select id="Quoted-Select">
						<option selected value="0">This Week</option>
						<option value="1">This Month</option>
						<option value="2">Custom Range</option>
					</select>
				</div>
				<div id="Quoted" class="barchart"></div>
			</div>
		</div>
		<div class="container">
			<div class="panel third-panel">
				<label>REVENUE vs. QUOTED</label>
				<div class="select-div">
					<select id="RQ-Select">
						<option selected value="0">This Week</option>
						<option value="1">This Month</option>
						<option value="2">Custom Range</option>
					</select>
				</div>
				<div id="RQ" class="barchart"></div>
			</div>
			<div class="panel first-panel marginLeft30">
				<label>LISTED APPOINTMENTS</label>
				<div class="select-div">
					<select id="List-Select">
						<option selected value="0">This Week</option>
						<option value="1">This Month</option>
						<option value="2">Custom Range</option>
					</select>
				</div>
				<div id="List"></div>
			</div>
		</div>
	</div>
</body>

<script type="text/javascript">
	var ImportData = [], today, ImportData1 = [];
	var RangeMode = 0;
	var stopsColors = [
						[[0.1,'#735ac5'], [0.9, '#979797']]
						,[[0.1, '#ff6893'],[0.9, '#ff94ac']]
						,[[0.1, '#f184ff'],[0.5,'#f9baff'], [0.9, '#f184ff']]
						,[[0.1, '#f99f19'],[0.9, '#fbcb46']]
					];
	var donutsColors = ['#735ac5', '#ff6893'];
	var Colors = ['#ff6893', '#735ac5', '#00aae0', '#7c92a7', '#3bdbd0'];
	var MonthCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var thisWeekFirstDay, thisWeekLastDay, thisMonthFirstDay, ThisMonthLastDay;
	var WeekMaxHouseValue = 10, MonthMaxHouseValue = 40;
	var WeekMaxPhoneValue = 20, MonthMaxPhoneValue = 80;
	var AppointmentsHouse = 0, AppointmentsPhone = 0;
	var AppointmentsDateHouse = 0, AppointmentsDatePhone = 0;
	var TotalRevenueValues = [], TotalRevenueCategories = [], CustomerNameRevenue = [], TotalRevenueCustomerValues = [];
	var TotalQuotedValues = [], TotalQuotedCategories = [];
	var seriesOptions = [], xAxisCategories = [];
	var CustomerName = [], CustomerDate = [], CustomerPhoneHome = [];
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
	$('#slack').on('click', function(){
		var url = "https://<?php echo $slackName; ?>.slack.com/messages";
		window.open(url);
	});
	today = new Date();
	var first = today.getDate() - today.getDay();
	var last = first + 6;
	today1 = new Date();
	today2 = new Date();
	thisWeekFirstDay = getFromDate(new Date(today1.setDate(first)));
	thisWeekLastDay = getFromDate(new Date(today2.setDate(last)));
	thisMonthFirstDay = getFromDate(new Date(today.getFullYear(), today.getMonth(), 1));
	ThisMonthLastDay = getFromDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
    $('#Appointments-Select').on('change', function(){
    	$('#wrapper-appointments').hide();
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
			drawGauge('Appointments_House', "IN HOUSE", WeekMaxHouseValue, AppointmentsHouse,stopsColors[0],0);
			drawGauge('Appointments_Phone', "PHONE", WeekMaxPhoneValue, AppointmentsPhone,stopsColors[1],0);
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
			drawGauge('Appointments_House', "IN HOUSE", MonthMaxHouseValue, AppointmentsHouse,stopsColors[0],0);
			drawGauge('Appointments_Phone', "PHONE", MonthMaxPhoneValue, AppointmentsPhone,stopsColors[1],0);
    	}else{
    		//$('#wrapper-appointments .hasDatepicker').show();
			$('#jrange-appointments div').datepicker('refresh').show();
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
			$('#jrange-pvh div').datepicker('refresh').show();
    		$('#wrapper-pvh').css('left', ($(this).offset().left+$(this).width()-200)+'px');
    		$('#wrapper-pvh').css('top', ($(this).offset().top+$(this).height()+10)+'px');
    	}
    });
    $('#Closed-Ratio-Select').on('change', function(){
    	$('#wrapper-cr').hide();
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
			drawGauge('Closed_Ratio_House', "IN HOUSE", AppointmentsHouse, AppointmentsDateHouse,stopsColors[2],1);
			drawGauge('Closed_Ratio_Phone', "PHONE", AppointmentsPhone, AppointmentsDatePhone,stopsColors[3],1);
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
			drawGauge('Closed_Ratio_House', "IN HOUSE", AppointmentsHouse, AppointmentsDateHouse,stopsColors[2],1);
			drawGauge('Closed_Ratio_Phone', "PHONE", AppointmentsPhone, AppointmentsDatePhone,stopsColors[3],1);
    	}else{
			$('#jrange-cr div').datepicker('refresh').show();
    		$('#wrapper-cr').css('left', ($(this).offset().left+$(this).width()-200)+'px');
    		$('#wrapper-cr').css('top', ($(this).offset().top+$(this).height()+10)+'px');
    	}
    });
    $('#Revenue-Select').on('change', function(){
    	$('#wrapper-revenue').hide();
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
			drawBarChart('Revenue', TotalRevenueCategories, TotalRevenueValues, '', '', Colors[2], 1);
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
			drawBarChart('Revenue', TotalRevenueCategories, TotalRevenueValues, '', '', Colors[2], 1);
    	}else{
			$('#jrange-revenue div').datepicker('refresh').show();
    		$('#wrapper-revenue').css('left', ($(this).offset().left-$('.dates input').width()-10)+'px');
    		$('#wrapper-revenue').css('top', ($(this).offset().top)+'px');
    	}
    });
    $('#Quoted-Select').on('change', function(){
    	$('#wrapper-quoted').hide();
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
			drawBarChart('Quoted', TotalQuotedCategories, TotalQuotedValues, '', '', Colors[4], 0);
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
			drawBarChart('Quoted', TotalQuotedCategories, TotalQuotedValues, '', '', Colors[4], 0);
    	}else{
			$('#jrange-quoted div').datepicker('refresh').show();
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
			$('#jrange-rvq div').datepicker('refresh').show();
    		$('#wrapper-rvq').css('left', ($(this).offset().left-$('.dates input').width()-10)+'px');
    		$('#wrapper-rvq').css('top', ($(this).offset().top)+'px');
    	}
    });
    $('#List-Select').on('change', function(){
    	$('#wrapper-list').hide();
    	var val = $(this).val();
    	if(val == 0){
    		getAllData(thisWeekFirstDay, thisWeekLastDay);
			createTable('List', CustomerName, CustomerDate, CustomerPhoneHome);
    	}else if(val == 1){
    		getAllData(thisMonthFirstDay, ThisMonthLastDay);
			createTable('List', CustomerName, CustomerDate, CustomerPhoneHome);
    	}else{
			$('#jrange-list div').datepicker('refresh').show();
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
			echo "ImportData1.push(tmp);";
		}
	?>
//	d3.csv("data/data4.csv",function(dt)
	{
		ImportData = dt;
		ImportData.sort(compare);
		ImportData1.sort(compareSold);
		getAllData(thisWeekFirstDay, thisWeekLastDay);
		//getAllData(ImportData[0].Date_of_Appointment, ImportData[20].Date_of_Appointment);
		drawGauge('Appointments_House', "IN HOUSE", WeekMaxHouseValue, AppointmentsHouse,stopsColors[0], 0);
		drawGauge('Appointments_Phone', "PHONE", WeekMaxPhoneValue, AppointmentsPhone,stopsColors[1], 0);
		drawDonut('PvH', 'APPOINTMENTS TOTAL',[['In House', AppointmentsHouse], ['Phone', AppointmentsPhone]],'#DF5353');
		drawGauge('Closed_Ratio_House', "IN HOUSE", AppointmentsHouse, AppointmentsDateHouse,stopsColors[2],1);
		drawGauge('Closed_Ratio_Phone', "PHONE", AppointmentsPhone, AppointmentsDatePhone,stopsColors[3],1);
		drawBarChart('Revenue', TotalRevenueCategories, TotalRevenueValues, '', '', Colors[2], 1);
		drawBarChart('Quoted', TotalQuotedCategories, TotalQuotedValues, '', '', Colors[4], 0);
		createChart('RQ', seriesOptions);
		createTable('List', CustomerName, CustomerDate, CustomerPhoneHome);
	}
//	);
});
</script>
</html>