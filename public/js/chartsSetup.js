const colors = {
  solids: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
  alphas: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)']
}


const getApiData = () => {
  axios
    .get('https://multiapi-app.fly.dev/coasters/allCoasters')
    .then(({ data }) => {
      printCoastersCharts(data),
        printCoastersLength(data),
        printCoastersCountry(data),
        printCoastersInversion(data),
        printCoastersSpeedvsHeight(data)
    })
    .catch(err => console.log(err))
}

const printCoastersCharts = coasters => {

  const selectedCoasetrs = coasters.slice(0, 4)

  const data = {
    labels: selectedCoasetrs.map(elm => elm.name),
    datasets: [{
      data: selectedCoasetrs.map(elm => elm.speed),
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

const printCoastersLength = coasters => {

  const selectedCoasetrs = coasters.slice(0, 4)

  const data = {
    labels: selectedCoasetrs.map(elm => elm.name),
    datasets: [{
      data: selectedCoasetrs.map(elm => elm.length),
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      borderWidth: 2
    }]
  }
  new Chart('chart2', { type: 'doughnut', data })
}

const printCoastersCountry = coasters => {

  const eu = 'United States'

  const espana = 'Spain'

  const japan = 'Japan'

  const china = 'China'

  const data = {
    labels: ['EEUU', 'ESPAÑA', 'JAPON', 'CHINA'],
    datasets: [{
      data: [
        coasters.filter(elm => elm.country === eu).length,
        coasters.filter(elm => elm.country === japan).length,
        coasters.filter(elm => elm.country === espana).length,
        coasters.filter(elm => elm.country === china).length
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
    }
  }
  new Chart('chart3', { type: 'polarArea', data, options })
}

const printCoastersInversion = coasters => {

  const selectedCoasters = coasters.filter(elm => elm.inversions >= 5)

  const data = {
    labels: selectedCoasters.map(elm => elm.name),
    datasets: [{
      data: selectedCoasters.map(elm => elm.inversions),
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
    },
    scales: {
      r: {
        ticks: {
          display: false
        }
      }
    }
  }
  new Chart('chart4', { type: 'radar', data, options })
}

const printCoastersSpeedvsHeight = coasters => {

  const selectedCoasters = coasters.slice(0, 4)

  const data = {
    labels: selectedCoasters.map(elm => elm.name),
    datasets: [{
      data: selectedCoasters.map(elm => elm.speed),
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      borderWidth: 2
    },
    {
      data: selectedCoasters.map(elm => elm.height),
      type: 'line',
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      borderWidth: 2,
      tension: .2
    }]
  }
  const options = {
    plugins: {
      legend: {
        display: false
      }
    }
  }
  new Chart('chart5', { type: 'bar', data, options })
}

getApiData()