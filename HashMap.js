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

    length() {
        return this.entryCount;
    }

    clear() {
        this.buckets = [];
        for (let i = 0; i < this.capacity; i++) {
            this.buckets.push([]);
        }
        this.entryCount = 0;
    }

    keys() {
        const result = [];

        for (const bucket of this.buckets) {
            for (const pair of bucket) {
                result.push(pair[0]);
            }
        }
        return result;
    }

    values() {
        const result = [];

        for (const bucket of this.buckets) {
            for (const pair of bucket) {
                result.push(pair[1]);
            }
        }
        return result;
    }

    entries() {
        const result = [];

        for (const bucket of this.buckets) {
            for (const pair of bucket) {
                result.push([pair[0], pair[1]]);
            }
        }
        return result;
    }

    resize() {
        const saved = this.entries();
        this.capacity *= 2;
        this.clear();

        for (const entry of saved) {
            this.set(entry[0], entry[1]);
        }
    }
}

const hashtest = new HashMap();

hashtest.set("a", "green");
hashtest.set("ab", "yellow");
hashtest.set("q", "purple");
hashtest.resize();
console.log(hashtest.capacity);
console.log(hashtest.buckets.length);
console.log(hashtest.length());
console.log(hashtest.get("a"));
console.log(hashtest.get("ab"));
console.log(hashtest.get("q"));
console.log(hashtest.hash("q"));
console.log(hashtest.entries());