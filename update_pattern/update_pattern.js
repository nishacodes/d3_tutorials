// DEFINE DATASET
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

// SET DIMENSIONS OF CONTAINER
var width = 960,
    height = 500;

// CREATE AN SVG CONTAINER
var svg = d3.select("body").append("svg")
  .attr("width", width) 
  .attr("height", height)
  .append("g")
    .attr("transform","translate(32," + (height/2) + ")");
  

// d3.csv("data.csv", type, function(error, data){ 

// 1) MAKE UPDATE FUNCTION
function update(data) {
  
  // 2) DATA JOIN
  var text = svg.selectAll("text")
    .data(data);

  // 3) UPDATE
  // data and nodes that match up
  text.attr("class", "update");

  //ENTER
  //create new elements as needed
  text.enter().append("text")
    .attr("class", "enter")
    .attr("x", function(d,i) { return i * 32 ;} )
    .attr("dy", ".35em");

  // ENTER + UPDATE
  // Appending to the enter selection expands the update selection to include
  // entering elements; so, operations on the update selection after appending to
  // the enter selection will apply to both entering and updating nodes.
  text.text(function(d) { return d; });

  //EXIT
  //remove old elements as needed
  text.exit().remove();
}
// });

//initial display
update(alphabet);

//grab random sample of letters
setInterval(function() {
  update(shuffle(alphabet)
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