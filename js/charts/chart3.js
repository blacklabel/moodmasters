import { dataCalculations } from '../dataCalculations.js';
const {
    reduceData
} = dataCalculations;

const boulderChartAnimation = function(time) {
  const chart = this, dataVariables = this.dataVariables;
  let maxPoint, maxPoint1;



  chart.updatePipeline = chart.updatePipeline || {
    500: function() {
      $('.swiper-title').text('To co z tym wspinaniem?')
      $('.swiper-title').fadeIn(1000);
    },
    1500: function () {
      chart.series[0].addPoint(['Długość przeciętnej drogi sportowej', 15])
    },
    2500: function() {
      chart.series[0].addPoint(['Najdłuższa sportowa droga w Polsce', 55])
    },
    3500: function() {
      chart.series[0].addPoint(['Ściana Trollveggen, Norwegia', 1200])
    },
    4500: function() {
      chart.series[0].addPoint(['Rysy, najwyższy szczyt w Polsce', 2499])
    },
    5500: function(){
      chart.series[0].addPoint(['Mount Everest', 8849])
    },
    6500: function(){
      chart.series[0].addPoint({
        name: 'Łączna ilość metrów na MM 2025',
        y: (reduceData(dataVariables.BoulderDistributionMan) + reduceData(dataVariables.BoulderDistributionWoman))*3,
        color: 'rgb(118,	246,	81)'
      })
    },
    7000: function() {
      $('.swiper-subtitle').text('Wspólnie udało nam się pokonać dystans \n większy niż pięciokrotność Mount Everest')
      $('.swiper-subtitle').fadeIn(1000);
    },
    9000: function() {
      $('.swiper-label').text('Chyba możemy być z siebie dumni')
      $('.swiper-label').fadeIn(1000);
    },
    11000: function() {
      chart.series[0].remove(false);
      chart.xAxis[0].update({
        visible: false
        });
      chart.yAxis[0].update({height: '45%', top: '0%'}, false);
      chart.yAxis[1].update({height: '45%', top: '55%', reversed: true}, false);
      chart.addSeries({
        stacking: 'normal',
        type:'areaspline',
        data: dataVariables.BoulderDistributionMan,
        name: 'Mężczyźni',
        marker: {
          enabled: false
        },
        color: 'rgb(70,70,70)'
      });
      chart.addSeries({
        stacking: 'normal',
        type:'areaspline',
        data: dataVariables.BoulderDistributionWoman,
        name: 'Kobiety',
        yAxis: 1,
        marker: {
          enabled: false
        },
        color: 'rgb(237,	237,	237)'
      });
  
      chart.update({
        tooltip:{
          enabled: true,
          format: '<span style="font-size: 0.8em">Boulder nr: {key}</span><br/>' +
              '<span style="color:{color}">\u25CF</span> ' +
              '{series.name}: <b>{y} topów</b><br/>'
        }
      })
  
      maxPoint = chart.series[0].data[0];
      chart.series[0].data.forEach(function(p){
        if(p.y >= maxPoint.y) {
          maxPoint = p
        }
      });
      chart.yAxis[0].setExtremes(0, chart.yAxis[0].tickPositions[chart.yAxis[0].tickPositions.length-1]);
      maxPoint.update({
        dataLabels: {
          enabled: true
        }
      }, false)
  
      maxPoint1 = chart.series[1].data[0];
      chart.series[1].data.forEach(function(p) {
        if(p.y >= maxPoint1.y) {
          maxPoint1 = p
        }
      });
      chart.yAxis[1].setExtremes(0, chart.yAxis[1].tickPositions[chart.yAxis[1].tickPositions.length-1]);
      maxPoint1.update({
        dataLabels: {
          enabled: true
        }
      })
      $('.swiper-label').fadeOut(1000);
      $('.swiper-subtitle').fadeOut(1000);
    },
    12000: function() {
      $('.swiper-subtitle').text('Przyjrzyjmy się rozkładowi zrobionych boulderów');
      $('.swiper-subtitle').fadeIn(1000);
    },
    13000: function() {
      $('.swiper-label').text('Na górnym wykresie mężczyźni, na dolnym kobiety');
      $('.swiper-label').fadeIn(1000);
    },
    14000: function() {
      chart.xAxis[0].update({
        visible: true,
        opposite: true,
        top:'50%',
        labels: {
          step: undefined,
          reserveSpace: false,
          y: 20
        }});
  
        chart.update({
          legend: {
            enabled: true,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'bottom',
            floating: true,
            itemStyle: {
              color: 'rgb(237,	237,	237)',
            },
            _labelFormatter: function () {
              const index = this.name.indexOf(' ')
              return index > 0 ? this.name.substring(0,this.name.indexOf(' ')) : this.name;
          }
          }
        });
    },
    17000: function() {
      let newData0 = [], newData1 = [];
      chart.series[0].data.forEach(function(p){
        newData0.push([p.x, 0.1]);
      });
      chart.series[1].data.forEach(function(p){
        newData1.push([p.x, 0.1]);
      });
      maxPoint1.update({
          dataLabels: {
            enabled: false
          }
        })
        maxPoint.update({
          dataLabels: {
            enabled: false
          }
        })

       chart.series[0].setData(newData0);
       chart.series[1].setData(newData1);
    },
    18900: function() {
      chart.update({
        legend: {
          labelFormatter: function () {
            const index = this.name.indexOf(' ')
            return index > 0 ? this.name.substring(this.name.indexOf(' ') + 1, this.name.length) : this.name;
        }
        }
      });
    chart.series[0].update({
      type: 'column',
      borderWidth: 0,
      name: 'Mężczyźni Relax',
      id: 'man-rel',
      color: 'rgb(237,	237,	237)',
      data: dataVariables.BoulderDistributionManLight.map(function(p){
        return [p[0],0]
      })
    });
    chart.series[1].update({
      type: 'column',
      borderWidth: 0,
      name: 'Kobiety Relax',
      linkedTo: 'man-rel',
      color: 'rgb(237,	237,	237)',
      data: dataVariables.BoulderDistributionWomanLight.map(function(p){
        return [p[0],0]
      })
    });
    },
    19000: function() {
      chart.series[0].setData(dataVariables.BoulderDistributionManLight);
      chart.series[1].setData(dataVariables.BoulderDistributionWomanLight)
      chart.yAxis[0].setExtremes(null, null);
      chart.yAxis[1].setExtremes(null, null);
    },
    21000: function() {
      chart.addSeries({
        type: 'column',
        stacking: true,
        name: 'Mężczyźni Pro',
        id: 'man-pro',
        color: 'rgb(118,	246,	81)',
        data: dataVariables.BoulderDistributionManPRO,
        borderWidth: 0
      }, false)
  
      chart.addSeries({
        type: 'column',
        stacking: true,
        yAxis:1,
        linkedTo: 'man-pro',
        name: 'Kobiety Pro',
        color: 'rgb(118,	246,	81)',
        data: dataVariables.BoulderDistributionWomanPRO,
        borderWidth: 0
      })
    },
    24000: function() {
      $('.swiper-title').fadeOut(1000);
      $('.swiper-subtitle').fadeOut(1000);
      $('.swiper-label').fadeOut(1000);
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

export const getChart3Options = function (dataVariables) {
return {
 title: {
  text: undefined,
  style: {
        color: 'rgb(70,70,70)'
      }
    },
    tooltip:{
      enabled: false
    },
    chart:{
      animation: {
        duration: 1000,
        easing: 'easeOutCirc'
      },
      type: 'column',
      events: {
        load: function() {
          this.dataVariables = dataVariables;
          this.updateChart = boulderChartAnimation;
        }
      }
    },
    credits: {
      enabled : false
    },
    legend:{
      enabled: false
    },
    plotOptions:{
      series:{
        dataLabels:{
          style: {
            textOutline: "none"
          }
        }
      }
    },
    xAxis: [{
              type: 'category',
              lineWidth: 0,
              labels: {
                  step: 1,
                  style: {
                    color: 'rgb(237,	237,	237)'
                  }
              }
          }],
    yAxis: [{
          visible: false
      },{
        visible: false
      }],
    series: [{
      data: [['Średnia długość drogi boulderowej', 4]], //totalBouldersMan + totalBouldersWoman],
      name: 'Mężczyźni',
      color: 'rgb(237,	237,	237)',
      borderWidth: 0
    }]
  }
}