const { expect } = require('jest');
const { Path } = require('path'); // Assuming Path is imported from a path module

describe('ScratchDir', () => {
    it("test_smell_091", () => {
        const d = new Path(tmpdir);

        const tempf = d.join('temp.txt');
        tempf.touch();
        try {
            const foo = d.join('foo');
            const boz = foo.join('bar').join('baz').join('boz');
            boz.makedirs();
            try {
                expect(boz.isdir()).toBe(true);
            } finally {
                boz.removedirs();
            }
            expect(foo.exists()).toBe(false);
            expect(d.exists()).toBe(true);

            foo.mkdir(0o750);
            boz.makedirs(0o700);
            try {
                expect(boz.isdir()).toBe(true);
            } finally {
                boz.removedirs();
            }
            expect(foo.exists()).toBe(false);
            expect(d.exists()).toBe(true);
        } finally {
            os.remove(tempf);
        }
    });
});