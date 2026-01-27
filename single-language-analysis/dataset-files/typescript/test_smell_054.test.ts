import { expect } from '@jest/globals';

describe.skip('ZCertStoreTest', () => {
    let certStore: ZCertStore;
    const CERTSTORE_LOCATION: string = 'target/testCurveCerts';

    it("test_smell_054", async () => {
        const beforeAmount: number = certStore.getCertificatesCount();
        expect(beforeAmount).toBe(0);
        const c1: ZCert = new ZCert();
        const f: File = c1.savePublic(`${CERTSTORE_LOCATION}/c1.cert`);
        expect(f.exists()).toBe(true);
        const rc: boolean = certStore.reloadIfNecessary();
        expect(rc).toBe(true);
        expect(certStore.getCertificatesCount()).toBe(1);
        expect(certStore.containsPublicKey(c1.getPublicKeyAsZ85())).toBe(true);
        expect(certStore.containsPublicKey(c1.getPublicKey())).toBe(true);
        expect(certStore.containsPublicKey('1234567890123456789012345678901234567890')).toBe(false);
        zmq.ZMQ.msleep(1000);
        const c2: ZCert = new ZCert();
        const f2: File = c2.savePublic(`${CERTSTORE_LOCATION}/sub/c2.cert`);
        expect(f2.exists()).toBe(true);
        expect(certStore.getCertificatesCount()).toBe(2);
    });

    it("test_smell_054", async () => {
        const beforeAmount: number = certStore.getCertificatesCount();
        expect(beforeAmount).toBe(0);
        const c1: ZCert = new ZCert();
        const f: File = c1.savePublic(`${CERTSTORE_LOCATION}/c1.cert`);
        expect(f.exists()).toBe(true);
        const rc: boolean = certStore.reloadIfNecessary();
        expect(rc).toBe(true);
        expect(certStore.getCertificatesCount()).toBe(1);
        const certificate: File = new File(`${CERTSTORE_LOCATION}/c1.cert`);
        expect(certificate.exists()).toBe(true);
        const deleteRc: boolean = certificate.delete();
        expect(deleteRc).toBe(true);
        const reloadRc: boolean = certStore.reloadIfNecessary();
        expect(reloadRc).toBe(true);
        expect(certStore.getCertificatesCount()).toBe(0);
        expect(certStore.containsPublicKey(c1.getPublicKeyAsZ85())).toBe(false);
        expect(certStore.containsPublicKey(c1.getPublicKey())).toBe(false);
    });

    it("test_smell_054", async () => {
        expect(certStore.getCertificatesCount()).toBe(0);
        const cert1: ZCert = new ZCert();
        const f: File = cert1.savePublic(`${CERTSTORE_LOCATION}/c1.cert`);
        expect(f.exists()).toBe(true);
        const cert2: ZCert = new ZCert();
        const f2: File = cert2.saveSecret(`${CERTSTORE_LOCATION}/sub/c2.cert`);
        expect(f2.exists()).toBe(true);
        expect(certStore.getCertificatesCount()).toBe(2);
        expect(certStore.checkForChanges()).toBe(false);
        zmq.ZMQ.msleep(1000);
        const othercert1: ZCert = new ZCert();
        const f3: File = othercert1.savePublic(`${CERTSTORE_LOCATION}/c1.cert`);
        expect(f3.exists()).toBe(true);
        expect(certStore.checkForChanges()).toBe(true);
        expect(certStore.checkForChanges()).toBe(true);
        expect(certStore.getCertificatesCount()).toBe(2);
        expect(certStore.checkForChanges()).toBe(false);
        expect(certStore.containsPublicKey(cert1.getPublicKeyAsZ85())).toBe(false);
        expect(certStore.containsPublicKey(cert1.getPublicKey())).toBe(false);
        expect(certStore.containsPublicKey(othercert1.getPublicKeyAsZ85())).toBe(true);
        expect(certStore.containsPublicKey(othercert1.getPublicKey())).toBe(true);
        zmq.ZMQ.msleep(1000);
        const f4: File = cert2.savePublic(`${CERTSTORE_LOCATION}/sub/c2.cert`);
        expect(f4.exists()).toBe(true);
        expect(certStore.checkForChanges()).toBe(true);
        expect(certStore.checkForChanges()).toBe(true);
        expect(certStore.getCertificatesCount()).toBe(2);
        expect(certStore.checkForChanges()).toBe(false);
    });
});