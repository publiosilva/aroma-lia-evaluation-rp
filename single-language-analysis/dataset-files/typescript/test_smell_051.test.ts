import { expect } from '@jest/globals';

describe('HealthITest', () => {
    it.skip('shouldFetchPassingNode', async () => {
        const serviceName: string = UUID.randomUUID().toString();
        const serviceId: string = UUID.randomUUID().toString();

        await client.agentClient().register(8080, 20, serviceName, serviceId, NO_TAGS, NO_META);
        await client.agentClient().pass(serviceId);

        const client2: Consul = builder().withHostAndPort(HostAndPort.fromParts("localhost", consulContainer.getFirstMappedPort())).build();
        const serviceId2: string = UUID.randomUUID().toString();

        await client2.agentClient().register(8080, 20, serviceName, serviceId2, NO_TAGS, NO_META);
        await client2.agentClient().fail(serviceId2);

        const response: ConsulResponse<List<ServiceHealth>> = await client2.healthClient().getHealthyServiceInstances(serviceName);
        assertHealth(serviceId, response);

        await client.agentClient().deregister(serviceId);
        await client.agentClient().deregister(serviceId2);
    });
});