// O(n) time | O(n) space
function nextGreaterElement(array) {
  const result = new Array(array.length).fill(-1);
  const stack = [];

  for (let i = 0; i < array.length * 2; i++) {
    let circularIdx = i % array.length;

    while (
      stack.length > 0 &&
      array[stack[stack.length - 1]] < array[circularIdx]
    ) {
      const topIdx = stack.pop();
      result[topIdx] = array[circularIdx];
    }

    stack.push(circularIdx);
  }

  return result;
}
