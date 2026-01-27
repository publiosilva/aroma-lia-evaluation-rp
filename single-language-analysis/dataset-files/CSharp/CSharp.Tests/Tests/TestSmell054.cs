using Xunit;

public class TestSmell054
{
    private ZCertStore certStore;
    private static readonly string CertstoreLocation = "target/testCurveCerts";

    [Fact(Skip = "")]
    public void TestAddCertificates()
    {
        var beforeAmount = certStore.GetCertificatesCount();
        Assert.Equal(0, beforeAmount);
        ZCert c1 = new ZCert();
        File f = c1.SavePublic($"{CertstoreLocation}/c1.cert");
        Assert.Equal(true, f.Exists());
        bool rc = certStore.ReloadIfNecessary();
        Assert.Equal(true, rc);
        Assert.Equal(1, certStore.GetCertificatesCount());
        Assert.Equal(true, certStore.ContainsPublicKey(c1.GetPublicKeyAsZ85()));
        Assert.Equal(true, certStore.ContainsPublicKey(c1.GetPublicKey()));
        Assert.Equal(false, certStore.ContainsPublicKey("1234567890123456789012345678901234567890"));
        zmq.ZMQ.Msleep(1000);
        ZCert c2 = new ZCert();
        f = c2.SavePublic($"{CertstoreLocation}/sub/c2.cert");
        Assert.Equal(true, f.Exists());
        Assert.Equal(2, certStore.GetCertificatesCount());
    }

    [Fact(Skip = "")]
    public void TestRemoveCertificates()
    {
        var beforeAmount = certStore.GetCertificatesCount();
        Assert.Equal(0, beforeAmount);
        ZCert c1 = new ZCert();
        File f = c1.SavePublic($"{CertstoreLocation}/c1.cert");
        Assert.Equal(true, f.Exists());
        bool rc = certStore.ReloadIfNecessary();
        Assert.Equal(true, rc);
        Assert.Equal(1, certStore.GetCertificatesCount());
        File certificate = new File($"{CertstoreLocation}/c1.cert");
        rc = certificate.Exists();
        Assert.Equal(true, rc);
        rc = certificate.Delete();
        Assert.Equal(true, rc);
        rc = certStore.ReloadIfNecessary();
        Assert.Equal(true, rc);
        Assert.Equal(0, certStore.GetCertificatesCount());
        Assert.Equal(false, certStore.ContainsPublicKey(c1.GetPublicKeyAsZ85()));
        Assert.Equal(false, certStore.ContainsPublicKey(c1.GetPublicKey()));
    }

    [Fact(Skip = "")]
    public void TestCheckForCertificateChanges()
    {
        Assert.Equal(0, certStore.GetCertificatesCount());
        ZCert cert1 = new ZCert();
        File f = cert1.SavePublic($"{CertstoreLocation}/c1.cert");
        Assert.Equal(true, f.Exists());
        ZCert cert2 = new ZCert();
        f = cert2.SaveSecret($"{CertstoreLocation}/sub/c2.cert");
        Assert.Equal(true, f.Exists());
        Assert.Equal(2, certStore.GetCertificatesCount());
        Assert.Equal(false, certStore.CheckForChanges());
        zmq.ZMQ.Msleep(1000);
        ZCert othercert1 = new ZCert();
        f = othercert1.SavePublic($"{CertstoreLocation}/c1.cert");
        Assert.Equal(true, f.Exists());
        Assert.Equal(true, certStore.CheckForChanges());
        Assert.Equal(true, certStore.CheckForChanges());
        Assert.Equal(2, certStore.GetCertificatesCount());
        Assert.Equal(false, certStore.CheckForChanges());
        Assert.Equal(false, certStore.ContainsPublicKey(cert1.GetPublicKeyAsZ85()));
        Assert.Equal(false, certStore.ContainsPublicKey(cert1.GetPublicKey()));
        Assert.Equal(true, certStore.ContainsPublicKey(othercert1.GetPublicKeyAsZ85()));
        Assert.Equal(true, certStore.ContainsPublicKey(othercert1.GetPublicKey()));
        zmq.ZMQ.Msleep(1000);
        f = cert2.SavePublic($"{CertstoreLocation}/sub/c2.cert");
        Assert.Equal(true, f.Exists());
        Assert.Equal(true, certStore.CheckForChanges());
        Assert.Equal(true, certStore.CheckForChanges());
        Assert.Equal(2, certStore.GetCertificatesCount());
        Assert.Equal(false, certStore.CheckForChanges());
    }
}