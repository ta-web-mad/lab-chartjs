const colors = {
  solids: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
  alphas: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)']
}

const getApiData = () => {

  axios
    .get('https://multiapi-app.fly.dev/coasters/allCoasters')
    .then(({ data }) => {
      renderFirstChart(data)
      renderSecondChart(data)
      renderThirdChart(data)
      renderFourthChart(data)
      renderFifthChart(data)

    })
    .catch(err => console.log(err))
}



const renderFirstChart = coasters => {

  const selectedCoasters = coasters.slice(0, 5)

  const data = {
    labels: selectedCoasters.map(elm => elm.name),
    datasets: [{
      data: selectedCoasters.map(elm => elm.speed),
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      borderWidth: 2
    }]
  }

  new Chart('chart1', { type: 'bar', data })
}



const renderSecondChart = coasters => {

  const data = {
    labels: ['< 1000m', '1000m - 1500m', '< 1500m'],
    datasets: [{
      data: [
        coasters.filter(elm => elm.length < 1000).length,
        coasters.filter(elm => elm.length > 1000 && elm.length < 1500).length,
        coasters.filter(elm => elm.length > 1500).length,
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



const renderThirdChart = coasters => {

  const data = {
    labels: ['EEUU', 'España', 'Japón', 'China'],
    datasets: [{
      data: [
        coasters.filter(elm => elm.country === 'United States').length,
        coasters.filter(elm => elm.country === 'Spain').length,
        coasters.filter(elm => elm.country === 'Japan').length,
        coasters.filter(elm => elm.country === 'China').length,
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

  new Chart('chart3', { type: 'polarArea', data, options })
}



const renderFourthChart = coasters => {

  const inversionCoasters = coasters.filter(elm => elm.inversions > 5)

  const data = {
    labels: inversionCoasters.map(elm => elm.name),
    datasets: [{
      data: inversionCoasters.map(elm => elm.inversions),
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

  new Chart('chart4', { type: 'radar', data, options })
}



const renderFifthChart = coasters => {

  const selectedCoasters = coasters.slice(0, 5)

  const data = {
    labels: selectedCoasters.map(elm => elm.name),
    datasets: [
      {
        data: selectedCoasters.map(elm => elm.speed),
        backgroundColor: colors.alphas,
        borderColor: colors.solids,
        borderWidth: 2
      },
      {
        data: selectedCoasters.map(elm => elm.height),
        backgroundColor: colors.alphas,
        borderColor: colors.solids,
        borderWidth: 2,
        type: 'line'
      }
    ],
  }


  new Chart('chart5', { type: 'bar', data })

}


getApiData()
