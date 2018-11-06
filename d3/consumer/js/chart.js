function DrawCharts(){
 	RevenuePriceChart("#RevenuePriceChart");
 	AverageRatingChart("#AverageRatingChart");
 	ScoreScoreChart("#ScoreScoreChart");
}

function getJson(json){

	$.getJSON(json,function(data){

		priceVersion_revenue_data = [];
		priceVersion_avgRating_data = [];
		priceVersion_score_data = [];
		revenue_data = [];
		avgRating_data = [];
		score_data = [];
		scoreUp_data = [];
		scoreDown_data = [];
		scoreUpWhite_data = [];
		scoreDownWhite_data = [];
		scoreDownGreen_data = [];
		day_x = [];
		year_x = [];

		var length = data.xAxisLabels.revenue.length;
		var score_interval = 1;
		ticks = 1;

		if(json == "data/year.json"){

			SetYearScoreDownUp(data,length);
			DrawCharts();
			DrawYearDot(data);

		}else{

			SetDayMonthScoreDownUp(data,length,json);
			DrawCharts();
			DrawDayMonthDot(data,length,json);

		}
	});

}