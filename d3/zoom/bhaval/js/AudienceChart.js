var AudienceChart = (function() {
    // "private" variables 
    var id, width, height, fileName, tabIndex;

    // constructor
    function AudienceChart() {
        this.dir = -1;
        this.opacity = 1;
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    AudienceChart.prototype.draw = function() {
        $(this.id).html('');
        var fileName = this.fileName;
        var width = this.width, height = this.height;
        var radius = height/7*2;
        var tabIndex = this.tabIndex;

        var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius/2);

        var labelArc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius/2);

        var manArc = d3.svg.arc()
            .outerRadius(radius/2*3)
            .innerRadius(radius);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) {
                return d.Value;
            });

        var svg = d3.select(this.id)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + height / 2+ "," + height / 12 * 5 + ")");

        d3.csv(fileName, type, function(error, data) {
          if (error) throw error;
          var total = 0;
          for(i = 0 ; i < data.length; i++){
            total += parseInt(data[i].Value);
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

          // var dd = 'M451.1,328.3l-3.2,0c-1.2,0-1.6,1-1.6,1.3v0v0.2v4.4c0,0.3,0.2,0.5,0.5,0.5c0.3,0,0.5-0.2,0.5-0.5v-3.8h0.4   v3.6c0,0,0,0.1,0,0.1v6.5c0,0.4,0.3,0.8,0.7,0.8c0.4,0,0.7-0.3,0.7-0.8V335h0.4v5.7c0,0.4,0.3,0.8,0.7,0.8c0.4,0,0.7-0.3,0.7-0.8   V334v0v-3.6h0.4v3.8c0,0.3,0.3,0.5,0.6,0.5c0.3,0,0.6-0.2,0.6-0.5v-4.4v-0.2v-0.1C452.7,329.1,452.1,328.3,451.1,328.3';

          // var path = svg.append("path")
          //   .attr("d",dd)
          //   .style("fill","#000");
          // var pathEl = path.node();
          // console.log(pathEl);
          // var pathSegList = pathEl.pathSegList;
          // for(i = 0; i < pathSegList.length; i++){
          //   console.log(pathSegList[i]);
          // }

          var g = svg.selectAll(".arc")
              .data(pie(data))
              .enter().append("g")
              .attr("class", "arc");

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
              .text(function(d) { 
                return numberWithCommas(d.data.Value);
            });

          g.append("text")
              .attr("transform", function(d) { return "translate(" + manArc.centroid(d) + ")"; })
              .style("font-size","7px")
              .attr("x",function(d){
                  if (d.data.Name == 'MD Specialist 2') return 13;
                  return 0;
              })
              .text(function(d) { 
                return d.data.Name;
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
    return AudienceChart;
})();