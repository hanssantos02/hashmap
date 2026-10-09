const HashMap = require('./HashMap.js');
const assert = require('node:assert/strict');

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
assert.strictEqual(test.length(), 11, 'count after 11 insertions');
assert.strictEqual(test.capacity, 16, 'Capacity before Growth');
test.set('lion', 'golden');
assert.strictEqual(test.length(), 12, 'Count after adding lion');
assert.strictEqual(test.capacity, 16, 'Capacity before growth');
test.set('apple', 'crimson');
assert.strictEqual(test.length(), 12, 'Count after updating apple');
assert.strictEqual(test.capacity, 16, 'Capacity before growth');
const savedEntries = test.entries();
test.set('moon', 'silver');
for (const pair of savedEntries) {
    assert.strictEqual(
        test.get(pair[0]),
        pair[1],
        `value preserved for ${pair[0]}`
    );
}
assert.strictEqual(test.buckets.length, 32, 'Buckets length after growth');
assert.strictEqual(test.length(), 13, 'Count after adding moon');
assert.strictEqual(test.capacity, 32, 'Capacity after Growth');
test.set('moon', 'gray');
assert.strictEqual(test.length(), 13, 'count after updating moon');
assert.strictEqual(test.capacity, 32, 'Capacity after growth');
assert.strictEqual(test.has("moon"), true, 'moon should exist after insertion');
assert.strictEqual(test.has('not-stored'), false, 'not-stored must not exist');
assert.strictEqual(test.remove('moon'), true, 'moon must exist and can be removed');
assert.strictEqual(test.length(), 12, 'count after removing moon');
assert.strictEqual(test.has('moon'), false, 'moon must not exist after removing');
assert.strictEqual(test.get('moon'), undefined, 'moon must not exist');
assert.strictEqual(test.remove('moon'), false, 'moon must not exist and cannot be removed');
assert.strictEqual(test.length(), 12, 'count after removing moon');
assert.deepStrictEqual(
    test.keys().sort(),
    savedEntries.map(pair => pair[0]).sort(),
    'keys should match the saved keys after removing moon'
);
assert.deepStrictEqual(
    test.values().sort(),
    savedEntries.map(pair => pair[1]).sort(),
    'values should match the saved values after removing moon'
);
assert.deepStrictEqual(
    test.entries().sort(),
    savedEntries.map(pair => [pair[0], pair[1]]).sort(),
    'entries should match the saved values after removing moon'
);
test.clear();
assert.strictEqual(test.length(), 0, 'count after clearing');
assert.deepStrictEqual(test.keys(), [], 'keys empty after clearing');
assert.deepStrictEqual(test.values(), [], 'values empty after clearing');
assert.deepStrictEqual(test.entries(), [], 'entries should be empty after clearing');
assert.strictEqual(test.capacity, 32, 'Capacity after growth');
assert.strictEqual(test.buckets.length, 32, 'bucket length after growth');
test.set("q", "purple");
assert.strictEqual(test.length(), 1, 'count after adding q');
assert.strictEqual(test.get('q'), 'purple', 'q must exist and must have a value');
assert.strictEqual(test.has('q'), true, 'q must exist');
assert.strictEqual(test.hash('q'), 17, 'Expected hash position of q');
assert.strictEqual(test.capacity, 32, 'capacity after growth');
test.set("q", undefined);
assert.strictEqual(test.get('q'), undefined, 'q must exist and value is updated');
assert.strictEqual(test.has('q'), true, 'q must exist');