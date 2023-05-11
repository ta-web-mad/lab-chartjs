const colors = {
  solids: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
  alphas: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)']
}

axios
  .get('https://multiapi-app.fly.dev/coasters/allCoasters')
  .then(({ data }) => {
    printCoastersCharts(data)
    printCoastersLength(data)
    printCoastersCountries(data)
    printCoastersInversions(data)
    printCoastersSpeedHeight(data)
  })
  .catch(err => console.log(err))


function printCoastersCharts(coasters) {

  const selectedCoasters = coasters.slice(0, 5);

  const data = {
    labels: selectedCoasters.map(elm => elm.name),
    datasets: [{
      data: selectedCoasters.map(elm => elm.speed),
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      borderWidth: 2
    }]
  }

  const options = {
    plugins: {
      legend: {
        display: true
      }
    }
  }
  new Chart('chart1', { type: 'bar', data, options })

}

function printCoastersLength(coasters) {

  const data = {
    labels: ["-1000m", "1000m-15000m", "+1500m"],

    datasets: [{
      data: [
        coasters.filter(elm => elm.length < 1000).length,
        coasters.filter(elm => elm.length >= 1000 && elm.length < 1500).length,
        coasters.filter(elm => elm.length <= 1500).length
      ],
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      borderWidth: 2
    }]
  }

  const options = {
    plugins: {
      legend: {
        display: true
      }
    }
  }
  new Chart('chart2', { type: 'doughnut', data, options })
}


function printCoastersCountries(coasters) {

  const data = {
    labels: ["EEUU", "España", "Japón", "China"],

    datasets: [{
      data: [
        coasters.filter(elm => elm.country === "United States").length,
        coasters.filter(elm => elm.country === "Spain").length,
        coasters.filter(elm => elm.country === "Japan").length,
        coasters.filter(elm => elm.country === "China").length
      ],
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      borderWidth: 2
    }]
  }

  const options = {
    scales: {
      r: {
        ticks: {
          display: false
        }
      }
    },

    plugins: {
      legend: {
        display: true
      }
    }
  }
  new Chart('chart3', { type: 'polarArea', data, options })
}


function printCoastersInversions(coasters) {

  const selectedCoasters = coasters.filter(elm => elm.inversions > 5)

  const data = {
    labels: selectedCoasters.map(elm => elm.name),
    datasets: [{
      data: selectedCoasters.map(elm => elm.inversions),
      backgroundColor: colors.alphas[1],
      borderColor: colors.solids[1],
      borderWidth: 2
    }]
  }
  const options = {
    scales: {
      r: {
        ticks: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }

  new Chart('chart4', { type: 'radar', data, options })

}

function printCoastersSpeedHeight(coasters) {

  const selectedCoasters = coasters.slice(0, 5);

  const data = {
    labels: selectedCoasters.map(elm => elm.name),
    datasets: [
      {
        data: selectedCoasters.map(elm => elm.speed),
        backgroundColor: colors.alphas[2],
        borderColor: colors.solids[2],
        label: "Speed",
        borderWidth: 2,
        type: 'bar'
      }, {
        data: selectedCoasters.map(elm => elm.height),
        backgroundColor: colors.alphas[1],
        borderColor: colors.solids[1],
        label: "Height",
        borderWidth: 4,
        tension: .4
      }
    ],
  }
  new Chart('chart5', { type: 'line', data })
}


