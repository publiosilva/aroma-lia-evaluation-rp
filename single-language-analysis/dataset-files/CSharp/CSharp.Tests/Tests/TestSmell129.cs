using Xunit;

public class TestSmell129
{
    [Fact(Skip = "")]
    public void TestGraphConverterNeedsBackend()
    {
        var sideEffects = new List<int>();

        void FromScipySparseArray(params object[] args)
        {
            sideEffects.Add(1);
            return ConvertFromNx(
                LoopbackDispatcher.FromScipySparseArray(args),
                preserveEdgeAttrs: null,
                preserveNodeAttrs: null,
                preserveGraphAttrs: null
            );
        }

        static object ConvertToNx(object obj, string name = null)
        {
            if (obj is Graph)
            {
                return obj;
            }
            return new Graph(obj);
        }

        var origConvertToNx = LoopbackDispatcher.ConvertToNx;
        LoopbackDispatcher.ConvertToNx = ConvertToNx;
        LoopbackDispatcher.FromScipySparseArray = FromScipySparseArray;

        try
        {
            Assert.Equal(new List<int>(), sideEffects);
            Assert.IsType<Graph>(nx.FromScipySparseArray(A));
            Assert.Equal(new List<int> { 1 }, sideEffects);
            Assert.IsType<LoopbackGraph>(nx.FromScipySparseArray(A, backend: "nx-loopback"));
            Assert.Equal(new List<int> { 1, 1 }, sideEffects);
        }
        finally
        {
            LoopbackDispatcher.ConvertToNx = origConvertToNx;
            LoopbackDispatcher.FromScipySparseArray = null;
        }

        Assert.Throws<ImportError>(() => nx.FromScipySparseArray(A, backend: "bad-backend-name"));
    }
}