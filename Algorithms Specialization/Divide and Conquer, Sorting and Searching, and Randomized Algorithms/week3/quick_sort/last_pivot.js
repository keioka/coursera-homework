var quickSort = {
  count: 0,
  quickSort: quickSort,
};

function quickSort(arr, leftIndex, rightIndex){
    
  // leftIndex and rightIndex could be "-1" or "undefined".
  // -1 is "falsy" so || operator does not work.
  // Instead of that, use Number.isInteger().
  
  var left = Number.isInteger(leftIndex) ? leftIndex : 0;
  var right = Number.isInteger(rightIndex) ? rightIndex : arr.length - 1;
   
  var partitionIndex;

  if (left < right) {
    partitionIndex = partition.call(this, arr, left, right);
    
    this.quickSort(arr, left, partitionIndex - 1);
    this.quickSort(arr, partitionIndex + 1, right);
  }
  
  return arr;
}

function partition(arr, left, right){
  // console.log('============')
  // console.log(left, right)
  this.count += right - left;

  // swap last element
  swap(arr, left, right);

  // Choose left most element (previously right most element) as a pivot.
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
  var temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

module.exports = quickSort;