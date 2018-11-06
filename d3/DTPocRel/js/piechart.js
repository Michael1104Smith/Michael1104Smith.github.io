anychart.onDocumentLoad(function() {
	// create an instance of a pie chart with data
	var chart = anychart.pie([
	      ["Client", 5],
	      ["Local Network", 2],
	      ["SDWAN", 2],
	      ["DB", 2],
	      ["Processing", 1]
	]);
	chart.title("Performance Budget");
	// pass the container id, chart will be displayed there
	chart.container("piechart");
	// call the chart draw() method to initiate chart display
	chart.draw();
});