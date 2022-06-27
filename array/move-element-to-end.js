// O(N) time | O(1) space
function moveElementToEnd(array, toMove) {
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    while (array[right] === toMove && right > left) {
      right--;
    }
    while (array[left] !== toMove && left < right) {
      left++;
    }

    [array[left], array[right]] = [array[right], array[left]];
    right--;
    left++;
  }

  return array;
}
