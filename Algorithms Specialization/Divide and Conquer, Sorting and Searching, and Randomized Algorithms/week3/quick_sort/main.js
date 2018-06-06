var fs = require('fs');

var firstPivot = require('./first_pivot.js');
var lastPivot = require('./last_pivot.js');
var midPivot = require('./mid_pivot.js');

var array = [];
var array2 = [];
var array3 = [];
fs.readFile('./data.txt', function(err, data) {
	var lines = data.toString().split('\n').map(function(d) { return parseInt(d) });
	for (let line of lines) {
	 	array.push(line);
	}

	array2 = [...array];
	array3 = [...array];
});

// array = [4, 1, 5, 2, 3];
      
// setTimeout(function() {
//   firstPivot.quickSort(array, 0, array.length - 1);
//   console.log(firstPivot.count);
// }, 1000)

// setTimeout(function() {
//   lastPivot.quickSort(array2, 0, array.length - 1);
//   console.log(lastPivot.count);
// }, 1000)

setTimeout(function() {
  // array3 = [21, 2, 5, 4, 3];
  // console.log(array3)
  console.log(midPivot.quickSort(array3, 0, array3.length - 1));
  console.log(midPivot.count);
}, 1000)