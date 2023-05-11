const colors = {
  solids: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
  alphas: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)']
}


const getApiData = () => {

  axios
    .get('https://multiapi-app.fly.dev/coasters/allCoasters')
    .then(({ data }) => {
      getFiveCoasters(data)
      compareLongitude(data)
      compareCountries(data)
      compareInversions(data)
      compareFiveHeightSpeed(data)
    })
    .catch(err => console.log(err))
}




 const getFiveCoasters = coasters => {

   const arrFiveCoasters = coasters.slice(0,5)

   const arrNames = arrFiveCoasters.map(elm => elm.name)
   const arrSpeed = arrFiveCoasters.map(elm => elm.speed)


  const data = {
    labels:  arrNames ,
    datasets: [{
      data: arrSpeed,
      backgroundColor: colors.alphas,
      borderColor: colors.solids
    }]
  }

    const options = {
    plugins: {
      legend: {
        display: false
      }
    }
  }
  new Chart("chart1", {
    type: "bar",
    data,
    options
  })

 }

 const compareLongitude = coasters => {


  // const filtradas =  coasters.filter(elm => elm.length < 1000)
  // console.log("FILTRADAS",filtradas )

    const data = {
    labels:  ["< 1000m", "1000-1500m", "> 1500m"] ,
    datasets: [{
      data: [
        coasters.filter(elm => elm.length < 1000).length,
        coasters.filter(elm => elm.length > 1000 && elm.length < 1500 ).length,
        coasters.filter(elm => elm.length > 1500 ).length
      ],
      backgroundColor: colors.alphas,
      borderColor: colors.solids
    }]
  }


      const options = {
    plugins: {
      legend: {
        display: true,
        position: "left"
      }
    }
  }

  new Chart("chart2", {
    type: "doughnut",
    data,
    options
  })

 }

 const compareCountries = coasters => {


    const data = {
    labels:  ["EEUU", "JAPAN", "SPAIN", "CHINA"] ,
    datasets: [{
      data: [
        coasters.filter(elm => elm.country === "United States").length,
        coasters.filter(elm => elm.country === "Japan").length,
        coasters.filter(elm => elm.country === "Spain").length,
        coasters.filter(elm => elm.country === "China").length
       
      ],
      backgroundColor: colors.alphas,
      borderColor: colors.solids
    }]
  }


      const options = {
    plugins: {
      legend: {
        display: true,
        position: "left"
      }
    },
    scales: {
      r: {
        ticks: {
          display: false // Remove vertical numbers
        }
       }
    }
  }

  new Chart("chart3", {
    type: "polarArea",
    data,
    options
  })



 }

  const compareInversions = coasters => {


    const data = {
    labels:  coasters.filter(elm => elm.inversions > 5).map(elm => elm.name),
    datasets: [{
      data: coasters.filter(elm => elm.inversions > 5).map(elm => elm.inversions),
      backgroundColor: colors.alphas,
      borderColor: colors.solids
    }]
  }


     const options = {
    plugins: {
      legend: {
        display: true,
        position: "left",

      }
    },
    scales: {
      r: {
        ticks: {
          display: false // Remove vertical numbers
        }
       }
    }
  }

  new Chart("chart4", {
    type: "radar",
    data,
    options
  })


 }

 const compareFiveHeightSpeed = coasters => {

   const arrFiveCoasters = coasters.slice(0,5)

   const arrSpeed = arrFiveCoasters.map(elm => elm.speed)
   const arrHeight = arrFiveCoasters.map(elm => elm.height)
   const arrNames = arrFiveCoasters.map(elm => elm.name)


     const data = {
    labels: arrNames,
    datasets: [
      {
        data: arrHeight,
        backgroundColor: colors.alphas,
        borderColor: colors.solids,
        borderWidth: 2,
        label: 'GRUPO 1',
        tension: .3
      },
      {
        data: arrSpeed,
        backgroundColor: colors.alphas,
        borderColor: colors.solids,
        borderWidth: 2,
        label: 'GRUPO 2',
        type: 'bar'         // chart mixto
      }
    ]
  }


  new Chart('chart5', { type: 'line', data })

 }

 

 







getApiData()
