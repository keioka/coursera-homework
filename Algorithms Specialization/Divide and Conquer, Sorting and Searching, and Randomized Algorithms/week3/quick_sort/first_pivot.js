var quickSort = {
  count: 0,
  quickSort: quickSort,
};

function quickSort(arr, leftIndex, rightIndex){
 
  // leftIndex and rightIndex could be "-1" or "undefined".
  // -1 is "falsy" so || operator does not work.
  // Instead of that, use Number.isInteger().
  var left = leftIndex
  var right = rightIndex

  if (left >= right) {
    return;
  }

  var partitionIndex = partition.call(this, arr, left, right);
  // Avoid partitionIndex to be included.
  this.quickSort(arr, left, partitionIndex - 1);
  this.quickSort(arr, partitionIndex + 1, right);
  
  return arr;
}

function partition(arr, left, right){
  // console.log('============')
  // console.log(left, right)
  this.count += right - left;

  // console.log(arr.slice(left, right));

  // Choose left most element as a pivot.
  var pivotValue = arr[left];
  
  // Partion Start from right
  var partitionIndex = left + 1;
 
  for(var i = left + 1; i <= right; i++){
    // console.log('swap', i, partitionIndex,  arr);

  	// If arr[i] is smaller than pivot value
    if(arr[i] < pivotValue) {
      swap(arr, i, partitionIndex);
      partitionIndex++;
    }
  }

  // Switch left element which is pivot to sorted position.
  swap(arr, left, partitionIndex - 1);
  
  // console.log(arr);
  return partitionIndex - 1;
}

function swap(arr, index1, index2) {
  // console.log('swap');
  // console.log(index1, arr[index1]);
  // console.log(index2, arr[index2])
  var temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

module.exports = quickSort;