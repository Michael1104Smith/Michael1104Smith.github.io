var PieChart = (function() {
    // "private" variables 
    var id, width, height, header_text, fileName, tabIndex;

    // constructor
    function PieChart() {
        this.dir = -1;
        this.opacity = 1;
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    PieChart.prototype.draw = function() {
        // $(this.id).html('');
        var id1 = this.id;
        var header_text = this.header_text;
        var fileName = this.fileName;
        var width = this.width, height = this.height;
        var radius = height/3;
        var tabIndex = this.tabIndex;

        var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius/2);

        var labelArc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius/2);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) {
                if(header_text == "Requested") return d.Requested; 
                return d.Approved;
            });

        var svg = d3.select(this.id)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        d3.csv(fileName, type, function(error, data) {
          if (error) throw error;
          var total = 0;
          for(i = 0 ; i < data.length; i++){
            if(header_text == "Requested") total += parseInt(data[i].Requested); 
            else total += parseInt(data[i].Approved);
          }
          total = "Total "+ total;

          svg.append("text")
            .attr("x",0)
            .attr("y",0)
           .text(numberWithCommas(total))
           .style("font-size","15px")
           .attr("dy","-0.3")
           .attr("text-anchor","middle")
           .call(wrap, 5);

          svg.append("text")
            .attr("x","0")
            .attr("y",-radius-5)
           .text(header_text)
           .attr("text-anchor","middle")
           .style("font-size","12px");

          var g = svg.selectAll(".arc")
              .data(pie(data));

          g.enter().append("g")
              .attr("class", "arc");

          g.append("path")
              .attr("d", arc);
              
          g.transition()
            .duration(durationTime)
            .ease("quad")
            .style("fill", function(d) { 
                if(tabIndex == 0) return TabColors[d.data.Number];
                if(d.data.Number == tabIndex) return TabColors[tabIndex];
                return defaultTabColor;
            });


          g.append("text")
              .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
              .attr("dy", ".35em")
              .style('fill',"#fff")
              .text(function(d) { 
                if(header_text == "Requested") return d.data.Requested;
                return d.data.Approved;
            });

        });
    };

    function type(d) {
      if(header_text == "Requested") d.Requested = +d.Requested;
      else d.Approved = +d.Approved;
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
    return PieChart;
})();