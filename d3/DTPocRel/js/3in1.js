function drawDBStage02(){
	d3.csv('data/GLMS_AvglatCompare.csv', function(dt1){
		console.log(dt1);
		var i, data1 = [];
		for(i = 0; i < dt1.length; i++){
			data1.push([dt1[i].Name, parseInt(dt1[i].Value1), parseInt(dt1[i].Value2)]);
		}
		// set stage
		stage = anychart.graphics.create("container");

		// create variable for custom theme
		var customTheme = {
			"defaultFontSettings": {
				"fontSize": 9
			},
			"chart": {
				"title": false,
				"legend": false
			}
		};

		// apply custom theme

		anychart.theme(anychart.themes.darkTurquoise);
   //anychart.theme(anychart.themes.v6);

		// set data
		var data_1 = anychart.data.set(data1);

		// set data
		var seriesData_1 = data_1.mapAs({x: [0], value: [1]});
		var seriesData_2 = data_1.mapAs({x: [0], value: [2]});

		// set chart_1
		chart_1 = anychart.column();

		chart_1.column(seriesData_1);

		//create scale for line series and extraYAxis
		//it force line series to not stuck values with over series
		var scale = anychart.scales.linear();
		scale.minimum(0);
		scale.maximum(100);

		//create line series and set scale for it
		var lineSeries = chart_1.spline(seriesData_2);
		lineSeries.yScale(scale);

		//create extra axis on the right side of chart
		var extraYAxis = chart_1.yAxis(1);
		extraYAxis.title("Jitter");
		extraYAxis.orientation("right");
		extraYAxis.scale(scale);
		var extraYLabels = chart_1.yAxis().labels();
		extraYLabels.textFormatter(function(){
			return this.tickValue+"%";
		});

		// axis name
		var yAxis = chart_1.yAxis();
		yAxis.title("Average end2end latency (.oz)");

		// set chart title
		chart_1.title("Comparison of Average Latency and Jitter");

		// chart size and position
		chart_1.bounds(0, 0, "50%", "33%");

		// draw
		chart_1.container(stage);
		chart_1.draw();

		d3.csv('data/GLMS_piechart.csv', function(dt2){
			var data2 = [];
			for(i = 0; i < dt2.length; i++){
				data2.push([dt2[i].Name, parseInt(dt2[i].Value)]);
			}
			//chart 2

			// set chart_2
			chart_2 = anychart.pie(data2);
			chart_2.innerRadius("30%");

			var labels_2 = chart_2.labels();
			labels_2.fontColor("White");
			chart_2.title("Latency Budget");

			// chart size and position
			chart_2.bounds("50%", 0, "50%", "33%");

			// draw
			chart_2.container(stage);
			chart_2.draw();

/*
			d3.csv('data/DBStage02_3.csv', function(dt3){
				var data3 = [];
				for(i = 0; i < dt3.length; i++){
					data3.push([dt3[i].Name, parseInt(dt3[i].Value)]);
				}
				//chart 3

				// set chart_2
				chart_3 = anychart.bar(data3);
				chart_3.title("Service Specific Metrics - RPS (GLMS)");

				// chart size and position
				chart_3.bounds("50%", "13%", "50%", "20%");

				// draw
				chart_3.container(stage);
				chart_3.draw();
			});
	*/


















/*  pkpk  */



d3.csv('data/LGMS_AvglatCompare.csv', function(dt1){
	console.log(dt1);
	var i, data1 = [];
	for(i = 0; i < dt1.length; i++){
		data1.push([dt1[i].Name, parseInt(dt1[i].Value1), parseInt(dt1[i].Value2)]);
	}
	// set stage

	/*   pkpk
	stage = anychart.graphics.create("container");

	// create variable for custom theme
	var customTheme = {
		"defaultFontSettings": {
			"fontSize": 9
		},
		"chart": {
			"title": false,
			"legend": false
		}
	};

	// apply custom theme
	anychart.theme(anychart.themes.darkTurquoise);

	*/

	// set data
	var data_1 = anychart.data.set(data1);

	// set data
	var seriesData_1 = data_1.mapAs({x: [0], value: [1]});
	var seriesData_2 = data_1.mapAs({x: [0], value: [2]});

	// set chart_1
	chart_1 = anychart.column();

	chart_1.column(seriesData_1);

	//create scale for line series and extraYAxis
	//it force line series to not stuck values with over series
	var scale = anychart.scales.linear();
	scale.minimum(0);
	scale.maximum(100);

	//create line series and set scale for it
	var lineSeries = chart_1.spline(seriesData_2);
	lineSeries.yScale(scale);

	//create extra axis on the right side of chart
	var extraYAxis = chart_1.yAxis(1);
	extraYAxis.title("Jitter");
	extraYAxis.orientation("right");
	extraYAxis.scale(scale);
	var extraYLabels = chart_1.yAxis().labels();
	extraYLabels.textFormatter(function(){
		return this.tickValue+"%";
	});

	// axis name
	var yAxis = chart_1.yAxis();
	yAxis.title("Average end2end latency (.oz)");

	// set chart title
	chart_1.title("Comparison of Average Latency and Jitter");

	// chart size and position
	chart_1.bounds(0, "33%", "50%", "33%");

	// draw
	chart_1.container(stage);
	chart_1.draw();

	});



/*  pie chart */

	d3.csv('data/LGMS_piechart.csv', function(dt2){
		var data2 = [];
		for(i = 0; i < dt2.length; i++){
			data2.push([dt2[i].Name, parseInt(dt2[i].Value)]);
		}
		//chart 2

		// set chart_2
		chart_2 = anychart.pie(data2);
		chart_2.innerRadius("30%");

		var labels_2 = chart_2.labels();
		labels_2.fontColor("White");
		chart_2.title("Latency Budget");

		// chart size and position
		chart_2.bounds("50%", "33%", "50%", "33%");

		// draw
		chart_2.container(stage);
		chart_2.draw();

		});





/*  3rd column chart */

d3.csv('data/ORMS_AvglatCompare.csv', function(dt1){
	console.log(dt1);
	var i, data1 = [];
	for(i = 0; i < dt1.length; i++){
		data1.push([dt1[i].Name, parseInt(dt1[i].Value1), parseInt(dt1[i].Value2)]);
	}
	// set stage


	// set data
	var data_1 = anychart.data.set(data1);

	// set data
	var seriesData_1 = data_1.mapAs({x: [0], value: [1]});
	var seriesData_2 = data_1.mapAs({x: [0], value: [2]});

	// set chart_1
	chart_1 = anychart.column();

	chart_1.column(seriesData_1);

	//create scale for line series and extraYAxis
	//it force line series to not stuck values with over series
	var scale = anychart.scales.linear();
	scale.minimum(0);
	scale.maximum(100);

	//create line series and set scale for it
	var lineSeries = chart_1.spline(seriesData_2);
	lineSeries.yScale(scale);

	//create extra axis on the right side of chart
	var extraYAxis = chart_1.yAxis(1);
	extraYAxis.title("Jitter");
	extraYAxis.orientation("right");
	extraYAxis.scale(scale);
	var extraYLabels = chart_1.yAxis().labels();
	extraYLabels.textFormatter(function(){
		return this.tickValue+"%";
	});

	// axis name
	var yAxis = chart_1.yAxis();
	yAxis.title("Average end2end latency (.oz)");

	// set chart title
	chart_1.title("Comparison of Average Latency and Jitter");

	// chart size and position
	chart_1.bounds(0, "66%", "50%", "33%");

	// draw
	chart_1.container(stage);
	chart_1.draw();

	});








/* 3rd pie chart */

		d3.csv('data/ORMS_piechart.csv', function(dt2){
			var data2 = [];
			for(i = 0; i < dt2.length; i++){
				data2.push([dt2[i].Name, parseInt(dt2[i].Value)]);
			}
			//chart 2

			// set chart_2
			chart_2 = anychart.pie(data2);
			chart_2.innerRadius("30%");

			var labels_2 = chart_2.labels();
			labels_2.fontColor("White");
			chart_2.title("Latency Budget");

			// chart size and position
			chart_2.bounds("50%", "66%", "50%", "33%");

			// draw
			chart_2.container(stage);
			chart_2.draw();

			});










		});
	});
}
