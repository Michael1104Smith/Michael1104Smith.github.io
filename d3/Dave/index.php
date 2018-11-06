<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Google Maps Demo</title>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>
	<div class="dialog">
		<a class="leaflet-popup-close-button" href="#">×</a>
		<div class="header">
			<h4 class="name">Name</h4>
			<p class="street">Street</p>
			<p class="road">Road</p>
			<p class="city">City</p>
		</div>
		<div class="content">
		</div>
	</div>
	<div class="category_div">
		<p>
		Year:
		<select id="year">
			<option selected>1990</option>
			<option>1991</option>
			<option>1992</option>
			<option>1993</option>
			<option>1994</option>
			<option>1995</option>
			<option>1996</option>
			<option>1997</option>
			<option>1998</option>
			<option>1999</option>
			<option>2000</option>
			<option>2001</option>
			<option>2002</option>
			<option>2003</option>
			<option>2004</option>
			<option>2005</option>
			<option>2006</option>
			<option>2007</option>
			<option>2008</option>
			<option>2009</option>
			<option>2010</option>
			<option>2011</option>
			<option>2012</option>
			<option>2013</option>
			<option>2014</option>
			<option>2015</option>
		</select>
		</p>
		<p>
		User:
		<select id="user">
			<option>A</option>
			<option>B</option>
			<option>C</option>
		</select>
		</p>
	</div>
    <div id="map_wrapper">
        <div id="map_canvas" class="mapping"></div>
    </div>
</body>

<script src="js/jquery-2.1.4.min.js"></script>
<script src="js/d3.v3.min.js"></script>
<script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyD0dwHLSZVsIFPVwJWuEchmp-eQEX55bqQ"></script>
<script src="js/app.js"></script>
<script>
	$(document).ready(function(){
		initialize();
		$('#year').change(function(){
			selected_year = $('#year').val();
			drawMap();
		});
		$('.leaflet-popup-close-button').click(function(){
			$('.dialog').hide();
		})
		$('body').on('click',function(e){
		})
		$('body').on('mousedown',function(e){
			mousedown_flag = true;
			mousePosX = e.pageX;
			mousePosY = e.pageY;
			var obj = $(e.target);
			if(obj.closest('.dotinfo').length){
			}
		})
		$('body').on('mousemove',function(e){
			if(mousedown_flag == true){
	            setDialogPosition();
			}
		})

		$('body').bind('mousewheel',function(e){
			if(mousedown_flag == true){
				console.log(selectedId);
	            setDialogPosition();
			}
		})

		$('body').on('mouseup',function(e){
			var obj = $(e.target);
			if(Math.abs(mousePosX-e.pageX) < 1 && Math.abs(mousePosY-e.pageY) < 1){
				$('.dialog').hide();
				mousedown_flag = false;
			}
		})
	})
</script>
</html>
