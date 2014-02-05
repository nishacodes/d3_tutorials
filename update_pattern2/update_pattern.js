//set height and width of our container
var width = 960,
    height = 500;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(32," + (height / 2) + ")");

d3.csv("alphabet.csv", function(error, data){ 
  function update(data) {

    // DATA JOIN
    // join new data with old elements, if any.
    // text is our Update variable
    var text = svg.selectAll("text")
      .data(data, function(d){ // ADD KEYED JOIN
        return d.value
      });

    // UPDATE
    text.attr("class", "update")
      .transition()
        .duration(750)
        .attr("x", function(d,i){ return i * 32; });

    // ENTER
    text.enter().append("text")
        .attr("class", "enter")
        .attr("dy", ".35em")
        .attr("x", function(d,i) { return i * 32 ;} ) // MOVE THIS FROM ENTER + UPDATE
        .text(function(d) { return d.value; })
        .style("fill-opacity", 1e-6) // start state
        .attr("y", -60) // start state
      .transition() 
        .duration(750) // duration
        .attr("y", 0)  // end state
        .style("fill-opacity", 1); // end state

    //EXIT
    text.exit()
        .attr("class", "exit")
        .style("fill-opacity", 1) // start state
        .attr("y", 0) // start state
      .transition() 
        .duration(750) // duration
        .attr("y", 60)  // end state
        .style("fill-opacity", 1e-6)
      .remove(); // end state;
  }

  // initial display
  update(data);

  // grab random sample of letters
  setInterval(function() {
    update(shuffle(data)
        .slice(0, Math.floor(Math.random() * 26))
        .sort());
  }, 1500);

  // Shuffles the input array.
  function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m], array[m] = array[i], array[i] = t;
    }
    return array;
  }                     
});