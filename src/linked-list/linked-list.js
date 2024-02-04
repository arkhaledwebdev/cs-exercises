const Node = require("./linked-node");

class LinkedList {
  constructor(head) {
    this.head = head;
  }

  append(value) {
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = new Node(value);
  }

  prepend(value) {
    const currentNode = this.head;
    this.head = new Node(value);
    this.head.next = currentNode;
  }

  size() {
    let count = 0;
    let currentNode = this.head;
    while (currentNode) {
      currentNode = currentNode.next;
      count += 1;
    }
    return count;
  }

  getHead() {
    return this.head.value;
  }

  getTail() {
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    return currentNode.value;
  }

  at(index) {
    let currentNode = this.head;
    let number = 0;

    while (currentNode) {
      if (number === index) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
      number += 1;
    }
    return number;
  }

  pop() {
    let currentNode = this.head;
    let lastNode = null;

    while (currentNode.next) {
      lastNode = currentNode;
      currentNode = currentNode.next;
    }
    lastNode.next = null;
  }

  contains(value) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  find(value) {
    let currentNode = this.head;
    let index = 0;
    while (currentNode) {
      if (currentNode.value === value) {
        return index;
      }
      currentNode = currentNode.next;
      index += 1;
    }
    return null;
  }

  insertAt(value, index) {
    let currentNode = this.head;
    let previousNode = null;
    let currentIndex = 0;
    while (currentNode) {
      if (index === 0) {
        this.prepend(value);
        return;
      }
      if (index === this.size()) {
        this.append(value);
        return;
      }
      if (currentIndex === index) {
        const tempNode = new Node(currentNode.value, currentNode.next);
        currentNode.value = value;
        currentNode.next = tempNode;
        previousNode.next = currentNode;
        return;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
      currentIndex += 1;
    }
  }

  remove(index) {
    let currentNode = this.head;
    let previousNode = null;
    let currentIndex = 0;

    while (currentNode) {
      if (index === 0) {
        this.head = currentNode.next;
        return;
      }
      if (currentNode.next === null) {
        currentNode = null;
        previousNode.next = currentNode;
        return;
      }
      if (index === currentIndex) {
        currentNode.value = currentNode.next.value;
        currentNode.next = currentNode.next.next;
        previousNode.next = currentNode;
        return;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
      currentIndex += 1;
    }
  }

  toString() {
    let currentNode = this.head;
    let nodeString = "";
    while (currentNode) {
      nodeString += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.next;
    }
    nodeString += "null";
    return nodeString;
  }
}

const node1 = new Node(10);
const node2 = new Node(40);
node1.next = node2;
const node3 = new Node(60);
node2.next = node3;

const linkedList = new LinkedList(node1);

linkedList.append(100);
linkedList.append(200);

function showLinkedList(list) {
  let currentNode = list.head;
  let no = 1;
  while (currentNode) {
    console.log(`Node [${no}] head: ${currentNode.value}`);
    currentNode = currentNode.next;
    no += 1;
  }
}

linkedList.pop();

showLinkedList(linkedList);

console.log(`size: ${linkedList.size()}`);
console.log(`head: ${linkedList.getHead()}`);
console.log(`tail: ${linkedList.getTail()}`);
console.log(`at(1): ${linkedList.at(0)}`);
console.log(`contains(100): ${linkedList.contains(100)}`);
console.log(`find(100): ${linkedList.find(100)}`);
console.log(linkedList.toString());
console.log(`insert: 20 at index 1`);
linkedList.insertAt(20, 1);
console.log(linkedList.toString());
console.log(`remove: at index 44`);
linkedList.remove(44);
console.log(linkedList.toString());
