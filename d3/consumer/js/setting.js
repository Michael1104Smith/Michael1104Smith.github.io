function RevenuePriceChart(id_name) {

    $(id_name).consumer({
        chart: {
            type: 'column',
            marginLeft:80
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: day_x,
            align: 'left',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '8px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            max:20,
            step:5,
            tickInterval:5,
            title: {
                text: 'Revenue'
            }
        },
	    scrollbar: {
	        enabled: true
	    },
        legend: {
            enabled: false
        },
        tooltip: {
        	formatter:function(){
                return "Price:"+this.y+"<br/>Count:"+this.point.count;
            }
        },
        series: [{
            name: 'revenue_price',
            data: revenue_data,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '8px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
}

function AverageRatingChart(id_name){
    $(id_name).consumer({
        chart: {
            type: 'scatter',
            marginLeft:80
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: day_x,
            labels: {
                rotation: -45,
                style: {
                    fontSize: '8px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
        	min:1,
        	max:5,
        	tickInterval: 1,
            title: {
                text: 'Average Rating'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
        	formatter:function(){
                return "Stars:"+this.y+"<br/>Count:"+this.point.count;
            }
        },
        series: [{
            name: 'revenue_price',
            data: avgRating_data,
            dataLabels: {
                enabled: false,
                rotation:-90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '8px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
}

function ScoreScoreChart(id_name){
    $(id_name).consumer({
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: year_x,
			tickInterval: ticks,
            labels: {
                rotation: -45,
                style: {
                    fontSize: '8px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            title: {
                text: 'Score'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
        	formatter:function(){
        		if(this.color == "#7cb5ec"){
                	return "Up:"+this.point.score_scoreUp+"<br/>Score:"+this.y+"<br/>Down:"+this.point.score_scoreDown;
        		}else if(this.color == "white"){
        			return false;
        		}else{
        			return false;
        		}
            }
        },
        series: [{
            name: 'score_scoreUp',
    		type: 'column',
        	pointWidth: 1,
            data: scoreUp_data,
            color:"green",
            marker: {
                enabled: false
            },
            dataLabels: {
                enabled: false,
                rotation:-90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '7px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },{
            name: 'score_scoreUpWhite',
    		type: 'column',
        	pointWidth: 1,
            data: scoreUpWhite_data,
            color:"white",
            marker: {
                enabled: false
            },
            dataLabels: {
                enabled: false,
                rotation:-90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '7px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },{
            name: 'score_scoreDown',
    		type: 'column',
        	pointWidth: 1,
            data: scoreDown_data,
            color:"red",
            marker: {
                enabled: false
            },
            dataLabels: {
                enabled: false,
                rotation:-90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '7px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },{
            name: 'score_scoreDownWhite',
    		type: 'column',
        	pointWidth: 1,
            data: scoreDownWhite_data,
            color:"white",
            marker: {
                enabled: false
            },
            dataLabels: {
                enabled: false,
                rotation:-90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '7px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },{
            name: 'score_scoreDownGreen',
            type: 'column',
            pointWidth: 1,
            data: scoreDownGreen_data,
            color:"green",
            marker: {
                enabled: false
            },
            dataLabels: {
                enabled: false,
                rotation:-90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '7px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },{
            name: 'score_score',
            data: score_data,
            marker: {
                enabled: true
            },
            dataLabels: {
                enabled: false,
                rotation:-90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '7px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
}
