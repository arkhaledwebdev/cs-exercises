const HashNode = require("./hash-node");

class HashMap {
  constructor(size = 16) {
    this.buckets = new Array(size).fill(null);
    this.capacity = this.buckets.length;
    this.loadFactor = 0.75;
  }

  isLoadFactorReached() {
    const loadedBuckets = this.getLoadedBuckets();
    console.log(loadedBuckets);
    return  loadedBuckets / this.capacity >= this.loadFactor;
  }

  getLoadedBuckets(){
    let bucketsLoadedNo = 0;
    Object.values(this.buckets).forEach((bucket)=>{
      if(bucket !== null){
        bucketsLoadedNo  += 1;
      }
    });
    // for(const bucket in this.buckets){
    //   if(bucket !== null){
    //     bucketsLoadedNo  += 1;
    //   }
    // }
    return bucketsLoadedNo;
  }

  resizeHashMap() {
    const newBuckets = new HashMap(this.capacity * 2);

    this.buckets.forEach((bucket)=>{
      if(bucket !== null){
        newBuckets.set(bucket.key, bucket.value);
      }
    });
    this.capacity = newBuckets.buckets.length;
    this.buckets = newBuckets;
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
}

const hashMap = new HashMap();

console.log(`Sara: ${hashMap.hash("Sara")}`);
hashMap.set("Sara", "Sara is a girl");

console.log(`elsa: ${hashMap.hash("elsa")}`);
hashMap.set("elsa", "elsa is a girl too");

console.log(`john: ${hashMap.hash("john")}`);
hashMap.set("John", "John is a boy");

console.log(hashMap);
