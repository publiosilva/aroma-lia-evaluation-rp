// Original URL: https://github.com/lijtforgithub/study-spring/blob/a9016a4b8be9202a7b3071879fea719c2531136e/src/main/resources/old/activemq/JMSTest.java#L52-L74

public class TestSmell077 {
    @Test
    public void testSessionAwareMessageListener() {
    	this.applicationContext = TestUtils.instanceContext(MODULE, CONFIG_SESSION);
    	ProducerService producerService = this.applicationContext.getBean(ProducerService.class, "producerService");
    	Destination sessionAwareQueue = this.applicationContext.getBean("sessionAwareQueue", Destination.class);
    	
        producerService.sendMessage(sessionAwareQueue, "测试SessionAwareMessageListener");
        
        try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
        
        System.err.println("实例化一个消息监听容器，开始接收返回给生产者的消息...");
        
        DefaultMessageListenerContainer continer = new DefaultMessageListenerContainer();
        continer.setConnectionFactory(this.applicationContext.getBean("connectionFactory", ConnectionFactory.class));
        continer.setDestination(this.applicationContext.getBean("queue", Destination.class));
        continer.setMessageListener(new ConsumerMessageListener());
        continer.initialize();
        continer.start();
    }
}
