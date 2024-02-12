/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
const BSTNode = require("./bst-node");

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

  find(value) {
    let currentNode = this.root;

    if (currentNode === null) {
      return null;
    }

    while (currentNode) {
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      }

      if (value > currentNode.data) {
        currentNode = currentNode.right;
      }

      if (value === currentNode.data) {
        break;
      }
    }
    return currentNode;
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

  height(node = this.root) {
    if (node === null) return 0;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
  }

  heightOfNode(value) {
    return this.height(this.find(value));
  }

  depth(value) {
    let currentNode = this.root;
    let height = 0;
    while (currentNode) {
      if (value < currentNode.data) {
        height += 1;
        currentNode = currentNode.left;
      }
      if (value > currentNode.data) {
        height += 1;
        currentNode = currentNode.right;
      }
      if (value === currentNode.data) {
        break;
      }
    }
    return height;
  }

  levelOrder(callback) {
    const queue = [];
    const printQueue = [];
    queue.push(this.root);

    while (queue.length !== 0) {
      const shiftedNode = queue.shift();
      if (callback) {
        callback(shiftedNode);
      } else {
        printQueue.push(shiftedNode.data);
      }

      if (shiftedNode.left != null) {
        queue.push(shiftedNode.left);
      }

      if (shiftedNode.right != null) {
        queue.push(shiftedNode.right);
      }
    }
    if (callback) {
      return undefined;
    }
    return printQueue;
  }

  levelOrderRecursive(callback, queue = [this.root], printQueue = []) {
    if (queue.length === 0) return;

    const shiftedNode = queue.shift();

    if (callback) {
      callback(shiftedNode);
    } else {
      printQueue.push(shiftedNode.data);
    }

    if (shiftedNode.left != null) {
      queue.push(shiftedNode.left);
    }

    if (shiftedNode.right != null) {
      queue.push(shiftedNode.right);
    }

    this.levelOrderRecursive(callback, queue, printQueue);

    if (!callback) {
      return printQueue;
    }
  }

  preOrder(callback, printQueue = [], node = this.root) {
    if (node === null) return;

    if (callback) {
      callback(node);
    } else {
      // add node to the array
      printQueue.push(node.data);
    }
    // left
    if (node.left) {
      this.preOrder(callback, printQueue, node.left);
    }
    // right
    if (node.right) {
      this.preOrder(callback, printQueue, node.right);
    }
    if (!callback) {
      return printQueue;
    }
  }

  inOrder(callback, printQueue = [], node = this.root) {
    if (node === null) return;
    // left
    this.inOrder(callback, printQueue, node.left);

    if (callback) {
      callback(node);
    } else {
      // add the node
      printQueue.push(node.data);
    }
    // right
    this.inOrder(callback, printQueue, node.right);

    if (!callback) {
      return printQueue;
    }
  }

  postOrder(callback, printQueue = [], node = this.root) {
    if (node === null) return;
    // left
    this.postOrder(callback, printQueue, node.left);
    // right
    this.postOrder(callback, printQueue, node.right);

    if (callback) {
      callback(node);
    } else {
      // add the node
      printQueue.push(node.data);
      return printQueue;
    }
  }

  isBalanced() {
    const leftTreeHeight = this.height(this.root.left);
    const rightTreeHeight = this.height(this.root.right);
    return !(
      leftTreeHeight - rightTreeHeight || rightTreeHeight - leftTreeHeight > 1
    );
  }

  reBalance() {
    const newSortedArray = this.inOrder();
    this.root = this.buildTree(newSortedArray);
  }
}

module.exports = BSTTree;

// const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// const testBTSTree = new BSTTree(testArray);

// prettyPrint(testBTSTree.root);
// console.log("insert 100, 120, 130, 140");
// testBTSTree.insert(100);
// testBTSTree.insert(120);
// testBTSTree.insert(130);
// testBTSTree.insert(140);
// prettyPrint(testBTSTree.root);
// console.log("delete 6345");
// testBTSTree.delete(6345);
// prettyPrint(testBTSTree.root);
// console.log("find 324");
// console.log(testBTSTree.find(324));
// console.log(`height of (67) : ${testBTSTree.heightOfNode(67)}`);
// console.log(`depth of (67) : ${testBTSTree.depth(67)}`);
// console.log(`Level order : ${testBTSTree.levelOrder()}`);
// console.log(`Level order : ${testBTSTree.levelOrderRecursive()}`);
// console.log(`Pre-order : ${testBTSTree.preOrder()}`);
// console.log(`In-order : ${testBTSTree.inOrder()}`);
// console.log(`Post-order : ${testBTSTree.postOrder()}`);
// prettyPrint(testBTSTree.root);
// console.log(`isBalanced : ${testBTSTree.isBalanced()}`);
// console.log("reBalance the tree");
// testBTSTree.reBalance();
// prettyPrint(testBTSTree.root);
