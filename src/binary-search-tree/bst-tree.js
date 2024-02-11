/* eslint-disable no-param-reassign */
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

  delete(value) {
    this.root = this.deleteNode(value, this.root);
  }

  deleteNode(value, currentNode) {
    if (currentNode == null) {
      return null;
    }
    if (value < currentNode.data) {
      currentNode.left = this.deleteNode(value, currentNode.left);
      return currentNode;
    }
    if (value > currentNode.data) {
      currentNode.right = this.deleteNode(value, currentNode.right);
      return currentNode;
    }
    // NO Children
    if (currentNode.left === null && currentNode.right === null) {
      currentNode = null;
      return currentNode;
    }
    // one child to the right
    if (currentNode.left === null) {
      return currentNode.right;
    }
    // one child to the right
    if (currentNode.right === null) {
      return currentNode.left;
    }
    // two children
    const tempNode = this.findMinNode(currentNode.right);
    currentNode.data = tempNode.data;
    currentNode.right = this.deleteNode(tempNode.data, currentNode.right);
    return currentNode;
  }

  findMinNode(node) {
    if (node.left === null) {
      return node;
    }
    return this.findMinNode(node.left);
  }
}

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const testBTSTree = new BSTTree(testArray);

console.log(testBTSTree);
console.log(prettyPrint(testBTSTree.root));
testBTSTree.insert(80);
testBTSTree.insert(70);
testBTSTree.insert(100);
console.log(prettyPrint(testBTSTree.root));
testBTSTree.delete(80);
console.log(prettyPrint(testBTSTree.root));
testBTSTree.insert(80);
console.log(prettyPrint(testBTSTree.root));
