const { expect } = require('jest');

describe('JMSTest', () => {
    it("test_smell_077", async () => {
        this.applicationContext = TestUtils.instanceContext(MODULE, CONFIG_SESSION);
        const producerService = this.applicationContext.getBean(ProducerService, "producerService");
        const sessionAwareQueue = this.applicationContext.getBean("sessionAwareQueue", Destination);
        
        producerService.sendMessage(sessionAwareQueue, "测试SessionAwareMessageListener");
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (e) {
            e.printStackTrace();
        }
        
        console.error("实例化一个消息监听容器，开始接收返回给生产者的消息...");
        
        const continer = new DefaultMessageListenerContainer();
        continer.setConnectionFactory(this.applicationContext.getBean("connectionFactory", ConnectionFactory));
        continer.setDestination(this.applicationContext.getBean("queue", Destination));
        continer.setMessageListener(new ConsumerMessageListener());
        continer.initialize();
        continer.start();
    });
});