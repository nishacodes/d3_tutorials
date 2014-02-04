var width = 420,
    barHeight = 20;

var linearScale = d3.scale.linear()
  // would normally set the domain, but don't knwo about data yet
  .range([0, width]);

var chart = d3.select(".chart")
  .attr("width", width);

// LOAD THE DATA
d3.csv("data.csv", type, function(error, data){ // arguments: data, function to clean up, function to call
  linearScale.domain([0,d3.max(data, function(d){return d.value;})]) // set the domain now 
  chart.attr("height", barHeight * data.length) // set the height now

  // BIND THE DATA
  var bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d,i){
        return "translate(0," + i * barHeight + ")";
      });

    bar.append("rect")
      .attr("width", function(d){ return linearScale(d.value); }) // value is defined in the csv
      .attr("height", barHeight - 1);  
      // .attr("fill", function(d){
      //   return "rgb(0, "+ (d*5) +","  + (d * 5) + ")";
      // }); 

   bar.append("text")
    .attr("x", function(d){
      return linearScale(d.value - 0.5); // x position of is 0.5px less than the width 
    })
    .attr("y", barHeight / 2) // y position in the middle of the height
    .attr("dy", ".2em") // adjustment for y position since the previous line centered the bottom of text
    .text(function(d){
      return d.value; 
    });   

});

function type(d) {
  d.value = +d.value; // + is short for parseInt(d.value) which converts the values from strings into integers
  return d;
}