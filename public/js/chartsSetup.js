const colors = {
  solids: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
  alphas: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)']
}

axios
  .get('https://multiapi-app.fly.dev/coasters/allCoasters')
  .then(({ data }) => printCoastersCharts(data.slice(0, 5)))
  .catch(err => console.log(err))

function printCoastersCharts(coasters) {
  renderFastestChar(coasters)
  renderLengthChar(coasters)
  renderCountryChar(coasters)
  console.log(coasters)
}

//id = "chart1"
function renderFastestChar(coasters) {
  const coastersSpeed = []
  const coasterNames = []

  coasters.map(coaster => {
    coastersSpeed.push(coaster.speed)
    coasterNames.push(coaster.name)
  });

  const data = {
    labels: coasterNames,
    datasets: [{
      data: coastersSpeed,
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      borderWidth: 2
    }]
  }
  const options = {
    plugins: {
      legend: {
        display: false
      }
    }
  }

  new Chart('chart1', { type: 'bar', data, options })
}
//chart2

function renderLengthChar(coasters) {
  const data = {
    labels: ["-1000", "1000/1500", "+1500"],
    datasets: [{
      data: [
        coasters.filter(coaster => coaster.length < 1000).length,
        coasters.filter(coaster => coaster.length >= 1000 || coaster.length <= 1500).length,
        coasters.filter(coaster => coaster.length > 1500).length
      ],
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      borderWidth: 2,
    }]
  }

  new Chart('chart2', {
    type: 'doughnut',
    data
  })
}

function renderCountryChar(coasters) {
  let countryNames = []
  let EEUU = 0
  let Spain = 0
  let Japan = 0
  let China = 0
  let countryData = [EEUU, Spain, Japan, China]

  /*  coasters.forEach(coaster => {
     if (coaster.country === countryData[i]
   }); */

  console.log(countryData)

  const data = {

    labels: countryNames,

    datasets: [{
      label: 'Comparador de países',
      data: countryData,
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      borderWidth: 2,

    }]
  }
}





new Chart('chart3', {
  type: 'polarArea',
  data: data,
})


//chart2




