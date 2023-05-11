const colors = {
  solids: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
  alphas: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)']
}

axios
  .get('https://multiapi-app.fly.dev/coasters/allCoasters')
  .then(({ data }) => printCoastersCharts(data))
  .catch(err => console.log(err))

function printCoastersCharts(coasters) {

  console.log(coasters)

  let fastestCoasters = coasters.slice(0, 5)
  let speedCoasters = fastestCoasters.map(elm => elm.speed)

  const data1 = {

    labels: fastestCoasters.map(elm => elm.name),
    datasets: [
      {
        data: speedCoasters,
        backgroundColor: [colors.alphas[0], colors.alphas[1], colors.alphas[2], colors.alphas[3], colors.alphas[4]],
        borderColor: [colors.solids[0], colors.solids[1], colors.solids[2], colors.solids[3], colors.solids[4]],
        borderWidth: 2
      }
    ]
  }

  new Chart('chart1', { type: 'bar', data: data1 })


  // ----------------------------------------------------------------------------------------------------------

  let longestCoasters = coasters.slice(0, 3)
  let lengthCoasters = longestCoasters.map(elm => elm.length)

  const data2 = {

    labels: ['menos de 1000', 'entre 1000 y 1500', 'mas de 1500'],
    datasets: [
      {
        data: lengthCoasters,
        backgroundColor: [colors.alphas[0], colors.alphas[1], colors.alphas[2]],
        borderColor: [colors.solids[0], colors.solids[1], colors.solids[2]],
      }
    ]
  }

  new Chart('chart2', { type: 'doughnut', data: data2 })


  // ----------------------------------------------------------------------------------------------------------


  let japanCounter = coasters.filter(elm => elm.country === 'Japan').length
  let eeuuCounter = coasters.filter(elm => elm.country === 'United States').length
  let spainCounter = coasters.filter(elm => elm.country === 'Spain').length
  let chinaCounter = coasters.filter(elm => elm.country === 'China').length

  const data3 = {

    labels: ["Japan", 'EEUU', 'Spain', 'China'],
    datasets: [
      {
        data: [japanCounter, eeuuCounter, spainCounter, chinaCounter],
        backgroundColor: [colors.alphas[0], colors.alphas[1], colors.alphas[2], colors.alphas[3]],
        borderColor: [colors.solids[0], colors.solids[1], colors.solids[2], colors.solids[3]],
      }
    ]
  }

  new Chart('chart3', { type: 'polarArea', data: data3 })


  // ----------------------------------------------------------------------------------------------------------

  let inversionsArray = coasters.filter(elm => elm.inversions > 5)
  let inversionNames = inversionsArray.map(elm => elm.name)
  let inversionNumber = inversionsArray.map(elm => elm.inversions)
  const data4 = {

    labels: inversionNames,
    datasets: [
      {
        data: inversionNumber,
        backgroundColor: [colors.alphas[1]],
        borderColor: [colors.solids[1]],
      }
    ]
  }

  new Chart('chart4', { type: 'radar', data: data4 })

  // ----------------------------------------------------------------------------------------------------------


  let firstFiveCoasters = coasters.slice(0, 5)
  let firstFiveNames = firstFiveCoasters.map(elm => elm.name)
  let firstFiveSpeed = firstFiveCoasters.map(elm => elm.speed)
  let firstFiveHeight = firstFiveCoasters.map(elm => elm.height)

  const data5 = {
    labels: firstFiveNames,
    datasets: [
      {
        data: firstFiveHeight,
        backgroundColor: [colors.alphas[1]],
        borderColor: [colors.solids[1]],
        borderWidth: 2,
        label: 'GRUPO 1',
        tension: .6
      },
      {
        data: firstFiveSpeed,
        backgroundColor: [colors.alphas[2]],
        borderColor: [colors.solids[2]],
        borderWidth: 2,
        label: 'GRUPO 2',
        type: 'bar'         // chart mixto
      }
    ]
  }

  new Chart('chart5', { type: 'line', data: data5 })


}