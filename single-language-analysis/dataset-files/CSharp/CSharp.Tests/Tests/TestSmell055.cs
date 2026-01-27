using Xunit;

public class TestSmell055
{
    [Fact(Skip = "")]
    public void TestRun_DomainInTestTld_IsConsideredNotFound()
    {
        PersistResource(Registry.Get("lol").AsBuilder().SetTldType(Registry.TldType.TEST).Build());
        Registrar registrar = PersistResource(MakeRegistrar(
            "evilregistrar", "Yes Virginia", ACTIVE));
        PersistResource(MakeDomainBase(
            "cat.lol",
            PersistResource(MakeContactResource("5372808-ERL", "Goblin Market", "lol@cat.lol")),
            PersistResource(MakeContactResource("5372808-IRL", "Santa Claus", "BOFH@cat.lol")),
            PersistResource(MakeContactResource("5372808-TRL", "The Raven", "bog@cat.lol")),
            PersistResource(MakeHostResource("ns1.cat.lol", "1.2.3.4")),
            PersistResource(MakeHostResource("ns2.cat.lol", "bad:f00d:cafe::15:beef")),
            registrar));
        PersistSimpleResources(MakeRegistrarContacts(registrar));
        NewWhoisAction("domain cat.lol\r\n").Run();
        Assert.Equal(200, Response.GetStatus());
        Assert.Equal(LoadFile("whois_action_domain_not_found.txt"), Response.GetPayload());
    }
}