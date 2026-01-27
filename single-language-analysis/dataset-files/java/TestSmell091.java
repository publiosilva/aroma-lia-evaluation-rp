import org.junit.Test;
import static org.junit.Assert.*;
import java.io.File;

public class TestSmell091 {

    @Test
    public void testMakedirs() {
        Path d = new Path(tmpdir);

        File tempf = new File(d.toString(), "temp.txt");
        try {
            tempf.createNewFile();
            Path foo = new Path(d.toString(), "foo");
            Path boz = new Path(foo.toString(), "bar", "baz", "boz");
            boz.makedirs();
            try {
                assertTrue(boz.isdir());
            } finally {
                boz.removedirs();
            }
            assertFalse(foo.exists());
            assertTrue(d.exists());

            foo.mkdir(0750);
            boz.makedirs(0700);
            try {
                assertTrue(boz.isdir());
            } finally {
                boz.removedirs();
            }
            assertFalse(foo.exists());
            assertTrue(d.exists());
        } finally {
            tempf.delete();
        }
    }
}