import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell152 {

    @Test
    public void testPR655() {
        Hardware pr655 = Hardware.findPhotometer("PR655");
        if (pr655 == null) {
            System.out.println("no device found");
        } else {
            System.out.println("type: " + pr655.getType());
            System.out.println("SN: " + pr655.getDeviceSN());
            if (pr655.getType().equals("D")) {
                return; // Skip test
            }
            pr655.measure();
            System.out.println("lum: " + pr655.getLastLum());
            System.out.println("uv: " + pr655.getLastUV());
            System.out.println("xy: " + pr655.getLastXY());
            System.out.println("tristim: " + pr655.getLastTristim());
            Object[] lastSpectrum = pr655.getLastSpectrum();
            System.out.println("nm: " + lastSpectrum[0]);
            System.out.println("spec: " + lastSpectrum[1]);
            System.out.println("temperature: " + pr655.getLastColorTemp());
        }
        System.out.println("DONE");
    }
}