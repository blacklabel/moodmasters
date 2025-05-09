export default class Timer {
    constructor(slideTimeExt, svgEl, swiper, callback, delay) {
        const timer = this;
        this.swiper = swiper;
        this.startingTime = null
        this.currentTime = null
        this.finalTime = null
        this.progress = null
        this.remainingTime = null
        this.TimerLoop = null
        this.slideTime = slideTimeExt
        this.pausedProgress = null
        this.svgEl = svgEl
        this.callback = callback
        this.delay = delay
        this.timerRunning = true
        this.currentChart = null;

        svgEl.addEventListener("click", () => {
            const icon = document.getElementById("icon")
            if (timer.timerRunning) {
            timer.pause()
            icon.classList.replace("fa-pause", "fa-play")
            } else {
            timer.resume()
            icon.classList.replace("fa-play", "fa-pause")
            }
        });

        this.startTimer();
    }

    startTimer() {
        this.findCurrentChart();
        this.startingTime = Date.now()
        this.finalTime = this.startingTime + this.slideTime
        this.slideTime = this.slideTime
        this.updateTimerProgress(this.slideTime);
        this.TimerLoop = setInterval(() => this.countDownTimer(), 100)
    }

    countDownTimer() {
      this.currentTime = Date.now()
      this.progress = this.finalTime - this.currentTime
      this.updateTimerProgress(this.progress)
      this.updateChart();
      if (this.progress <= 0) {
        this.timerRunning = false
        clearInterval(this.TimerLoop)
        if (this.callback) {
          this.callback()
        }
      }
    }

    updateTimerProgress(progress) {
        this.svgEl.style.setProperty(
            "--progress",
            1 - progress / this.slideTime,
          );
    }

    pause() {
      this.timerRunning = false
      this.pausedProgress = this.progress
      clearInterval(this.TimerLoop)
    }

    resume() {
      this.timerRunning = true
      this.finalTime = Date.now() + Highcharts.pick(this.pausedProgress || this.slideTime)
      this.TimerLoop = setInterval(() => this.countDownTimer(), 100)
    }

    stop () {
      this.timerRunning = false
      this.pausedProgress = null
      clearInterval(this.TimerLoop)
    }

    restart () {
        debugger;
        this.stop();
        this.clearValues();
        this.startTimer();
    }

    findCurrentChart () {
        const containerID = this.swiper.slides[this.swiper.snapIndex].children[0].attributes.id.nodeValue;
        let currentChart;

        Highcharts.charts.forEach(function(chart) {
            if (chart.renderTo.attributes.id.nodeValue === containerID) {
                currentChart = chart;
            }
        });
        this.currentChart = currentChart;
    }

    updateChart () {
        this.currentChart.updateChart(this.slideTime - this.progress)
    }

    clearValues () {
        this.startingTime = null
        this.currentTime = null
        this.finalTime = null
        this.progress = null
        this.remainingTime = null
        this.TimerLoop = null
        this.pausedProgress = null
        this.timerRunning = true
        this.currentChart = null;
    }
  }