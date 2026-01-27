import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell163 {

    @Test
    public void testSourcetypes() {
        String[] paramsReq = {ARG_FILE};
        String[] paramsOpt = {};
        comm.validateArgs(paramsReq, paramsOpt, args);
        try {
            Runtime.getRuntime().exec("classify \"" + args[ARG_FILE] + "\"");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}