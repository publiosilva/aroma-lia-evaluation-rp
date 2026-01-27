import { expect } from '@jest/globals';
import { yamlLoad } from 'cobaya.yaml';
import { getModel } from 'cobaya.model';

describe('Cobaya', () => {
    it.skip('cobaya', () => {
        const infoYaml = `
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
        `;
        const info = yamlLoad(infoYaml);
        const model = getModel(info);
        expect(Number.isFinite(model.loglike({ ns: 1.0, H0: 70, yp2: 1.0 })[0])).toBe(true);
    });
});