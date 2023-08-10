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

  const firstNameFiveCoaster = selectedCoasters.map((eachCoaster) => {
    return eachCoaster.name
  })
  const firstSpeedFiveCoaster = selectedCoasters.map((eachCoaster) => {
    return eachCoaster.speed
  })


  const chartData = {
    labels: [...firstNameFiveCoaster],
    datasets: [{
      data: [...firstSpeedFiveCoaster],
      backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)'],
      borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)'],
      borderWidth: 3
    }]
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


  const lengthCoasterMin = coasters.filter((eachCoaster) => {

    if (eachCoaster.length < 1000) {

      return eachCoaster.length

    }

  })
  const lengthCoasterMed = coasters.filter((eachCoaster) => {

    if (eachCoaster.length >= 1000 && eachCoaster.length <= 1500) {

      return eachCoaster.length

    }

  })

  const lengthCoasterMax = coasters.filter((eachCoaster) => {

    if (eachCoaster.length < 1500) {

      return eachCoaster.length

    }

  })



  const chartData = {
    labels: ['-1000m', '1000-1500m', '+1500m'],
    datasets: [{
      data: [lengthCoasterMin.length, lengthCoasterMed.length, lengthCoasterMax.length],
      backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)'],
      borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)'],
      borderWidth: 3
    }]
  }

  const optionsData = {
    plugins: {
      legend: {
        display: true,
        position: 'left'
      }
    }
  }

  new Chart('chart2', { type: 'doughnut', data: chartData, options: optionsData })


}


function printHeightChart(coasters) {



  const countryCoasterSpain = coasters.filter((eachCountry) => {

    if (eachCountry.country === "Spain") {

      return eachCountry.length

    }

  })



  const countryCoasterEEUU = coasters.filter((eachCountry) => {

    if (eachCountry.country === "United States") {


      return eachCountry.length

    }

  })

  const countryCoasterJapan = coasters.filter((eachCountry) => {

    if (eachCountry.country === "Japan") {

      return eachCountry.length

    }

  })

  const countryCoasterChina = coasters.filter((eachCountry) => {

    if (eachCountry.country === "China") {

      return eachCountry.length

    }

  })


  const chartData = {
    labels: ['EEUU', 'Japon', 'España', "China"],
    datasets: [{
      data: [countryCoasterEEUU.length, countryCoasterJapan.length, countryCoasterSpain.length, countryCoasterChina.length],
      backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)'],
      borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)'],
      borderWidth: 3
    }]
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
          scaleShowLabels: false,
          display: false
        }
      }
    }
  }

  new Chart('chart3', { type: 'polarArea', data: chartData, options: optionsData })

}


function printInversionsChart(coasters) {


  const inversionCoaster = coasters.filter((eachCoaster) => eachCoaster.inversions > 5)

  const coasterInversion = inversionCoaster.map((eachCoaster) => eachCoaster.inversions)


  const coasterName = inversionCoaster.map((eachCoaster) => eachCoaster.name)

  console.log(coasterName)

  const chartData = {
    labels: coasterName,
    datasets: [{
      data: coasterInversion,
      backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)'],
      borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)'],
      borderWidth: 3
    }]
  }

  const optionsData = {
    plugins: {
      legend: {
        display: false,
      }
    },

    scales: {
      r: {
        ticks: {
          scaleShowLabels: false,
          display: false
        }
      }
    }

  }

  new Chart('chart4', { type: 'radar', data: chartData, options: optionsData })
}

function printMixedChart(selectedCoasters) {

  const selectedCoastersName = selectedCoasters.map((eachCoaster) => {
    return eachCoaster.name
  })

  const selectedCoastersSpeed = selectedCoasters.map((eachCoaster) => {
    return eachCoaster.speed
  })

  const selectedCoastersHeight = selectedCoasters.map((eachCoaster) => {
    return eachCoaster.height
  })


  const chartData = {
    labels: selectedCoastersName,
    datasets: [
      {
        data: selectedCoastersSpeed,
        backgroundColor: ['rgba(217, 158, 43, 0.4)'],
        borderColor: ['rgba(217, 158, 43, 1)'],
        borderWidth: 3
      },
      {
        data: selectedCoastersHeight,
        lineTension: .3,
        backgroundColor: ['rgba(33, 192, 215, 1)'],
        borderColor: ['rgba(33, 192, 215, 1)'],
        borderWidth: 3,
        type: 'line'
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
