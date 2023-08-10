//initial setup

const colors = {
  solids: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
  alphas: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)']
}

axios
  .get('https://multiapi-app.fly.dev/coasters/allCoasters')
  .then(({ data }) => printCoastersCharts(data))
  .catch(err => console.log(err))

//all coasters

function printCoastersCharts(coasters) {
  console.log('PARTY!', coasters)

  const selectedCoasters = coasters.slice(0, 5)

  printSpeedChart(selectedCoasters)
  printLengthChart(coasters)
  printHeightChart(coasters)
  printInversionsChart(coasters)
  printMixedChart(selectedCoasters)
}

//coaster 1 

function printSpeedChart(selectedCoasters) {


  const labelsCoasters = selectedCoasters.map(function (eachlabelsCoasters) {
    return eachlabelsCoasters.name;
  })

  const speedCoasters = selectedCoasters.map(function (eachspeedCoasters) {
    return eachspeedCoasters.speed;
  })

  const chartData = {
    labels: labelsCoasters,
    datasets: [{
      data: speedCoasters,
      backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)'],
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

//coaster 2 

function printLengthChart(coasters) {

  const lengthCoasters = coasters.map(function (eachLengthCoasters) {
    return eachLengthCoasters.length;
  })



  const shortestLength = lengthCoasters.filter(function (eachshortestLength) {

    return eachshortestLength < 1000

  })


  const shortestL = shortestLength.length


  const mediumtLength = lengthCoasters.filter(function (eachMediumLength) {

    return eachMediumLength >= 1000 && eachMediumLength <= 1500

  })

  const mediumL = mediumtLength.length

  const largestLength = lengthCoasters.filter(function (eachLargestLength) {

    return eachLargestLength > 1500

  })

  const largestL = largestLength.length

  const chartData = {
    labels: ['-1000m', '1000-1500m', '+1500m'],
    datasets: [{
      data: [shortestL, mediumL, largestL],
      backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)'],
      borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)'],
      borderWidth: 3,
    }]
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

//coaster 3

function printHeightChart(coasters) {




  const countCountries = coasters.map(function (eachcountCountries) {
    return eachcountCountries.country;
  })

  const countryEeuu = countCountries.filter(function (eachcountryEeuu) {



    return eachcountryEeuu === "United States"

  })

  const countryEeuuCount = countryEeuu.length



  const countryJapan = countCountries.filter(function (eachcountryJapan) {



    return eachcountryJapan === "Japan"

  })

  const countryJapanCount = countryJapan.length




  const countrySpain = countCountries.filter(function (eachcountrySpain) {

    return eachcountrySpain === "Spain"

  })

  const countrySpainCount = countrySpain.length



  const countryChina = countCountries.filter(function (eachcountryChina) {

    return eachcountryChina === "China"

  })

  const countryChinaCount = countryChina.length

  const chartData = {
    labels: ['EEUU', 'Japón', 'España', 'China'],
    datasets: [{
      data: [countryEeuuCount, countryJapanCount, countrySpainCount, countryChinaCount],
      backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)'],
      borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)'],
      borderWidth: 3
    }]
  }

  const optionsData = {
    plugins: {
      legend: {
        position: 'left'
      }
    }, scales: {
      r: {
        ticks: {
          display: false
        }
      }
    }
  }

  new Chart('chart3', { type: 'polarArea', data: chartData, options: optionsData })
}

//coaster 4

function printInversionsChart(countInvercoasters) {



  const countInver = countInvercoasters.filter(eachCoasters => eachCoasters.inversions > 5)



  const CoasterName = countInver.map(function (eachCoasterName) {
    return eachCoasterName.name;
  })

  const CountriesInver = countInver.map(function (eachCountriesInver) {
    return eachCountriesInver.inversions;
  })





  const chartData = {
    labels: CoasterName,
    datasets: [{
      data: CountriesInver,
      backgroundColor: ['rgba(33, 192, 215, 0.4)'],
      borderColor: ['rgba(33, 192, 215, 0.4)'],
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
          display: false
        }
      }
    }

  }

  new Chart('chart4', { type: 'radar', data: chartData, options: optionsData })
}

//coaster 5

function printMixedChart(selectedCoasters) {


  const labelsCoasters = selectedCoasters.map(function (eachlabelsCoasters) {
    return eachlabelsCoasters.name;
  })

  const speedCoasters = selectedCoasters.map(function (eachspeedCoasters) {
    return eachspeedCoasters.speed;
  })

  const heightCoasters = selectedCoasters.map(function (heightCoasters) {
    return heightCoasters.height;
  })

  const chartData = {
    labels: labelsCoasters,
    datasets: [{
      data: speedCoasters,
      backgroundColor: ['rgba(217, 158, 43, 0.4)'],
      borderColor: ['rgba(217, 158, 43, 1)'],
      borderWidth: 3
    },
    {
      data: heightCoasters,
      backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)'],
      borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)'],
      borderWidth: 3,
      type: 'line',
      tension: 0.3
    }]
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