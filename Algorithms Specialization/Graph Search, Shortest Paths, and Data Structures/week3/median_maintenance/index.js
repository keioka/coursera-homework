var fs = require('fs');

function getIndexParent(i) {
	return Math.round(i / 2 - 1);
}

function getIndexLeftChild(i) {
	return i * 2 + 1;
}

function getIndexRightChild(i) {
	return i * 2 + 2;
}

function Heap() {
	this.array = [];
}

Heap.prototype.insert = function(value) {
	this.array.push(value);
	this.siftUp();
}

Heap.prototype.heapify = function() {
	this.siftDown(this.array);
}

Heap.prototype.swap = function(i1, i2) {
 	const temp = this.array[i2];
 	this.array[i2] = this.array[i1];
 	this.array[i1] = temp;
}

Heap.prototype.getLastNodeIndex = function() {
	return this.array.length - 1;
}

Heap.prototype.getLastNode = function() {
    return this.array[this.array.length - 1];
}

Heap.prototype.getTopNode = function() {
    return this.array[0];
}

Heap.prototype.extract = function() {
	var node = this.array.shift();
	this.array.unshift(this.array.pop())
	this.siftDown(0);
	return node;
}

Heap.prototype.size = function(){
	return this.array.length;
};

function MinHeap() {
	Heap.call(this);
};

MinHeap.prototype = Object.create(Heap.prototype);

// O(n)
MinHeap.prototype.siftUp = function() {
	var currentIndex = this.getLastNodeIndex();
	while (this.array[currentIndex] < this.array[getIndexParent(currentIndex)]) {
       this.swap(currentIndex, getIndexParent(currentIndex));
       currentIndex = getIndexParent(currentIndex);
	}
}

MinHeap.prototype.siftDown = function(i) {
	const leftIndex = getIndexLeftChild(i);
	const rightIndex = getIndexRightChild(i);
    var leftNode = this.array[leftIndex];
    var rightNode = this.array[rightIndex];
	const currentNode = this.array[i];

	if (!leftNode && !rightNode) {
		return;
	}

	if (!leftNode) {
		if (rightNode < currentNode) {
			this.swap(rightIndex, i);
		} 
		return;
	}

	if (!rightNode) {
		if (leftNode < currentNode) {
			this.swap(leftIndex, i);
		} 
		return;
	}


    let smallestIndex;

	
	if (leftNode < rightNode) {
		smallestIndex = leftIndex;
	} else {
		smallestIndex = rightIndex;
	}

	if (currentNode < this.array[smallestIndex]) {
		smallestIndex = i;
	}

	if (smallestIndex !== i) {
		this.swap(smallestIndex, i);
		this.siftDown(smallestIndex);
	}
}

function MaxHeap() {
	Heap.call(this);
};

MaxHeap.prototype = Object.create(Heap.prototype);

MaxHeap.prototype.siftUp = function() {
	var currentIndex = this.getLastNodeIndex();
	while (this.array[currentIndex] > this.array[getIndexParent(currentIndex)]) {
       this.swap(currentIndex, getIndexParent(currentIndex));
       currentIndex = getIndexParent(currentIndex);
	}
}

MaxHeap.prototype.siftDown = function(i) {
	const leftIndex = getIndexLeftChild(i);
	const rightIndex = getIndexRightChild(i);
    var leftNode = this.array[leftIndex];
    var rightNode = this.array[rightIndex];
	const currentNode = this.array[i];

	if (!leftNode && !rightNode) {
		return;
	}

	if (!leftNode) {
		if (rightNode > currentNode) {
			this.swap(rightIndex, i);
		} 
		return;
	}

	if (!rightNode) {
		if (leftNode > currentNode) {
			this.swap(leftIndex, i);
		} 
		return;
	}

    let largestIndex;

	
	if (leftNode > rightNode) {
		largestIndex = leftIndex;
	} else {
		largestIndex = rightIndex;
	}

	if (currentNode > this.array[largestIndex]) {
		largestIndex = i;
	}

	if (largestIndex !== i) {
		this.swap(largestIndex, i);
		this.siftDown(largestIndex);
	}
}

function getMedian(currentElement, median, left, right) {

	// If the size of left heap and right heap is same
    if (left.size() === right.size()) {
 		if(currentElement < median) {
            left.insert(currentElement);
            median = left.getTopNode();
        } else {
            right.insert(currentElement);
            median = right.getTopNode();
        }
	// If the size of left heap is greater than right heap
    } else if (left.size() > right.size()) {
		if(currentElement < median) {
			left.insert(currentElement);
			const leftExtract = left.extract();
            right.insert(leftExtract);
        } else {
            right.insert(currentElement);
        }

        median = left.getTopNode();

    } else if (right.size() > left.size()) {
		if(currentElement < median) {
			left.insert(currentElement);
        } else {
        	right.insert(currentElement);
        	const rightExtractData = right.extract();
            left.insert(rightExtractData);
        }
        
        median = left.getTopNode();
    }

    return median
}

function median_meintain(data) {
	const left = new MaxHeap();
	const right = new MinHeap();
    let median = 0;
    let total = 0;
    const medians = [];

    data.toString().split("\n").forEach(function(value) {
		let node = parseInt(value);
		median = getMedian(node, median, left, right);
		total += median
		medians.push(median);
	});
    console.log('result', total % 10000);
}

fs.readFile('./data.txt', 'utf8', function(err, data) {
	median_meintain(data);
}); 