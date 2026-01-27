import { expect } from '@jest/globals';

describe('JMSTest', () => {
    test("test_smell_077", async () => {
        applicationContext = TestUtils.instanceContext(MODULE, CONFIG_SESSION);
        const producerService: ProducerService = applicationContext.getBean(ProducerService, "producerService");
        const sessionAwareQueue: Destination = applicationContext.getBean("sessionAwareQueue", Destination);

        producerService.sendMessage(sessionAwareQueue, "测试SessionAwareMessageListener");

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (e) {
            console.error(e);
        }

        console.error("实例化一个消息监听容器，开始接收返回给生产者的消息...");

        const container: DefaultMessageListenerContainer = new DefaultMessageListenerContainer();
        container.setConnectionFactory(applicationContext.getBean("connectionFactory", ConnectionFactory));
        container.setDestination(applicationContext.getBean("queue", Destination));
        container.setMessageListener(new ConsumerMessageListener());
        container.initialize();
        container.start();
    });
});