const colors = {
  solids: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
  alphas: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215,1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)']
}


const getApiData = () => {
  axios
    .get('https://multiapi-app.fly.dev/coasters/allCoasters')
    .then(({ data }) => {
      renderSpeedChart(data)
      renderLengthChart(data)
      renderCountryChart(data)
      renderInversorchart(data)
      renderMixedChart(data)
    })
    .catch(err => console.log(err))
}

function printCoastersCharts(coasters) {
  console.log('PARTY!', coasters)
}


const renderSpeedChart = coasters => {

  const fastestCoasters = coasters.slice(0, 5)
  const nameCoasters = fastestCoasters.map(elm => elm.name)
  const speedCoasters = fastestCoasters.map(elm => elm.speed)


  // SPEED CHART
  const data = {
    labels: [...nameCoasters],
    datasets: [{
      data: [...speedCoasters],
      backgroundColor: [colors.solids[0], colors.solids[1], colors.solids[2], colors.solids[3], colors.solids[4],],
      borderColor: [colors.alphas[0], colors.alphas[1], colors.alphas[2], colors.alphas[3], colors.alphas[4]],
    }]
  }
  const options = {
    plugins: {
      legend: {
        display: false
      }
    }
  }

  new Chart('chart1', {
    type: 'bar',
    data,
    options
  })


  // LENGTH CHART


}
const renderLengthChart = coasters => {

  const less = coasters.filter(elm => elm.length <= 1000).length
  const between = coasters.filter(elm => elm.length > 1000 && elm.length < 1500).length
  const more = coasters.filter(elm => elm.length >= 1500).length
  const data = {
    labels: ['<1000m', '1000m-1500m', '>1500m'],
    datasets: [{
      data: [less, between, more],
      backgroundColor: [colors.solids[0], colors.solids[1], colors.solids[2], colors.solids[3], colors.solids[4],],
      borderColor: [colors.alphas[0], colors.alphas[1], colors.alphas[2], colors.alphas[3], colors.alphas[4]],
    }]
  }

  new Chart('chart2', {
    type: 'doughnut',
    data
  })

}

const renderCountryChart = coasters => {

  const japan = coasters.filter(elm => elm.country === 'Japan').length

  const usa = coasters.filter(elm => elm.country === 'United States').length
  const spain = coasters.filter(elm => elm.country === 'Spain').length
  const china = coasters.filter(elm => elm.country === 'China').length


  const data = {
    labels: ['Japon', 'EEUU', 'España', 'China'],
    datasets: [{
      data: [japan, usa, spain, china],
      backgroundColor: [colors.solids[0], colors.solids[1], colors.solids[2], colors.solids[3], colors.solids[4],],
      borderColor: [colors.alphas[0], colors.alphas[1], colors.alphas[2], colors.alphas[3], colors.alphas[4]],
    }]
  }

  const options = {
    scales: {
      r: {
        ticks: {
          display: false // Remove vertical numbers
        },

      }
    }
  }

  new Chart('chart3', {
    type: 'polarArea',
    data,
    options
  })

}

const renderInversorchart = coasters => {



  const inversors = coasters.filter(elm => elm.inversions >= 5)
  const nameCoasters = inversors.map(elm => elm.name)
  const comparative = inversors.map(elm => elm.inversions)

  const data = {
    labels: [...nameCoasters],
    datasets: [{
      data: [...comparative],
      // backgroundColor: colors.solids,
      borderColor: colors.alphas[2],
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
          display: false // Remove vertical numbers
        },

      }
    }
  }

  new Chart('chart4', {
    type: 'radar',
    data,
    options,
    // scales: {
    //   yAxis:
    //   {
    //     ticks: {
    //       display: false
    //     },
    //   },
    //   xAxis:
    //   {
    //     ticks: {
    //       display: false
    //     }
    //   }
    // }
  })

}

const renderMixedChart = coasters => {

  const top5 = coasters.slice(0, 5)
  const nameCoasters = top5.map(elm => elm.name)
  const speedCoasters = top5.map(elm => elm.speed)
  const heightCoasters = top5.map(elm => elm.height)

  const data = {
    labels: [...nameCoasters],
    datasets: [
      {
        data: [...heightCoasters],
        backgroundColor: ['rgba(15, 129, 0, 0.8)'],
        borderColor: ['rgba(15, 129, 0, 0.8)'],
        tension: 0.4
      },
      {
        data: [...speedCoasters],
        backgroundColor: colors.solids,
        borderColor: colors.alphas,
        type: 'bar'
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        display: false
      }
    }
  }

  new Chart('chart5', {
    type: 'line',
    data,
    options
  })

}




getApiData()
