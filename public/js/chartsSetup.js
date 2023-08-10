const colors = {
  solids: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
  alphas: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)']
}

axios
  .get('https://multiapi-app.fly.dev/coasters/allCoasters')
  .then(({ data }) => printCoastersCharts(data))
  .catch(err => console.log(err))

function printCoastersCharts(coasters) {
  const selectedCoasters = coasters.slice(0, 5)

  printSpeedChart(selectedCoasters)
  printLengthChart(coasters)
  printHeightChart(coasters)
  printInversionsChart(coasters)
  printMixedChart(selectedCoasters)
}

function printSpeedChart(selectedCoasters) {
  const nameTop5FastestCoasters = selectedCoasters.map(eachCoaster => {
    return eachCoaster.name
  })

  const speedTop5FastestCoasters = selectedCoasters.map(eachCoaster => {
    return eachCoaster.speed
  })

  const chartData = {
    labels: nameTop5FastestCoasters,
    datasets: [
      {
        data: speedTop5FastestCoasters,
        backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)'],
        borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)'],
        borderWidth: 3
      }
    ]
  }

  const optionsData = {
    plugins: {
      legend: {
        display: false
      }
    }
  }

  new Chart('chart1', { type: 'bar', data: chartData, options: optionsData })
}

function printLengthChart(coasters) {
  let lengthMinus1000 = 0
  let length1000to1500 = 0
  let lengthPlus1500 = 0

  coasters.forEach(eachCoaster => {
    if (eachCoaster.length < 1000) {
      lengthMinus1000++
    } else if (eachCoaster.length >= 1000 && eachCoaster.length <= 1500) {
      length1000to1500++
    } else {
      lengthPlus1500++
    }
  })

  const chartData = {
    labels: ['-1000m', '1000-1500m', '+1500m'],
    datasets: [
      {
        data: [lengthMinus1000, length1000to1500, lengthPlus1500],
        backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)'],
        borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)'],
        borderWidth: 3
      }
    ]
  }

  const optionsData = {
    plugins: {
      legend: {
        position: 'left'
      }
    }
  }

  new Chart('chart2', { type: 'doughnut', data: chartData, options: optionsData })
}

function printHeightChart(coasters) {
  let eeuuCoasters = 0
  let japanCoasters = 0
  let spainCoasters = 0
  let chinaCoasters = 0

  coasters.forEach(eachCoaster => {
    if (eachCoaster.country === 'United States') {
      eeuuCoasters++
    } else if (eachCoaster.country === 'Japan') {
      japanCoasters++
    } else if (eachCoaster.country === 'Spain') {
      spainCoasters++
    } else if (eachCoaster.country === 'China') {
      chinaCoasters++
    }
  })

  const chartData = {
    labels: ['EEUU', 'Japón', 'España', 'China'],
    datasets: [
      {
        data: [eeuuCoasters, japanCoasters, spainCoasters, chinaCoasters],
        backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)'],
        borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)'],
        borderWidth: 3
      }
    ]
  }

  const optionsData = {
    plugins: {
      legend: {
        position: 'left'
      }
    },
    scales: {
      r: {
        ticks: {
          display: false
        }
      }
    }
  }

  new Chart('chart3', { type: 'polarArea', data: chartData, options: optionsData })
}

function printInversionsChart(coasters) {
  const moreThan5InversionsCoasters = coasters.filter(eachCoaster => eachCoaster.inversions > 5)

  const nameMoreThan5InversionsCoasters = moreThan5InversionsCoasters.map(eachCoaster => eachCoaster.name)
  const inversionsMoreThan5InversionsCoasters = moreThan5InversionsCoasters.map(eachCoaster => eachCoaster.inversions)

  const chartData = {
    labels: nameMoreThan5InversionsCoasters,
    datasets: [
      {
        data: inversionsMoreThan5InversionsCoasters,
        backgroundColor: ['rgba(33, 192, 215, 0.4)'],
        borderColor: ['rgba(33, 192, 215, 1)'],
        borderWidth: 3
      }
    ]
  }

  const optionsData = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      r: {
        ticks: {
          display: false
        }
      }
    }
  }

  new Chart('chart4', { type: 'radar', data: chartData, options: optionsData })
}

function printMixedChart(selectedCoasters) {
  const nameTop5FastestCoasters = selectedCoasters.map(eachCoaster => {
    return eachCoaster.name
  })

  const speedTop5FastestCoasters = selectedCoasters.map(eachCoaster => {
    return eachCoaster.speed
  })

  const nameTop5HighestCoasters = selectedCoasters.map(eachCoaster => {
    return eachCoaster.height
  })

  const chartData = {
    labels: nameTop5FastestCoasters,
    datasets: [
      {
        data: nameTop5HighestCoasters,
        backgroundColor: ['rgba(33, 192, 215, 0.4)'],
        borderColor: ['rgba(33, 192, 215, 1)'],
        borderWidth: 5,
        type: 'line',
        tension: 0.4
      },
      {
        data: speedTop5FastestCoasters,
        backgroundColor: ['rgba(217, 158, 43, 0.4)'],
        borderColor: ['rgba(217, 158, 43)'],
        borderWidth: 3
      }
    ]
  }

  const optionsData = {
    plugins: {
      legend: {
        display: false
      }
    }
  }

  new Chart('chart5', { type: 'bar', data: chartData, options: optionsData })
}
