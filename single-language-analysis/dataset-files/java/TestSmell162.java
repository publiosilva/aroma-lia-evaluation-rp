import org.junit.Test;
import static org.junit.Assert.*;
import java.io.File;

public class TestSmell162 {

    @Test
    public void testValidatePackage() {
        String pkgPath = new File("projects/python_services.pkg").getAbsolutePath();
        qipkgAction("validate_package", pkgPath);
    }
}
