import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell138 {

    @Test
    public void testKMeansElkanIterAttribute() {
        KMeans km = new KMeans("elkan", 1).fit(X);
        assertEquals(1, km.nIter_);
    }
}