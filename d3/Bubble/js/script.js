function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
  
function drawGraphicBubble(idName, headerName, yearArr, yearNumberArr, mainStrArr, mainNumberArr, colorArr, maxValue, maxHeaderWidth){
    $("#"+idName).html("");
    var svg = d3.select("#"+idName).append("svg")
                .style("width", "100%")
                .style("height", (graphical_bubble_height+yearFontSize*2+legendHeight)+"px");
    var legendG = svg.append("g");
    var axisG = svg.append("g");
    var circleG = svg.append("g");
    var textG = svg.append("g");
    var startY = legendHeight;
    var i, j;
    var x = legendCircleSize*2;
    for(i = 0; i < mainStrArr.length; i++){
        legendG.append("circle")
                .attr("cx", x)
                .attr("cy", legendHeight/2)
                .attr("r", legendCircleSize)
                .attr("fill", colorArr[i]);
        var txt = legendG.append("text")
                .attr("x", x+legendCircleSize*2)
                .attr("y", legendHeight/2+legendFontSize/3)
                .attr("font-size", legendFontSize)
                .text(mainStrArr[i]);
        x += legendCircleSize*4+txt.node().getComputedTextLength();
    }
    var maxX = x;
    var text = svg.append("text")
        .attr("x", 0)
        .attr("y", startY+graphical_bubble_height/2+headerFontSize/3)
        .attr("font-size", headerFontSize)
        .text(headerName);
    x = maxHeaderWidth;
    for(i = 0; i < yearArr.length; i++){
        var flag = false, prevX = x;
        circleG.append("circle")
            .attr("cx", x)
            .attr("cy", startY+graphical_bubble_height/2)
            .attr("r", yearNumberArr[i]/maxValue*graphical_bubble_height/2)
            .attr("fill", "#a797df")
            .attr("opacity", 0.5);
        for(j = 0; j < mainStrArr.length; j++){
            var val = mainNumberArr[i][j];
            if(val > 0){
                var size = graphical_bubble_height/2*val/maxValue;
                var mainG = circleG.append("g")
                            .attr("class", "circleMG")
                            .attr("headerName", headerName)
                            .attr("Value", val)
                            .attr("str", mainStrArr[j])
                            .attr("year", yearArr[i]);
                mainG.append("circle")
                    .attr("cx", x)
                    .attr("cy", startY+graphical_bubble_height/2)
                    .attr("r", size)
                    .attr("fill", colorArr[j]);
                mainG.append("text")
                .attr("x", x)
                .attr("y", startY+graphical_bubble_height/2+circleFontSize/3)
                .attr("font-size", circleFontSize)
                .attr("text-anchor", "middle")
                .text(val);
                x += size;
                flag = true;
            }
        }
        if(flag) {
            textG.append("text")
                .attr("x", prevX)
                .attr("y", startY+graphical_bubble_height+yearFontSize)
                .attr("font-size", yearFontSize)
                .attr("text-anchor", "middle")
                .text(yearArr[i]);
            x += graphical_bubble_height;
        }
    }
    axisG.append("rect")
        .attr("x", maxHeaderWidth)
        .attr("y", startY+graphical_bubble_height/2)
        .attr("width", x-maxHeaderWidth)
        .attr("height", 1)
        .attr("fill", "black");
    var bodyWidth = $('body').width();
    maxX = Math.max(x, maxX);
    if(maxX > bodyWidth) $("body").css("width", maxX+"px");
    var circleMG = circleG.selectAll(".circleMG");
    circleMG.on("mouseover", function() {
        var sel = d3.select(this);
        var headerName  = sel.attr("headerName");
        var Value  = sel.attr("Value");
        var str  = sel.attr("str");
        var year  = sel.attr("year");
        var arr = [headerName, year, str, Value];
        var name = ["Header", "Year", "String", "Value"];
        hoverTooltip(arr, name);
    })					
    .on("mouseout", function(d) {	
        outTooltip();
    });
}

function hoverTooltip(arr, name){
    var html = "";
    for(var q = 0; q < arr.length; q++){
        html += "<div style='padding:5px'><strong>"+name[q]+":</strong> <span style='color:red'>" + arr[q] + "</span></div>";
    }
    var tooltip = d3.select("#tooltip");
    tooltip.transition()		
        .duration(200)		
        .style("opacity", .9);		
    tooltip	.html(html)	
        .style("left", (d3.event.pageX) + "px")		
        .style("top", (d3.event.pageY - 28) + "px");	
}

function outTooltip(){
    var tooltip = d3.select("#tooltip");	
    tooltip.transition()		
        .duration(500)		
        .style("opacity", 0);	
}

function getLatLonfromCity(str, latLonList, val){
    chosenCities = str.split(',');
    for(var i = 0; i < chosenCities.length; i++){
        var k = latLonList[chosenCities[i].toUpperCase().trim()];
        if(typeof(k) == "undefined"){
            return "";
        } else {
            if (k.length > 1) {
                //multiples.push(chosenCities[i].trim());
            }
            for (var z = 0; z < k.length; z++){
                m = k[z];
                return {city: chosenCities[i].trim(), country: m[0], lat: m[1], lon: m[2], val:val};
            }
        }
    }
}

function drawMapBubble(idName, locationData, locationVal, latLonList, maxValue){
    $(idName).html('');
    var width = 800, height = 600;
    var projection = d3.geo.mercator()
        .center([0, 5 ])
        .scale(width/8)
        .translate([width / 2, height / 7 * 4]);

    var svg = d3.select(idName)
        .attr("width", width)
        .attr("height", height);

    var path = d3.geo.path()
        .projection(projection);

    var g = svg.append("g");

    // load and display the World
    d3.json("data/countries.json", function(error, topology) {
        g.selectAll("path")
            .data(topojson.object(topology, topology.objects.countries)
                .geometries)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", "#e3e3e3");
        var data = [];
        for(let i = 0; i < locationData.length; i++){
            var obj = getLatLonfromCity(locationData[i], latLonList, locationVal[i]);
            if(obj != "") data.push(obj);
        }
        g.selectAll("circle")
            .data(data)
            .enter()
            .append("a")
            .attr("xlink:href", function(d) {
                return "https://www.google.com/search?q="+d.country;}
            )
            .append("circle")
            .attr("cx", function(d) {
                    return projection([d.lon, d.lat])[0];
            })
            .attr("cy", function(d) {
                    return projection([d.lon, d.lat])[1];
            })
            .attr("r", function(d){
                return 30*d.val/maxValue;
            })
            .style("fill", "#a797df")
            .style("fill-opacity", 0.5)
            .on("mouseover", function(d){
                var arr = [d.city, d.country, d.val];
                var name = ["City", "Country", "Value"];
                hoverTooltip(arr, name);
            })				
            .on("mouseout", function(d) {	
                outTooltip();
            });
    });

    // zoom and pan
    var zoom = d3.behavior.zoom()
        .on("zoom",function() {
            g.attr("transform","translate("+ 
                d3.event.translate.join(",")+")scale("+d3.event.scale+")");
            g.selectAll("circle")
                .attr("d", path.projection(projection));
            g.selectAll("path")  
                .attr("d", path.projection(projection)); 

      });

    svg.call(zoom);
}