// DEFINE DATASET
var data = [4,8,15,16,23,42];

// SELECTION 
var chart = d3.select(".chart");
var bar = chart.selectAll("div");

// BIND DATA TO SELECTION
var barUpdate = bar.data(data);

// APPEND NEW DIVS FOR EACH PIECE OF DATA
var barEnter = barUpdate.enter().append("div");

// CREATE A LINEAR SCALE TO DYNAMICALLY SIZE BARS

var linearScale = d3.scale.linear()
  .domain([0, d3.max(data)]) // says our data ranges from 0 to the largest number
  .range([0, 500]);

// STYLE THE APPENDED DIVS
barEnter.style("width", function(d){
  return linearScale(d) + "px";
  // the scale method above takes an argument thats where d comes in
}); 

// ADD TEXT TO DIVS
barEnter.text(function(d){
  return d;
});


