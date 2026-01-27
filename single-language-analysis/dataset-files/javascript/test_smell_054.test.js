const { expect } = require('jest');

describe.skip('ZCertStoreTest', () => {
    let certStore;
    const CERTSTORE_LOCATION = 'target/testCurveCerts';

    test("test_smell_054", async () => {
        const beforeAmount = certStore.getCertificatesCount();
        expect(beforeAmount).toBe(0);
        const c1 = new ZCert();
        const f = c1.savePublic(`${CERTSTORE_LOCATION}/c1.cert`);
        expect(f.exists()).toBe(true);
        const rc = certStore.reloadIfNecessary();
        expect(rc).toBe(true);
        expect(certStore.getCertificatesCount()).toBe(1);
        expect(certStore.containsPublicKey(c1.getPublicKeyAsZ85())).toBe(true);
        expect(certStore.containsPublicKey(c1.getPublicKey())).toBe(true);
        expect(certStore.containsPublicKey("1234567890123456789012345678901234567890")).toBe(false);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const c2 = new ZCert();
        const f2 = c2.savePublic(`${CERTSTORE_LOCATION}/sub/c2.cert`);
        expect(f2.exists()).toBe(true);
        expect(certStore.getCertificatesCount()).toBe(2);
    });

    test("test_smell_054", async () => {
        const beforeAmount = certStore.getCertificatesCount();
        expect(beforeAmount).toBe(0);
        const c1 = new ZCert();
        const f = c1.savePublic(`${CERTSTORE_LOCATION}/c1.cert`);
        expect(f.exists()).toBe(true);
        const rc = certStore.reloadIfNecessary();
        expect(rc).toBe(true);
        expect(certStore.getCertificatesCount()).toBe(1);
        const certificate = new File(`${CERTSTORE_LOCATION}/c1.cert`);
        const exists = certificate.exists();
        expect(exists).toBe(true);
        const deleted = certificate.delete();
        expect(deleted).toBe(true);
        const rc2 = certStore.reloadIfNecessary();
        expect(rc2).toBe(true);
        expect(certStore.getCertificatesCount()).toBe(0);
        expect(certStore.containsPublicKey(c1.getPublicKeyAsZ85())).toBe(false);
        expect(certStore.containsPublicKey(c1.getPublicKey())).toBe(false);
    });

    test("test_smell_054", async () => {
        expect(certStore.getCertificatesCount()).toBe(0);
        const cert1 = new ZCert();
        const f = cert1.savePublic(`${CERTSTORE_LOCATION}/c1.cert`);
        expect(f.exists()).toBe(true);
        const cert2 = new ZCert();
        const f2 = cert2.saveSecret(`${CERTSTORE_LOCATION}/sub/c2.cert`);
        expect(f2.exists()).toBe(true);
        expect(certStore.getCertificatesCount()).toBe(2);
        expect(certStore.checkForChanges()).toBe(false);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const othercert1 = new ZCert();
        const f3 = othercert1.savePublic(`${CERTSTORE_LOCATION}/c1.cert`);
        expect(f3.exists()).toBe(true);
        expect(certStore.checkForChanges()).toBe(true);
        expect(certStore.checkForChanges()).toBe(true);
        expect(certStore.getCertificatesCount()).toBe(2);
        expect(certStore.checkForChanges()).toBe(false);
        expect(certStore.containsPublicKey(cert1.getPublicKeyAsZ85())).toBe(false);
        expect(certStore.containsPublicKey(cert1.getPublicKey())).toBe(false);
        expect(certStore.containsPublicKey(othercert1.getPublicKeyAsZ85())).toBe(true);
        expect(certStore.containsPublicKey(othercert1.getPublicKey())).toBe(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const f4 = cert2.savePublic(`${CERTSTORE_LOCATION}/sub/c2.cert`);
        expect(f4.exists()).toBe(true);
        expect(certStore.checkForChanges()).toBe(true);
        expect(certStore.checkForChanges()).toBe(true);
        expect(certStore.getCertificatesCount()).toBe(2);
        expect(certStore.checkForChanges()).toBe(false);
    });
});