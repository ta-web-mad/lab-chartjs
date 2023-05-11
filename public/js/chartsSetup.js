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
  console.log(coasters)
}
function renderFastestChar(coasters) {
  const coastersSpeed = []
  const coasterNames = []
  coasters
    .map(coaster => {
      coastersSpeed.push(coaster.speed)
      coasterNames.push(coaster.name)
    });

  const data = {
    labels: coasterNames,
    datasets: [{
      data: coastersSpeed,
      backgroundColor: 
    }]
  }
  const options = {
    plugins: {
      legend: {
        display: false
      }
    }
  }

  new Chart = ('chart1', { type: 'bar', coastersSpeed, options })
}

//id = "chart1"
printCoastersCharts()



// country
// :
// "United States"
// gForce
// :
// null
// height
// :
// 138
// inversions
// :
// 0
// length
// :
// 950
// model
// :
// "Accelerator Coaster"
// name
// :
// "Kingda Ka"
// park
// :
// "Six Flags Great Adventure"
// speed
// :
// 206
// type
// :
// (4)['Roller Coaster', 'Steel', 'Sit Down', 'Extreme']
// year
// :
// 2005
// _id
// :
// { $oid: '5e8ef56a60fa824d1e2db3bf' }