const colors = {
  solids: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
  alphas: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)']
}

const getApiData = () => {
  axios
    .get('https://multiapi-app.fly.dev/coasters/allCoasters')
    .then(({ data }) => printCoastersData(data))
    .catch(err => console.log(err))
}
function printCoastersData(coasters) {
  printCoastersCharts(coasters)
  printCoastersCharts2(coasters)
  printCoastersCharts3(coasters)
}

function printCoastersCharts(coasters) {
  const speedCoaster = coasters.filter(elm => elm.speed > 170)
  const speedCoasterMapSpeed = speedCoaster.map(elm => { return elm.speed })
  const speedCoasterMapName = speedCoaster.map(elm => { return elm.name })
  const data = {

    labels: speedCoasterMapName,
    datasets: [
      {
        data: speedCoasterMapSpeed,
        backgroundColor: colors.solids,
        borderColor: colors.alphas,
        borderWidth: 2
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
  new Chart('chart1', {
    type: 'bar',
    data,
    options
  })

}

function printCoastersCharts2(coasters) {
  const lengthCoaster1 = coasters.filter(elm => elm.length < 1000).length
  const lengthCoaster2 = coasters.filter(elm => elm.length >= 1000 && elm.length <= 1500).length
  const lengthCoaster3 = coasters.filter(elm => elm.length > 1500).length

  console.log(lengthCoaster1)
  const data = {

    labels: ["<1000", ">1000 & <1500", ">1500"],
    datasets: [
      {
        data: [lengthCoaster1, lengthCoaster2, lengthCoaster3],
        backgroundColor: colors.solids,
        borderColor: colors.alphas,
        borderWidth: 2
      }
    ]
  }
  const options = {
    plugins: {
      legend: {
        display: true
      }
    }
  }
  new Chart('chart2', {
    type: 'doughnut',
    data,
    options
  })
}

function printCoastersCharts3(coasters) {

  const eeuuCoasters = coasters.filter(elm => elm.country === "United States").length
  const spainCoasters = coasters.filter(elm => elm.country === "Spain").length
  const japanCoasters = coasters.filter(elm => elm.country === "Japan").length
  const chinaCoasters = coasters.filter(elm => elm.country === "China").length

  console.log(chinaCoasters)
  const data = {

    labels: ["United States", "Spain", "Japan", "China"],
    datasets: [
      {
        data: [eeuuCoasters, spainCoasters, japanCoasters, chinaCoasters],
        backgroundColor: colors.solids,
        borderColor: colors.alphas,
        borderWidth: 2
      }
    ]
  }
  const options = {
    plugins: {
      legend: {
        display: true
      }
    }
  }
  new Chart('chart3', {
    type: 'bar',
    data,
    options
  })
}

getApiData()