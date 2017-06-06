var Diagram = function() {
  this.ctx = document.getElementById("chart").getContext("2d");
  this.chart = new Chart(this.ctx, {
    type: "line",
    data: {
      datasets: [{
        label: "Avg. Lifetime Opponents",
        showLine: true,
        data: [0]
      }],
      pointstyle: "circle",
      labels: ["0"]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

  });

  this.addData = function(num) {
    this.chart.data.labels.push(this.chart.data.datasets[0].data.length);
    this.chart.data.datasets[0].data.push(num);
    this.chart.update(0, false);
  }
}
