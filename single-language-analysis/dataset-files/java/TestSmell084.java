// Original URL: https://github.com/lijtforgithub/study-spring/blob/a9016a4b8be9202a7b3071879fea719c2531136e/src/main/resources/old/activemq/JMSTest.java#L43-L50

public class TestSmell084 {
    @Test
    public void testTopic() {  
    	this.applicationContext = TestUtils.instanceContext(MODULE, CONFIG_LISTENER);
    	ProducerService producerService = this.applicationContext.getBean(ProducerService.class, "producerService");
    	Destination queue = this.applicationContext.getBean("topic", Destination.class);
    	
    	producerService.sendMessage(queue, "LiJingTang-JMS-Message-Topic");  
    }
}
