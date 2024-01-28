const colors = {
  solids: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
  alphas: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)']
}

axios
  .get('https://multiapi-app.fly.dev/coasters/allCoasters')
  .then(({ data }) => printCoastersCharts(data))
  .catch(err => console.log(err))

function printCoastersCharts(coasters) {
  const fiveCoasters = coasters.slice(0, 5)
  const coasterName = fiveCoasters.map((coaster)=> {
    return coaster.name
  }) 

  speedChart(fiveCoasters, coasterName)
  lengthChart(coasters)
  countryChart(coasters)
  inversionsChart(coasters)
  speedAgainstHeight(fiveCoasters, coasterName)
}

function speedChart(fiveCoasters, coasterName){
  const coasterSpeed = fiveCoasters.map((coaster)=>{
    return coaster.speed
  })

  const ctx = document.getElementById('chart1').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: coasterName,
      datasets: [
        {
          label: 'Speed',
          backgroundColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)'],
          borderColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)'],
          data: coasterSpeed
        }
      ]
    }
  });
}

function lengthChart(coasters){
  const smallCoaster = coasters.filter((coaster)=>{
    if(coaster.length < 1000){
      return coaster.length
    }
  })
  const mediumCoaster = coasters.filter((coaster)=>{
    if(coaster.length >= 1000 && coaster.length <= 1500){
      return coaster.length
    }
  })
  const bigCoaster = coasters.filter((coaster)=>{
    if(coaster.length > 1500){
      return coaster.length
    }
  })

  const ctx = document.getElementById('chart2').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['less than 1000m', 'between 1000m and 1500m', 'more than 1500m'],
      datasets: [
        {
          label: 'Speed',
          backgroundColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)'],
          borderColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)'],
          data: [smallCoaster.length, mediumCoaster.length, bigCoaster.length]
        }
      ]
    }
  });
}

function countryChart(coasters){
  const japaneseCoaster = coasters.filter((coaster)=>{
    if(coaster.country === "Japan"){
      return coaster.length
    }
  })
  const americanCoaster = coasters.filter((coaster)=>{
    if (coaster.country === "United States"){
      return coaster.length
    }
  })
  console.log(americanCoaster)
  const spanishCoaster = coasters.filter((coaster)=>{
    if(coaster.country === "Spain"){
      return coaster.length
    }
  })
  const chineseCoaster = coasters.filter((coaster)=>{
    if(coaster.country === "China"){
      return coaster.length
    }
  })
  const ctx = document.getElementById('chart3').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: ['Japan', 'United States', 'Spain', 'China'],
      datasets: [
        {
          label: 'Speed',
          backgroundColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)'],
          borderColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)'],
          data: [japaneseCoaster.length, americanCoaster.length, spanishCoaster.length, chineseCoaster.length]
        }
      ]
    }
  });
}

function inversionsChart(coasters){
  const moreThanFiveInversions = coasters.filter(coaster => coaster.inversions > 5)
  const coasterInversions = moreThanFiveInversions.map(coaster=> coaster.inversions)
  const coasterName = moreThanFiveInversions.map(coaster=> coaster.name)
  const ctx = document.getElementById('chart4').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: coasterName,
      datasets: [
        {
          backgroundColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
          borderColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)'],
          data: coasterInversions
        }
      ]
    }
  });
}

function speedAgainstHeight(fiveCoasters, coasterName){
  const coasterSpeed = fiveCoasters.map((coaster)=>{
    return coaster.speed
  })

  const coasterHeight = fiveCoasters.map((coaster)=>{
    return coaster.height
  })

  const ctx = document.getElementById('chart5').getContext('2d');
  const chart = new Chart(ctx, {
    data: {
      labels: coasterName,
      datasets: [
        {
          type: 'line',
          label: 'Heigh',
          backgroundColor: 'rgba(205, 58, 129, 1)',
          borderColor: 'rgba(205, 58, 129, 0.4)',
          data: coasterHeight
        },
        {
          type: 'bar',
          label: 'Speed',
          backgroundColor: 'rgba(33, 192, 215, 1)',
          borderColor: 'rgba(33, 192, 215, 0.4)',
          data: coasterSpeed
        }
      ]
    }
  });
}