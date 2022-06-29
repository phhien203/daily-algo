// O(N) time | O(N) space
function twoNumberSum(array, targetSum) {
  const complement = {};

  for (let i = 0; i < array.length; i++) {
    if (complement[array[i]] != null) {
      return [array[i], complement[array[i]]];
    }

    const comp = targetSum - array[i];
    complement[comp] = array[i];
  }

  return [];
}
