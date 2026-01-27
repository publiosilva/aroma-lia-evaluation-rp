import pytest

class TestJmstest:
    def test_smell_077(self):
        self.application_context = TestUtils.instance_context(MODULE, CONFIG_SESSION)
        producer_service = self.application_context.get_bean(ProducerService, "producerService")
        session_aware_queue = self.application_context.get_bean("sessionAwareQueue", Destination)

        producer_service.send_message(session_aware_queue, "TestSessionAwareMessageListener")

        try:
            time.sleep(1)
        except InterruptedException as e:
            print(e)

        print("Instantiating a message listener container, starting to receive messages returned to the producer...")

        container = DefaultMessageListenerContainer()
        container.set_connection_factory(self.application_context.get_bean("connectionFactory", ConnectionFactory))
        container.set_destination(self.application_context.get_bean("queue", Destination))
        container.set_message_listener(ConsumerMessageListener())
        container.initialize()
        container.start()