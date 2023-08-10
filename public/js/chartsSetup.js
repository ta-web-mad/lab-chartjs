const colors = {
	solids: [
		'rgba(116, 72, 194, 1)',
		'rgba(33, 192, 215, 1)',
		'rgba(217, 158, 43, 1)',
		'rgba(205, 58, 129, 1)',
		'rgba(156, 153, 204, 1)',
		'rgba(225, 78, 202, 1)',
	],
	alphas: [
		'rgba(116, 72, 194, 0.4)',
		'rgba(33, 192, 215, 0.4)',
		'rgba(217, 158, 43, 0.4)',
		'rgba(205, 58, 129, 0.4)',
		'rgba(156, 153, 204, 0.4)',
		'rgba(225, 78, 202, 0.4)',
	],
}

axios
	.get('https://multiapi-app.fly.dev/coasters/allCoasters')
	.then(({ data }) => printCoastersCharts(data))
	.catch(err => console.log(err))

function printCoastersCharts(coasters) {
	console.log(coasters)
	const selectedCoasters = coasters.slice(0, 5)

	printSpeedChart(selectedCoasters)
	printLengthChart(coasters)
	printHeightChart(coasters)
	printInversionsChart(coasters)
	printMixedChart(selectedCoasters)
}

function printSpeedChart(selectedCoasters) {
	const coastersName = selectedCoasters.map(eachCoaster => {
		return eachCoaster.name
	})

	const coasterSpeed = selectedCoasters.map(eachCoaster => {
		return eachCoaster.speed
	})

	const chartData = {
		labels: coastersName,
		datasets: [
			{
				data: coasterSpeed,
				backgroundColor: [
					'rgba(116, 72, 194, 0.4)',
					'rgba(33, 192, 215, 0.4)',
					'rgba(217, 158, 43, 0.4)',
					'rgba(205, 58, 129, 0.4)',
				],
				borderColor: [
					'rgba(116, 72, 194, 1)',
					'rgba(33, 192, 215, 1)',
					'rgba(217, 158, 43, 1)',
					'rgba(205, 58, 129, 1)',
				],
				borderWidth: 3,
			},
		],
	}

	const optionsData = {
		plugins: {
			legend: {
				display: false,
			},
		},
	}

	new Chart('chart1', { type: 'bar', data: chartData, options: optionsData })
}

function printLengthChart(coasters) {
	const coastersLength = coasters.map(eachCoaster => {
		return eachCoaster.length
	})

	const coastersInferior1000 = coastersLength.filter(eachCoaster => {
		return eachCoaster < 1000
	})
	const coastersEntreMedio = coastersLength.filter(eachCoaster => {
		return eachCoaster >= 1000 && eachCoaster <= 1500
	})
	const coastersSuperior1500 = coastersLength.filter(eachCoaster => {
		return eachCoaster > 1500
	})

	const chartData = {
		labels: ['-1000', '1000 - 1500', '+1500'],
		datasets: [
			{
				data: [
					coastersInferior1000.length,
					coastersEntreMedio.length,
					coastersSuperior1500.length,
				],
				backgroundColor: [
					'rgba(116, 72, 194, 0.4)',
					'rgba(33, 192, 215, 0.4)',
					'rgba(217, 158, 43, 0.4)',
				],
				borderColor: [
					'rgba(116, 72, 194, 1)',
					'rgba(33, 192, 215, 1)',
					'rgba(217, 158, 43, 1)',
				],
				borderWidth: 3,
			},
		],
	}

	const optionsData = {
		plugins: {
			legend: {
				position: 'left',
			},
		},
	}

	new Chart('chart2', { type: 'doughnut', data: chartData, options: optionsData })
}

function printHeightChart(coasters) {
	const coastersCountry = coasters.map(eachCoaster => {
		return eachCoaster.country
	})

	const coastersEEUU = coastersCountry.filter(eachCoaster => {
		return eachCoaster === 'United States'
	})
	const coastersSpain = coastersCountry.filter(eachCoaster => {
		return eachCoaster === 'Spain'
	})
	const coastersJapan = coastersCountry.filter(eachCoaster => {
		return eachCoaster === 'Japan'
	})
	const coastersChina = coastersCountry.filter(eachCoaster => {
		return eachCoaster === 'China'
	})

	const chartData = {
		labels: ['EEUU', 'Japan', 'Spain', 'China'],
		datasets: [
			{
				data: [
					coastersEEUU.length,
					coastersJapan.length,
					coastersSpain.length,
					coastersChina.length,
				],
				backgroundColor: [
					'rgba(116, 72, 194, 0.4)',
					'rgba(33, 192, 215, 0.4)',
					'rgba(217, 158, 43, 0.4)',
					'rgba(156, 153, 204, 0.4)',
				],
				borderColor: [
					'rgba(116, 72, 194, 1)',
					'rgba(33, 192, 215, 1)',
					'rgba(217, 158, 43, 1)',
					'rgba(156, 153, 204, 1)',
				],
				borderWidth: 3,
			},
		],
	}

	const optionsData = {
		plugins: {
			legend: {
				position: 'left',
			},
		},
	}

	new Chart('chart3', { type: 'polarArea', data: chartData, options: optionsData })
}

function printInversionsChart(coasters) {
	const coastersInversions = coasters.filter(eachCoaster => {
		return eachCoaster.inversions > 5
	})

	const coastersName = coastersInversions.map(eachCoaster => {
		return eachCoaster.name
	})

	const numberOfInversions = coastersInversions.map(eachCoaster => {
		return eachCoaster.inversions
	})

	const chartData = {
		labels: coastersName,
		datasets: [
			{
				data: numberOfInversions,
				backgroundColor: ['rgba(116, 72, 194, 0.4)'],
				borderColor: ['rgba(116, 72, 194, 1)'],
				borderWidth: 3,
			},
		],
	}

	const optionsData = {
		plugins: {
			legend: {
				display: false,
			},
		},
	}

	new Chart('chart4', { type: 'radar', data: chartData, options: optionsData })
}

function printMixedChart(selectedCoasters) {
	const coastersName = selectedCoasters.map(eachCoaster => {
		return eachCoaster.name
	})

	const coasterSpeed = selectedCoasters.map(eachCoaster => {
		return eachCoaster.speed
	})

	const coastersHeight = selectedCoasters.map(eachCoaster => {
		return eachCoaster.height
	})

	const chartData = {
		labels: coastersName,
		datasets: [
			{
				data: coasterSpeed,
				backgroundColor: ['rgba(116, 72, 194, 0.4)'],
				borderColor: ['rgba(116, 72, 194, 1)'],
				borderWidth: 3,
			},
			{
				data: coastersHeight,
				backgroundColor: ['rgba(205, 58, 129, 0.4)'],
				borderColor: ['rgba(205, 58, 129, 1)'],
				borderWidth: 3,
				type: 'line',
			},
		],
	}

	const optionsData = {
		plugins: {
			legend: {
				display: false,
			},
		},
		elements: {
			line: {
				tension: 0.4,
			},
		},
	}

	new Chart('chart5', { type: 'bar', data: chartData, options: optionsData })
}
