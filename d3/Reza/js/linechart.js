function drawLineChart(className, width, height){
	$('.'+className).html('');
	var linechart = d3.select('.'+className)
					.append('svg')
					.attr('width', width)
					.attr('height', height)
					.append('g');
	var rectWidth = width/760*650;
	var rectHeight = height/260*220;
	var marginLeft = (width - rectWidth)/2;
	var marginRight = marginLeft;
	var marginBottom = height - rectHeight;
	linechart.append('rect')
			.attr('x', marginLeft)
			.attr('y', 0)
			.attr('width', rectWidth)
			.attr('height', rectHeight)
			.attr('fill', '#181a23');

	/*  ======== Dynamic Values ============= */
	var xMaxTickCount = 12;
	var yMaxValue = [], xMaxValue = 18, yTickCount = 5, xTickCount = 18;
	var fontSize = 12;
	var textColor = '#b3bcdf';
	var textPaddingRight = 10, textPaddingTop = 10;
	var circleSize = 3.5;
	var dataCircleColors = ['#6260dd', '#20edf5'];
	var dataLineColors = ['#4a4ca0','#1d959d'];
	var dataFillColors = ['#323764', '#1a4a53'];
	var lineColor = "#1c1e28";
	var xAxis = ["1/1","1/4","1/10","1/11","1/16","1/20","1/22","1/25"
					,"2/1","2/3","2/10","2/20","1/1","1/4","1/10","1/11","1/16","1/20","1/22","1/25"
					,"2/1","2/3","2/10","2/20"];
	var data = [
				[500,520,600,200,1200,900,800,1500,700,600,1500,500,500,520,600,200,1200,900,800,1500,700,600,1500,500],
				[1020,1000,1200,1800,1100,1200,1400,550,800,750,100,900,1020,1000,1200,1800,1100,1200,1400,550,800,750,100,900]
			];
	/*  ======== Dynamic Values ============= */

	for(i = 0; i < data.length; i++){
		yMaxValue.push(0);
	}
	for(i = 0; i < data.length; i++){
		for(j = 0; j < data[i].length; j++){
			if(yMaxValue[i] < Math.round(data[i][j]*1.2)){
				yMaxValue[i] = Math.round(data[i][j]*1.2);
			}
		}
	}
	xMaxValue = xAxis.length+1;
	xTickCount = xMaxValue;

	var i, deltaY = rectHeight/(yTickCount+0.5), deltaX = (rectWidth/(xTickCount));
	var deltaValX = xMaxValue/xTickCount;
	var deltaValY = [];
	for(i = 0; i < data.length; i++){
		deltaValY.push(getFirstValue(Math.round(yMaxValue[i]/yTickCount)));
	}
	for(j = 0; j < data.length; j++){
		var x = marginLeft - textPaddingRight;
		var anchor = 'end';
		if(j > 0){
			x = width - marginRight + textPaddingRight;
			anchor = 'start';
		}
		for(i = 0; i < yTickCount+1; i++){
			linechart.append('text')
					.attr('x', x)
					.attr('y', rectHeight-deltaY*i+fontSize/2)
					.attr('font-size', fontSize)
					.attr('text-anchor', anchor)
					.text(numberWithCommas(deltaValY[j]*i))
					.attr('fill', textColor)
					.attr('font-family', 'LatoWeb');
		}
	}
	var xTickDelta = Math.round(xTickCount/xMaxTickCount);
	if(xTickDelta > xTickCount/xMaxTickCount){
		xTickDelta --;
	}
	for(i = 1; i <= xTickCount; i++){
		if(i % xTickDelta == 1){
			linechart.append('text')
					.attr('x', marginLeft + deltaX*(i-1) + deltaX/2)
					.attr('y', rectHeight+textPaddingTop+fontSize/2)
					.attr('font-size', fontSize)
					.text(xAxis[i-1])
					.attr('fill', textColor)
					.style('font-weight','normal')
					.attr('font-family', 'LatoWeb');
		}
		linechart.append('rect')
				.attr('x', marginLeft + deltaX*i)
				.attr('y', 0)
				.attr('width', 1)
				.attr('height', rectHeight)
				.attr('fill', lineColor);
	}
	var rateX = deltaX/deltaValX;
	var rateY = [];
	for(i = 0; i < data.length; i++){
		rateY.push(deltaY/deltaValY[i]);
	}
	for(i = 0; i < data.length; i++){
		var polylineData = "", polygonData = marginLeft+","+rectHeight;

		var gradientId = "linechartgradient"+(i+1);
		var gradient = linechart.append("defs")
						  .append("linearGradient")
						    .attr("id", gradientId)
						    .attr("x1", "0%")
						    .attr("y1", "0%")
						    .attr("x2", "100%")
						    .attr("y2", "100%")
						    .attr("spreadMethod", "pad");
		gradient.append("stop")
		    .attr("offset", "0%")
		    .attr("stop-color", dataCircleColors[i])
		    .attr("stop-opacity", 0.4);
		gradient.append("stop")
		    .attr("offset", "100%")
		    .attr("stop-color", dataCircleColors[i])
		    .attr("stop-opacity", 0.05);

		for(j = 0; j < data[i].length; j++){
			var x = marginLeft + rateX*j;
			var y = rectHeight - rateY[i]*data[i][j];
			polylineData += " "+x+","+y;
			polygonData += " "+x+","+y;
		}
		polygonData += " "+(width-marginRight)+","+rectHeight;
		linechart.append('polyline')
				.attr('points', polylineData)
				.attr('fill','none')
				.attr('stroke', dataLineColors[i]);
		linechart.append('polyline')
				.attr('points', polygonData)
				.style('fill','url(#'+gradientId+')')
				.attr('stroke','none');
	}
	for(i = 0; i < data.length; i++){
		for(j = 1; j < data[i].length; j++){
			var x = marginLeft + rateX*j;
			var y = rectHeight - rateY[i]*data[i][j];
			linechart.append('circle')
					.attr('cx', x)
					.attr('cy', y)
					.attr('r', circleSize+2)
					.attr('fill','white')
					.attr('class', 'border'+i+"a"+j)
					.attr('display','none');
			linechart.append('circle')
					.attr('cx', x)
					.attr('cy', y)
					.attr('r', circleSize)
					.attr('fill',dataCircleColors[i])
					.attr('iIndex', i)
					.attr('jIndex', j)
					.on('mouseover', function(){
						var sel = d3.select(this);
						var iIndex = sel.attr('iIndex'), jIndex = sel.attr('jIndex');
						var border = d3.select('.border'+iIndex+"a"+jIndex);
						border.attr('display', 'block');
						var text = d3.selectAll('.text'+iIndex+"a"+jIndex);
						text.attr('display', 'block');
					})
					.on('mouseout', function(){
						var sel = d3.select(this);
						var iIndex = sel.attr('iIndex'), jIndex = sel.attr('jIndex');
						var border = d3.select('.border'+iIndex+"a"+jIndex);
						border.attr('display', 'none');
						var text = d3.selectAll('.text'+iIndex+"a"+jIndex);
						text.attr('display', 'none');
					});
			linechart.append('text')
					.text(numberWithCommas(data[i][j]))
					.attr('x', x)
					.attr('y', y-fontSize)
					.attr('fill', 'white')
					.attr('text-anchor', 'middle')
					.attr('font-size', fontSize)
					.attr('class', 'text'+i+'a'+j)
					.attr('display', 'none');
			linechart.append('text')
					.text(xAxis[j-1])
					.attr('x', x)
					.attr('y', y-fontSize*2-5)
					.attr('fill', 'white')
					.attr('text-anchor', 'middle')
					.attr('font-size', fontSize)
					.attr('class', 'text'+i+'a'+j)
					.attr('display', 'none');
		}
	}
}
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
function getFirstValue(x){
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
	return val;
}