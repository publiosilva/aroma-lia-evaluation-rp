const { expect } = require('jest');

let stop = false;

describe('MainTest', () => {
    it("test_smell_016", async () => {
        const runAsyncLoop = async () => {
            let i = 0;
            while (!stop) {
                i++;
                console.log(`loop iteration ${i}`);
                try {
                    await new Promise(resolve => setTimeout(resolve, 700));
                } catch (e) {
                    console.error(e);
                }
            }
            console.log(`stopThread: count i is ${i}`);
        };

        const loopPromise = runAsyncLoop();

        await new Promise(resolve => setTimeout(resolve, 7000));
        stop = true;
        console.log(`stopThread: stopped!`);
        
        await loopPromise;
    });
});