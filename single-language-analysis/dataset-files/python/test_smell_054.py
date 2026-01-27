import pytest

@pytest.mark.skip
class TestZCertStore:
    cert_store = None
    CERTSTORE_LOCATION = "target/testCurveCerts"

    def test_smell_054(self):
        before_amount = self.cert_store.get_certificates_count()
        assert before_amount == 0
        c1 = ZCert()
        f = c1.save_public(f"{self.CERTSTORE_LOCATION}/c1.cert")
        assert f.exists() == True
        rc = self.cert_store.reload_if_necessary()
        assert rc == True
        assert self.cert_store.get_certificates_count() == 1
        assert self.cert_store.contains_public_key(c1.get_public_key_as_z85()) == True
        assert self.cert_store.contains_public_key(c1.get_public_key()) == True
        assert self.cert_store.contains_public_key("1234567890123456789012345678901234567890") == False
        zmq.ZMQ.msleep(1000)
        c2 = ZCert()
        f = c2.save_public(f"{self.CERTSTORE_LOCATION}/sub/c2.cert")
        assert f.exists() == True
        assert self.cert_store.get_certificates_count() == 2

    def test_smell_054(self):
        before_amount = self.cert_store.get_certificates_count()
        assert before_amount == 0
        c1 = ZCert()
        f = c1.save_public(f"{self.CERTSTORE_LOCATION}/c1.cert")
        assert f.exists() == True
        rc = self.cert_store.reload_if_necessary()
        assert rc == True
        assert self.cert_store.get_certificates_count() == 1
        certificate = File(f"{self.CERTSTORE_LOCATION}/c1.cert")
        rc = certificate.exists()
        assert rc == True
        rc = certificate.delete()
        assert rc == True
        rc = self.cert_store.reload_if_necessary()
        assert rc == True
        assert self.cert_store.get_certificates_count() == 0
        assert self.cert_store.contains_public_key(c1.get_public_key_as_z85()) == False
        assert self.cert_store.contains_public_key(c1.get_public_key()) == False

    def test_smell_054(self):
        assert self.cert_store.get_certificates_count() == 0
        cert1 = ZCert()
        f = cert1.save_public(f"{self.CERTSTORE_LOCATION}/c1.cert")
        assert f.exists() == True
        cert2 = ZCert()
        f = cert2.save_secret(f"{self.CERTSTORE_LOCATION}/sub/c2.cert")
        assert f.exists() == True
        assert self.cert_store.get_certificates_count() == 2
        assert self.cert_store.check_for_changes() == False
        zmq.ZMQ.msleep(1000)
        othercert1 = ZCert()
        f = othercert1.save_public(f"{self.CERTSTORE_LOCATION}/c1.cert")
        assert f.exists() == True
        assert self.cert_store.check_for_changes() == True
        assert self.cert_store.check_for_changes() == True
        assert self.cert_store.get_certificates_count() == 2
        assert self.cert_store.check_for_changes() == False
        assert self.cert_store.contains_public_key(cert1.get_public_key_as_z85()) == False
        assert self.cert_store.contains_public_key(cert1.get_public_key()) == False
        assert self.cert_store.contains_public_key(othercert1.get_public_key_as_z85()) == True
        assert self.cert_store.contains_public_key(othercert1.get_public_key()) == True
        zmq.ZMQ.msleep(1000)
        f = cert2.save_public(f"{self.CERTSTORE_LOCATION}/sub/c2.cert")
        assert f.exists() == True
        assert self.cert_store.check_for_changes() == True
        assert self.cert_store.check_for_changes() == True
        assert self.cert_store.get_certificates_count() == 2
        assert self.cert_store.check_for_changes() == False