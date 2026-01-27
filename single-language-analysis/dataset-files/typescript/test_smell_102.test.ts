import { expect } from '@jest/globals';
import * as os from 'os';

describe('BreakpadSymbols', () => {
    it("test_smell_102", () => {
        const dumpSyms = qisys.command.findProgram("dump_syms", { raises: false });
        if (!dumpSyms) {
            return;
        }

        const aCppProj = qipkgAction.addTestProject("a_cpp");
        const pml = os.path.join(aCppProj.path, "a_cpp.pml");

        qipkgAction("configure", "--release", "--with-debug-info", pml);
        qipkgAction("build", pml);
        const [pkg, symbolsArchive] = qipkgAction("make-package", "--with-breakpad", pml);
        expect(os.path.exists(symbolsArchive)).toBe(true);
    });
});