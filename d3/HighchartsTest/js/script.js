function drawChart(){
    $('#container1').html('');
    $('#container2').html('');
    $.getJSON('data/data.json', function (activity) {
        $.each(activity.datasets, function (i, dataset) {
            Highcharts.chart('container'+(i+1), {
                chart: {
                    type: dataset.type
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: [{
                    categories: activity.xData,
                    crosshair: true,
                    tickInterval:6
                }],
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    },
                    stackLabels: {
                        enabled: false,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },
                tooltip: {
                    shared: true
                },
                legend: {
                    enabled:true
                },
                series: dataset.series
            });
        });
    });
}