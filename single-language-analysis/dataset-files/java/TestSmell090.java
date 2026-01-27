import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell090 {

    @Test
    public void testEnharmonics() {
        assertTrue(ophis.FSHARP.in(ophis.GFLAT.enharmonics()));
        assertTrue(ophis.GFLAT.enharmonics(false, "chroma"));
        for (Chroma chroma : ophis.westernChromaSet) {
            for (Note enharmonicNote : chroma.enharmonics()) {
                assertEquals(chroma, enharmonicNote);
            }
        }
    }
}