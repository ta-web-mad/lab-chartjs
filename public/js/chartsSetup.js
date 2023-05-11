// const { default: axios } = require("axios")

const colors = {
  solids: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
  alphas: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)']
}

axios
  .get('https://multiapi-app.fly.dev/coasters/allCoasters')
  .then(({ data }) => printCoastersCharts(data))
  .catch(err => console.log(err))

function printCoastersCharts(coasters) {
  console.log('PARTY!', coasters)
}


const getApiData = () => {
  axios
    .get('https://multiapi-app.fly.dev/coasters/allCoasters')
    .then(({ data }) => {
      renderSpeedChart(data)
      renderLengthChart(data)
      renderCountryChart(data)
      renderInversionChart(data)
      renderSpeedVsHeightChart(data)
    })
    .catch(err => console.log('------oooh an error', err))
}

//por que no se puede llamar coasterNames aqui fuera para no tener que estar repitiendo el map dentro de cada renderChart
//ya que lo vamos a utilizar cada vez

const renderSpeedChart = (data) => {

  const coasterNames = data.map((coaster) => coaster.name)
  const coastersSpeed = data.map((coaster) => coaster.speed)

  data = {
    labels: [coasterNames[0], coasterNames[1], coasterNames[2], coasterNames[3], coasterNames[4], coasterNames[5]],
    datasets: [{
      data: [coastersSpeed[0], coastersSpeed[1], coastersSpeed[2], coastersSpeed[3], coastersSpeed[4], coastersSpeed[5]],
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
    }]
  }

  const options = {
    plugins: {
      legend: {
        display: false
      }
    }
  }

  new Chart('speedChart', { type: 'bar', data, options })
}

const renderLengthChart = (data) => {

  data = {
    labels: ['Shorter than 1km', 'between 1km-1.5km', 'Larger than 1.5km'],
    datasets: [{
      data: [
        data.filter(coaster => coaster.length < 1000).length,
        data.filter(coaster => 1000 <= coaster.length <= 1500).length,
        data.filter(coaster => coaster.length > 1500).length,
      ],
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
    }]
  }

  new Chart('lengthChart', { type: 'doughnut', data })
}

const renderCountryChart = (data) => {

  data = {
    labels: ['Japan', 'China', 'Spain', 'US'],
    datasets: [{
      data: [
        data.filter(coaster => coaster.country === 'Japan').length,
        data.filter(coaster => coaster.country === 'China').length,
        data.filter(coaster => coaster.country === 'Spain').length,
        data.filter(coaster => coaster.country === 'United States').length
      ],
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
    }]
  }
  new Chart('countryChart', { type: 'polarArea', data })
}

const renderInversionChart = (data) => {

  const invertedCoasters = data.filter(coaster => coaster.inversions > 5)
  console.log(invertedCoasters)

  data = {
    labels: [invertedCoasters[0].name, invertedCoasters[1].name, invertedCoasters[2].name, invertedCoasters[3].name, invertedCoasters[4].name, invertedCoasters[5].name],
    datasets: [{
      data: [
        invertedCoasters[0].inversions, invertedCoasters[1].inversions, invertedCoasters[2].inversions, invertedCoasters[3].inversions, invertedCoasters[4].inversions, invertedCoasters[5].inversions
      ],
      fill: true,
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
    }]
  }
  const options = {
    elements: {
      line: {
        borderWidth: 3
      }
    }
  }
  new Chart('inversionChart', { type: 'radar', data, options })
}

const renderSpeedVsHeightChart = (data) => {

  const coasterNames = data.map((coaster) => coaster.name)
  const coastersSpeed = data.map((coaster) => coaster.speed)
  const coastersHeight = data.map((coaster) => coaster.height)

  data = {
    labels: [coasterNames[0], coasterNames[1], coasterNames[2], coasterNames[3], coasterNames[4], coasterNames[5]],
    datasets: [
      {
        data: [coastersSpeed[0], coastersSpeed[1], coastersSpeed[2], coastersSpeed[3], coastersSpeed[4], coastersSpeed[5]],
        backgroundColor: colors.alphas,
        borderColor: colors.solids,
        label: 'Speed',
        type: 'bar'
      },

      {
        data: [coastersHeight[0], coastersHeight[1], coastersHeight[2], coastersHeight[3], coastersHeight[4], coastersHeight[5]],
        backgroundColor: colors.alphas,
        borderColor: colors.solids,
        label: 'Height',
        tension: 0.6
      },
    ]
  }
  new Chart('speedVsHeightChart', { type: 'line', data })
}

getApiData()
