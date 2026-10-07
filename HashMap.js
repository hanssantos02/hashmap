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
        const currentLoad = this.entryCount / this.capacity;
        if (currentLoad > this.loadFactor) {
            this.resize();
            return;
        }
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

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
console.log(test.length());
console.log(test.capacity);
test.set('lion', 'golden');
console.log(test.length());
console.log(test.capacity);
test.set('apple', 'crimson');
console.log(test.length());
console.log(test.capacity);
const savedEntries = test.entries();
test.set('moon', 'silver');
for (const pair of savedEntries) {
    console.log(test.get(pair[0]) === pair[1]);
}
console.log(test.buckets.length);
console.log(test.length());
console.log(test.capacity);
test.set('moon', 'gray');
console.log(test.length());
console.log(test.capacity);
console.log(test.has("moon"));
console.log(test.has("not-stored"));
console.log(test.remove("moon"));
console.log(test.length());
console.log(test.has("moon"));
console.log(test.get("moon"));
console.log(test.remove("moon"));
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
test.clear();
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
console.log(test.capacity);
console.log(test.buckets.length);
test.set("q", "purple");
console.log(test.length());
console.log(test.get("q"));
console.log(test.has("q"));
console.log(test.hash("q"));
console.log(test.capacity);
test.set("q", undefined);
console.log(test.get("q"));
console.log(test.has("q"));

