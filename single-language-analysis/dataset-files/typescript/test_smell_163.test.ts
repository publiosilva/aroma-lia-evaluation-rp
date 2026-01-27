import { expect } from '@jest/globals';

describe('Sourcetypes', () => {
  it.skip('should validate args and classify', () => {
    const paramsReq = [ARG_FILE];
    const paramsOpt: any[] = [];
    comm.validateArgs(paramsReq, paramsOpt, args);
    os.system(`classify "${args[ARG_FILE]}"`);
  });
});