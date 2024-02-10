const BSTNode = require("./bst-node");
const prettyPrint = require("./pretty-print");

class BSTTree {
  constructor(array) {
    this.array = Array.from(new Set(array)).sort((a, b) => a - b);
    this.root = this.buildTree(this.array);
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);

    const rootNode = new BSTNode(arr[mid]);

    rootNode.left = this.buildTree(arr, start, mid - 1);
    rootNode.right = this.buildTree(arr, mid + 1, end);

    return rootNode;
  }

  insert(value) {
    let currentNode = this.root;

    while (currentNode) {
      if (value === currentNode.data) return;
      if (value < currentNode.data) {
        if (currentNode.left == null) {
          currentNode.left = new BSTNode(value);
          return;
        }
        currentNode = currentNode.left;
      }

      if (value > currentNode.data) {
        if (currentNode.right == null) {
          currentNode.right = new BSTNode(value);
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  delete(value, root = this.root) {
    let currentNode = this.root;
    while (currentNode) {
      if (value === currentNode.data) {
        if (currentNode.left === null && currentNode.right === null) {
          currentNode = null;
          return;
        }
      }
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      }

      if (value > currentNode.data) {
        currentNode = currentNode.right;
      }
    }
  }
}

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const testBTSTree = new BSTTree(testArray);

console.log(testBTSTree);
console.log(prettyPrint(testBTSTree.root));
testBTSTree.insert(100);
console.log(prettyPrint(testBTSTree.root));
testBTSTree.delete(100);
console.log(prettyPrint(testBTSTree.root));
