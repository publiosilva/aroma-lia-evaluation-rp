using Xunit;

public class TestSmell051 : BaseIntegrationTest
{
    [Fact(Skip = "")]
    public void ShouldFetchPassingNode()
    {
        string serviceName = Guid.NewGuid().ToString();
        string serviceId = Guid.NewGuid().ToString();

        client.AgentClient().Register(8080, 20L, serviceName, serviceId, NO_TAGS, NO_META);
        client.AgentClient().Pass(serviceId);

        Consul client2 = Builder().WithHostAndPort(HostAndPort.FromParts("localhost", consulContainer.GetFirstMappedPort())).Build();
        string serviceId2 = Guid.NewGuid().ToString();

        client2.AgentClient().Register(8080, 20L, serviceName, serviceId2, NO_TAGS, NO_META);
        client2.AgentClient().Fail(serviceId2);

        ConsulResponse<List<ServiceHealth>> response = client2.HealthClient().GetHealthyServiceInstances(serviceName);
        AssertHealth(serviceId, response);

        client.AgentClient().Deregister(serviceId);
        client.AgentClient().Deregister(serviceId2);
    }
}