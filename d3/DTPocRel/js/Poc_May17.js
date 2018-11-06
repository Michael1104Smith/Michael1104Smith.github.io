function drawDBStage02(){
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
	 anychart.theme(anychart.themes.darkTurquoise);
	//anychart.theme(anychart.themes.darkBlue);
	// anychart.theme(anychart.themes.v6);


	// set data
	var data_1 = anychart.data.set(data1);

	// set data
	var seriesData_1 = data_1.mapAs({x: [0], value: [1]});
	var seriesData_2 = data_1.mapAs({x: [0], value: [2], fill: "#ffffff"});
	var seriesData_3 = data_1.mapAs({x: [0], value: [3]});
	// set chart_1
	//chart_1 = anychart.column();

	// set chart_1
	chart_1 = anychart.column();
	//chart_1 = anychart.column3d();

	chart_1.column(seriesData_1);


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
	// May 05 change. Line below commmented
	//chart.yAxis(0).labels().format('{%Value}');
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
 setupSeries(series, 'Perceived Network Latency at Client');

 // create second series with mapped data
 series = chart.column(seriesData_2);
 setupSeries(series, '1X Network RTT');

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
	chart_1.bounds(0, 0, "50%", "100%");

	// draw
	chart_1.container(stage);
	chart_1.draw();

*/



	//chart 2

	var data_2 = anychart.data.set(data2);

	// set data
	var seriesData_1 = data_2.mapAs({x: [0], value: [1]});
	var seriesData_2 = data_2.mapAs({x: [0], value: [2]});

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







// chart 3

var data_3 = anychart.data.set(data3);

// set data
var seriesData_1 = data_3.mapAs({x: [0], value: [1]});
var seriesData_2 = data_3.mapAs({x: [0], value: [2]});
var seriesData_3 = data_3.mapAs({x: [0], value: [3]});
//var seriesData_4 = data_1.mapAs({x: [0], value: [2]});



	 // create bar chart
	 chart_3 = anychart.column3d();

	 // force chart to stack values by Y scale.
	 //chart.yScale().stackMode('percent');
	 chart_3.yScale().stackMode('value');

	 // turn on chart animation
	 chart_3.animation(true);

	 // set chart title text settings
	 chart_3.title('Latency Budget Comparison - LGMS');
	 chart_3.title().padding([0, 0, 10, 0]);

	 // set yAxis labels formatting, force it to add % to values
	 //chart.yAxis(0).labels().format('{%Value}%');
	// May 05 change. Line below commmented
		//chart_3.yAxis(0).labels().format('{%Value}');
		chart_3.yAxis(0).labels().fontSize(18);
		chart_3.xAxis(0).labels().fontSize(18);

	 // helper function to setup label settings for all series
	 var setupSeries = function (series, name) {
			 series.name(name);
			 series.stroke('2 #fff 1');
			 series.hoverStroke('2 #fff 1');
	 };

	 // temp variable to store series instance
	 var series;

	 // create first series with mapped data
	 series = chart_3.column(seriesData_1);
	 setupSeries(series, 'Perceived Network Latency at Client');

	 // create second series with mapped data
	 series = chart_3.column(seriesData_2);
	 setupSeries(series, '1X Network RTT');

	 // create third series with mapped data
	 series = chart_3.column(seriesData_3);
	 setupSeries(series, 'Server Processing Time');

	 // create fourth series with mapped data
	 //series = chart.column(seriesData_4);
	 //setupSeries(series, 'Nevada');

	 chart_3.interactivity().hoverMode('byX');
	 chart_3.tooltip().displayMode('union');

	 // turn on legend
	 chart_3.legend()
					 .enabled(true)
					 .fontSize(16)
					 .padding([0, 0, 25, 0]);

//pkpk add
	 chart_3.bounds(0, "33%", "50%", "33%");
	 // set container id for the chart
	// chart.container('container');
		chart_3.container(stage);
	 // initiate chart drawing
	 chart_3.draw();







// chart 4


var data_4 = anychart.data.set(data4);

// set data
var seriesData_1 = data_4.mapAs({x: [0], value: [1]});
var seriesData_2 = data_4.mapAs({x: [0], value: [2]});
var seriesData_3 = data_4.mapAs({x: [0], value: [3]});
//var seriesData_4 = data_1.mapAs({x: [0], value: [2]});



	 // create bar chart
	 chart_3 = anychart.column3d();

	 // force chart to stack values by Y scale.
	 //chart.yScale().stackMode('percent');
	 chart_3.yScale().stackMode('value');

	 // turn on chart animation
	 chart_3.animation(true);

	 // set chart title text settings
	 chart_3.title('Latency Budget Comparison - ORMS');
	 chart_3.title().padding([0, 0, 10, 0]);

	 // set yAxis labels formatting, force it to add % to values
	 //chart.yAxis(0).labels().format('{%Value}%');
	// May 05 change. Line below commmented
		//chart_3.yAxis(0).labels().format('{%Value}');
		chart_3.yAxis(0).labels().fontSize(18);
		chart_3.xAxis(0).labels().fontSize(18);

	 // helper function to setup label settings for all series
	 var setupSeries = function (series, name) {
			 series.name(name);
			 series.stroke('2 #fff 1');
			 series.hoverStroke('2 #fff 1');
	 };

	 // temp variable to store series instance
	 var series;

	 // create first series with mapped data
	 series = chart_3.column(seriesData_1);
	 setupSeries(series, 'Perceived Network Latency at Client');

	 // create second series with mapped data
	 series = chart_3.column(seriesData_2);
	 setupSeries(series, '1X Network RTT');

	 // create third series with mapped data
	 series = chart_3.column(seriesData_3);
	 setupSeries(series, 'Server Processing Time');

	 // create fourth series with mapped data
	 //series = chart.column(seriesData_4);
	 //setupSeries(series, 'Nevada');

	 chart_3.interactivity().hoverMode('byX');
	 chart_3.tooltip().displayMode('union');

	 // turn on legend
	 chart_3.legend()
					 .enabled(true)
					 .fontSize(16)
					 .padding([0, 0, 25, 0]);

//pkpk add
	 chart_3.bounds(0, "66%", "50%", "33%");
	 // set container id for the chart
	// chart.container('container');
		chart_3.container(stage);
	 // initiate chart drawing
	 chart_3.draw();


/*
	// set chart_2
	chart_2 = anychart.pie(data2);
	chart_2.innerRadius("30%");

	var labels_2 = chart_2.labels();
	labels_2.fontColor("White");
	chart_2.title("Latency Budget");

	// chart size and position
	chart_2.bounds("50%", 0, "50%", "40%");

	// draw
	chart_2.container(stage);
	chart_2.draw();





	//chart 3

	// set chart_2
	chart_3 = anychart.bar(data3);
	chart_3.title("Service Specific Metrics - RPS (GLMS)");

	// chart size and position
	chart_3.bounds("50%", "40%", "50%", "60%");

	// draw
	chart_3.container(stage);
	chart_3.draw();

*/


}
