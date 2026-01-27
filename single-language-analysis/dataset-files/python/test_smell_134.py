# Original URL: https://github.com/ACTCollaboration/pyactlike/blob/1cac8c5d047bc2cad991890f2ebf1d8e3fb483b3/test_like.py#L61-L97

@pytest.mark.skip(reason="cobaya optional")
def test_smell_134():
    """Test the Cobaya interface to the ACT likelihood."""
    from cobaya.yaml import yaml_load
    from cobaya.model import get_model

    info_yaml = r"""
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
        """
    info = yaml_load(info_yaml)
    model = get_model(info)
    assert np.isfinite(model.loglike({"ns": 1.0, "H0": 70, "yp2": 1.0})[0])