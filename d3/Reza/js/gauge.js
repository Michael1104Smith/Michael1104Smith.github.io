function Gauge(placeholderName, configuration)
{
	this.placeholderName = placeholderName;
	
	var self = this; // for internal d3 functions
	
	this.configure = function(configuration)
	{
		this.config = configuration;
		
		this.config.size = this.config.size;
		
		this.config.raduis = this.config.size * 1.26 / 2;
		this.config.cx = this.config.size / 2;
		this.config.cy = this.config.size / 2;
		
		this.config.min = undefined != configuration.min ? configuration.min : 0; 
		this.config.max = undefined != configuration.max ? configuration.max : 100; 
		this.config.range = this.config.max - this.config.min;
		
		this.config.transitionDuration = configuration.transitionDuration || 500;

	}

	this.render = function()
	{
		var chartId = "#" + this.placeholderName;
		$(chartId).html("");
		this.body = d3.select("#" + this.placeholderName)
							.append("svg:svg")
							.attr("class", "gauge")
							.attr("width", this.config.size)
							.attr("height", this.config.size);
		
		var currentValue = this.config.currentValue;
		var fontSize = Math.round(this.config.size / 16);
		var first_flag = 0;
		

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
		this.drawBand(0, currentValue, "url(#"+this.placeholderName+"glow)", "#243f78", 0.62, 0.78, st, end);

		if(this.config.backImageName.length > 0){
			if(this.config.flag == 0){
				this.body.append("svg:image")
			        .attr("xlink:href", "img/circle/"+this.config.backImageName+".png")
			        .attr("x", "9")
			        .attr("y", "9")
			        .attr("width", "170")
			        .attr("height", "159");
			}else{
				this.body.append("svg:image")
			        .attr("xlink:href", "img/circle/"+this.config.backImageName+".png")
			        .attr("x", -3.5)
			        .attr("y", 1.5)
			        .attr("width", 193)
			        .attr("height", 176);

			}
		}
	    if(this.config.imageName.length > 0){
			this.body.append("svg:image")
		        .attr("xlink:href", "img/circle/"+this.config.imageName+".png")
		        .attr("x", "9")
		        .attr("y", "9")
		        .attr("width", "170")
		        .attr("height", "159");
	    }
		
		var midValue = (this.config.min + this.config.max) / 2;

		var pointerPath = this.buildPointerPath(midValue);
		
		var pointerLine = d3.svg.line()
									.x(function(d) { return d.x })
									.y(function(d) { return d.y })
									.interpolate("basis");

		var cx = pointerPath[pointerPath.length-1].x;
		var cy = pointerPath[pointerPath.length-1].y;

		var pointerContainer = this.body.append("svg:g").attr("class", "pointerContainer");
		var opacity = 0.1 + this.config.currentValue/this.config.range*0.9;
		opacity = 1;
		pointerContainer.append("circle")
						.attr('cx', cx)
						.attr('cy', cy)
						.attr('r', 8)
						.attr('fill','none')
						.attr('stroke', this.config.circleColor)
						.attr('opacity', opacity);
		pointerContainer.append("circle")
						.attr('cx', cx)
						.attr('cy', cy)
						.attr('r', 4)
						.attr('fill',this.config.circleColor)
						.attr('opacity', opacity);

		var valueFontSize = this.config.valueFontSize;
		var unitFontSize = this.config.unitFontSize;
		pointerContainer.append("svg:text")
						.attr('class', 'unit')
						.attr("x", this.config.cx)
						.attr("y", this.config.size - this.config.cy / 6 - unitFontSize)
						.attr("dy", unitFontSize)
						.attr("text-anchor", "middle")
						.style("font-size", unitFontSize + "px")
						.style("fill", "#fff")
						.style("stroke-width", "0px")
						.attr('opacity', opacity);

		pointerContainer.append("svg:text")
						.attr('class', 'cur_value')
						.attr("x", this.config.cx)
						.attr("y", this.config.cy+valueFontSize/3)
						.attr("text-anchor", "middle")
						.style("font-size", valueFontSize + "px")
						.style("fill", "#fff")
						.style("stroke-width", "0px")
						.attr('opacity', opacity);
		
		this.redraw(currentValue, 0, pointerPath);
	}

	this.onTimer = function(){

		this.config.currentValue += this.config.speed;
		if(this.config.currentValue > this.config.timerMax){
			this.config.speed = -this.config.speed;
			this.config.currentValue = this.config.timerMax;
		}else if(this.config.currentValue < this.config.timerMin){
			this.config.speed = -this.config.speed;
			this.config.currentValue = this.config.timerMin;
		}
		this.render();
	}

	this.drawBand = function(start, end, glow, color, inner_radius, outer_radius, value1, value2)
	{
		if (0 >= end - start) return;
		
		this.body.append("svg:path")
					.style("filter",glow)
					.style("fill", color)
					.attr("opacity", 0.15)
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

		var head = valueToPoint(value, 0.7, st, end);
		
		return [head];
		
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
		
		pointerContainer.selectAll(".unit").text(this.config.unitValue);
		pointerContainer.selectAll(".cur_value").text(numberWithCommas(this.config.currentValue));
		
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
						var st = 284, end = 50;
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