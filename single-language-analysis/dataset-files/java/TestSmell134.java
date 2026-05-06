import org.junit.Test;
import org.junit.Ignore;
import static org.junit.Assert.*;
import cobaya.yaml.YamlLoad;
import cobaya.model.GetModel;

public class TestSmell134 {

    @Ignore("cobaya optional")
    @Test
    public void testCobaya() {
        String infoYaml = "likelihood:\n" +
            "    pyactlike.ACTPol_lite_DR4:\n" +
            "        components: \n" +
            "            - tt\n" +
            "            - te\n" +
            "            - ee\n" +
            "        lmax: 6000\n" +
            "\n" +
            "theory:\n" +
            "    camb:\n" +
            "        extra_args:\n" +
            "            lens_potential_accuracy: 1\n" +
            "\n" +
            "params:\n" +
            "    ns:\n" +
            "        prior:\n" +
            "          min: 0.8\n" +
            "          max: 1.2\n" +
            "    H0:\n" +
            "        prior:\n" +
            "          min: 40\n" +
            "          max: 100\n" +
            "    yp2:\n" +
            "        prior:\n" +
            "            min: 0.5\n" +
            "            max: 1.5";
        Object info = YamlLoad.yamlLoad(infoYaml);
        Object model = GetModel.getModel(info);
        assertTrue(Double.isFinite((double) model.loglike(Map.of("ns", 1.0, "H0", 70, "yp2", 1.0))[0]));
    }
}