var fs = require('fs');
var count = 0;

fs.readFile('./data.txt', 'utf-8', function(err, data) {
  var array = [];
  var lines = data.toString().split('\n').map(function(d) { return parseInt(d) });
  for (let line of lines) {
  	array.push(line);
  }
  console.log(mergeSort(array));
  console.log(count)
});

// O(n log N)
var m = 0;
function mergeSort(array) {
  if (array.length < 2) {
  	return array;
  }

  var mid = Math.floor(array.length / 2);
  var left = array.slice(0, mid);
  var right = array.slice(mid, array.length);

  return merge(mergeSort(left), mergeSort(right));
}


// O(n)

function merge(array1, array2, mid) {
  var i = j = 0;

  var sortedArray = [];

  while (array1.length > i && array2.length > j) {
  	if (array1[i] <= array2[j]) {
  		sortedArray.push(array1[i]);
  		i++;
  	} else {
  		sortedArray.push(array2[j]);
  		count += array1.length - i;
        
  		if (count === 100000) {
  			console.log(array1, array2)
  			throw new Error()
  		}
  		j++;
  	}
  }

  while(array1.length > i) {
  	sortedArray.push(array1[i]);
    i++;
  }

  while(array2.length > j) {
  	sortedArray.push(array2[j]);
    j++;
  }


  return sortedArray
}