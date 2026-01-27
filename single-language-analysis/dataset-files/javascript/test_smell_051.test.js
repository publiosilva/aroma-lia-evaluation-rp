const { expect } = require('jest');

describe('HealthITest', () => {
    it.skip('shouldFetchPassingNode', async () => {
        const serviceName = UUID.randomUUID().toString();
        const serviceId = UUID.randomUUID().toString();

        await client.agentClient().register(8080, 20, serviceName, serviceId, NO_TAGS, NO_META);
        await client.agentClient().pass(serviceId);

        const client2 = builder().withHostAndPort(HostAndPort.fromParts("localhost", consulContainer.getFirstMappedPort())).build();
        const serviceId2 = UUID.randomUUID().toString();

        await client2.agentClient().register(8080, 20, serviceName, serviceId2, NO_TAGS, NO_META);
        await client2.agentClient().fail(serviceId2);

        const response = await client2.healthClient().getHealthyServiceInstances(serviceName);
        assertHealth(serviceId, response);

        await client.agentClient().deregister(serviceId);
        await client.agentClient().deregister(serviceId2);
    });
});