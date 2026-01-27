import pytest

class TestJmstest:
    def test_smell_084(self):
        self.application_context = TestUtils.instance_context(MODULE, CONFIG_LISTENER)
        producer_service = self.application_context.get_bean(ProducerService, "producerService")
        queue = self.application_context.get_bean("topic", Destination)
        
        producer_service.send_message(queue, "LiJingTang-JMS-Message-Topic")