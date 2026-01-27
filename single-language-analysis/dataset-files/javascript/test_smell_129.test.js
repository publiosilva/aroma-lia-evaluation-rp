const { expect } = require('jest');
const { LoopbackDispatcher, LoopbackGraph } = require('networkx/classes/tests/dispatch_interface');

describe('ClassName', () => {
    it.skip('graphConverterNeedsBackend', () => {
        const A = sp.sparse.coo_array([[0, 3, 2], [3, 0, 1], [2, 1, 0]]);
        const sideEffects = [];

        function fromScipySparseArray(...args) {
            sideEffects.push(1);
            return convertFromNx(
                this.from_scipy_sparse_array(...args),
                { preserveEdgeAttrs: null, preserveNodeAttrs: null, preserveGraphAttrs: null }
            );
        }

        function convertToNx(obj, { name = null } = {}) {
            if (obj instanceof nx.Graph) {
                return obj;
            }
            return new nx.Graph(obj);
        }

        const origConvertToNx = LoopbackDispatcher.convert_to_nx;
        LoopbackDispatcher.convert_to_nx = convertToNx;
        LoopbackDispatcher.from_scipy_sparse_array = fromScipySparseArray;

        try {
            expect(sideEffects).toEqual([]);
            expect(nx.from_scipy_sparse_array(A)).toBeInstanceOf(nx.Graph);
            expect(sideEffects).toEqual([1]);
            expect(nx.from_scipy_sparse_array(A, { backend: "nx-loopback" })).toBeInstanceOf(LoopbackGraph);
            expect(sideEffects).toEqual([1, 1]);
        } finally {
            LoopbackDispatcher.convert_to_nx = origConvertToNx;
            delete LoopbackDispatcher.from_scipy_sparse_array;
        }

        expect(() => {
            nx.from_scipy_sparse_array(A, { backend: "bad-backend-name" });
        }).toThrowError(/Unable to load/);
    });
});