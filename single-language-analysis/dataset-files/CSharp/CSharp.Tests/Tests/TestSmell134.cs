using Xunit;

public class TestSmell134
{
    [Fact(Skip = "")]
    public void TestCobaya()
    {
        var yamlLoad = typeof(cobaya.yaml).GetMethod("yaml_load");
        var getModel = typeof(cobaya.model).GetMethod("get_model");

        string infoYaml = @"
        likelihood:
            pyactlike.ACTPol_lite_DR4:
                components: 
                    - tt
                    - te
                    - ee
                lmax: 6000

        theory:
            camb:
                extra_args:
                    lens_potential_accuracy: 1

        params:
            ns:
                prior:
                  min: 0.8
                  max: 1.2
            H0:
                prior:
                  min: 40
                  max: 100       
            yp2:
                prior:
                    min: 0.5
                    max: 1.5       
        ";
        var info = yamlLoad.Invoke(null, new object[] { infoYaml });
        var model = getModel.Invoke(null, new object[] { info });
        Assert.Equal(true, double.IsFinite((double)model.GetType().GetMethod("loglike").Invoke(model, new object[] { new Dictionary<string, double> { { "ns", 1.0 }, { "H0", 70 }, { "yp2", 1.0 } } })[0]));
    }
}