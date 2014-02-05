//create our data (the alphabet)
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

//set height and width of our container
var width = 960,
    height = 500;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(32," + (height / 2) + ")");

function update(data) {

  // DATA JOIN
  // join new data with old elements, if any.
  //text is our Update variable
  var text = svg.selectAll("text")
    .data(data);

  //UPDATE
  //update old elements as needed
  text.attr("class", 'update');

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