const { expect } = require('jest');

describe('WhoisActionTest', () => {
  test.skip('domainInTestTld is considered not found', () => {
    persistResource(Registry.get("lol").asBuilder().setTldType(Registry.TldType.TEST).build());
    const registrar = persistResource(makeRegistrar(
      "evilregistrar", "Yes Virginia", ACTIVE));
    persistResource(makeDomainBase(
      "cat.lol",
      persistResource(makeContactResource("5372808-ERL", "Goblin Market", "lol@cat.lol")),
      persistResource(makeContactResource("5372808-IRL", "Santa Claus", "BOFH@cat.lol")),
      persistResource(makeContactResource("5372808-TRL", "The Raven", "bog@cat.lol")),
      persistResource(makeHostResource("ns1.cat.lol", "1.2.3.4")),
      persistResource(makeHostResource("ns2.cat.lol", "bad:f00d:cafe::15:beef")),
      registrar));
    persistSimpleResources(makeRegistrarContacts(registrar));
    newWhoisAction("domain cat.lol\r\n").run();
    expect(response.getStatus()).toBe(200);
    expect(response.getPayload()).toBe(loadFile("whois_action_domain_not_found.txt"));
  });
});