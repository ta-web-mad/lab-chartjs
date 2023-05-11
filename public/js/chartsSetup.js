const colors = {
  solids: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
  alphas: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)']
}

axios
  .get('https://multiapi-app.fly.dev/coasters/allCoasters')
  .then(({ data }) => {
    renderSpeedChart(data)
    renderSecondChart(data)
    renderthirdChart(data)
    renderfifthChart(data)
    renderFouthChart(data)
  })
  .catch(err => console.log(err))


const renderSpeedChart = coasters => {

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
    labels: ['Menos de 1000m', 'de 1000 a 1500m', 'más de 1500m'],
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
  new Chart('chart2', { type: 'doughnut', data })

}

const renderthirdChart = coasters => {
  coastersEeuu = coasters.filter(elm => elm.country === "United States").length;
  coastersSpain = coasters.filter(elm => elm.country === "Spain").length;
  coastersJapan = coasters.filter(elm => elm.country === "Japan").length;
  coastersChina = coasters.filter(elm => elm.country === "China").length;

  const data = {
    labels: ['EEUU', 'Spain', 'Japan', 'China'],
    datasets: [{

      data: [
        coastersEeuu,
        coastersSpain,
        coastersJapan,
        coastersChina
      ],
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      borderWidth: 2
    }]
  }
  new Chart('chart3', { type: 'polarArea', data })

}

const renderfifthChart = coasters => {

  const selectedCoasters = coasters.slice(0, 5)

  const data = {
    labels: selectedCoasters.map(elm => elm.name),
    datasets: [{
      data: selectedCoasters.map(elm => elm.speed),
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      label: 'Grup1',
      borderWidth: 2
    },
    {
      data: selectedCoasters.map(elm => elm.height),
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      borderWidth: 2,
      label: 'Grupo2',
      type: 'bar'
    }
    ]
  }

  new Chart('chart5', { type: 'line', data })

}

