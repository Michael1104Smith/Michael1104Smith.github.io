anychart.onDocumentReady(function() {

	// set stage
	stage = anychart.graphics.create("smallpiechart");

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
	anychart.theme(customTheme);

	// Chart 7 Trying to see if I can plot hte 3D Stacked Column chart within the dashboard

		anychart.onDocumentReady(function () {
    // create data set on our data
    var dataSet = anychart.data.set([
        ['Bail polish', 12814, 3054, 4376, 4229],
        ['Eyebrow pencil', 13012, 5067, 3987, 3932],
        ['Rouge', 11624, 7004, 3574, 5221],
        ['Pomade', 8814, 9054, 4376, 9256],
        ['Eyeshadows', 12998, 12043, 4572, 3308],
        ['Eyeliner', 12321, 15067, 3417, 5432],
        ['Foundation', 10342, 10119, 5231, 13701],
        ['Lip gloss', 22998, 12043, 4572, 4008],
        ['Mascara', 11261, 10419, 6134, 18712]
    ]);

    // map data for the first series, take x from the zero column and value from the first column of data set
    var seriesData_1 = dataSet.mapAs({x: [0], value: [1]});

    // map data for the second series, take x from the zero column and value from the second column of data set
    var seriesData_2 = dataSet.mapAs({x: [0], value: [2]});

    // map data for the second series, take x from the zero column and value from the third column of data set
    var seriesData_3 = dataSet.mapAs({x: [0], value: [3]});

    // map data for the fourth series, take x from the zero column and value from the fourth column of data set
    var seriesData_4 = dataSet.mapAs({x: [0], value: [4]});

    // create bar chart
    chart = anychart.column3d();

    // force chart to stack values by Y scale.
    chart.yScale().stackMode('percent');

    // set container id for the chart
   //LRLR   chart.container('container');

    // turn on chart animation
    chart.animation(true);

    // set chart title text settings
    chart.title('Regional ratio of cosmetic products sales');
    chart.title().padding([0, 0, 10, 0]);

    // set yAxis labels formatting, force it to add % to values
    chart.yAxis(0).labels().textFormatter(function (info) {
        return info.value + '%';
    });

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
    setupSeries(series, 'Florida');

    // create second series with mapped data
    series = chart.column(seriesData_2);
    setupSeries(series, 'Texas');

    // create third series with mapped data
    series = chart.column(seriesData_3);
    setupSeries(series, 'Arizona');

    // create fourth series with mapped data
    series = chart.column(seriesData_4);
    setupSeries(series, 'Nevada');

    chart.interactivity().hoverMode('byX');
    chart.tooltip().displayMode('union');

    // turn on legend
    chart.legend().enabled(true).fontSize(13).padding([0, 0, 25, 0]);

  chart.grid();
  chart.grid(1).layout('vertical');

  chart.bounds("0%", "0%", "30%", "33%");
    // initiate chart drawing
    chart.draw();


    });

	//chart 2 LRLR Chart 2 is a Pie Chart

	// set data
	var data_2 = [
		["Client App", 3120],
		["Network", 5054],
		["Server App", 10220]
	];

	// set chart_2   LRLR Pie Chart present in original version
	chart_2 = anychart.pie(data_2);
	chart_2.innerRadius("30%");

	var labels_2 = chart_2.labels();
	labels_2.fontColor("White");
	chart_2.title("Local");

	// chart size and position
	chart_2.bounds("30%", 0, "10%", "33%");

	// draw
	chart_2.container(stage);
	chart_2.draw();





	//LRLR insert Chart4 & Chart 5

		//chart 4

	// set data
	var data_4 = [
		["Client App", 3120],
		["Network", 5054],
		["Server App", 10220]
	];

	// set chart_4
	chart_4 = anychart.pie(data_4);
	chart_4.innerRadius("30%");

	var labels_4 = chart_4.labels();
	labels_4.fontColor("White");
	chart_4.title("Near Edge");

	// chart size and position
	chart_4.bounds("40%", 0, "10%", "33%");

	// draw
	chart_4.container(stage);
	chart_4.draw();


//chart 5 LRLR Insert

	// set data
	var data_5 = [
		["Client App", 3120],
		["Backhaul Network", 5054],
		["WAN", 10220],
		["Core Network", 2340],
		["Server App", 3421]
	];

	// set chart_5
	chart_5 = anychart.pie(data_5);
	chart_5.innerRadius("30%");

	var labels_5 = chart_5.labels();
	labels_5.fontColor("White");
	chart_5.title("Far Edge");

	// chart size and position
	chart_5.bounds("50%", 0, "10%", "33%");

	// draw
	chart_5.container(stage);
	chart_5.draw();








	//chart 8 LRLR Insert

	// set data
	var data_5 = [
		["Client App", 3120],
		["Network", 5054],
		["Server App", 10220]
	];

	// set chart_5
	chart_5 = anychart.pie(data_5);
	chart_5.innerRadius("30%");

	var labels_5 = chart_5.labels();
	labels_5.fontColor("White");
	chart_5.title("CL 1");

	// chart size and position
	chart_5.bounds("60%", 0, "10%", "33%");

	// draw
	chart_5.container(stage);
	chart_5.draw();


	//chart 9 LRLR Insert

	// set data
	var data_5 = [
		["Client App", 3120],
		["Network", 5054],
		["Server App", 10220]

	];

	// set chart_5
	chart_5 = anychart.pie(data_5);
	chart_5.innerRadius("30%");

	var labels_5 = chart_5.labels();
	labels_5.fontColor("White");
	chart_5.title("Cl 2");

	// chart size and position
	chart_5.bounds("70%", 0, "10%", "33%");

	// draw
	chart_5.container(stage);
	chart_5.draw();

	//chart 3  ( Horizontal Bar chart Present in Original version)

	// set data
	var data_3 = [
		["9.00 - 12.00", 9000],
		["12.00 - 14.00", 12000],
		["14.00 - 16.00", 13000],
		["16.00 - 18.00", 15400],
		["18.00 - 21.00", 9500]
	];

	// set chart_2
	chart_3 = anychart.bar(data_3);
	chart_3.title("Infrastructure Index");

	// chart size and position
	chart_3.bounds("30%", "40%", "80%", "60%");

	// draw
	chart_3.container(stage);
	chart_3.draw();
});
