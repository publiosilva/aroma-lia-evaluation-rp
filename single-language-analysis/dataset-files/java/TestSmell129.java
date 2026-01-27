import org.junit.Test;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

public class TestSmell129 {

    @DisabledIf(
        expression = "T(com.example.NxDispatch).isInvalidBackend()",
        reason = "Skip if automatic backend is not 'nx-loopback'"
    )
    @Test
    public void testGraphConverterNeedsBackend() {
        // When testing, `nx.from_scipy_sparse_array` will *always* call the backend
        // implementation if it's implemented. If `backend=` isn't given, then the result
        // will be converted back to NetworkX via `convert_to_nx`.
        // If not testing, then calling `nx.from_scipy_sparse_array` w/o `backend=` will
        // always call the original version. `backend=` is *required* to call the backend.
        
        // Mocking LoopbackDispatcher and LoopbackGraph
        LoopbackDispatcher loopbackDispatcher = mock(LoopbackDispatcher.class);
        LoopbackGraph loopbackGraph = mock(LoopbackGraph.class);

        double[][] data = {{0, 3, 2}, {3, 0, 1}, {2, 1, 0}};
        SparseArray A = new SparseArray(data);

        List<Integer> sideEffects = new ArrayList<>();

        // Mocking from_scipy_sparse_array method
        doAnswer(invocation -> {
            sideEffects.add(1);
            return convertFromNx(invocation.getArgument(0));
        }).when(loopbackDispatcher).fromScipySparseArray(any());

        // Static method conversion
        LoopbackDispatcher.convertToNx = (obj, name) -> {
            if (obj instanceof Graph) {
                return (Graph) obj;
            }
            return new Graph(obj);
        };

        try {
            assertEquals(0, sideEffects.size());
            assertTrue(nx.fromScipySparseArray(A) instanceof Graph);
            assertEquals(1, sideEffects.size());
            assertTrue(nx.fromScipySparseArray(A, "nx-loopback") instanceof LoopbackGraph);
            assertEquals(2, sideEffects.size());
        } finally {
            LoopbackDispatcher.convertToNx = origConvertToNx;
            LoopbackDispatcher.fromScipySparseArray = null;
        }

        try {
            nx.fromScipySparseArray(A, "bad-backend-name");
            fail("Expected ImportError");
        } catch (ImportError e) {
            assertEquals("Unable to load", e.getMessage());
        }
    }

    private Object convertFromNx(Object obj) {
        // Implementation of convert_from_nx
        return obj;
    }
}