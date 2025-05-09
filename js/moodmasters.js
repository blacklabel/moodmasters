import { dataCalculations } from './dataCalculations.js';
const {
    createHistogramData,
    filterData,
    processData,
    yearValidator,
    genderValidator,
    roadsValidator
} = dataCalculations;

import { createSwiper } from './swiperCode.js';

import { getChart1Options } from './charts/chart1.js';
import { getChart2Options } from './charts/chart2.js';
import { getChart3Options } from './charts/chart3.js';
import { getChart4Options } from './charts/chart4.js';

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "./data/mm.txt",
        dataType: "text",
        success: function(data) { buildGraphs(data); }
     });
});

function buildGraphs(csv) {
let categories, data;
[categories, data] = processData(csv);

  const dataVariables = {
    histogramYear: createHistogramData("Rok", categories, data, yearValidator),
    histogramGender: createHistogramData("Płeć", categories, data, genderValidator),
    histogramGroup: createHistogramData("Kategoria", categories, data, roadsValidator),
    histogramWoman: createHistogramData(
        "Kategoria",
        categories,
        filterData("Płeć", categories, data, 'K'),
        roadsValidator
    ),
    histogramMan:createHistogramData(
        "Kategoria",
        categories,
        filterData("Płeć", categories, data, 'M'),
        roadsValidator
    ),
    histogramYearMan: createHistogramData(
        "Rok",
        categories,
        filterData("Płeć", categories, data, 'M'),
        yearValidator
    ),
    histogramYearWoman: createHistogramData(
        "Rok",
        categories,
        filterData("Płeć", categories, data, 'K'),
        yearValidator
    ),
    histogramBestBoulder: createHistogramData(
        "Ulubiona droga",
        categories,
        data,
        roadsValidator
    ),
    BoulderDistributionMan: createHistogramData(
        "Zrobione drogi",
        categories,
        filterData("Płeć", categories, data, 'M'),
        roadsValidator
    ),
    BoulderDistributionWoman: createHistogramData(
        "Zrobione drogi",
        categories,
        filterData("Płeć", categories, data, 'K'),
        roadsValidator
    ),
    BoulderDistributionManLight: createHistogramData(
        "Zrobione drogi",
        categories,
        filterData("Kategoria", categories, filterData("Płeć", categories, data, 'M'), 'LIGHT'),
        roadsValidator
    ),
    BoulderDistributionWomanLight: createHistogramData(
        "Zrobione drogi",
        categories,
        filterData("Kategoria", categories, filterData("Płeć", categories, data, 'K'), 'LIGHT'),
        roadsValidator
    ),
    ZoneDistributionManLight: createHistogramData(
        "Zoony",
        categories,
        filterData("Kategoria", categories, filterData("Płeć", categories, data, 'M'), 'LIGHT'),
        roadsValidator
    ),
    ZoneDistributionWomanLight: createHistogramData(
        "Zoony",
        categories,
        filterData("Kategoria", categories, filterData("Płeć", categories, data, 'K'), 'LIGHT'),
        roadsValidator
    ),
    BoulderDistributionManPRO: createHistogramData(
        "Zrobione drogi",
        categories,
        filterData("Kategoria", categories, filterData("Płeć", categories, data, 'M'), 'PRO'),
        roadsValidator
    ),
    BoulderDistributionWomanPRO: createHistogramData(
        "Zrobione drogi",
        categories,
        filterData("Kategoria", categories, filterData("Płeć", categories, data, 'K'), 'PRO'),
        roadsValidator
    ),
    totalBouldersMan: function(boulderDistributionMan) {
        return boulderDistributionMan.reduce((a,b) => {return a+b[1]}, 0);
    },
    totalBouldersWoman: function(boulderDistributionWoman){
        return boulderDistributionWoman.reduce((a,b) => {return a+b[1]}, 0);
    }
};

  createSwiper({
    'container': getChart1Options(dataVariables),
    'container2': getChart2Options(dataVariables),
    'container3' : getChart3Options(dataVariables),
    'container4' : getChart4Options(dataVariables)
  });

  Highcharts.charts.forEach(function(chart) {
      chart.reflow();
  });
}