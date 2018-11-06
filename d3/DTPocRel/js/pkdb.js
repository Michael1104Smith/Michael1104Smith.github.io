function drawpkdb(){
	$('#pkdb').html('');
	d3.csv('data/columnbar.csv', function(dt){
		var i, data = [];
		for(i = 0; i < dt.length; i++){
			data.push([dt[i].Name, parseInt(dt[i].Value1), parseInt(dt[i].Value2)]);
		}


		// set stage
		stage = anychart.graphics.create("pkdb");
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
		//anychart.theme(customTheme);
			anychart.theme(anychart.themes.darkTurquoise);
		// set data
		var data_1 = anychart.data.set(data);

		// set data
		var seriesData_1 = data_1.mapAs({x: [0], value: [1]});
		var seriesData_2 = data_1.mapAs({x: [0], value: [2]});

		// set chart_1 (LRLR :  Column Chart )
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
			return this.tickValue+" ";
		});

		// axis name
		var yAxis = chart_1.yAxis();
		yAxis.title("Service Response Time (ms)");

		// set chart title
		chart_1.title("Service Response Time for Various Hosts");

		// chart size and position LRLR This is where You set the sizing and position of the chart. The first two values (0,0 in this case) represent the origin (Top left corner ??) of the chart) and the next two values (20$, 100% in this case) reporesent the size (length and breadth respectively) defined as a percentage of t overall canvas dimensions (Breadth(X) and Height(Y) respectively of the overall cancas0
		chart_1.bounds(0, 0, "60%", "100%");

		// draw
		chart_1.container(stage);
		chart_1.draw();

		// set data for Chart 6 ( 2nd column chart)


			anychart.theme(anychart.themes.darkTurquoise);

		var data_2 = [
			["Client", 3120],
			["Network", 5054],
			["Server", 3421]
		];

		// set chart_2
		chart_2 = anychart.pie(data_2);
		chart_2.innerRadius("30%");

		var labels_2 = chart_2.labels();
		labels_2.fontColor("White");
		chart_2.title("LA Budget");

		// chart size and position
		chart_2.bounds("60%", 0, "35%", "40%");

		// draw
		chart_2.container(stage);
		chart_2.draw();

		//chart 3
			anychart.theme(anychart.themes.darkTurquoise);
		// set data
		var data_3 = [
			["9000", 9000],
			["12000", 12000],
			["14000", 13000],
			["16000", 15400],
			["18000 ", 9500]
		];

		// set chart_2
		chart_3 = anychart.bar(data_3);
		chart_3.title("req Rate");

		// chart size and position
		chart_3.bounds("60%", "40%", "35%", "60%");

		// draw
		chart_3.container(stage);
		chart_3.draw();








	})
}
