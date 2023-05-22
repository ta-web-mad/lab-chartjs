const colors = {
  solids: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
  alphas: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)']
}

axios
  .get('https://multiapi-app.fly.dev/coasters/allCoasters')
  .then(({ data }) => {
    speedChart(data)
    longuestCoast(data)
    countryComparator(data)
    inversorComparator(data)
    mixedComparator(data)

  })
  .catch(err => console.log(err))


function speedChart(coasters) {

  const selectedCoasters = coasters.slice(0, 5)

  const data = {
    labels: selectedCoasters.map(elm => elm.name),
    datasets: [{
      data: selectedCoasters.map(elm => elm.speed),
      backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)'],
      borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
    }]
  }

  new Chart('chart1', {
    type: 'bar',
    data

  })
}

function longuestCoast(coasters) {

  const smallerCoaster = coasters.filter(elm => elm.length < 1000).length

  const mediumCoaster = coasters.filter(elm => elm.length >= 1000 && elm.length <= 1500).length

  const longuerCoaster = coasters.filter(elm => elm.length >= 1500).length

  const data = {
    labels: ['Menos de 1000', 'entre 1000 y 1500', 'mayor de 1500'],
    datasets: [{
      data: [smallerCoaster, mediumCoaster, longuerCoaster],
      backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)'],
      borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
    }]
  }

  new Chart('chart2', {
    type: 'doughnut',
    data
  })
}
function countryComparator(coasters) {

  const eeuu = coasters.filter(elm => elm.country == "United States").length

  const spain = coasters.filter(elm => elm.country == "Spain").length

  const china = coasters.filter(elm => elm.country == "China").length

  const japan = coasters.filter(elm => elm.country == "Japan").length


  const data = {
    labels: ['United States', 'Spain', 'China', 'Japan'],
    datasets: [{
      data: [eeuu, spain, china, japan],
      backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)'],
      borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
    }]
  }


  new Chart('chart3', {
    type: 'polarArea',
    data,
    options: {
      scale: {
        ticks: {
          display: false
        }
      }
    }
  })

}
function inversorComparator(coasters) {

  const inversor = coasters.filter(elm => elm.inversions > 5)



  const data = {
    labels: inversor.map(elm => elm.name),
    datasets: [{
      data: inversor.map(elm => elm.inversions),
      backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)'],
      borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
    }]
  }


  new Chart('chart4', {
    type: 'radar',
    data,
    options: {
      scales: {
        r: {
          ticks: {
            display: false // Remove vertical numbers
          }
        }
      }
    }
  })
}


function mixedComparator(coasters) {

  const speed = coasters.sort((a, b) => a.speed - b.speed).slice(0, 5)
  const height = coasters.sort((a, b) => b.height - a.height).slice(0, 5)

  console.log(speed)
  console.log(height)

  const data = {
    labels: speed.map(elm => elm.name),
    datasets: [
      {
        data: speed.map(elm => elm.speed),
        backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)'],
        borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
        borderWidth: 2,
        label: 'Speed',
        tension: .6,
        type: 'line'
      },
      {
        data: height.map(elm => elm.height),
        backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)'],
        borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
        borderWidth: 2,
        label: 'Heigth',
        type: 'bar'         // chart mixto
      }
    ]
  }


  new Chart('chart5', {
    type: 'bar',
    data
  })
}

