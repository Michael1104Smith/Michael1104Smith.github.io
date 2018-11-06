function Gauge(placeholderName, configuration)
{
	this.placeholderName = placeholderName;
	
	var self = this; // for internal d3 functions
	
	this.configure = function(configuration)
	{
		this.config = configuration;
		
		this.config.size = this.config.size;
		
		this.config.raduis = this.config.size * 1.27 / 2;
		this.config.cx = this.config.size / 2;
		this.config.cy = this.config.size / 2;
		
		this.config.min = undefined != configuration.min ? configuration.min : 0; 
		this.config.max = undefined != configuration.max ? configuration.max : 100; 
		this.config.range = this.config.max - this.config.min;
		
		this.config.transitionDuration = configuration.transitionDuration || 500;

		this.config.bottomPercent = Math.round(this.config.actualValue/this.config.expectedValue*100 - 100);
	}

	this.render = function()
	{
		var chartId = "#" + this.placeholderName;
		var width = this.config.width;
		var height = this.config.height;
		var circleColor = this.config.circleColor;
		var unitValue = this.config.unitValue;
		var middleImage = this.config.middleImage;
		var middleImageWidth = this.config.middleImageWidth;
		var middleImageHeight = this.config.middleImageHeight;

		$(chartId).html("");
		this.body = d3.select("#" + this.placeholderName)
							.append("svg:svg")
							.attr("class", "gauge")
							.attr("width", width)
							.attr("height", height);
		
		var currentValue = this.config.bottomPercent;
		if(currentValue <= 0){
			currentValue = 100 + currentValue;
		}else{
			currentValue = 100;
		}
		var fontSize = Math.round(this.config.size / 16);
		

		//Container for the gradients
		var defs = this.body.append("defs");

		//Code taken from http://stackoverflow.com/questions/9630008/how-can-i-create-a-glow-around-a-rectangle-with-svg
		//Filter for the outside glow
		var filter = defs.append("filter")
			.attr("id",this.placeholderName+"glow");

		filter.append("feGaussianBlur")
			.attr("class", "blur")
			.attr("stdDeviation","4.5")
			.attr("result","coloredBlur");

		var feMerge = filter.append("feMerge");
		feMerge.append("feMergeNode")
			.attr("in","coloredBlur");
		feMerge.append("feMergeNode")
			.attr("in","SourceGraphic");

		var st = 270, end = 45;
		this.drawBand(0, currentValue, "url(#"+this.placeholderName+"glow)", "#243f78", 0.15, 0.48, 0.64, st, end);

		this.drawBand(0, this.config.max, "", "#000", 1, 0.56, 0.57, st, end);
		this.drawBand(0, currentValue, "", circleColor, 1, 0.56, 0.57, st, end);
		
		var midValue = (this.config.min + this.config.max) / 2;

		var pointerPath = this.buildPointerPath(midValue);

		var cx = pointerPath.x;
		var cy = pointerPath.y;

		var pointerContainer = this.body.append("svg:g").attr("class", "pointerContainer");
		var opacity = 0.1 + this.config.currentValue/this.config.range*0.9;
		opacity = 1;
		this.body.append("svg:image")
	        .attr("xlink:href", "img/"+middleImage+".png")
			.attr("x", this.config.cx - middleImageWidth/2)
			.attr("y", this.config.cy - middleImageHeight/2)
	        .attr("width", middleImageWidth)
	        .attr("height", middleImageHeight);
		pointerContainer.append("circle")
						.attr('cx', cx)
						.attr('cy', cy)
						.attr('r', 6)
						.attr('fill','none')
						.attr('stroke', circleColor)
						.attr('opacity', opacity);
		pointerContainer.append("circle")
						.attr('cx', cx)
						.attr('cy', cy)
						.attr('r', 3)
						.attr('fill',circleColor)
						.attr('opacity', opacity);
		
		this.redraw(currentValue, 0, pointerPath);

		var startX = width/268*96;
		var startY = height/103*19;

		pointerContainer.append('rect')
						.attr('x', startX)
						.attr('y', startY)
						.attr('width', 2)
						.attr('height', 65)
						.attr('fill', '#1c1e28');

		var textMarginX = width/268*22;
		var textMarginY = height/103*1;

		var fontSize1 = this.config.textFontSize;
		var fontSize2 = this.config.unitFontSize;
		var fontSize3 = this.config.percentFontSize;

		startX += textMarginX;
		startY += textMarginY;

		pointerContainer.append('text')
						.attr('x', startX)
						.attr('y', startY+fontSize1/3*2)
						.text(this.config.text)
						.attr('fill', circleColor)
						.attr('font-size', fontSize1);

		startY += fontSize1+textMarginY*6;
		var str = this.config.actualValue+unitValue+" / "+ this.config.expectedValue+unitValue;

		pointerContainer.append('text')
						.attr('x', startX)
						.attr('y', startY+fontSize2/3*2)
						.text(str)
						.attr('fill', 'white')
						.attr('font-size', fontSize2);

		startY += fontSize2+textMarginY*12;

		if(this.config.actualValue > this.config.expectedValue){
			this.body.append("svg:image")
		        .attr("xlink:href", "img/circle/red-arrow-up.png")
		        .attr("x", startX)
		        .attr("y", startY+1)
		        .attr("width", 6)
		        .attr("height", 7);
		}else{
			this.body.append("svg:image")
		        .attr("xlink:href", "img/circle/green-arrow-down.png")
		        .attr("x", startX)
		        .attr("y", startY+1)
		        .attr("width", 6)
		        .attr("height", 7);
		}
		startX += 10;
		pointerContainer.append('text')
						.attr('x', startX)
						.attr('y', startY+fontSize3/3*2)
						.text(this.config.bottomPercent+"%")
						.attr('fill', '#b3bcdf')
						.attr('font-size', fontSize3);
	}

	this.onTimer = function(){

		this.config.expectedValue += this.config.speed;
		if(this.config.expectedValue >= this.config.timerMax){
			this.config.speed = -this.config.speed;
			this.config.expectedValue = this.config.timerMax;
		}else if(this.config.expectedValue <= this.config.timerMin){
			this.config.speed = -this.config.speed;
			this.config.expectedValue = this.config.timerMin;
		}
		this.config.bottomPercent = Math.round(this.config.actualValue/this.config.expectedValue*100-100);
		this.render();
	}

	this.drawBand = function(start, end, glow, color, opacity, inner_radius, outer_radius, value1, value2)
	{
		if (0 >= end - start) return;
		
		this.body.append("svg:path")
					.style("filter",glow)
					.style("fill", color)
					.attr("opacity", opacity)
					.attr("d", d3.svg.arc()
						.startAngle(this.valueToRadians(start, value1, value2))
						.endAngle(this.valueToRadians(end, value1, value2))
						.innerRadius(inner_radius * this.config.raduis)
						.outerRadius(outer_radius * this.config.raduis))
					.attr("transform", function() { return "translate(" + self.config.cx + ", " + self.config.cy + ") rotate("+value1+")" });
	}
	
	this.buildPointerPath = function(value)
	{
		var st = 270, end = 45;

		var head = valueToPoint(value, 0.55, st, end);
		
		return head;
		
		function valueToPoint(value, factor, value1, value2)
		{
			var point = self.valueToPoint(value, factor, value1, value2);
			point.x -= self.config.cx;
			point.y -= self.config.cy;
			return point;
		}
	}
	
	this.redraw = function(value, transitionDuration, pointerPath)
	{
		var pointerContainer = this.body.select(".pointerContainer");
		
		var pointer = pointerContainer.selectAll("circle");
		pointer.transition()
					.duration(undefined != transitionDuration ? transitionDuration : this.config.transitionDuration)
					//.delay(0)
					//.ease("linear")
					//.attr("transform", function(d) 
					.attrTween("transform", function()
					{
						var pointerValue = value;
						if (value > self.config.max) pointerValue = self.config.max + 0.02*self.config.range;
						else if (value < self.config.min) pointerValue = self.config.min - 0.02*self.config.range;
						var st = 270, end = 44;
						var targetRotation = (self.valueToDegrees(pointerValue, st, end) - 90);
						if(value < (self.config.max + self.config.min)/2){
							targetRotation = (self.valueToDegrees(pointerValue, st, end+2) - 90);
						}
						if(value == self.config.min){
							targetRotation = (self.valueToDegrees(pointerValue, st, end-1) - 90);	
						}
						var currentRotation = self._currentRotation || targetRotation;
						self._currentRotation = targetRotation;
						
						return function(step) 
						{
							var rotation = currentRotation + (targetRotation-currentRotation)*step;
							return "translate(" + self.config.cx + ", " + self.config.cy + ") rotate(" + rotation + ")"; 
						}
					});
	}
	
	this.valueToDegrees = function(value, value1, value2)
	{
		// thanks @closealert
		//return value / this.config.range * 270 - 45;
		return value / this.config.range * value1 - (this.config.min / this.config.range * value1 + value2);
	}
	
	this.valueToRadians = function(value, value1, value2)
	{
		return this.valueToDegrees(value, value1, value2) * Math.PI / 180;
	}
	
	this.valueToPoint = function(value, factor, value1, value2)
	{
		return { 	x: this.config.cx - this.config.raduis * factor * Math.cos(this.valueToRadians(value, value1, value2)),
					y: this.config.cy - this.config.raduis * factor * Math.sin(this.valueToRadians(value, value1, value2)) 		};
	}
	
	// initialization
	this.configure(configuration);	
}