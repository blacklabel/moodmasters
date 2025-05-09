const bubbleChartAnimation = function(time) {
  const chart = this, dataVariables = this.dataVariables;

  const sortedData = dataVariables.histogramBestBoulder.sort((function(index){
    return function(a, b){
        return (a[index] === b[index] ? 0 : (a[index] > b[index] ? -1 : 1));
    }

  })(1));


	chart.updatePipeline = chart.updatePipeline || {
    500: function () {
      $('.swiper-title').text('Zapytaliśmy Was, który problem podobał Wam się najbardziej');
      $('.swiper-title').fadeIn(1000);
    },
		1000: function () {
      $('.swiper-subtitle').text('Wyniki nas nie zaskoczyły');
      $('.swiper-subtitle').fadeIn(1000);
		},
		5000: function() {
      $('.swiper-label').text( 'Ale zanim Wam je pokażemy, \n chcemy jeszcze raz podziękować, że byliście z nami');
      $('.swiper-label').fadeIn(1000);
		},
		10000: function() {

      $('.swiper-subtitle').fadeOut(1000);
      $('.swiper-label').fadeOut(1000);

      chart.addSeries({
          minSize: '30%',
          maxSize: '100%',
          color: 'rgb(237,	237,	237)', //'rgb(118,	246,	81)', 'rgb(70,70,70)'
          type: 'packedbubble',
          name: 'Ulubione bouldery',
          tooltip:{
            pointFormat: 'Boulder {name}: {value} głosów'
          },
          marker:{
            fillOpacity: 1,
            lineColor: 'rgb(118,	246,	81)'
          },
          layoutAlgorithm: {
            gravitationalConstant: 0.005
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            style: {
              textOutline: "none",
              fontWeight: 'normal'
            }
          },
          data: sortedData.map(function(p){
            return[p[0], 1]
          }),
          keys: ['name', 'value']
        });
		},
		13000: function(){
      $('.swiper-label').text( 'Wasze ulubione 3 bouldery to:');
      $('.swiper-label').fadeIn(1000);
		},
		16000: function() {
			chart.update({tooltip:{
        enabled: true
      }}, false);
      chart.series[0].update({ data: sortedData });
      for(var i = 0; i <= 2; i++) {
        chart.series[0].data[i].update({
          color: 'rgb(118,	246,	81)',
          marker:{
            fillColor: 'rgb(118,	246,	81)'
          }
        });
      }
      $('.swiper-label').text(
        'Wasze ulubione 3 bouldery to: ' +
        chart.series[0].data[0].name + ', ' +
        chart.series[0].data[1].name + ' i ' +
        chart.series[0].data[2].name
      );
		},
		24000: function() {
      $('.swiper-title').fadeOut(1000);
      $('.swiper-subtitle').fadeOut(1000);
      $('.swiper-label').fadeOut(1000);
		},
		25000: function() {
			const swiper = document.querySelector('.swiper').swiper;
			swiper.slideNext();

      const progressCircle = document.querySelector(".autoplay-progress svg");
      const progressCircleBackground = document.querySelector(".autoplay-progress-whole svg");
      const icon = document.querySelector("#icon");

      swiper.timer.stop()
      progressCircle.remove();
      progressCircleBackground.remove();
      icon.remove();
      swiper.keyboard.enable()

      $('.swiper-button-next').css({display:'block'});
      $('.swiper-button-prev').css({display:'block'});
      $('.swiper-title').text("Mood Masters 2025");
      $('.swiper-subtitle').text("Dzięki, że byliście z nami!");
      $('.swiper-title').fadeIn(1000);
      $('.swiper-subtitle').fadeIn(1000);

		}
	}

	// Step 1: Get sorted keys
	chart.timeKeys = chart.timeKeys || Object.keys(chart.updatePipeline).map(Number).sort((a, b) => a - b);
	chart.executedKeys = chart.executedKeys || new Set(); // Step 2: Track executed functions

	checkAndExecuteFunctions(time, chart);

}


function checkAndExecuteFunctions(currentTime, chart) {
	for (let timeKey of chart.timeKeys) {
		if (currentTime >= timeKey && !chart.executedKeys.has(timeKey)) {
			chart.updatePipeline[timeKey](); // Execute function
			chart.executedKeys.add(timeKey); // Mark as executed
		}
	}
}

export const getChart4Options = function (dataVariables) {
    return {
        chart:{
      type: 'packedbubble',
      events: {
            load: function() {
              this.dataVariables = dataVariables;
              this.updateChart = bubbleChartAnimation;
            }
          }
    },
    credits: {
      enabled : false
    },
    tooltip:{
      enabled: false
    },
    title: {
      text: undefined
    },
    legend: {
      enabled: false
    },
    series: []
  }
}