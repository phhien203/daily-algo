class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function validateBST(tree: BST): boolean {
  return validateBSTHelper(tree, -Infinity, Infinity);
}

function validateBSTHelper(
  tree: BST,
  minValue: number,
  maxValue: number
): boolean {
  if (tree === null) return true;
  if (tree.value < minValue || tree.value >= maxValue) return false;
  const isLeftTreeValid = validateBSTHelper(tree.left, minValue, tree.value);
  return isLeftTreeValid && validateBSTHelper(tree.right, tree.value, maxValue);
}
