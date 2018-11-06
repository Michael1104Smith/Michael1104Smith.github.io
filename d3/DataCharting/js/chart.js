function drawChart(data,id_name){
	var seriesOptions = [], i;

	var output_data = [];
	for(i = 0; i < data.length; i++){
		var ymd = data[i].date;
		var time = data[i].time;
		var res1 = ymd.split('.');
		var res2 = time.split(':');
		var date = new Date(res1[0],parseInt(res1[1]-1),res1[2],res2[0],res2[1]);
		var value = data[i].value4;
		var tmp = [date.getTime(),parseFloat(value)];
		output_data.push(tmp);
	}

	// output_data = [[1434243600000, 5], [1434247200000, 3], [1434250800000, 2], [1434254400000, 6], [1434258000000, 8], [1434261600000, 2], [1434265200000, 0], [1434268800000, 1]];

    seriesOptions[0] = {
        name: "Contacts",
        data: output_data,
        type:'scatter',
        color:"#17394d"
    };
	function createChart() {
		var today_date = new Date();

	    $(id_name).highcharts('StockChart', {

	        rangeSelector: {
	            selected: 4
	        },

	        yAxis: {
	            labels: {
	                formatter: function () {
	                    return this.value;
	                }
	            },
	            plotLines: [{
	                value: 0,
	                width: 2,
	                color: 'silver'
	            }]
	        },

	        plotOptions: {
	            series: {
	                compare: ''
	            }
	        },

	        tooltip: {
	            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.4f}</b><br/>',
	            valueDecimals: 2
	        },

	        series: seriesOptions
	    });
	}
	createChart();
}