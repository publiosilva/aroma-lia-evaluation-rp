import { expect } from '@jest/globals';

describe('QueueTest', () => {
    test("test_smell_068", () => {
        setUp();
        expect(q1.equals(q1)).toBe(true);
        expect(q1.equals(new String("A B C D E F G H I J K L"))).toBe(false);
        for (let i = 0; i < 9; i++) {
            q1.dequeue();
        }
        console.log(q1);
        const test = new Queue();
        test.enqueue(new String("J"));
        test.enqueue(new String("K"));
        test.enqueue(new String("L"));
        expect(q1.equals(test)).toBe(true);
        test.dequeue();
        expect(q1.equals(test)).toBe(false);
        const test2 = new Queue([1.1, 2.2, 3.2, 4.4]);
        expect(test2.equals(q3)).toBe(false);
        expect(test2.equals(test)).toBe(false);
    });
});