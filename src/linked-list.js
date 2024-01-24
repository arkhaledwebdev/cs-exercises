class Node {
    constructor(value = null, next = null){
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    
    constructor(head){
        this.head = head;
    }
    
    append(value){
        let currentNode = this.head;
        while(currentNode.next){
            currentNode = currentNode.next; 
        }
        currentNode.next = new Node(value);
    }

    prepend(value){
        let currentNode = this.head;
        this.head = new Node(value);
        this.head.next = currentNode;
    }

    size(){
        let count = 0;
        let currentNode = this.head;
        while(currentNode){
            currentNode = currentNode.next;
            count++;
        }
        return count;
    }

    getHead(){
        return this.head.value;
    }

    getTail(){
        let currentNode = this.head;
        while(currentNode.next){
            currentNode = currentNode.next;
        }
        return currentNode.value;
    }

    at(index){
        let currentNode = this.head;
        let number = 0;

        while(currentNode){
            if(number === index){
                return currentNode.value;   
            }
            currentNode = currentNode.next;
            number++;
        }
    }

    pop(){
        // let currentNode = this.head;

        // while(currentNode){
        //     if(currentNode.next === null){
        //         currentNode = null
        //     }
        //     currentNode = currentNode.next;
        //     number++;
        // }
    }
}

const node1 = new Node(10);
const node2 = new Node(40);
node1.next = node2;
const node3 = new Node(60);
node2.next = node3;



let linkedList = new LinkedList(node1);

linkedList.append(100);

function showLinkedList(list){
    let currentNode = list.head;
    let no = 1
    while(currentNode){
        console.log(`Node [${no}] head: ${currentNode.value}`)
        currentNode = currentNode.next;
        no++;
    }
}

showLinkedList(linkedList);

console.log(`size: ${linkedList.size()}`);
console.log(`head: ${linkedList.getHead()}`);
console.log(`tail: ${linkedList.getTail()}`);
console.log(`at(1): ${linkedList.at(0)}`);