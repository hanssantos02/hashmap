class HashMap {
    constructor(capacity = 16, loadFactor = 0.75) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = [];
        for (let i = 0; i < this.capacity; i++) {
            this.buckets.push([]);
        }
        this.entryCount = 0;
    }
}

const hash = new HashMap();

console.log(hash.capacity);
console.log(hash.loadFactor);
console.log(hash.buckets);
console.log(hash.entryCount);
console.log(hash.buckets.length);
console.log(hash.buckets[0] === hash.buckets[1]);