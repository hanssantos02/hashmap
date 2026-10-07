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

    hash(key) {
        let current = 0;

        for (let i = 0; i < key.length; i++) {
            current = ( 31 * current + key.charCodeAt(i) ) % this.capacity;
        }

        return current;
    }

    set(key, value) {
        const index = this.hash(key);

        if ( index < 0 || index >= this.buckets.length ) {
            throw new Error("Trying to access index out of bounds");
        }

        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);
        this.entryCount += 1;
    }

    get(key) {
        const index = this.hash(key);

        if ( index < 0 || index >= this.buckets.length ) {
            throw new Error("Trying to access index out of bounds");
        }

        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return undefined;
    }

    has(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.entryCount -= 1;
                return true;
            }
        }
        return false;
    }
}

const hashtest = new HashMap();

hashtest.set("a", "red");
hashtest.set("ab", "blue");
hashtest.set("a", "green");
hashtest.set("ab", "yellow");
hashtest.set("q", undefined);
console.log(hashtest.entryCount);
console.log(hashtest.remove("ab"));
console.log(hashtest.entryCount);
console.log(hashtest.remove("ab"));
console.log(hashtest.entryCount);
console.log(hashtest.remove("a"));
console.log(hashtest.entryCount);
console.log(hashtest.remove("q"));
console.log(hashtest.entryCount);
console.log(hashtest.remove("b"));
console.log(hashtest.entryCount);