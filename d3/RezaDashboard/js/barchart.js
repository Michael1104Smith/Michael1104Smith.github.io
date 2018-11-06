var globalDivVal = 1;
function drawBarChart(className, width, height ,ind){

	$('.'+className).html('');
	var barchart = d3.select('.'+className)
					.append('svg')
					.attr('width', width)
					.attr('height', height)
					.append('g');
	var rectWidth = width/761*700;
	var rectHeight = height/204*153;
	var marginLeft = width - rectWidth;
	var marginBottom = height - rectHeight;
	var startY = 0;

	/*  ======== Dynamic Values ============= */
	var yMaxValue = 0, xMaxValue = 31, yTickCount = 5, xTickCount = 31;
	var fontSize = 12;
	var textColor = '#b3bcdf';
	var textPaddingRight = 10, textPaddingTop = 10;
	var backRectColor = "#21232f", backRectStrokeColor = "#191b24";
	var RegularColors = [['#FEDC3D', '#F8D025'], ['#526CFF', '#5319AA'], ['#F32268', '#FE278C']];
	var opacityValues = [[0.7, 0.1], [1, 1]];
	var circleSize = 4;
	/*  ======== Dynamic Values ============= */
	
	var data = [4116, 800, 700, 500, 750, 1200, 800, 900, 1400, 1300, 520, 
				600, 1200, 800, 700, 500, 750, 1200, 800, 900, 1400, 1300, 520, 600,
				300, 1600, 1500, 200, 400, 350, 520];
	data = [2533,5066,7599,10132,12665];
	data = [4116, 800, 700, 500, 750, 1200, 800, 900, 1400, 1300, 520, 
				600, 1200, 800, 700, 500, 750];
	data = [2533,5066,7599,10132];
	data = [0,0.1,0.5,0.7,0.06,0.75433];
	xMaxValue = data.length;
	xTickCount = data.length;

	for(i = 0; i < data.length; i++){
		if(yMaxValue < data[i]*1.2){
			yMaxValue = data[i]*1.2;
		}
	}

	var i, deltaY = rectHeight/(yTickCount+0.5), deltaX = (rectWidth/(xTickCount));
	var deltaValY = getFirstValue(yMaxValue/yTickCount), deltaValX = xMaxValue/xTickCount;

	var chipWidth = deltaX;
	// if(chipWidth > rectWidth/20){
	// 	chipWidth = rectWidth/20;
	// }


	var gradientId = "barchartgradient";
	var gradient = barchart.append("defs")
					  .append("linearGradient")
					    .attr("id", gradientId)
					    .attr("x1", "100%")
					    .attr("y1", "0%")
					    .attr("x2", "100%")
					    .attr("y2", "100%")
					    .attr("spreadMethod", "pad");
	gradient.append("stop")
	    .attr("offset", "0%")
	    .attr("stop-color", '#21232f');
	gradient.append("stop")
	    .attr("offset", "100%")
	    .attr("stop-color", '#141629');

	for(i = 0; i < 2; i++){
		var gradientId = "barchartgradient"+i;
		var gradient = barchart.append("defs")
						  .append("linearGradient")
						    .attr("id", gradientId)
						    .attr("x1", "100%")
						    .attr("y1", "0%")
						    .attr("x2", "100%")
						    .attr("y2", "100%")
						    .attr("spreadMethod", "pad");
		gradient.append("stop")
		    .attr("offset", "0%")
		    .attr("stop-color", RegularColors[ind][0])
		    .attr("stop-opacity", opacityValues[i][0]);
		gradient.append("stop")
		    .attr("offset", "100%")
		    .attr("stop-color", RegularColors[ind][1])
		    .attr("stop-opacity", opacityValues[i][1]);
	}

	for(i = 0; i < yTickCount+1; i++){
		var yVal = deltaValY*i/globalDivVal;
		barchart.append('text')
				.attr('x', marginLeft - textPaddingRight)
				.attr('y', rectHeight-rectHeight*yVal/yMaxValue+fontSize/2+startY)
				.attr('font-size', fontSize)
				.attr('text-anchor', 'end')
				.text(numberWithCommas(yVal))
				.attr('fill', textColor)
				.attr('font-family', 'LatoWeb');
	}
	for(i = 1; i <= xTickCount; i++){
		barchart.append('text')
				.attr('x', marginLeft + deltaX*(i-1) + deltaX/2)
				.attr('y', rectHeight+textPaddingTop+fontSize/2+startY)
				.attr('font-size', fontSize)
				.attr('text-anchor', 'middle')
				.text(deltaValX*i)
				.attr('fill', textColor)
				.style('font-weight','normal')
				.attr('font-family', 'LatoWeb')
				.attr('opacity', function(){
					if(i%7 == 0) return 0.3;
					return 1;
				})
				.attr('class', function(){
					if(i%7 == 0) return 'axis-sunday'+(i-1);
					return 'axis-day';
				});
		barchart.append('rect')
				.attr('x', marginLeft + deltaX*(i-1))
				.attr('y', startY)
				.attr('width', deltaX)
				.attr('height', rectHeight)
				.attr('fill', 'url(#barchartgradient)');
	}

	fontSize = 14;

	for(i = 0; i < data.length; i++){
		var valRectHeight = rectHeight*data[i]/yMaxValue;
		barchart.append('rect')
				.attr('x', marginLeft + deltaX*i+1+(deltaX-chipWidth)/2)
				.attr('y', rectHeight-valRectHeight+startY)
				.attr('width', chipWidth-1)
				.attr('height', valRectHeight)
				.attr('fill', 'url(#barchartgradient0)')
				.attr('cursor', 'pointer')
				.attr('dataIndex', i)
				.attr('storke', backRectStrokeColor)
				.attr('opacity', function(){
					if(i%7 == 6) return 0.3;
					return 1;
				})
				.on('mouseover', function(){
					var sel = d3.select(this);
					sel.attr('fill','url(#barchartgradient1)');
					var dataIndex = sel.attr('dataIndex');
					var hoverBar = d3.selectAll('.hoverBar'+dataIndex);
					hoverBar.attr('display', 'show');
					sel.attr('opacity', 1);

					var sunday = d3.select('.axis-sunday'+dataIndex);
					sunday.attr('opacity', 1);
				})
				.on('mouseout', function(){
					var sel = d3.select(this);
					sel.attr('fill','url(#barchartgradient0)');
					var dataIndex = sel.attr('dataIndex');
					var hoverBar = d3.selectAll('.hoverBar'+dataIndex);
					hoverBar.attr('display', 'none');
					var sunday = d3.select('.axis-sunday'+dataIndex);
					sunday.attr('opacity', 0.3);

					if(dataIndex % 7 == 6){
						sel.attr('opacity', 0.3);
					}
				});
	}
	for(i = 1; i <= xTickCount; i++){
		barchart.append('rect')
				.attr('x', marginLeft + deltaX*i)
				.attr('y', startY)
				.attr('width', 1)
				.attr('height', rectHeight)
				.attr('fill', backRectStrokeColor);
	}
	for(i = 0; i < data.length; i++){
		var valRectHeight = rectHeight*data[i]/yMaxValue;
		barchart.append('circle')
				.attr('cx', marginLeft + deltaX*i + deltaX/2)
				.attr('cy', rectHeight-valRectHeight+startY)
				.attr('r', circleSize)
				.attr('fill', 'white')
				.attr('class', 'hoverBar'+i)
				.attr('display', 'none');
		barchart.append('circle')
				.attr('cx', marginLeft + deltaX*i + deltaX/2)
				.attr('cy', rectHeight-valRectHeight+startY)
				.attr('r', circleSize/3*2)
				.attr('fill', 'black')
				.attr('class', 'hoverBar'+i)
				.attr('display', 'none');
		barchart.append('circle')
				.attr('cx', marginLeft + deltaX*i + deltaX/2)
				.attr('cy', rectHeight-valRectHeight+startY)
				.attr('r', circleSize/2)
				.attr('fill', RegularColors[ind][1])
				.attr('class', 'hoverBar'+i)
				.attr('display', 'none');
		barchart.append('text')
				.attr('x', marginLeft + deltaX*i + deltaX/2)
				.attr('y', rectHeight-valRectHeight-circleSize-fontSize/3+startY)
				.text(numberWithCommas(data[i]))
				.attr('fill', 'white')
				.attr('text-anchor', 'middle')
				.attr('font-size', fontSize)
				.attr('class', 'hoverBar'+i)
				.attr('display', 'none');
	}
	var txt = 'kWh/Day';
	if(ind == 1){
		txt = 'm^3/time';
	}
	barchart.append('text')
			.attr('x', width/2)
			.attr('y', height-fontSize/3)
			.text(txt)
			.attr('fill', textColor);
}
function numberWithCommas(x) {
	if(x != Math.round(x)) return x;
	var x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
function getFirstValue(x){
	x = Math.round(x*1000)/1000;
	var divVal = 1;
	while(Math.abs(x - Math.round(x))>0.0001){
		x *= divVal;
		divVal *= 10;
	}
	x = Math.round(x);
	var str = x.toString();
	for(i = 1; i < str.length; i++){
		if(str[i] != 0){
			break;
		}
	}
	if(i == str.length) return parseInt(str);

	var len = str.length;
	var val = parseInt(str[0])+1;
	for(i = 1; i < str.length; i++){
		val *= 10;
	}
	globalDivVal = divVal;
	return val;
}