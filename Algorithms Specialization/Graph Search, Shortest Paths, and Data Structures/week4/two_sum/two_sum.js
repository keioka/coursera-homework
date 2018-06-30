var fs = require('fs');
var cluster = require('cluster');
const low = -10000;
const high = 10000;

fs.readFile('./d.txt', 'utf8', function(err, data) {

		// console.log("============")
		// console.log(processNum)
		// console.log(rangeLow)
		// console.log(rangeHigh)

		console.log('result => ', findTwoSum(data, low, high));
});

function generateData(low, high) {
	const array = [];
	var i = low;
	while (i <= high) {
		array.push(i);
		i++;
	}

	return array;
}

function findTwoSum(data, low, high) {
	var memo = {};
    var pairs = 0;
    var foundPair = {};
    data.toString().split("\n").forEach(function(value) {
    	memo[value] = true;
	});

    
	const array = Object.keys(memo);
   	let source = generateData(low, high);
	
	var i = 0;
	while (i < array.length) {	
		var j = 0;
		while (j <= source.length) {
			let value = array[i];
			const target = source[j];		
			const b = target - value;

			if (memo[b] && b !== value) {
				foundPair[target] = true;
				source = source.filter((t) => t !== target)
				pairs++;
			}
			j++;
		}
		i++;
	}
	return pairs;
}


// 1: 3, 10
// 2: 0, 4


