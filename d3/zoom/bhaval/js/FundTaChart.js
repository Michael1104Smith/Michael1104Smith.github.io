var FundTaChart = (function() {
    // "private" variables 
    var id, width, height, header_text, fileName, tabIndex,prefix,suffix;

    // constructor
    function FundTaChart() {
        this.dir = -1;
        this.opacity = 1;
        this.prefix = '$';
        this.suffix = 'M';
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    FundTaChart.prototype.draw = function() {
        $(this.id).html('');
        var header_text = this.header_text;
        var fileName = this.fileName;
        var width = this.width, height = this.height;
        var radius = height/5;
        var tabIndex = this.tabIndex;
        var prefix = this.prefix;
        var suffix = this.suffix;

        var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(0);

        var labelArc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius/2);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) {
                return d.Value; 
            });

        var svg = d3.select(this.id)
            .attr("width", width-width/4)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 3 + "," + height / 2 + ")");

        d3.csv(fileName, type, function(error, data) {
          if (error) throw error;

          var g = svg.selectAll(".arc")
              .data(pie(data))
              .enter().append("g")
              .attr("class", "arc");

          var fontSize = radius / 3;

          g.append("text")
            .attr("x","0")
            .attr("y",-radius-5)
           .text(header_text)
           .style("font-size",fontSize+"px");

          g.append("path")
              .transition()
              .duration(durationTime)
              .ease("quad")
              .attr("d", arc)
              .style("fill", function(d) {
                return AudienceColors[tabIndex][d.data.Number];
              });

          g.append("text")
              .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
              .attr("dy", ".35em")
              .style('fill',"#fff")
              .style('font-size',(fontSize)+'px')
              .text(function(d) { 
                return numberWithCommas(d.data.Value);
            });
        });
    };

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
    return FundTaChart;
})();