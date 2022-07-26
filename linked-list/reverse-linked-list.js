class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// O(N) time | O(1) space
function reverseLinkedList(head) {
  let previousNode = null;
  let currentNode = head;

  while (currentNode !== null) {
    let nextNode = currentNode.next;
    currentNode.next = previousNode;
    previousNode = currentNode;
    currentNode = nextNode;
  }

  return previousNode;
}
