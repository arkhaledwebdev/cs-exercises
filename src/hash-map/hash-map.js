const HashNode = require("./hash-node");

class HashMap {
  constructor(size = 8) {
    this.buckets = new Array(size).fill(null);
    this.capacity = this.buckets.length;
    this.loadFactor = 0.75;
  }

  isLoadFactorReached() {
    const loadedBuckets = this.length();
    return loadedBuckets / this.capacity >= this.loadFactor;
  }

  resizeHashMap() {
    const newBuckets = new HashMap(this.capacity * 2);

    this.buckets.forEach((bucket) => {
      if (bucket !== null) {
        newBuckets.set(bucket.key, bucket.value);
      }
    });
    this.capacity = newBuckets.buckets.length;
    this.buckets = newBuckets.buckets;
  }

  hash(value) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < value.length; i++) {
      hashCode = primeNumber * hashCode + value.charCodeAt(i);
    }
    return hashCode % this.capacity;
  }

  set(key, value) {
    if (this.isLoadFactorReached()) {
      this.resizeHashMap();
    }
    const hashedKey = this.hash(key);
    this.buckets[hashedKey] = new HashNode(key, value);
  }

  get(key) {
    const hashedKey = this.hash(key);
    if (this.buckets[hashedKey] != null) {
      if (this.buckets[hashedKey].key === key) {
        return this.buckets[hashedKey].value;
      }
    }
    return null;
  }

  has(key) {
    const hashedKey = this.hash(key);
    if (this.buckets[hashedKey] != null) {
      if (this.buckets[hashedKey].key === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    const hashedKey = this.hash(key);
    if (this.buckets[hashedKey] != null) {
      if (this.buckets[hashedKey].key === key) {
        this.buckets[hashedKey] = null;
        return true;
      }
    }
    return false;
  }

  length() {
    let bucketsLoadedNo = 0;
    this.buckets.forEach((bucket) => {
      if (bucket !== null) {
        bucketsLoadedNo += 1;
      }
    });
    return bucketsLoadedNo;
  }

  keys() {
    const keysArray = [];
    this.buckets.forEach((bucket) => {
      if (bucket != null) {
        keysArray.push(bucket.key);
      }
    });
    return keysArray;
  }

  values() {
    const valuesArray = [];
    this.buckets.forEach((bucket) => {
      if (bucket != null) {
        valuesArray.push(bucket.value);
      }
    });
    return valuesArray;
  }

  entries() {
    const entriesArray = [];
    this.buckets.forEach((bucket) => {
      const tempArray = [];
      if (bucket != null) {
        tempArray[0] = bucket.key;
        tempArray[1] = bucket.value;

        entriesArray.push(tempArray);
      }
    });
    return entriesArray;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = null;
    }
  }
}

const hashMap = new HashMap();

console.log(`Ahmed: ${hashMap.hash("Ahmed")}`);
hashMap.set("Ahmed", "Ahmed is a father");

console.log(`My son Khaled: ${hashMap.hash("My Khaled")}`);
hashMap.set("Khaled", "Khaled is a son");

console.log(`Omar: ${hashMap.hash("Omar")}`);
hashMap.set("Omar", "Omar is a baby");

console.log(`Reham: ${hashMap.hash("Reham")}`);
hashMap.set("Reham", "Reham is a mother");

console.log(hashMap);
console.log(`Length : ${hashMap.length()}`);

console.log(`get Khaled: ${hashMap.get("Khaled")}`);
console.log(`has Reham: ${hashMap.has("Reham")}`);
console.log(`remove Ahmed: ${hashMap.remove("Ahmed")}`);

console.log(hashMap);
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());
