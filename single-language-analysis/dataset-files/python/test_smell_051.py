import pytest
import uuid

class TestHealthITest:
    @pytest.mark.skip
    def test_smell_051(self):
        service_name = str(uuid.uuid4())
        service_id = str(uuid.uuid4())

        client.agent_client().register(8080, 20, service_name, service_id, NO_TAGS, NO_META)
        client.agent_client().pass_health_check(service_id)

        client2 = builder().with_host_and_port(HostAndPort.from_parts("localhost", consul_container.get_first_mapped_port())).build()
        service_id2 = str(uuid.uuid4())

        client2.agent_client().register(8080, 20, service_name, service_id2, NO_TAGS, NO_META)
        client2.agent_client().fail(service_id2)

        response = client2.health_client().get_healthy_service_instances(service_name)
        self.assert_health(service_id, response)

        client.agent_client().deregister(service_id)
        client.agent_client().deregister(service_id2)

    def assert_health(self, service_id, response):
        pass