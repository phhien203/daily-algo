class MinHeap {
  constructor(array) {
    this.heap = this.buildHeap(array);
  }

  // O(N) time | O(1) space
  buildHeap(array) {
    const firstParentIdx = Math.floor((array.length - 1 - 1) / 2);

    for (let i = firstParentIdx; i >= 0; i--) {
      this.siftDown(i, array.length - 1, array);
    }

    return array;
  }

  // O(1) time | O(1) space
  peek() {
    return this.heap[0];
  }

  // O(log(N)) time | O(1) space
  siftDown(currentIdx, endIdx, array) {
    let childOneIdx = currentIdx * 2 + 1;

    while (childOneIdx <= endIdx) {
      let childTwoIdx = currentIdx * 2 + 2;

      if (childTwoIdx > endIdx) {
        childTwoIdx = -1;
      }

      let idxToSwap;

      if (childTwoIdx !== -1 && array[childTwoIdx] < array[childOneIdx]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }

      if (array[currentIdx] > array[idxToSwap]) {
        this.swap(currentIdx, idxToSwap, array);
      } else {
        break;
      }

      currentIdx = idxToSwap;
      childOneIdx = currentIdx * 2 + 1;
    }
  }

  // O(log(N)) time | O(1) space
  siftUp(currentIdx, array) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);

    while (currentIdx > 0 && array[parentIdx] > array[currentIdx]) {
      this.swap(currentIdx, parentIdx, array);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  // O(log(N)) time | O(1) space
  remove() {
    this.swap(0, this.heap.length - 1, this.heap);
    const valueToReturn = this.heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return valueToReturn;
  }

  // O(log(N)) time | O(1) space
  insert(value) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1, this.heap);
  }

  swap(i, j, array) {
    [array[i], array[j]] = [array[j], array[i]];
  }
}
