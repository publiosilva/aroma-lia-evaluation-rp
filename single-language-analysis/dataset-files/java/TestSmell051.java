// Original URL: https://github.com/Vertexvis/consul-client/blob/4c755609e24abab00067d502616c61e61cc3e6f4/src/itest/java/com/orbitz/consul/HealthITest.java#L31-L51

public class TestSmell051 extends BaseIntegrationTest {
    @Test
    @Ignore
    public void shouldFetchPassingNode() throws NotRegisteredException {
        String serviceName = UUID.randomUUID().toString();
        String serviceId = UUID.randomUUID().toString();

        client.agentClient().register(8080, 20L, serviceName, serviceId, NO_TAGS, NO_META);
        client.agentClient().pass(serviceId);

        Consul client2 = builder().withHostAndPort(HostAndPort.fromParts("localhost", consulContainer.getFirstMappedPort())).build();
        String serviceId2 = UUID.randomUUID().toString();

        client2.agentClient().register(8080, 20L, serviceName, serviceId2, NO_TAGS, NO_META);
        client2.agentClient().fail(serviceId2);

        ConsulResponse<List<ServiceHealth>> response = client2.healthClient().getHealthyServiceInstances(serviceName);
        assertHealth(serviceId, response);

        client.agentClient().deregister(serviceId);
        client.agentClient().deregister(serviceId2);
    }
}
