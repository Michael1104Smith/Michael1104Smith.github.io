function drawDBStage02(){
	d3.csv('data/metricsglmsbudget.csv', function(dt1){
		console.log(dt1);
		var i, data1 = [];
		for(i = 0; i < dt1.length; i++){
		//	data1.push([dt1[i].Name, parseInt(dt1[i].Value1), parseInt(dt1[i].Value2)]);
			data1.push([dt1[i].Name, parseInt(dt1[i].Value1), parseInt(dt1[i].Value2), parseInt(dt1[i].Value3)]);
		}
		// set stage
		stage = anychart.graphics.create("container");

		// create variable for custom theme
		var customTheme = {
			"defaultFontSettings": {
				"fontSize": 16
			},
			"chart": {
				"title": false,
				"legend": false
			}
		};

		// apply custom theme

	//	anychart.theme(anychart.themes.darkBlue);
		anychart.theme(anychart.themes.darkTurquoise);
  // anychart.theme(anychart.themes.v6);


	 var dataSet = anychart.data.set([
			 ['Nail polish', 12814, 3054, 4376, 4229],
			 ['Eyebrow pencil', 13012, 5067, 3987, 3932],
			 ['Rouge', 11624, 7004, 3574, 5221],
			 ['Lip gloss', 22998, 12043, 4572, 4008],
			 ['Mascara', 11261, 10419, 6134, 18712]
	 ]);

	 // map data for the first series, take x from the zero column and value from the first column of data set
	// var seriesData_1 = dataSet.mapAs({x: [0], value: [1]});

	 // map data for the second series, take x from the zero column and value from the second column of data set
	// var seriesData_2 = dataSet.mapAs({x: [0], value: [2]});

	 // map data for the second series, take x from the zero column and value from the third column of data set
	// var seriesData_3 = dataSet.mapAs({x: [0], value: [3]});

	 // map data for the fourth series, take x from the zero column and value from the fourth column of data set
	// var seriesData_4 = dataSet.mapAs({x: [0], value: [4]});




//nznz Surg Start

var data_1 = anychart.data.set(data1);

// set data
var seriesData_1 = data_1.mapAs({x: [0], value: [1]});
var seriesData_2 = data_1.mapAs({x: [0], value: [2], fill: "#ffffff"});
var seriesData_3 = data_1.mapAs({x: [0], value: [3]});
//var seriesData_4 = data_1.mapAs({x: [0], value: [2]});

// set chart_1
chart_1 = anychart.column();
//chart_1 = anychart.column3d();

chart_1.column(seriesData_1);



// nznz  Surg end





	 // create bar chart
	 chart = anychart.column3d();

	 // force chart to stack values by Y scale.
	 //chart.yScale().stackMode('percent');
	 chart.yScale().stackMode('value');

	 // turn on chart animation
	 chart.animation(true);

	 // set chart title text settings
	 chart.title('Latency Budget Comparison -GLMS');
	 chart.title().padding([0, 0, 10, 0]);
	 chart.title().padding([0, 0, 10, 0]);

	 // set yAxis labels formatting, force it to add % to values
	 //chart.yAxis(0).labels().format('{%Value}%');
	  chart.yAxis(0).labels().format('{%Value}');
		//pkpk
		chart.yAxis(0).labels().fontSize(18);
		chart.xAxis(0).labels().fontSize(18);

	 // helper function to setup label settings for all series
	 var setupSeries = function (series, name) {
			 series.name(name);
			 series.stroke('2 #fff 1');
			 series.hoverStroke('2 #fff 1');
	 };

	 // temp variable to store series instance
	 var series;

	 // create first series with mapped data
	 series = chart.column(seriesData_1);
	 setupSeries(series, 'Client Processing Time');

	 // create second series with mapped data
	 series = chart.column(seriesData_2);
	 setupSeries(series, 'Network RTT');

	 // create third series with mapped data
	 series = chart.column(seriesData_3);
	 setupSeries(series, 'Server Processing Time');

	 // create fourth series with mapped data
	 //series = chart.column(seriesData_4);
	 //setupSeries(series, 'Nevada');

	 chart.interactivity().hoverMode('byX');
	 chart.tooltip().displayMode('union');
	 //pkpk below line changes font size of text that appears when hovering over the chart
	  chart.tooltip().fontSize(22);
		//chart.labels().fontSize(66);

	 // turn on legend
	 chart.legend()
					 .enabled(true)
					 .fontSize(16)
					 .padding([0, 0, 25, 0]);

//nznz add
   chart.bounds(0, 0, "50%", "33%");
	 // set container id for the chart
	// chart.container('container');
		chart.container(stage);
	 // initiate chart drawing
	 chart.draw();



/*
		// set data
		var data_1 = anychart.data.set(data1);

		// set data
		var seriesData_1 = data_1.mapAs({x: [0], value: [1]});
		var seriesData_2 = data_1.mapAs({x: [0], value: [2]});

		// set chart_1
		chart_1 = anychart.column();
		//chart_1 = anychart.column3d();

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

		*/



















		d3.csv('data/metricslgmsjitter.csv', function(dt1){
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
				//return this.tickValue+"%";
				return this.tickValue+"";
			});

			// axis name
			var yAxis = chart_1.yAxis();
			yAxis.title("Average Network RTT (ms)");

			// set chart title
			chart_1.title("Comparison of Average Network RTT and Jitter");

			// chart size and position
			chart_1.bounds("50%", 0, "50%", "100%");

			// draw
			chart_1.container(stage);
			chart_1.draw();

			});


/*
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

*/

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



d3.csv('data/metricslgmsbudget.csv', function(dt1){
	console.log(dt1);
	var i, data1 = [];
	for(i = 0; i < dt1.length; i++){
	//	data1.push([dt1[i].Name, parseInt(dt1[i].Value1), parseInt(dt1[i].Value2)]);
		data1.push([dt1[i].Name, parseInt(dt1[i].Value1), parseInt(dt1[i].Value2), parseInt(dt1[i].Value3)]);
	}



	var data_1 = anychart.data.set(data1);

	// set data
	var seriesData_1 = data_1.mapAs({x: [0], value: [1]});
	var seriesData_2 = data_1.mapAs({x: [0], value: [2]});
	var seriesData_3 = data_1.mapAs({x: [0], value: [3]});
	//var seriesData_4 = data_1.mapAs({x: [0], value: [2]});

	// set chart_1
	chart_1 = anychart.column();
	//chart_1 = anychart.column3d();

	chart_1.column(seriesData_1);



	// nznz  Surg end



		 // create bar chart
		 chart = anychart.column3d();

		 // force chart to stack values by Y scale.
		 //chart.yScale().stackMode('percent');
		 chart.yScale().stackMode('value');

		 // turn on chart animation
		 chart.animation(true);

		 // set chart title text settings
		 chart.title('Latency Budget Comparison - LGMS');
		 chart.title().padding([0, 0, 10, 0]);

		 // set yAxis labels formatting, force it to add % to values
		 //chart.yAxis(0).labels().format('{%Value}%');
		  chart.yAxis(0).labels().format('{%Value}');

		 // helper function to setup label settings for all series
		 var setupSeries = function (series, name) {
				 series.name(name);
				 series.stroke('2 #fff 1');
				 series.hoverStroke('2 #fff 1');
		 };

		 // temp variable to store series instance
		 var series;

		 // create first series with mapped data
		 series = chart.column(seriesData_1);
		 setupSeries(series, 'Client Processing Time');

		 // create second series with mapped data
		 series = chart.column(seriesData_2);
		 setupSeries(series, 'Network RTT');

		 // create third series with mapped data
		 series = chart.column(seriesData_3);
		 setupSeries(series, 'Server Processing Time');

		 // create fourth series with mapped data
		 //series = chart.column(seriesData_4);
		 //setupSeries(series, 'Nevada');

		 chart.interactivity().hoverMode('byX');
		 chart.tooltip().displayMode('union');

		 // turn on legend
		 chart.legend()
						 .enabled(true)
						 .fontSize(16)
						 .padding([0, 0, 25, 0]);

	//pkpk add
	   chart.bounds(0, "33%", "50%", "33%");
		 // set container id for the chart
		// chart.container('container');
			chart.container(stage);
		 // initiate chart drawing
		 chart.draw();

	});




/*
d3.csv('data/LGMS_AvglatCompare.csv', function(dt1){
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
	chart_1.bounds(0, "33%", "50%", "33%");

	// draw
	chart_1.container(stage);
	chart_1.draw();

	});

*/
















//2nd Jiitter chart
/*
d3.csv('data/LGMS_AvglatCompare.csv', function(dt1){
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
		return this.tickValue+"";
	});

	// axis name
	var yAxis = chart_1.yAxis();
	yAxis.title("Average Network RTT  (ms)");

	// set chart title
	chart_1.title("Comparison of Average Network RTT and Jitter");

	// chart size and position
	chart_1.bounds("50%", "33%", "0%", "0%");

	// draw
	chart_1.container(stage);
	chart_1.draw();

	});

*/

/*  2nd pie chart */

/*

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


*/
















//3rd Stacked Column Chart


		d3.csv('data/metricsormsbudget.csv', function(dt1){
			console.log(dt1);
			var i, data1 = [];
			for(i = 0; i < dt1.length; i++){
			//	data1.push([dt1[i].Name, parseInt(dt1[i].Value1), parseInt(dt1[i].Value2)]);
				data1.push([dt1[i].Name, parseInt(dt1[i].Value1), parseInt(dt1[i].Value2), parseInt(dt1[i].Value3)]);
			}



			var data_1 = anychart.data.set(data1);

			// set data
			var seriesData_1 = data_1.mapAs({x: [0], value: [1]});
			var seriesData_2 = data_1.mapAs({x: [0], value: [2]});
			var seriesData_3 = data_1.mapAs({x: [0], value: [3]});
			//var seriesData_4 = data_1.mapAs({x: [0], value: [2]});

			// set chart_1
			chart_1 = anychart.column();
			//chart_1 = anychart.column3d();

			chart_1.column(seriesData_1);



			// nznz Surg end



				 // create bar chart
				 chart = anychart.column3d();

				 // force chart to stack values by Y scale.
				 //chart.yScale().stackMode('percent');
				 chart.yScale().stackMode('value');

				 // turn on chart animation
				 chart.animation(true);

				 // set chart title text settings
				 chart.title('Latency Budget Comparison - ORMS');
				 chart.title().padding([0, 0, 10, 0]);

				 // set yAxis labels formatting, force it to add % to values
				// chart.yAxis(0).labels().format('{%Value}%');
				  chart.yAxis(0).labels().format('{%Value}');

				 // helper function to setup label settings for all series
				 var setupSeries = function (series, name) {
						 series.name(name);
						 series.stroke('2 #fff 1');
						 series.hoverStroke('2 #fff 1');
				 };

				 // temp variable to store series instance
				 var series;

				 // create first series with mapped data
				 series = chart.column(seriesData_1);
				 setupSeries(series, 'Client Processing Time');

				 // create second series with mapped data
				 series = chart.column(seriesData_2);
				 setupSeries(series, 'Network RTT');

				 // create third series with mapped data
				 series = chart.column(seriesData_3);
				 setupSeries(series, 'Server Processing Time');

				 // create fourth series with mapped data
				 //series = chart.column(seriesData_4);
				 //setupSeries(series, 'Nevada');

				 chart.interactivity().hoverMode('byX');
				 chart.tooltip().displayMode('union');

				 // turn on legend
				 chart.legend()
								 .enabled(true)
								 .fontSize(16)
								 .padding([0, 0, 25, 0]);

			//nznz add
			   chart.bounds(0, "66%", "50%", "33%");
				 // set container id for the chart
				// chart.container('container');
					chart.container(stage);
				 // initiate chart drawing
				 chart.draw();

			});



/*  3rd column chart */

/*
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

*/











/*
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
		//return this.tickValue+"%";
		return this.tickValue+"";
	});

	// axis name
	var yAxis = chart_1.yAxis();
	yAxis.title("Average Network RTT  (ms)");

	// set chart title
	chart_1.title("Comparison of Average Network RTT and Jitter");

	// chart size and position
	chart_1.bounds("50%", "66%", "0%", "0%");

	// draw
	chart_1.container(stage);
	chart_1.draw();

	});

*/

/* 3rd pie chart */

/*
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

*/








	//	});
	});
}
