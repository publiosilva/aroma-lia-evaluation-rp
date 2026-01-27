import org.junit.Test;
import static org.junit.Assert.*;
import java.util.Iterator;

public class TestSmell104 {

    @Test
    public void testDiminishChromaSet() {
        Iterator<Combination> combinations = new Combinations(ophis.westernChromaSet, 3).iterator();
        while (combinations.hasNext()) {
            Combination combination = combinations.next();
            ChromaSet s = new ChromaSet(Set.of(combination.getX(), combination.getY(), combination.getZ()));
            ChromaSet sDim = s.diminish();
            for (Chroma chroma : s) {
                assertTrue(sDim.contains(chroma.diminish()));
            }
        }
    }
}