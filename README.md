![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# LAB | ChartJS


## Introduction

You are about to design five data visulization charts trough the ChartJS library (using [version 3](https://cdnjs.com/libraries/Chart.js/3.9.1)]. 
The data will be fetched using [Axios](https://axios-http.com/) from this [rollercoaster API](https://multiapi-app.fly.dev/coasters/allCoasters).

The base application with ExpressJS is provided as well as the stats view and the required CSS styling.


## Requirements

- Fork this repo
- Clone this repo

## Submission

- Upon completion, run the following commands:

  ```
  git add .
  git commit -m "done"
  git push origin master
  ```

- Create Pull Request so your TAs can check up your work.

## Instructions


### Bar chart
Compare coaster's speed (property `speed`) using the five fastest rollercoasters

### Dougnut chart
Compare coaster's length (`length` property) in three classifications: less than 1000m, 1000 to 1500m, more than 1500m.

### Polar area chart
Compare coaster's length (`country` property) in four classifications: USA, Spain, Japan and China.

### Radar chart
Compare coaster's inversions (`inversions` property) only of those with 5 or more inversions.

### Bar + line chart
Compare coaster's speed (`speed` property in bar chart) with height (`height` property in line chart) of the first five roller coasters from the API. It is necessary to combine two `datasets`, indicating a specific `type` property to vary from one chart type to another.


## Target product preview
![219382932-5c4e2930-871c-45ab-a705-378fc062e3df](https://user-images.githubusercontent.com/26923217/225287800-8dafaffc-1fa8-4391-8176-d1c0c2cc1e9d.png)
