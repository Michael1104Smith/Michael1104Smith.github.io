function drawChart(){
 /**
   * In order to synchronize tooltips and crosshairs, override the
   * built-in events with handlers defined on the parent element.
   */
  
   $('#container').bind('mouseleave', function(e) {
        var chart,
          point,
          i,
          event;

        for (i = 0; i < Highcharts.charts.length; i = i + 1) {
          chart = Highcharts.charts[i];
          event = chart.pointer.normalize(e.originalEvent);
          for(k = 0; k < chart.series.length; k++){
              point = chart.series[k].searchPoint(event, true);

              point.onMouseOut(); 
              chart.tooltip.hide(point);
              chart.xAxis[0].hideCrosshair(); 
          }
        }
      });
  $('#container').bind('mousemove touchmove touchstart', function(e) {
        var chart,
        points,
        i,
        secSeriesIndex = 1;

        for (i = 0; i < Highcharts.charts.length; i++) {
            chart = Highcharts.charts[i];
            e = chart.pointer.normalize(e); // Find coordinates within the chart
            if(chart.series.length > 2){
                points = [chart.series[0].searchPoint(e, true), chart.series[1].searchPoint(e, true), chart.series[2].searchPoint(e, true)];
                if (points[0] && points[1] && points[2]) {
                    if (!points[0].series.visible) {
                        points.shift();
                        secSeriesIndex = 0;
                    }
                    if (!points[secSeriesIndex].series.visible) {
                        points.splice(secSeriesIndex,2);
                    }
                    if (points.length) {
                        chart.tooltip.refresh(points); // Show the tooltip
                        chart.xAxis[0].drawCrosshair(e, points[0]); // Show the crosshair
                    }
                }
            }else if(chart.series.length > 1){
                points = [chart.series[0].searchPoint(e, true), chart.series[1].searchPoint(e, true)];
                if (points[0] && points[1]) {
                    if (!points[0].series.visible) {
                        points.shift();
                        secSeriesIndex = 0;
                    }
                    if (!points[secSeriesIndex].series.visible) {
                        points.splice(secSeriesIndex,1);
                    }
                    if (points.length) {
                        chart.tooltip.refresh(points); // Show the tooltip
                        chart.xAxis[0].drawCrosshair(e, points[0]); // Show the crosshair
                    }
                }
            }else{
                point = chart.series[0].searchPoint(event, true); // Get the hovered point
                if (point) {
                    point.highlight(e);
                }
            }
            

        }
  });
  /**
   * Override the reset function, we don't need to hide the tooltips and crosshairs.
   */
  Highcharts.Pointer.prototype.reset = function() {
    return undefined;
  };

  /**
   * Synchronize zooming through the setExtremes event handler.
   */
  function syncExtremes(e) {
    var thisChart = this.chart;

    if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
      Highcharts.each(Highcharts.charts, function(chart) {
        if (chart !== thisChart) {
          if (chart.xAxis[0].setExtremes) { // It is null while updating
            chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
              trigger: 'syncExtremes'
            });
          }
        }
      });
    }
  }

// Get the data. The contents of the data file can be viewed at
// https://github.com/highcharts/highcharts/blob/master/samples/data/activity.json
 $.getJSON('data/data.json', function(activity) {
    $.each(activity.datasets, function(i, dataset) {

        var series = [];
      for(k = 0; k < dataset.series.length; k++){
          // Add X values
          var data = Highcharts.map(dataset.series[k].data, function(val, j) {
            return [activity.xData[j], val];
          });
          series.push({
            data:data, 
            name: dataset.series[k].name,
            fillOpacity: 0.3
        });
      }

      $('<div class="chart">')
        .appendTo('#container')
        .highcharts({
          chart: {
            marginLeft: 40, // Keep all charts left aligned
            spacingTop: 20,
            spacingBottom: 20,
            type: dataset.type
          },
          title: {
            text: dataset.name,
            align: 'left',
            margin: 0,
            x: 30
          },
          credits: {
            enabled: false
          },
          legend: {
            enabled: true
          },
          xAxis: {
            crosshair: true,
            events: {
              setExtremes: syncExtremes
            },
            labels: {
              format: '{value} km'
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
          tooltip: {
            enabled: true,
            shared: true
          },
          series: series
        });
    });
  });
}