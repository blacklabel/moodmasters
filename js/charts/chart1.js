const histogramChartAnimation = function(time) {
	const chart = this;

	let point = chart.series[0].data[0];

	chart.series[0].data.forEach(function (p) {
    if (point.y < p.y) {
      point = p;
    }
  });

	chart.updatePipeline = chart.updatePipeline || {
		500: function () {
			$('.swiper-title').text("Jak wygląda rozkład wieku uczestników?");
			$('.swiper-title').fadeIn(1000);
		},
		2000: function () {
			point.setState('hover', {duration: 10000});
			$('.swiper-subtitle').text('Aż ' + point.y + " z Was było w wieku " + point.x + " lat, niesamowite!");
			$('.swiper-subtitle').fadeIn(1000);
		},
		5000: function() {
			$('.swiper-label').text("Przyjrzyjmy się trochę \n bliżej popularnym przedziałom");
			$('.swiper-label').fadeIn(1000);
			$('.swiper-subtitle').fadeOut(2000);
		},
		7000: function() {
			point.setState()
			chart.xAxis[0].setExtremes(35,44);
			chart.xAxis[0].update({
				labels:{
					step: 1
				}
			});
			chart.series[0].update({
				stacking: 'normal',
				groupPadding: 0,
				dataLabels: {
					enabled: true,
					style:{
						textOutline: 'none',
						fontWeight: 'normal',
						color: 'rgb(237,	237,	237)'
					},
					y: -chart.plotHeight + 20,
					verticalAlign: 'bottom',
				}
			});
		},
		10000: function(){
			chart.xAxis[0].setExtremes(25,34);
		},
		13000: function(){
			chart.xAxis[0].setExtremes(15,24);
		},
		16000: function() {
			$('.swiper-label').fadeOut(2000);
			$('.swiper-subtitle').text('Za ile lat pierwszy zwycięzca \n Mood Masters z przedziału 2010-2020?');
			$('.swiper-subtitle').fadeIn(1000);
			chart.xAxis[0].setExtremes(5,14);
		},
		20000: function() {
			chart.xAxis[0].setExtremes(null,null);
			chart.xAxis[0].update({
				labels:{
					step: undefined
				}
			});
			chart.series[0].update({
				groupPadding: 0.1,
				dataLabels: {
					enabled: false,
				}
			});
			chart.update({
				chart:{
				zooming: {
				type: 'x'
				}}
			})
			$('.swiper-subtitle').fadeOut(2000);
		},
		24000: function() {
			$('.swiper-title').fadeOut(1000);
		},
		25000: function() {
			const swiper = document.querySelector('.swiper').swiper;
			swiper.slideNext();
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

export const getChart1Options = function (dataVariables) {
  return {
    chart:{
		animation: {
			duration: 1500,
			easing: 'easeOutCirc'
		},
      type: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0)',
      events: {
        load: function() {
          this.updateChart = histogramChartAnimation;
        }
      }
    },
    credits: {
      enabled : false
    },
    legend: {
      enabled: false
    },
    xAxis:{
      reversed: false,
      categories: true,
      lineWidth: 0,
			title:{
				text: 'Wiek'
			},
      labels:{
      	step: undefined,
        style: {
          color: 'rgb(237,	237,	237)'
        }
      }
    },
    yAxis: {
      tickInterval: 20,
      gridLineColor: 'rgb(32, 32, 32)',
      title: {
        text: ' '
      },
      visible:false
    },
    title: {
      text: undefined
    },
    series: [{
      data: dataVariables.histogramYear.map(function(p){
        return [2025 - p[0], p[1]]
      }),
      states:{
        hover:{
          color: 'rgb(118,	246, 81)'
        }
      },
      name: 'Ilość wystąpień danej grupy wiekowej',
      borderColor:'rgba(0,0,0,0)',
      groupPadding: 0.1,
      color: 'rgb(237,	237, 237)'
    }]
  }
};