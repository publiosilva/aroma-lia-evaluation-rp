import { expect } from '@jest/globals';
import { LoopbackDispatcher, LoopbackGraph } from 'networkx/classes/tests/dispatch_interface';
import * as sp from 'some-sparse-library'; // Adjust the import based on the actual sparse library used
import * as nx from 'networkx'; // Adjust the import based on the actual networkx library used

describe('GraphConverter', () => {
    it.skip('graphConverterNeedsBackend', () => {
        const A = sp.sparse.coo_array([[0, 3, 2], [3, 0, 1], [2, 1, 0]]);
        const sideEffects: number[] = [];

        function fromScipySparseArray(this: any, ...args: any[]): any {
            sideEffects.push(1);
            return this.convertFromNx(
                this.from_scipy_sparse_array(...args),
                { preserveEdgeAttrs: null, preserveNodeAttrs: null, preserveGraphAttrs: null }
            );
        }

        function convertToNx(obj: any, options?: { name?: string }): any {
            if (obj instanceof nx.Graph) {
                return obj;
            }
            return new nx.Graph(obj);
        }

        const origConvertToNx = LoopbackDispatcher.convertToNx;
        LoopbackDispatcher.convertToNx = convertToNx;
        LoopbackDispatcher.from_scipy_sparse_array = fromScipySparseArray;

        try {
            expect(sideEffects).toEqual([]);
            expect(nx.from_scipy_sparse_array(A)).toBeInstanceOf(nx.Graph);
            expect(sideEffects).toEqual([1]);
            expect(nx.from_scipy_sparse_array(A, { backend: 'nx-loopback' })).toBeInstanceOf(LoopbackGraph);
            expect(sideEffects).toEqual([1, 1]);
        } finally {
            LoopbackDispatcher.convertToNx = origConvertToNx;
            delete LoopbackDispatcher.from_scipy_sparse_array;
        }

        expect(() => nx.from_scipy_sparse_array(A, { backend: 'bad-backend-name' })).toThrowError(/Unable to load/);
    });
});