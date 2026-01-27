import pytest

class TestWhoisAction:
    @pytest.mark.skip
    def test_smell_055(self):
        persist_resource(registry.get("lol").as_builder().set_tld_type(registry.TldType.TEST).build())
        registrar = persist_resource(make_registrar(
            "evilregistrar", "Yes Virginia", ACTIVE))
        persist_resource(make_domain_base(
            "cat.lol",
            persist_resource(make_contact_resource("5372808-ERL", "Goblin Market", "lol@cat.lol")),
            persist_resource(make_contact_resource("5372808-IRL", "Santa Claus", "BOFH@cat.lol")),
            persist_resource(make_contact_resource("5372808-TRL", "The Raven", "bog@cat.lol")),
            persist_resource(make_host_resource("ns1.cat.lol", "1.2.3.4")),
            persist_resource(make_host_resource("ns2.cat.lol", "bad:f00d:cafe::15:beef")),
            registrar))
        persist_simple_resources(make_registrar_contacts(registrar))
        new_whois_action("domain cat.lol\r\n").run()
        assert response.get_status() == 200
        assert response.get_payload() == load_file("whois_action_domain_not_found.txt")