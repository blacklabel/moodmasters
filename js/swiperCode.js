import Timer from './timer.js';

export const createSwiper = function (chartsOptions) {
    const progressCircle = document.querySelector(".autoplay-progress svg");
    const swiper = new Swiper(".mySwiper", {
        spaceBetween: 20,
        speed: 1000,
        allowTouchMove: false,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            enabled: true
        },
        pagination: {
            el: ".swiper-pagination"
        },
        on: {
            afterInit: function(swiper) {
                Highcharts.chart('container', chartsOptions['container']);
                this.timer = new Timer(25000, progressCircle, swiper);

            }
        },
        //keyboard: true,
    });

    swiper.on('slideChangeTransitionEnd', function (swiper) {
        const containerID = swiper.slides[swiper.snapIndex].children[0].attributes.id.nodeValue;
        let alreadyCreated = false;
        let currentChart = null;
        Highcharts.charts.forEach(function(chart) {
            if(chart.renderTo.attributes.id.nodeValue === containerID) {
                alreadyCreated = true;
                currentChart = chart;
            }
        });
        if (!alreadyCreated) {
            Highcharts.chart(containerID, chartsOptions[containerID]);
            swiper.timer.restart();
        }
    });
}