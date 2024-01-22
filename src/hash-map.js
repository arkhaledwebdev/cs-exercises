const HashNode = require("./hash-node");
class HashMap {
  constructor() {
    this.buckets = new Array(16).fill(null);
    this.capacity = this.buckets.length;
    this.loadFactor = 0.75;
  }

  isLoadFactorReached() {
    return this.buckets.length / this.capacity >= this.loadFactor;
  }

  // resizeHashMap() {}

  hash(value) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < value.length; i++) {
      hashCode = primeNumber * hashCode + value.charCodeAt(i);
    }
    return hashCode % this.capacity;
  }

  set(key, value) {
    // if (this.isLoadFactorReached()) {
    //   resizeHashMap();
    // }
    const hashedKey = this.hash(value);
    this.buckets[hashedKey] = new HashNode(key, value);
  }
}

const hashMap = new HashMap();
const key1 = hashMap.hash("Sara");
console.log(key1);
hashMap.set(key1, "Sara");
const key2 = hashMap.hash("elsa");
console.log(key2);
hashMap.set(key2, "elsa");
const key3 = hashMap.hash("John");
console.log(key3);
hashMap.set(key3, "John");
console.log(hashMap);
