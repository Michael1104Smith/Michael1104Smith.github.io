var GrantChart = (function() {
    // "private" variables 
    var id, width, height, tabIndex, Ind, fileName;

    // constructor
    function GrantChart() {
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    GrantChart.prototype.draw = function() {
        var id1 = this.id;
        var fileName = this.fileName;
        var width = this.width, height = this.height;
        var tabIndex = this.tabIndex;
        var Ind = this.Ind;
        var StartInd = 0;
        var RectColors = TabColors[tabIndex];
        var StartRect = width/20*9;
        var maxRectWidth = width/20*10;
        var Cnt = GrantStr.length;

        var svg = d3.select(this.id)
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(" + 0 + "," + 0 + ")");


        d3.csv(fileName, type, function(error, data) {
            if (error) throw error;

            $(id1).html('');

            var val_arr = [];
            var tmp_tabIndex = tabIndex;
            tabIndex = 0;

            if(GrantInd == 0){
              val_arr.push(parseInt(data[tabIndex*2].Qulity_Improvement)+parseInt(data[tabIndex*2+1].Qulity_Improvement));
              val_arr.push(parseInt(data[tabIndex*2].Community_Health)+parseInt(data[tabIndex*2+1].Community_Health));
              val_arr.push(parseInt(data[tabIndex*2].Patient_Health)+parseInt(data[tabIndex*2+1].Patient_Health));
              val_arr.push(parseInt(data[tabIndex*2].Peformance)+parseInt(data[tabIndex*2+1].Peformance));
              val_arr.push(parseInt(data[tabIndex*2].Competence)+parseInt(data[tabIndex*2+1].Competence));
              val_arr.push(parseInt(data[tabIndex*2].Learning)+parseInt(data[tabIndex*2+1].Learning));
              val_arr.push(parseInt(data[tabIndex*2].Satisfaction)+parseInt(data[tabIndex*2+1].Satisfaction));
              val_arr.push(parseInt(data[tabIndex*2].Participation)+parseInt(data[tabIndex*2+1].Participation));
            }else if(GrantInd == 1){
              val_arr.push(parseInt(data[tabIndex*2].Qulity_Improvement));
              val_arr.push(parseInt(data[tabIndex*2].Community_Health));
              val_arr.push(parseInt(data[tabIndex*2].Patient_Health));
              val_arr.push(parseInt(data[tabIndex*2].Peformance));
              val_arr.push(parseInt(data[tabIndex*2].Competence));
              val_arr.push(parseInt(data[tabIndex*2].Learning));
              val_arr.push(parseInt(data[tabIndex*2].Satisfaction));
              val_arr.push(parseInt(data[tabIndex*2].Participation));
            }else{
              val_arr.push(parseInt(data[tabIndex*2+1].Qulity_Improvement));
              val_arr.push(parseInt(data[tabIndex*2+1].Community_Health));
              val_arr.push(parseInt(data[tabIndex*2+1].Patient_Health));
              val_arr.push(parseInt(data[tabIndex*2+1].Peformance));
              val_arr.push(parseInt(data[tabIndex*2+1].Competence));
              val_arr.push(parseInt(data[tabIndex*2+1].Learning));
              val_arr.push(parseInt(data[tabIndex*2+1].Satisfaction));
              val_arr.push(parseInt(data[tabIndex*2+1].Participation));
            }

            var clip_height = height/(Cnt+2);
            var rect_height = clip_height/8*7;
            var margin = clip_height/8;
            var i;
            var max_val = val_arr[0];
            for(i = 1; i < val_arr.length; i++){
              if(max_val < val_arr[i]) max_val = val_arr[i];
            }
            for(i = 0; i < Cnt; i++){
              var y = (rect_height+margin)*i + margin*2;
              var fontSize = rect_height/2;
              var x = StartRect;
              svg.append('rect')
                .transition()
                .duration(durationTime)
                .ease("quad")
                .attr('x',x)
                .attr('y',y)
                .attr('width',maxRectWidth/max_val*val_arr[i])
                .attr('height',rect_height)
                .attr('fill',function(){
                  if(tmp_tabIndex == 0) return GrantColors[tabIndex][i];
                  return defaultTabColor;
                });
              svg.append('text')
                .attr('x',maxRectWidth/max_val*val_arr[i]-fontSize/8+x)
                .attr('y',y+rect_height/4*3)
                .text(numberWithCommas(val_arr[i]))
                .attr('text-anchor','end')
                .attr('font-size',fontSize+'px')
                .style("fill","#fff");
              if(i == 0){
                svg.append('text')
                  .attr('x',x - margin)
                  .attr('y',y+rect_height/4*3)
                  .text(GrantStr[i])
                  .attr('text-anchor','end')
                  .attr('font-size',fontSize+'px')
                  .attr('dy',0);
              }else if(i == 1){
                //The data for our line
                 var lineData = [{ "x": x - margin, "y": y},  { "x": x - margin, "y": y + rect_height},
                                  { "x": x - margin - rect_height/4*3, "y": y + rect_height}, { "x": x - margin, "y": y}];
                 
                 //This is the accessor function we talked about above
                 var lineFunction = d3.svg.line()
                                    .x(function(d) { return d.x; })
                                    .y(function(d) { return d.y; })
                                   .interpolate("linear");
                
                //The line SVG Path we draw
                  svg.append("path")
                      .transition()
                      .duration(durationTime)
                      .ease("quad")
                      .attr("d", lineFunction(lineData))
                      .attr("fill", GrantColors[tmp_tabIndex][i]);
                svg.append('text')
                  .attr('x',x - margin*2 - rect_height/4*3)
                  .attr('y',y+rect_height/4*3)
                  .text(GrantStr[i])
                  .attr('text-anchor','end')
                  .attr('font-size',fontSize+'px')
                  .attr('dy',0);
              }else if(i > 1){
                //The data for our line
                 var lineData = [{ "x": x - margin, "y": y},  { "x": x - margin, "y": y + rect_height},
                                  { "x": x - margin - rect_height/4*3*i, "y": y + rect_height},
                                  { "x": x - margin - rect_height/4*3*(i-1), "y": y},{ "x": x - margin, "y": y}];
                 
                 //This is the accessor function we talked about above
                 var lineFunction = d3.svg.line()
                                    .x(function(d) { return d.x; })
                                    .y(function(d) { return d.y; })
                                   .interpolate("linear");
                
                //The line SVG Path we draw
                  svg.append("path")
                      .transition()
                      .duration(durationTime)
                      .ease("quad")
                      .attr("d", lineFunction(lineData))
                      .attr("fill", GrantColors[tmp_tabIndex][i]);
                svg.append('text')
                  .attr('x',x - margin*2 - rect_height/4*3*i)
                  .attr('y',y+rect_height/4*3)
                  .text(GrantStr[i])
                  .attr('text-anchor','end')
                  .attr('font-size',fontSize+'px')
                  .attr('dy',0);
              }
            }
            tabIndex = tmp_tabIndex;
            if(tabIndex != 0){
              var val_arr = [];

              if(GrantInd == 0){
                val_arr.push(parseInt(data[tabIndex*2].Qulity_Improvement)+parseInt(data[tabIndex*2+1].Qulity_Improvement));
                val_arr.push(parseInt(data[tabIndex*2].Community_Health)+parseInt(data[tabIndex*2+1].Community_Health));
                val_arr.push(parseInt(data[tabIndex*2].Patient_Health)+parseInt(data[tabIndex*2+1].Patient_Health));
                val_arr.push(parseInt(data[tabIndex*2].Peformance)+parseInt(data[tabIndex*2+1].Peformance));
                val_arr.push(parseInt(data[tabIndex*2].Competence)+parseInt(data[tabIndex*2+1].Competence));
                val_arr.push(parseInt(data[tabIndex*2].Learning)+parseInt(data[tabIndex*2+1].Learning));
                val_arr.push(parseInt(data[tabIndex*2].Satisfaction)+parseInt(data[tabIndex*2+1].Satisfaction));
                val_arr.push(parseInt(data[tabIndex*2].Participation)+parseInt(data[tabIndex*2+1].Participation));
              }else if(GrantInd == 1){
                val_arr.push(parseInt(data[tabIndex*2].Qulity_Improvement));
                val_arr.push(parseInt(data[tabIndex*2].Community_Health));
                val_arr.push(parseInt(data[tabIndex*2].Patient_Health));
                val_arr.push(parseInt(data[tabIndex*2].Peformance));
                val_arr.push(parseInt(data[tabIndex*2].Competence));
                val_arr.push(parseInt(data[tabIndex*2].Learning));
                val_arr.push(parseInt(data[tabIndex*2].Satisfaction));
                val_arr.push(parseInt(data[tabIndex*2].Participation));
              }else{
                val_arr.push(parseInt(data[tabIndex*2+1].Qulity_Improvement));
                val_arr.push(parseInt(data[tabIndex*2+1].Community_Health));
                val_arr.push(parseInt(data[tabIndex*2+1].Patient_Health));
                val_arr.push(parseInt(data[tabIndex*2+1].Peformance));
                val_arr.push(parseInt(data[tabIndex*2+1].Competence));
                val_arr.push(parseInt(data[tabIndex*2+1].Learning));
                val_arr.push(parseInt(data[tabIndex*2+1].Satisfaction));
                val_arr.push(parseInt(data[tabIndex*2+1].Participation));
              }
              
              for(i = 0; i < Cnt; i++){
                var y = (rect_height+margin)*i + margin*2;
                var fontSize = rect_height/2;
                var x = StartRect;
                var width = maxRectWidth/max_val*val_arr[i];
                svg.append('rect')
                  .transition()
                  .duration(durationTime)
                  .ease("quad")
                  .attr('x',x)
                  .attr('y',y)
                  .attr('width',width)
                  .attr('height',rect_height)
                  .attr('fill',function(){
                    return GrantColors[tabIndex][i];
                  });
                svg.append('text')
                  .attr('x',width-fontSize/8+x)
                  .attr('y',y+rect_height/4*3)
                  .text(numberWithCommas(val_arr[i]))
                  .attr('text-anchor',function(){
                    if(width < fontSize) return 'middle';
                    return 'end';
                  })
                  .attr('font-size',fontSize+'px')
                  .style("fill","#fff");
              }
            }

          // Bottom Featured Buttons
        
            var btWidth = rect_height * 3;
            var btHeight = rect_height/4*3;
            var fontSize = rect_height/2;
            var btnRectcolor = TabColors[tabIndex];
            svg.append('rect')
              .attr('rx',btHeight/5)
              .attr('ry',btHeight/5)
              .attr('x',StartRect - btWidth/2 + (margin+btWidth)*(0-1))
              .attr('y',height - rect_height/2*3)
              .attr('width',btWidth)
              .attr('height',btHeight)
              .attr('fill',function(){
                if(GrantInd == 0) return btnRectcolor;
                return defaultTabColor;
              })
              .style('cursor','pointer')
              .on('click',function(){
                durationTime = constdurationTime;
                GrantInd = 0;
                DrawGrantChart();
              });
            svg.append('text')
              .attr('x',StartRect + (margin+btWidth)*(0-1))
              .attr('y',height - rect_height/2*3 + fontSize/8*9)
              .attr('text-anchor','middle')
              .text(BtnStr[0])
              .style('font-size',rect_height/2+"px")
              .style('cursor','pointer')
              .on('click',function(){
                durationTime = constdurationTime;
                GrantInd = 0;
                DrawGrantChart();
              });

            svg.append('rect')
              .attr('rx',btHeight/5)
              .attr('ry',btHeight/5)
              .attr('x',StartRect - btWidth/2)
              .attr('y',height - rect_height/2*3)
              .attr('width',btWidth)
              .attr('height',btHeight)
              .attr('fill',function(){
                if(GrantInd == 1) return btnRectcolor;
                return defaultTabColor;
              })
              .style('cursor','pointer')
              .on('click',function(){
                durationTime = constdurationTime;
                GrantInd = 1;
                DrawGrantChart();
              });
            svg.append('text')
              .attr('x',StartRect)
              .attr('y',height - rect_height/2*3 + fontSize/8*9)
              .attr('text-anchor','middle')
              .text(BtnStr[1])
              .style('font-size',rect_height/2+"px")
              .style('cursor','pointer')
              .on('click',function(){
                durationTime = constdurationTime;
                GrantInd = 1;
                DrawGrantChart();
              });

            svg.append('rect')
              .attr('rx',btHeight/5)
              .attr('ry',btHeight/5)
              .attr('x',StartRect - btWidth/2 + (margin+btWidth))
              .attr('y',height - rect_height/2*3)
              .attr('width',btWidth)
              .attr('height',btHeight)
              .attr('fill',function(){
                if(GrantInd == 2) return btnRectcolor;
                return defaultTabColor;
              })
              .style('cursor','pointer')
              .on('click',function(){
                durationTime = constdurationTime;
                GrantInd = 2;
                DrawGrantChart();
              });
            svg.append('text')
              .attr('x',StartRect + (margin+btWidth))
              .attr('y',height - rect_height/2*3 + fontSize/8*9)
              .attr('text-anchor','middle')
              .text(BtnStr[2])
              .style('font-size',rect_height/2+"px")
              .style('cursor','pointer')
              .on('click',function(){
                durationTime = constdurationTime;
                GrantInd = 2;
                DrawGrantChart();
              });
          });
    }

    function type(d) {
      d.Total = +d.Total;
      return d;
    }

    return GrantChart;
})();