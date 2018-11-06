var FundChart = (function() {
    // "private" variables 
    var id, width, height, header_text, fileName, tabIndex,prefix,suffix;

    // constructor
    function FundChart() {
        this.dir = -1;
        this.opacity = 1;
        this.prefix = '$';
        this.suffix = '';
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    FundChart.prototype.draw = function() {
        $(this.id).html('');
        var header_text = this.header_text;
        var fileName = this.fileName;
        var width = this.width, height = this.height;
        var radius = height/3;
        var tabIndex = this.tabIndex;
        var prefix = this.prefix;
        var suffix = this.suffix;

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
            .attr("width", width-width/4)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 3 + "," + height / 2 + ")");

        d3.csv(fileName, function(data) {
          if(tabIndex == 0 && header_text == "Approved"){
            var length = data.length/2;
            data_tmp = [];
            for(i = 0; i < length; i++){
              var tmp_obj;
              if(FundRightInd == 0){
                tmp_obj = {Number:(i+1),Approved:(parseFloat(data[i*2].Approved)+parseFloat(data[i*2+1].Approved))};
              }else if(FundRightInd == 1){
                tmp_obj = {Number:(i+1),Approved:(parseFloat(data[i*2].Approved))};
              }else if(FundRightInd == 2){
                tmp_obj = {Number:(i+1),Approved:(parseFloat(data[i*2+1].Approved))};
              }
              data_tmp.push(tmp_obj);
            }
            data = [];
            for(i = 0 ; i < data_tmp.length; i++){
              data.push(data_tmp[i]);
            }
          }
          var total = 0,total_val;
          for(i = 0 ; i < data.length; i++){
            if(header_text == "Requested") total += parseInt(data[i].Requested); 
            else total += parseInt(data[i].Approved);
          }
          total_val = total;
          total = "Total "+ prefix + total + suffix;

          svg.append("text")
            .attr("x",0)
            .attr("y",0)
           .text(numberWithCommas(total))
           .style("font-size","15px")
           .attr("text-anchor","middle")
           .attr("dy","-0.3")
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
              .attr("d", arc)
              .transition()
              .duration(durationTime)
              .ease("quad")
              .style("fill", function(d) {
                  if(tabIndex == 0) return TabColors[d.data.Number];
                  if(header_text == "Requested" || d.data.Number < 6){
                    if(d.data.Number == tabIndex) return TabColors[tabIndex];
                    if(header_text == "Requested"){
                      return defaultTabColor; 
                    }else{
                      return TabColors[0]; 
                    }
                  }else if(header_text == "Approved"){
                    if(d.data.Number-5 == tabIndex) return NonColors[tabIndex];
                    return NonColors[0];
                  }
              });

          g.append("text")
              .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
              .attr("dy", ".35em")
              .style('fill',"#fff")
              .style('font-size',function(d){
                if(header_text == "Approved" && total_val/data.length/d.data.Approved > 1.6 && d.data.Approved < 1) return "5px";
                return '12px';
              })
              .text(function(d) { 
                if(header_text == "Requested") return prefix+d.data.Requested+suffix;
                return prefix+d.data.Approved+suffix;
            });
        });
    };

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
    return FundChart;
})();