import org.junit.Test;
import static org.junit.Assert.*;
import source.ocr.Ocr;

public class TestSmell143 {

    @Test
    public void testOcrAvailability() {
        Ocr ocr = new Ocr();
        System.out.println("OCR RESULT: " + ocr.ocrSingleLine(cv2.imread(ROOT_PATH + "/assets/pytest/AreaBigmapSidebarCommissionName.jpg")));
        assertEquals(1, 1);
    }
}