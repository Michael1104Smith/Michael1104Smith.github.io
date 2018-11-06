function drawBarChart(id, categories, data, by, title, color, RevenueQuoted){
	$('#'+id).html('');
	var totalVal = 0;
	var dt = [];
	for(var i = 0; i < data.length; i++){
		totalVal += data[i];
		var tmp;
		if(RevenueQuoted == 1){
			var nameStr = "", valueStr = "";
			for(var j = 0; j < CustomerNameRevenue[i].length; j++){
				nameStr += CustomerNameRevenue[i][j];
				valueStr += TotalRevenueCustomerValues[i][j];
				if(j < CustomerNameRevenue[i].length - 1){
					nameStr += ",";
					valueStr += ",";
				}
			}
			tmp = {y:data[i], color: color, CustomerName:nameStr, CustomerNameValue: valueStr};
		}else{
			tmp = {y:data[i], color: color};
		}
		dt.push(tmp);
	}

	$('#'+id+'Total').html('$'+parseInt(totalVal)+' ');
	Highcharts.chart(id, {
	    chart: {
	        type: 'column',
            spacingLeft: 0,
            spacingRight: 0,
            spacingBottom: 0
	    },
	    title: {
	        text: title
	    },
	    subtitle: {
	        text: ''
	    },
	    xAxis: {
	        categories: categories,
	        crosshair: true
	    },
	    yAxis: {
            labels: {
                formatter: function () {
                    return '$'+this.value;
                }
            },
	        min: 0,
	        title: {
	            text: by
	        }
	    },
	    tooltip: {
	        // headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	        // pointFormat: '<tr><td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
	        // footerFormat: '</table>',
    		backgroundColor: 'rgba(0,43,121,0.91)',
	        shared: true,
	    	formatter: function(){
	    		var html;
	    		var name = this.x;

		        var s = '<div style="backgrond-color:#173e85"><b>'+'<span style="opacity: 0.9;color: #ffffff;font-family: Lato;font-size: 11px;font-weight: 500;letter-spacing: 0.07px;">'+name +'</span></b>';

		        $.each(this.points, function(i, point) {
	        		var html = "<div>";
		        	html += '<div><span class="tooltipText">&nbsp;Total Value: </span><span class="tooltipValue">'+ point.y+'</span></div>';
		        	html += "</div>";
		        	if(RevenueQuoted == 1){
			    		var nameArr = point.point.CustomerName.split(',');
			    		var valueArr = point.point.CustomerNameValue.split(',');
			    		for(var k = 0; k < nameArr.length; k++){
			    			html += "<div>";
				        	html += '<div style="margin-top:6px;border-radius:50%;width:6px;height:6px;float:left;background-color:'+point.color+'"></div>';
				        	html += '<div><span class="tooltipText">&nbsp;'+nameArr[k] +': </span><span class="tooltipValue">'+ valueArr[k]+'</span></div>';
				        	html += "</div>";
			    		}
		        	}
		            s += html;
		        });
		        s += '</div>'

	    		return s;
	    	},
    		useHTML: true
	    },
	    scrollbar: {
	        enabled: false
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0
	        }
	    },
	    series: [{
	        name: title,
	        data: dt,
	       	showInLegend: false
	    }]
	});
}

function drawPieChart(id, title, data){
	Highcharts.chart(id, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: title
        },
	    pane: {
	        background: {
	            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
	            innerRadius: '90%',
	            outerRadius: '100%',
	            shape: 'arc'
	        }
	    },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Number',
            colorByPoint: true,
            data: data
        }]
    });
}

function drawDonut(id, title, data){
	var total = 0, i;
	for(i = 0; i < data.length; i++){
		total += data[i][1];
	}
	for(i = 0; i < data.length; i++){
		var val = 0;
		if(total != 0){
			val = Math.round(data[i][1]/total*100);
		}
		data[i][0] = data[i][0] + ' (' + val + '%)';
	}
	var legendX = 0;
	var screenSize = $(window).width();
	if(screenSize > 400 && screenSize < 450){
		legendX = 40;
	}
	Highcharts.chart(id, {
	    chart: {
	    	type: 'pie',
	        plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false
	    },
	    title: {
	        text: '<div style="width:100px;text-align:center;"><span class="bigLetter">'+total+'</span><br/><span class="innerLetter">APPOINTMENTS</span><div></div><span style="display:block;margin-top:-5px;" class="innerLetter">TOTAL</span></div>',
	        align: 'center',
	        verticalAlign: 'middle',
	        y: -10,
	        useHTML: true
	    },
	    tooltip: {
    		backgroundColor: 'rgba(0,43,121,0.91)',
	    	formatter: function(){
	    		var arr = this.key.split('(');
	    		var name = arr[0]+": ";
	    		var val = arr[1].substr(0,arr[1].length-1);
	    		var html = '<div class="tooltipCircle" style="background-color:'+donutsColors[this.colorIndex]+'"></div>'
	    				+'<div class="tooltipLeft"><span class="tooltipText">'+name
	    				+'</span><span style="font-family: Lato;font-weight: 500;letter-spacing: 0.21px;color: #ffffff;">'+val+'</span></div>';
	    		return html;
	    	},
    		useHTML: true
	        //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	        pie: {
	            dataLabels: {
	                enabled: false
	            },
                showInLegend: true,
	            startAngle: -180,
	            endAngle: 180,
	            center: ['50%', '60%']
	        }
	    },
	    legend: {
	        enabled: true,
	        verticalAlign: 'top',
	        align: 'middle',
	        x: legendX
	    },
	    series: [{
	        name: 'Percent',
	        innerSize: '90%',
	        data: data,
            dataLabels: {
                color: '#ffffff'
            }
	    }]
	});


}

function drawGauge(id, title, max, val, stopsColor, mode){
	var gaugeOptions = {

	    chart: {
	        type: 'solidgauge',
	        plotBackgroundColor: null,
	        plotBackgroundImage: null,
            plotBorderWidth: null,
	        plotShadow: false,
            spacingTop: 0,
            spacingLeft: 0,
            spacingRight: 0,
            spacingBottom: 0
	    },

	    title: null,

	    pane: {
	        center: ['50%', '85%'],
	        size: '140%',
	        startAngle: -90,
	        endAngle: 90,
	        background: {
	            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
	            innerRadius: '90%',
	            outerRadius: '100%',
	            shape: 'arc',
	            borderWidth: 0
	        }
	    },

	    tooltip: {
	        enabled: false
	    },

	    // the value axis
	    yAxis: {
	        stops: stopsColor,
	        lineWidth: 0,
	        minorTickInterval: null,
	        tickAmount: 1,
	        title: {
	            y: 40
	        },
	        labels: {
	            y: 16
	        }
	    },

	    plotOptions: {
	        solidgauge: {
            	innerRadius: '90%',
	            dataLabels: {
	                y: -66,
	                borderWidth: 0,
	                useHTML: true
	            }
	        }
	    }
	};
	Highcharts.chart(id, Highcharts.merge(gaugeOptions, {
	    yAxis: {
	        showFirstLabel:false,
	        showLastLabel:false,
	        min: 0,
	        max: max,
	        title: {
	        	color: 'silver',
	            text: title
	        }
	    },

	    credits: {
	        enabled: false
	    },

	    series: [{
	        name: title,
	        data: [val],
	        dataLabels: {
	            formatter: function(){
	            	if(mode == 1){
	            		var percent = 0;
	            		if(max != 0){
	            			percent = Math.round(this.y/max*100);
	            		}
		             return '<div style="text-align:center"><span class="bigLetter">'+percent+
		                   '%</span></div>';
	            	}
		             return '<div style="text-align:center"><span class="bigLetter">'+this.y+
		                   '<span class="smallLetter">'+'/'+max+'</span></span></div>'	
	            }
	        },
	        tooltip: {
	            valueSuffix: ' km/h'
	        }
	    }]

	}));
}

function compare(a, b){
	if(b.Date_of_Appointment == "") return 1;
	if(a.Date_of_Appointment == "") return -1;
	var Date_of_Appointment1 = a.Date_of_Appointment.split('/');
	var Date_of_Appointment2 = b.Date_of_Appointment.split('/');
	var mdy1 = [], mdy2 = [];
	for(i = 0; i < Date_of_Appointment1.length; i++){
		mdy1.push(parseInt(Date_of_Appointment1[i]));
		mdy2.push(parseInt(Date_of_Appointment2[i]));
	}
	if(mdy2.length < 2) return -1;
	if(mdy1.length < 2) return 1;
	if(mdy1[2] > mdy2[2]) return 1;
	if(mdy1[2] < mdy2[2]) return -1;
	if(mdy1[0] > mdy2[0]) return 1;
	if(mdy1[0] < mdy2[0]) return -1;
	if(mdy1[1] > mdy2[1]) return 1;
	if(mdy1[1] < mdy2[1]) return -1;
	return 0;
}

function compareSold(a, b){
	if(b.Date_Sold == "") return 1;
	if(a.Date_Sold == "") return -1;
	var Date_of_Appointment1 = a.Date_Sold.split('/');
	var Date_of_Appointment2 = b.Date_Sold.split('/');
	var mdy1 = [], mdy2 = [];
	for(i = 0; i < Date_of_Appointment1.length; i++){
		mdy1.push(parseInt(Date_of_Appointment1[i]));
		mdy2.push(parseInt(Date_of_Appointment2[i]));
	}
	if(mdy2.length < 3) return -1;
	if(mdy1.length < 3) return 1;
	if(mdy1[2] > mdy2[2]) return 1;
	if(mdy1[2] < mdy2[2]) return -1;
	if(mdy1[0] > mdy2[0]) return 1;
	if(mdy1[0] < mdy2[0]) return -1;
	if(mdy1[1] > mdy2[1]) return 1;
	if(mdy1[1] < mdy2[1]) return -1;
	return 0;
}

function compare1(a, b){
	if(b == "") return 1;
	if(a == "") return -1;
	var Date_of_Appointment1 = a.split('/');
	var Date_of_Appointment2 = b.split('/');
	var mdy1 = [], mdy2 = [];
	for(i = 0; i < Date_of_Appointment1.length; i++){
		mdy1.push(parseInt(Date_of_Appointment1[i]));
		mdy2.push(parseInt(Date_of_Appointment2[i]));
	}
	if(mdy1[2] > mdy2[2]) return 1;
	if(mdy1[2] < mdy2[2]) return -1;
	if(mdy1[0] > mdy2[0]) return 1;
	if(mdy1[0] < mdy2[0]) return -1;
	if(mdy1[1] > mdy2[1]) return 1;
	if(mdy1[1] < mdy2[1]) return -1;
	return 0;
}

function getFromDate(a){
	return (a.getMonth()+1)+'/'+a.getDate()+'/'+a.getFullYear();
}

function getWeekfromDate(a){
	var Date_of_Appointment = a.split('/');
	var cdate = new Date(parseInt(Date_of_Appointment[2]),parseInt(Date_of_Appointment[0])-1,parseInt(Date_of_Appointment[1]));

    var dayOfMonth = cdate.getDay();
    var month = cdate.getMonth();
    var year = cdate.getFullYear();
    var checkDate = new Date(year, month, cdate.getDate());
    var checkDateTime = checkDate.getTime();
    var currentWeek = 0;

    for (var i = 1; i < 32; i++) {
        var loopDate = new Date(year, month, i);

        if (loopDate.getDay() == dayOfMonth) {
            currentWeek++;
        }

        if (loopDate.getTime() == checkDateTime) {
            return currentWeek;
        }
    }
}

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0,0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
}

function getDayfromDate(a){
	return parseInt(a.split('/')[1]);
}

function getMonthfromDate(a){
	return parseInt(a.split('/')[0]);
}

function getYearfromDate(a){
	return parseInt(a.split('/')[2]);
}

function getRevenue(a){
	var revenue = a.Revenue.replace('$','').replace(' ','').replace(',','');
	return parseFloat(revenue);
}

function getQuoted(a){
	var Quoted = a.Quoted.replace('$','').replace(' ','').replace(',','');
	return parseFloat(Quoted);
}

function getPhoneHome(a){
	if(parseInt(a.Phone_Appointment)){
		return 1;
	}
	return 0;
}

function makePie(id, categories, y1, y2){
	$('#'+id).html('');
	var i;
	for(i = 0; i < categories.length; i++){
		var width = parseFloat(95/categories.length);
		$('#'+id).append('<div class="piechart" id="'+id+""+(i+1)+'"></div>');
		var data = [];
		data.push({"name":'In-Home', "y": y1[i]});
		data.push({"name":'Phone', "y": y2[i]});
		drawPieChart(id+""+(i+1), categories[i], data);
	}
}

function makeGague(id, categories, max, vals){
	$('#'+id).html('');
	var i;
	for(i = 0; i < categories.length; i++){
		var width = parseFloat(95/categories.length);
		$('#'+id).append('<div class="gauge" id="'+id+""+(i+1)+'"></div>');
		drawGauge(id+""+(i+1), categories[i], max, vals[i]);
	}
}

function createChart(id, seriesOptions) {

    Highcharts.stockChart(id, {

	    chart: {
	        type: 'column'
	    },
        rangeSelector: {
            enabled: false
        },

        yAxis: {
            labels: {
                formatter: function () {
                    return '$'+this.value;
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }],
            opposite:false
        },
        legend: {
            enabled: true,
        },

        plotOptions: {
            series: {
                compare: ''
            }
        },
	    legend: {
	        enabled: true,
	        verticalAlign: 'top',
	        align: 'right'
	    },

        tooltip: {
    		backgroundColor: 'rgba(0,43,121,0.91)',
    		formatter: function() {
				var MonthCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    			var date = Highcharts.dateFormat('%b %e, %Y',new Date(this.x));
		        var s = '<b>'+'<span style="opacity: 0.9;color: #ffffff;font-family: Lato;font-size: 11px;font-weight: 500;letter-spacing: 0.07px;">'+date +'</span></b>';

		        $.each(this.points, function(i, point) {
		        	var html = "<div>";
		        	html += '<div style="margin-top:6px;border-radius:50%;width:6px;height:6px;float:left;background-color:'+point.color+'"></div>';
		        	html += '<div><span class="tooltipText">&nbsp;'+point.series.name +': </span><span class="tooltipValue">'+ point.y+'</span></div>';
		        	html += "</div>";
		            s += html;
		        });

		        return s;
		    },
		    useHTML:true,
		   shared: true,
           //pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.0f}</b><br/>',
           //pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b><span style="color:#ffffff">{point.y:.0f}</b></span><br/>',
            valueDecimals: 2
        },

        series: seriesOptions
    });
}

function createTable1(id, category, values){
	var body = '#'+id+' tbody';
	$(body).html('');
	var i,j;
	for(i = 0; i < category.length; i++){
		var html = '<tr><td>'+category[i]+'</td><td>';
		for(j = 0; j < values[i].length; j++){
			html += '<div class="customer_name">'+values[i][j]+'</div>';
		}
		html += '</td></tr>';
		$(body).append(html);
	}
}

function createTable(id, names, dates, flags){
	$('#'+id).html('');
	var i;
	for(i = 0; i < names.length; i++){
		var className = 'flArr';
		if(flags[i] == 0){
 			className += ' flArr1';
		}else{
			className += ' flArr2';
		}
		var flArr = names[i].split(" ");
		var html = '<div class="listDiv">'
		html += '<div class="'+className+'"><span>'+flArr[0].substr(0,1)+flArr[1].substr(0,1)+'</span></div>';
		html += '<span class="fullName">'+names[i]+'</span>';
		html += '<span class="fullDate">'+dates[i]+'</span>';
		html +='</div>';
		html += '<div class="clearfix"></div>'
		$('#'+id).append(html);
	}
}

function createDayChart(selVal){
	selDate = getDayfromDate(selVal);
	selMonth = getMonthfromDate(selVal);
	selYear = getYearfromDate(selVal);
	var home = 0, phone = 0;
	for(var i = 0; i < DayValues.length; i++){
    	var day = getDayfromDate(DayValues[i]);
    	var month = getMonthfromDate(DayValues[i]);
    	var year = getYearfromDate(DayValues[i]);
    	if(selDate == day && selMonth == month && selYear == year){
    		home = NumberHomeDay[i];
    		phone = NumberPhoneDay[i];
			break;
    	}
	}
	$('#NumberHomeDay').html('');
	$('#NumberPhoneDay').html('');
	$('#HomePhoneDay').html('');
	drawGauge('NumberHomeDay', selYear+'-'+selMonth+'-'+selDate, 1, home);
	drawGauge('NumberPhoneDay', selYear+'-'+selMonth+'-'+selDate, 2, phone);
	var data = [];
	data.push({"name":'In-Home', "y": home});
	data.push({"name":'Phone', "y": phone});
	drawPieChart('HomePhoneDay', selYear+'-'+selMonth+'-'+selDate, data);
}

function getAllData(startDate, endDate){
	var data = ImportData;
	NumberHomeDay = [], NumberPhoneDay = [];
	AppointmentsHouse = 0, AppointmentsPhone = 0;
	AppointmentsDateHouse = 0, AppointmentsDatePhone = 0
	TotalRevenueValues = [];
	CustomerNameRevenue = [];
	TotalRevenueCustomerValues = [];
	TotalQuotedValues = [];
	xAxisCategories = [];
	CustomerName = [], CustomerDate = [], CustomerPhoneHome = [];
	TotalQuotedCategories = [], TotalRevenueCategories = [];

	var TotalRevenueDay = [], TotalQuotedDay = [];

	var i;
	for(i = 0; i < data.length; i++){
		if(compare1(data[i].Date_of_Appointment, startDate) >= 0){
			break;
		}
	}

	for(i; i < data.length; i++){
		if(data[i].Date_of_Appointment){
			if(compare1(data[i].Date_of_Appointment, endDate) >= 0){
				break;
			}
			var day, week, month, year;
			day = getDayfromDate(data[i].Date_of_Appointment);
			week = getWeekfromDate(data[i].Date_of_Appointment);
			month = getMonthfromDate(data[i].Date_of_Appointment);
			year = getYearfromDate(data[i].Date_of_Appointment);

			var revenue = getRevenue(data[i]);

			var Quoted = getQuoted(data[i]);
			if(Quoted){
				var TotalQuotedCategory = MonthCategories[month-1]+' '+day;
				if(TotalQuotedCategories.length > 0 && 
					TotalQuotedCategories[TotalQuotedCategories.length-1] == TotalQuotedCategory){
					TotalQuotedValues[TotalQuotedCategories.length-1] += Quoted;
				}else{
					TotalQuotedValues.push(Quoted);
					TotalQuotedCategories.push(TotalQuotedCategory);
				}
			}

			var PhoneHome = getPhoneHome(data[i]);

			var DateSold = 0;
			if(data[i].Date_Sold){
				DateSold = 1;
			}
			AppointmentsHouse += 1-PhoneHome;
			AppointmentsPhone += PhoneHome;
			AppointmentsDateHouse += (1-PhoneHome)*DateSold;
			AppointmentsDatePhone += PhoneHome*DateSold;

			var date = new Date(year, month-1, day);
			var time = date.getTime();
			if(TotalQuotedDay.length > 0 && 
				TotalQuotedDay[TotalQuotedDay.length - 1][0] == time){
				TotalQuotedDay[TotalQuotedDay.length - 1][1] += Quoted;
			}else{
				var tmp = [];
				tmp.push(time);
				tmp.push(Quoted);
				TotalQuotedDay.push(tmp);
			}

			if(data[i].Date_of_Appointment && data[i].Customer_Name){
				CustomerPhoneHome.push(PhoneHome);
				CustomerName.push(data[i].Customer_Name);
				CustomerDate.push(data[i].Date_of_Appointment);
			}
		}
	}

	var data = ImportData1;


	for(i = 0; i < data.length; i++){
		if(compare1(data[i].Date_Sold, startDate) >= 0){
			break;
		}
	}

	for(i; i < data.length; i++){
		if(data[i].Date_Sold){
			if(compare1(data[i].Date_Sold, endDate) >= 0){
				break;
			}
			var day, week, month, year;
			day = getDayfromDate(data[i].Date_Sold);
			week = getWeekfromDate(data[i].Date_Sold);
			month = getMonthfromDate(data[i].Date_Sold);
			year = getYearfromDate(data[i].Date_Sold);

			var revenue = getRevenue(data[i]);
			if(revenue){
				var category = MonthCategories[month-1]+' '+day;
				if(TotalRevenueCategories.length > 0 && 
					TotalRevenueCategories[TotalRevenueCategories.length-1] == category){
					TotalRevenueValues[TotalRevenueCategories.length-1] += revenue;
					CustomerNameRevenue[TotalRevenueCategories.length-1].push(data[i].Customer_Name);
					TotalRevenueCustomerValues[TotalRevenueCategories.length-1].push(revenue);
				}else{
					TotalRevenueValues.push(revenue);
					TotalRevenueCategories.push(category);
					CustomerNameRevenue.push([data[i].Customer_Name]);
					TotalRevenueCustomerValues.push([revenue]);
				}
			}
			var date = new Date(year, month-1, day);
			var time = date.getTime();
			if(TotalRevenueDay.length > 0 && 
				TotalRevenueDay[TotalRevenueDay.length - 1][0] == time){
				TotalRevenueDay[TotalRevenueDay.length - 1][1] += revenue;
			}else{
				var tmp = [];
				tmp.push(time);
				tmp.push(revenue);
				TotalRevenueDay.push(tmp);
			}
		}
	}

	seriesOptions = [];
	seriesOptions.push({
        name: 'Revenue',
        data: TotalRevenueDay,
        color: Colors[2]
    });
	seriesOptions.push({
        name: 'Quoted',
        data: TotalQuotedDay,
        color: Colors[4]
    });
}