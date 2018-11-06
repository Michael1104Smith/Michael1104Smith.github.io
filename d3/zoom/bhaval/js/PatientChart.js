var PatientChart = (function() {
    // "private" variables 
    var id, width, height, tabIndex, fileName;

    // constructor
    function PatientChart() {
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    PatientChart.prototype.draw = function() {
        var id1 = this.id;
        var width = this.width, height = this.height;
        var tabIndex = this.tabIndex;
        var fileName = this.fileName;
        var ShapeColor = NonColors[tabIndex];

        var svg = d3.select(this.id)
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(" + 0 + "," + 0 + ")");

        d3.csv(fileName, type, function(error, data) {

          $(id1).html('');

          var total = 0;
          for(i = 0 ; i < data.length; i++){
            total += parseInt(data[i].Value);
          }
          var val1 = Average*total,val2 = new_patients*total;

        //The Biggest Shape
          var r = width/8*3;
          var startX = r+r/4;
          var startY = height/2;
          var centralX = startX+r*Math.cos(30*Math.PI/180);
          var fontSize1 = r/8, fontSize2 = r/10;
          var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(r)
            .startAngle(60 * (Math.PI/180)) //converting from degs to radians
            .endAngle(120 * (Math.PI/180)) //just radians

          svg.append("path")
            .transition()
            .duration(durationTime)
            .ease("quad")
            .attr("d", arc)
            .attr("transform", "translate("+startX+","+startY+")")
            .attr("fill",ShapeColor);

          var arc = d3.svg.arc()
                    .innerRadius(0)
                    .outerRadius(r/2)
                    .startAngle(0 * (Math.PI/180)) //converting from degs to radians
                    .endAngle(180 * (Math.PI/180)) //just radians

          svg.append("path")
            .transition()
            .duration(durationTime)
            .ease("quad")
            .attr("d", arc)
            .attr("transform", "translate("+centralX+","+startY+")")
            .attr("fill",ShapeColor);

          svg.append('text')
            .attr("x",centralX)
            .attr("y",startY-fontSize1/4*3)
            .attr("dy","0")
            .text(convertKM(val1)+"-"+convertKM(val2))
            .style("font-size",fontSize1+"px")
            .attr("text-anchor","middle");

          svg.append('text')
            .attr("x",centralX)
            .attr("y",startY)
            .attr("dy","0")
            .text(PatientStr[0])
            .call(wrap,25)
            .attr("font-size",fontSize2+"px")
            .attr("text-anchor","middle");

        //The Smaller Shape
          r = r/4*3;
          startX = r-r/9-5;
          centralX = startX+r*Math.cos(30*Math.PI/180);
          fontSize1 = r/6, fontSize2 = r/10;
          var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(r)
            .startAngle(60 * (Math.PI/180)) //converting from degs to radians
            .endAngle(120 * (Math.PI/180)) //just radians

          svg.append("path")
            .transition()
            .duration(durationTime)
            .ease("quad")
            .attr("d", arc)
            .attr("transform", "translate("+startX+","+startY+")")
            .attr("fill",ShapeColor);

          var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(r/2)
            .startAngle(0 * (Math.PI/180)) //converting from degs to radians
            .endAngle(180 * (Math.PI/180)) //just radians

          svg.append("path")
            .transition()
            .duration(durationTime)
            .ease("quad")
            .attr("d", arc)
            .attr("transform", "translate("+centralX+","+startY+")")
            .attr("fill",ShapeColor);

          svg.append('text')
            .attr("x",centralX)
            .attr("y",startY-fontSize1/2)
            .attr("dy","0")
            .text(convertKM(total))
            .attr("text-anchor","middle")
            .style("font-size",fontSize1+"px");

          svg.append('text')
            .attr("x",centralX+fontSize2/2)
            .attr("y",startY+fontSize2/2)
            .attr("dy","0")
            .text(PatientStr[1])
            .call(wrap,25)
            .attr("font-size",fontSize2+"px")
            .attr("text-anchor","middle");

        //The Smaller Shape
          r = r/3*2;
          startX = r-r/3;
          centralX = startX+r*Math.cos(30*Math.PI/180);
          fontSize1 = r/5, fontSize2 = r/10;
          var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(r)
            .startAngle(60 * (Math.PI/180)) //converting from degs to radians
            .endAngle(120 * (Math.PI/180)) //just radians

          svg.append("path")
            .transition()
            .duration(durationTime)
            .ease("quad")
            .attr("d", arc)
            .attr("transform", "translate("+startX+","+startY+")")
            .attr("fill",ShapeColor);

          var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(r/2)
            .startAngle(0 * (Math.PI/180)) //converting from degs to radians
            .endAngle(180 * (Math.PI/180)) //just radians

          svg.append("path")
            .transition()
            .duration(durationTime)
            .ease("quad")
            .attr("d", arc)
            .attr("transform", "translate("+centralX+","+startY+")")
            .attr("fill",ShapeColor);

          svg.append('text')
            .attr("x",centralX)
            .attr("y",startY-fontSize2-fontSize1)
            .attr("dy","0")
            .text(PatientStr[2])
            .call(wrap,15)
            .attr("font-size",fontSize2+"px")
            .attr("text-anchor","middle");

          svg.append('text')
            .attr("x",centralX)
            .attr("y",startY-fontSize1/2)
            .attr("dy","0")
            .text(convertKM(Average)+"-"+convertKM(new_patients))
            .attr("text-anchor","middle")
            .style("font-size",fontSize1+"px");

          svg.append('text')
            .attr("x",centralX)
            .attr("y",startY+fontSize2/2)
            .attr("dy","0")
            .text(PatientStr[3])
            .call(wrap,15)
            .attr("font-size",fontSize2+"px")
            .attr("text-anchor","middle");

        //The Smallest Shape
          r = r/5*3;
          startX = r-r/2;
          centralX = startX+r*Math.cos(30*Math.PI/180);
          fontSize1 = r/4, fontSize2 = r/10;
          var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(r)
            .startAngle(60 * (Math.PI/180)) //converting from degs to radians
            .endAngle(120 * (Math.PI/180)) //just radians

          svg.append("path")
            .transition()
            .duration(durationTime)
            .ease("quad")
            .attr("d", arc)
            .attr("transform", "translate("+startX+","+startY+")")
            .attr("fill",ShapeColor);

          var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(r/2)
            .startAngle(0 * (Math.PI/180)) //converting from degs to radians
            .endAngle(180 * (Math.PI/180)) //just radians

          svg.append("path")
            .transition()
            .duration(durationTime)
            .ease("quad")
            .attr("d", arc)
            .attr("transform", "translate("+centralX+","+startY+")")
            .attr("fill",ShapeColor);

          svg.append('text')
            .attr("x",centralX)
            .attr("y",startY-fontSize1/2)
            .attr("dy","0")
            .text(convertKM(Participant_sees))
            .attr("text-anchor","middle")
            .style("font-size",fontSize1+"px");

          svg.append('text')
            .attr("x",centralX)
            .attr("y",startY+fontSize2/2)
            .attr("dy","0")
            .text(PatientStr[4])
            .call(wrap,15)
            .attr("font-size",fontSize2+"px")
            .attr("text-anchor","middle");
        });

    }

    function type(d) {
      d.Value = +d.Value;
      return d;
    }

    function wrap(text, length) {
      text.each(function() {

        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            linerequested = 0,
            lineHeight = 1.2, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            transform = text.attr("transform"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.html().length > length) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan")
                      .attr("x", x)
                      .attr("y", y)
                      .attr("dx", "0")
                      .attr("dy", lineHeight + dy + "em")
                      .text(word);
          }
        }
      });
    }
    return PatientChart;
})();