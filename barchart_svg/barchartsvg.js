// DEFINE DATASET
var data = [4,8,15,16,23,42];

// DEFINE VARIABLES
// Arbitrary dimensions to set the visualization space
var width = 800,
    barHeight = 50;

// DEFINE SCALE
var linearScale = d3.scale.linear()
  .domain([0, d3.max(data)]) // This says our data ranges from 0 to the largest number in the dataset
  .range([0, width]); // This is what we want our data to scale to.

// SELECT CONTAINER AND SET IT ATTR
var chart = d3.select(".chart")
  .attr("width", width) 
  .attr("height", data.length * barHeight); 

// SELECT ALL ELEMENTS AND BIND DATA TO SELECTION
var barUpdate = chart.selectAll("g") // g refers to group of elements (i.e. the shape and the text)
  .data(data); 

// APPEND NEW Gs FOR EACH PIECE OF DATA - This positions the g's so they are not on top of each other
barUpdate.enter().append("g")
  .attr("transform", function(d,i){ // d is data and i is index; this is like Ruby's each_with_index method
    return "translate(0," + i * barHeight + ")"; // concatenation to achieve: "transform", "translate(0,40)"
  });

// Create rectangles for each g; rectangles need a height and width
barUpdate.append("rect")
  .attr("width", linearScale)
  .attr("height", barHeight - 3) // 3px represent space between bars
  .attr("fill", function(d) {
    return "rgb(0, "+ (d*5) +","  + (d * 5) + ")";
}); 

// Add text to each g that displays the data
barUpdate.append("text")
  .attr("x", function(d){
    return linearScale(d - 0.5); // x position of is 0.5px less than the width 
  })
  .attr("y", barHeight / 2) // y position in the middle of the height
  .attr("dy", ".2em") // adjustment for y position since the previous line centered the bottom of text
  .text(function(d){
    return d; 
  });
