const BSTNode = require("./bst-node");
const prettyPrint = require("./pretty-print");

class BSTTree {
  constructor(array) {
    this.array = array;
  }

  root = this.buildTree(this.array);

  buildTree(arr, start, end) {
    const sortedArray = arr.toSorted();

    const filteredArray = [...new Set(sortedArray)];
    if (start > end) {
      return null;
    }

    const mid = (start + end) / 2;

    const rootNode = new BSTNode(filteredArray[mid]);

    console.log(prettyPrint(rootNode));

    rootNode.left = this.buildTree(filteredArray, start, mid - 1);
    rootNode.right = this.buildTree(filteredArray, mid + 1, end);

    return rootNode;
  }
}

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const testBTSTree = new BSTTree(testArray);

console.log(testBTSTree);
