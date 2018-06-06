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

  if (left < right) {
    var partitionIndex = partition.call(this, arr, left, right);
    this.quickSort(arr, left, partitionIndex - 1);
    this.quickSort(arr, partitionIndex + 1, right);
  }
  
  return arr;
}

var count = 0;
function median(arr, left, right) {
  // The length of Subarray
  var length = right - left + 1;
  var median = length % 2 === 0 ? Math.floor(length / 2) - 1 : Math.floor(length / 2)
  median += left;

  // For the input array 8 2 4 5 7 1 you would consider 
  // the first (8), middle (4), and last (1) elements; since 4 is the median of the set {1,4,8}, you would use 4 as your pivot element.
  // { right}
  if (
    (arr[left] <= arr[median] && arr[median] <= arr[right]) ||
    (arr[right] <= arr[median] && arr[median] <= arr[left])
  ) {
    return median;

  // elif self._array[median] <= self._array[end] <= self._array[start] 
  // or self._array[start] <= self._array[end] <= self._array[median]:
  } else if (
    (arr[median] <= arr[right] && arr[right] <= arr[left]) ||
    (arr[left] <= arr[right] && arr[right] <= arr[median])
  ) {
    return right
  } 

  // We don't need "left" pivot case since it is default. 
  // We can just skip it.

}

function partition(arr, left, right){
  this.count += right - left;

  // swap last element
  var medianIndex = median(arr, left, right);

  if (medianIndex) {
    swap(arr, left, medianIndex);
  }

  console.log('median final', medianIndex)
  console.log('arr left', arr[left])

  // Choose left most element (previously right most element) as a pivot.
  var pivotValue = arr[left];
  
  // Partion Start from right
  var partitionIndex = left;
 
  for(var i = left + 1; i <= right ; i++){
    // console.log('swap', i, partitionIndex,  arr);

    // If arr[i] is smaller than pivot value
    if(arr[i] < pivotValue) {
      partitionIndex++;
      swap(arr, i, partitionIndex);
    }

  }

  // Switch left element which is pivot to sorted position.
  swap(arr, left, partitionIndex);
  
  // console.log(arr);
  return partitionIndex;
}

function swap(arr, index1, index2) {
  var temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

module.exports = quickSort;