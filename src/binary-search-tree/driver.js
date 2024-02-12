const Tree = require("./bst-tree");
const prettyPrint = require("./pretty-print");

function generateRandomArray(length, factor) {
  return Array.from({ length }, () => Math.floor(Math.random() * factor));
}

const BSTree = new Tree(generateRandomArray(30, 100));
console.log(prettyPrint(BSTree.root));
console.log(`Is the tree balanced: ${BSTree.isBalanced()}`);
console.log(`Level order: ${BSTree.levelOrder()}`);
console.log(`Pre-order: ${BSTree.preOrder()}`);
console.log(`In-order: ${BSTree.inOrder()}`);
console.log(`Post-order: ${BSTree.postOrder()}`);
// generate 10 random numbers and insert them
const randomArray = generateRandomArray(10, 20);
for (let i = 0; i < randomArray.length; i++) {
  const number = randomArray[i];
  BSTree.insert(number);
}
console.log(`Insert these random numbers: ${randomArray}`);
console.log(prettyPrint(BSTree.root));
console.log(`Is the tree balanced: ${BSTree.isBalanced()}`);
console.log(`Re-balance the tree`);
BSTree.reBalance();
console.log(prettyPrint(BSTree.root));
console.log(`Is the tree balanced: ${BSTree.isBalanced()}`);
console.log(`Level order: ${BSTree.levelOrder()}`);
console.log(`Pre-order: ${BSTree.preOrder()}`);
console.log(`In-order: ${BSTree.inOrder()}`);
console.log(`Post-order: ${BSTree.postOrder()}`);
