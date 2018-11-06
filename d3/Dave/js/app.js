// Save map
var mapStore;

var map;
var selectedId = -1;
var mousedown_flag = false;
var mousePosX, mousePosY;
var circleRate = 20000;

var map;
var all_data;
var selected_year = 1990;
var centerpos;

function initialize() {


  $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=Ottawa&sensor=false', null, function (centerpt) {
    console.log(selected_year);
    centerpos = centerpt;
    d3.csv('data/data.csv',function(error, data){
      var i;
      all_data = data;
      getPos(0, data);
    });
  });  
}

function getPos(ind, data){
  if(ind == data.length){
    drawMap();
  }else{
    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+data[ind].Code+'&sensor=false', null, function (pos) {
      all_data[ind].pos = pos.results[0].geometry.location;
      all_data[ind].color = getRandomColor();
      getPos(ind+1, data);
    });        
  }
}
function getId(code){
  str = code.replace(/\s/g, '');
  return str;
}
function setDialogPosition(){
  if(selectedId != -1){
    var x = $('#'+selectedId).offset().left;
    var y = $('#'+selectedId).offset().top;
    var left = x - $('.dialog').width()/2;
    var top = y - $('.dialog').height();
    $('.dialog').css("left",left+"px");
    $('.dialog').css("top",top+"px");
  }
}
function drawMap(){
  $('#map_canvas').html('');
      
  var p = centerpos.results[0].geometry.location
  var latlng = new google.maps.LatLng(p.lat, p.lng);      
  var mapOptions = {
      center: latlng,
      zoom: 11,
      zoomControl: true,
      zoomControlOptions: {
          style: google.maps.ZoomControlStyle.DEFAULT,
      },
      disableDoubleClickZoom: true,
      mapTypeControl: true,
      mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      },
      scaleControl: true,
      scrollwheel: true,
      panControl: true,
      streetViewControl: false,
      draggable : true,
      overviewMapControl: true,
      overviewMapControlOptions: {
          opened: false,
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {

          "featureType": "water",

          "elementType": "geometry.fill",

          "stylers": [

            { "color": "#d3d3d3" }

          ]

        },{

          "featureType": "transit",

          "stylers": [

            { "color": "#808080" },

            { "visibility": "off" }

          ]

        },{

          "featureType": "road.highway",

          "elementType": "geometry.stroke",

          "stylers": [

            { "visibility": "on" },

            { "color": "#b3b3b3" }

          ]

        },{

          "featureType": "road.highway",

          "elementType": "geometry.fill",

          "stylers": [

            { "color": "#ffffff" }

          ]

        },{

          "featureType": "road.local",

          "elementType": "geometry.fill",

          "stylers": [

            { "visibility": "on" },

            { "color": "#ffffff" },

            { "weight": 1.8 }

          ]

        },{

          "featureType": "road.local",

          "elementType": "geometry.stroke",

          "stylers": [

            { "color": "#d7d7d7" }

          ]

        },{

          "featureType": "poi",

          "elementType": "geometry.fill",

          "stylers": [

            { "visibility": "on" },

            { "color": "#ebebeb" }

          ]

        },{

          "featureType": "administrative",

          "elementType": "geometry",

          "stylers": [

            { "color": "#a7a7a7" }

          ]

        },{

          "featureType": "road.arterial",

          "elementType": "geometry.fill",

          "stylers": [

            { "color": "#ffffff" }

          ]

        },{

          "featureType": "road.arterial",

          "elementType": "geometry.fill",

          "stylers": [

            { "color": "#ffffff" }

          ]

        },{

          "featureType": "landscape",

          "elementType": "geometry.fill",

          "stylers": [

            { "visibility": "on" },

            { "color": "#efefef" }

          ]

        },{

          "featureType": "road",

          "elementType": "labels.text.fill",

          "stylers": [

            { "color": "#696969" }

          ]

        },{

          "featureType": "administrative",

          "elementType": "labels.text.fill",

          "stylers": [

            { "visibility": "on" },

            { "color": "#737373" }

          ]

        },{

          "featureType": "poi",

          "elementType": "labels.icon",

          "stylers": [

            { "visibility": "off" }

          ]

        },{

          "featureType": "poi",

          "elementType": "labels",

          "stylers": [

            { "visibility": "off" }

          ]

        },{

          "featureType": "road.arterial",

          "elementType": "geometry.stroke",

          "stylers": [

            { "color": "#d6d6d6" }

          ]

        },{

          "featureType": "road",

          "elementType": "labels.icon",

          "stylers": [

            { "visibility": "off" }

          ]

        },{

        },{

          "featureType": "poi",

          "elementType": "geometry.fill",

          "stylers": [

            { "color": "#dadada" }

          ]

        }
      ]
  };

    // Display a map on the page
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  var overlay = new google.maps.OverlayView();

  // Add the container when the overlay is added to the map.
  overlay.onAdd = function() {
    var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
        .attr("class", "stations");

    // Draw each marker as a separate SVG element.
    // We could use a single SVG, but what size would it have?
    overlay.draw = function() {
      var projection = this.getProjection();

      var marker = layer.selectAll("svg")
          .data(d3.entries(all_data))
          .each(transform) // update existing markers
        .enter().append("svg")
          .each(transform)
          .attr("class", "marker")
          .attr("width", function(d){
            var val = 0;
            $.map(d.value, function(item, key){
              if(key == 'y'+selected_year){
                val = parseFloat(item);
              }
            });
            return val/circleRate*2;
          })
          .attr("height", function(d){
            var val = 0;
            $.map(d.value, function(item, key){
              if(key == 'y'+selected_year){
                val = parseFloat(item);
              }
            });
            return val/circleRate*2;
          })
          .attr('id',function(d){
            return getId(d.value.Code);
          });


      // Add a circle.
      marker.append("circle")
        .attr("r", function(d){
            var val = 0;
            $.map(d.value, function(item, key){
              if(key == 'y'+selected_year){
                val = parseFloat(item);
              }
            });
            return val/circleRate;
        })
        .attr("fill",function(d){
          return d.value.color;
        })
        .attr("cx", function(d){
            var val = 0;
            $.map(d.value, function(item, key){
              if(key == 'y'+selected_year){
                val = parseFloat(item);
              }
            });
            return val/circleRate;
        })
        .attr("cy", function(d){
            var val = 0;
            $.map(d.value, function(item, key){
              if(key == 'y'+selected_year){
                val = parseFloat(item);
              }
            });
            return val/circleRate;
        })
        .style("cursor","pointer")
        .style('stroke-width',0)
        .attr('opacity',0.8)
        .attr('class','dotinfo')
        .on("click",function(d){
          selectedId = getId(d.value.Code);
          var r = 15;
          var x = d3.event.clientX;
          var y = d3.event.clientY;
          $('.dialog .name').html(d.value.Name);
          $('.dialog .street').html(d.value.Street);
          $('.dialog .road').html(d.value.Road);
          $('.dialog .city').html(d.value.City);
          setDialogPosition();
          $('.dialog').show();
        });

      function transform(d) {
          var p = d.value.pos;
          var val = 0;
          $.map(d.value, function(item, key){
            if(key == 'y'+selected_year){
              val = parseFloat(item);
            }
          });
          var padding = val/circleRate;
          d = new google.maps.LatLng(p.lat, p.lng);
          d = projection.fromLatLngToDivPixel(d);
          return d3.select(this)
              .style("left", (d.x - padding) + "px")
              .style("top", (d.y - padding) + "px");
      }
    };
  };

  // Bind our overlay to the map…
  overlay.setMap(map);  

   var bermudaTriangleCoords = [
        new google.maps.LatLng(70.0187,-141.0205),
        new google.maps.LatLng(70.1292,-141.7291),
        new google.maps.LatLng(70.4515,-144.8163),
        new google.maps.LatLng(70.7471,-148.4583),
        new google.maps.LatLng(70.7923,-151.1609),
        new google.maps.LatLng(71.1470,-152.6221),
        new google.maps.LatLng(71.1185,-153.9954),
        new google.maps.LatLng(71.4307,-154.8853),
        new google.maps.LatLng(71.5232,-156.7529),
        new google.maps.LatLng(71.2796,-157.9449),
        new google.maps.LatLng(71.2249,-159.6313),
        new google.maps.LatLng(70.6363,-161.8671),
        new google.maps.LatLng(70.0843,-163.5809),
        new google.maps.LatLng(69.3028,-165.2399),
        new google.maps.LatLng(69.1782,-166.8768),
        new google.maps.LatLng(68.3344,-168.0414),
        new google.maps.LatLng(67.6844,-165.9155),
        new google.maps.LatLng(67.2933,-164.6082),
        new google.maps.LatLng(66.7789,-164.0149),
        new google.maps.LatLng(66.5810,-165.7507),
        new google.maps.LatLng(66.2867,-167.5745),
        new google.maps.LatLng(66.0269,-168.9862),
        new google.maps.LatLng(65.4970,-168.9478),
        new google.maps.LatLng(65.0420,-167.4756),
        new google.maps.LatLng(64.3922,-167.0142),
        new google.maps.LatLng(64.0554,-165.7343),
        new google.maps.LatLng(64.0193,-163.2294),
        new google.maps.LatLng(63.9615,-162.1143),
        new google.maps.LatLng(63.6877,-163.6029),
        new google.maps.LatLng(63.4530,-165.3717),
        new google.maps.LatLng(62.4133,-166.3715),
        new google.maps.LatLng(61.6534,-166.9867),
        new google.maps.LatLng(60.8556,-166.4429),
        new google.maps.LatLng(60.5357,-167.8381),
        new google.maps.LatLng(59.5482,-167.7118),
        new google.maps.LatLng(59.4115,-165.8002),
        new google.maps.LatLng(59.3696,-164.5972),
        new google.maps.LatLng(59.1168,-162.8558),
        new google.maps.LatLng(58.1185,-162.5427),
        new google.maps.LatLng(58.1359,-160.6421),
        new google.maps.LatLng(58.0285,-159.5050),
        new google.maps.LatLng(57.6336,-158.8953),
        new google.maps.LatLng(56.9090,-159.9060),
        new google.maps.LatLng(56.3926,-160.6531),
        new google.maps.LatLng(56.2342,-161.8835),
        new google.maps.LatLng(55.7240,-162.9822),
        new google.maps.LatLng(55.2478,-164.3994),
        new google.maps.LatLng(54.7753,-165.3168),
        new google.maps.LatLng(54.1463,-167.1075),
        new google.maps.LatLng(53.5632,-168.5852),
        new google.maps.LatLng(53.1402,-169.9146),
        new google.maps.LatLng(52.5964,-169.5959),
        new google.maps.LatLng(52.9089,-168.2227),
        new google.maps.LatLng(54.2139,-162.7734),
        new google.maps.LatLng(54.6786,-159.1452),
        new google.maps.LatLng(55.6567,-155.4634),
        new google.maps.LatLng(57.3510,-152.1400),
        new google.maps.LatLng(59.2209,-150.8203),
        new google.maps.LatLng(59.7695,-147.4461),
        new google.maps.LatLng(60.3521,-145.9850),
        new google.maps.LatLng(59.8917,-144.1544),
        new google.maps.LatLng(59.8172,-141.6811),
        new google.maps.LatLng(59.5225,-140.5124),
        new google.maps.LatLng(59.0292,-138.8548),
        new google.maps.LatLng(57.9032,-136.8526),
        new google.maps.LatLng(56.9157,-136.0725),
        new google.maps.LatLng(56.1555,-134.9794),
        new google.maps.LatLng(55.3237,-134.0057),
        new google.maps.LatLng(54.6341,-133.6418),
        new google.maps.LatLng(54.7135,-130.6261),
        new google.maps.LatLng(55.2869,-129.9930),
        new google.maps.LatLng(55.9869,-130.0108),
        new google.maps.LatLng(56.1057,-130.1083),
        new google.maps.LatLng(56.6086,-131.5887),
        new google.maps.LatLng(57.8404,-132.8755),
        new google.maps.LatLng(58.7276,-133.8423),
        new google.maps.LatLng(59.3108,-134.9121),
        new google.maps.LatLng(59.8020,-135.4724),
        new google.maps.LatLng(59.6039,-136.3445),
        new google.maps.LatLng(59.1619,-136.8251),
        new google.maps.LatLng(59.2441,-137.6079),
        new google.maps.LatLng(60.0902,-139.2119),
        new google.maps.LatLng(60.3575,-139.0938),
        new google.maps.LatLng(60.1866,-140.0056),
        new google.maps.LatLng(60.3059,-140.9999),
        new google.maps.LatLng(70.0187,-141.0205)
    ];    
    var bermudaTriangle = new google.maps.Polygon({
      paths: bermudaTriangleCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });
  bermudaTriangle.setMap(map);    // Assuming map is your google.maps.Map object
}
function getRandomColor(){
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}