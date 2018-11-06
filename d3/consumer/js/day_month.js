function SetDayMonthScoreDownUp(data,length,json){

    for (i = 0; i < length; i++){

		day_x.push(data.xAxisLabels.revenue[i]);

		tmp_data = {x:i,y:parseFloat(data.xAxisPoints.revenue_price[i]),count:parseInt(data.xAxisPoints.revenue_count[i])};
		revenue_data.push(tmp_data);

		tmp_data = {x:i,y:parseFloat(data.xAxisPoints.avgRating_stars[i]),count:parseInt(data.xAxisPoints.avgRating_count[i])};
		avgRating_data.push(tmp_data);

	}

	for (i = 0; i < length; i++){

		var scoreVal = parseFloat(data.xAxisPoints.score_score[i]);
		
		var scoreUpVal = parseFloat(data.xAxisPoints.score_scoreUp[i]);
		var scoreUpCount = parseFloat(data.xAxisPoints.score_countUp[i]);
		var scoreUpWhiteVal = parseFloat(data.xAxisPoints.score_scoreUp[i]);

		var scoreDownVal = parseFloat(data.xAxisPoints.score_scoreDown[i]);
		var scoreDownCount = parseFloat(data.xAxisPoints.score_countDown[i]);

		year_x.push(data.xAxisLabels.score[i]);

		tmp_data = {x:i,y:scoreVal,score_scoreUp:scoreUpVal+"("+scoreUpCount+")",score_scoreDown:scoreDownVal+"("+scoreDownCount+")"};
		score_data.push(tmp_data);
		if(scoreUpVal != 0){
			if(scoreVal > 0){
				tmp_data = {x:i,y:(scoreUpVal+scoreVal),val:scoreUpVal,count:scoreUpCount};
				scoreUp_data.push(tmp_data);

					tmp_data = {x:i,y:scoreVal};
				scoreUpWhite_data.push(tmp_data);
			}else{
				if(scoreUpVal > -scoreVal){
   					tmp_data = {x:i,y:scoreVal,val:scoreUpVal,count:scoreUpCount};
    				scoreUp_data.push(tmp_data);
   					tmp_data = {x:i,y:scoreVal+scoreUpVal,val:scoreUpVal,count:scoreUpCount};
    				scoreUp_data.push(tmp_data);

				}else{
   					tmp_data = {x:i,y:scoreVal,val:scoreUpVal,count:scoreUpCount};
    				scoreUp_data.push(tmp_data);

   					tmp_data = {x:i,y:(scoreUpVal + scoreVal)};
    				scoreUpWhite_data.push(tmp_data);
				}
			}
		}

		if(scoreDownVal != 0){
			if(scoreVal < 0){
                if(scoreUpVal == 0){
                    tmp_data = {x:i,y:scoreVal};
                    scoreDownWhite_data.push(tmp_data);
                }else{
                    tmp_data = {x:i,y:scoreVal};
                    scoreDownGreen_data.push(tmp_data);
                }
				tmp_data = {x:i,y:scoreDownVal+scoreVal,val:scoreDownVal,count:scoreDownCount};
				scoreDown_data.push(tmp_data);
			}else{
				if(-scoreDownVal > scoreVal){
   					tmp_data = {x:i,y:scoreVal,val:scoreDownVal,count:scoreDownCount};
    				scoreDown_data.push(tmp_data);
   					tmp_data = {x:i,y:scoreVal+scoreDownVal,val:scoreDownVal,count:scoreDownCount};
    				scoreDown_data.push(tmp_data);
				}else{
   					tmp_data = {x:i,y:scoreVal,val:scoreDownVal,count:scoreDownCount};
    				scoreDown_data.push(tmp_data);
   					tmp_data = {x:i,y:(scoreVal+scoreDownVal)};
    				scoreDownWhite_data.push(tmp_data);
				}
			}
		}
	}
}

function DrawDayMonthDot(data,length,json){
	var RevenuePriceChartRating = 1;
	var i = 0;
    $('#RevenuePriceChart .consumer-series-group .consumer-series rect').each(function(){
    	var height = $(this).attr("height");
    	if(height != 0){
    		RevenuePriceChartRating = Math.abs(height/data.xAxisPoints.revenue_price[i]);
    	}
    	i++;
    });

    var notZeroVal = 0;
    var notZeroValIndex = 0, zeroValIndex = 0;
    var real_index = 0;

    for (i = 0; i < length; i++){
    	if(data.xAxisPoints.avgRating_stars[i] == 1){
    		zeroValIndex = real_index;
    		real_index++;
    	}else if(data.xAxisPoints.avgRating_stars[i] != 0){
    		notZeroValIndex = real_index;
    		notZeroVal = data.xAxisPoints.avgRating_stars[i];
    		real_index++;
    	}
    }


	var AverageRatingChartRating = 1;
    i = real_index-1;
    var zeroTopY = 0, notZeroTopY = 0;
    $('#AverageRatingChart .consumer-series-group .consumer-markers path').each(function(){
    	var topY = $(this).offset().top;
    	if(i == zeroValIndex){
    		zeroTopY = topY;
    	}else if(i == notZeroValIndex){
    		notZeroTopY = topY;
    	}
    	i--;
    });

    AverageRatingChartRating = Math.abs(zeroTopY-notZeroTopY)/(notZeroVal-1);
    var StartRatingY = zeroTopY + 3;

    var notZeroVal = 0;
    var notZeroValIndex = 0, zeroValIndex = 0;

    for (i = 0; i < length; i++){
    	if(data.xAxisPoints.score_score[i]+data.xAxisPoints.score_scoreUp[i] == 0){
    		zeroValIndex = i;
    	}else{
    		notZeroValIndex = i;
    		notZeroVal = data.xAxisPoints.score_score[i]+data.xAxisPoints.score_scoreUp[i];
    	}
    }

	var ScoreChartRating = 1;
    i = length-1;
    var zeroTopY = 0, notZeroTopY = 0;
    $('#ScoreScoreChart .consumer-series-group .consumer-markers.consumer-series-5 path').each(function(){
    	var topY = $(this).offset().top;
    	if(i == zeroValIndex){
    		zeroTopY = topY;
    	}else if(i == notZeroValIndex){
    		notZeroTopY = topY;
    	}
    	i--;
    });

    ScoreChartRating = (zeroTopY-notZeroTopY)/notZeroVal;
    StartScoreY = zeroTopY+3;

    var DeltaPriceX = parseFloat($('#RevenuePriceChart .consumer-axis-labels text:eq(1)').attr("x")) - parseFloat($('#RevenuePriceChart .consumer-axis-labels text:eq(0)').attr("x"));
    var StartPriceX = parseFloat($('#RevenuePriceChart .consumer-axis').offset().left+DeltaPriceX/2);
    var StartPriceY = parseFloat($('#RevenuePriceChart .consumer-axis').offset().top);

    var DeltaRatingX = parseFloat($('#AverageRatingChart .consumer-axis-labels text:eq(1)').attr("x")) - parseFloat($('#AverageRatingChart .consumer-axis-labels text:eq(0)').attr("x"));
    var StartRatingX = parseFloat($('#AverageRatingChart .consumer-axis').offset().left)+DeltaRatingX/2;

    var DeltaScoreX = parseFloat($('#ScoreScoreChart .consumer-axis-labels text:eq(1)').attr("x")) - parseFloat($('#ScoreScoreChart .consumer-axis-labels text:eq(0)').attr("x"));
    var StartScoreX = parseFloat($('#ScoreScoreChart .consumer-axis').offset().left)+DeltaScoreX/2;

    $('#AverageRatingChart .consumer-axis-labels.consumer-xaxis-labels text').each(function(){
        var x = parseFloat($(this).attr("x"));
        var y = parseFloat($(this).attr("y"));
        $(this).attr("x",x+DeltaPriceX/2);
        $(this).attr("y",y+DeltaPriceX/2);
    });

    $('#RevenuePriceChart .consumer-axis-labels.consumer-xaxis-labels text').each(function(){
        var x = parseFloat($(this).attr("x"));
        var y = parseFloat($(this).attr("y"));
        $(this).attr("x",x+DeltaRatingX/2);
        $(this).attr("y",y+DeltaRatingX/2);
    });

    $('#ScoreScoreChart .consumer-axis-labels.consumer-xaxis-labels text').each(function(){
        var x = parseFloat($(this).attr("x"));
        var y = parseFloat($(this).attr("y"));
        $(this).attr("x",x+DeltaScoreX/2);
        $(this).attr("y",y+DeltaScoreX/2);
    });

    if(json == "data/month.json"){
        $('#ScoreScoreChart .consumer-series-group .consumer-series.consumer-series-0.consumer-tracker rect').each(function(){
            var x = parseFloat($(this).attr("x"));
            $(this).attr("x",x+4);
        });   

        $('#ScoreScoreChart .consumer-series-group .consumer-series.consumer-series-1.consumer-tracker rect').each(function(){
            var x = parseFloat($(this).attr("x"));
            $(this).attr("x",x+1.2);
        });
    }else{
        $('#ScoreScoreChart .consumer-series-group .consumer-series.consumer-series-0.consumer-tracker rect').each(function(){
            var x = parseFloat($(this).attr("x"));
            $(this).attr("x",x+4);
        });   
        $('#ScoreScoreChart .consumer-series-group .consumer-series.consumer-series-4.consumer-tracker rect').each(function(){
            var x = parseFloat($(this).attr("x"));
            $(this).attr("x",x-2);
        });   

        $('#ScoreScoreChart .consumer-series-group .consumer-series.consumer-series-1.consumer-tracker rect').each(function(){
            var x = parseFloat($(this).attr("x"));
            $(this).attr("x",x+4);
        });
    }

    $('#ScoreScoreChart .consumer-series-group .consumer-series.consumer-series-2.consumer-tracker rect').each(function(){
        var x = parseFloat($(this).attr("x"));
        $(this).attr("x",x-1.5);
    });
    $('#ScoreScoreChart .consumer-series-group .consumer-series.consumer-series-3.consumer-tracker rect').each(function(){
        var x = parseFloat($(this).attr("x"));
        $(this).attr("x",x-4);
    });
    $('#ScoreScoreChart .consumer-series-group .consumer-series.consumer-series-4.consumer-tracker rect').each(function(){
        var x = parseFloat($(this).attr("x"));
        $(this).attr("x",x-5);
    });

    var textY  = parseFloat($('#AverageRatingChart .consumer-axis text').attr("y"));
    $('#AverageRatingChart .consumer-axis text').attr("y",textY-20);
    var textY  = parseFloat($('#RevenuePriceChart .consumer-axis text').attr("y"));
    $('#RevenuePriceChart .consumer-axis text').attr("y",textY - 10);
    



	for (i = 0; i < length; i++){

		if(parseFloat(data.xAxisPoints.priceVersion_revenue_price[i]) != 0){

        	var barValue = data.xAxisPoints.revenue_price[i];
        	var barHeight = barValue * RevenuePriceChartRating;
	        var posX = i*DeltaPriceX + StartPriceX;
	        var posY = StartPriceY - barHeight - VerticalLineHeight;
	        
    		var verticalLine = "<div style='position:absolute;left:"+posX+"px;top:"+posY+"px' class='verticalLine'>"+"</div>";
    		$('#added_div').append(verticalLine);

			for(j = 0; j < data.xAxisPoints.priceVersion_revenue_price[i].length; j++){
				textPosX = posX+3;
				textPosY = posY+j*13;
				var text = "<label style='font-size:10px;position:absolute;left:"+textPosX+"px;top:"+textPosY+"px'>"+data.xAxisPoints.priceVersion_revenue_price[i][j]+"</label>";;
	        	$('#added_div').append(text);
			}
		}

		if(parseFloat(data.xAxisPoints.priceVersion_avgRating_price[i]) != 0){

        	var barValue = data.xAxisPoints.avgRating_stars[i];
        	if(barValue >= 1) barValue--;
        	var barHeight = barValue * AverageRatingChartRating;
	        var posX = i*DeltaRatingX + StartRatingX;
	        var posY = StartRatingY - barHeight - VerticalLineHeight;
	        if(data.xAxisPoints.avgRating_stars[i]>= 1) posY -= 3;

	        var verticalLine = "<div style='position:absolute;left:"+posX+"px;top:"+posY+"px' class='verticalLine'>"+"</div>";
	        $('#added_div').append(verticalLine);

			for(j = 0; j < data.xAxisPoints.priceVersion_avgRating_price[i].length; j++){
				textPosX = posX+3;
				textPosY = posY+j*13;
				var text = "<label style='font-size:10px;position:absolute;left:"+textPosX+"px;top:"+textPosY+"px'>"+data.xAxisPoints.priceVersion_avgRating_price[i][j]+"</label>";;
	        	$('#added_div').append(text);
			}
		}

		if(parseFloat(data.xAxisPoints.priceVersion_score_price[i]) != 0){
			
        	var barValue = data.xAxisPoints.score_score[i]+data.xAxisPoints.score_scoreUp[i];
        	var barHeight = barValue * ScoreChartRating;
			var posX = i*DeltaScoreX + StartScoreX;
        	var posY = StartScoreY - barHeight - VerticalLineHeight;

    		var verticalLine = "<div style='position:absolute;left:"+posX+"px;top:"+posY+"px' class='verticalLine'>"+"</div>";
    		$('#added_div').append(verticalLine);
			for(j = 0; j < data.xAxisPoints.priceVersion_score_price[i].length; j++){
				textPosX = posX+3;
				textPosY = posY+j*13;
				var text = "<label style='font-size:10px;position:absolute;left:"+textPosX+"px;top:"+textPosY+"px'>"+data.xAxisPoints.priceVersion_score_price[i][j]+"</label>";;
	        	$('#added_div').append(text);
			}
		}
	}
}