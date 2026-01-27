const { expect } = require('jest');

describe('JMSTest', () => {
    test("test_smell_084", () => {
        this.applicationContext = TestUtils.instanceContext(MODULE, CONFIG_LISTENER);
        const producerService = this.applicationContext.getBean(ProducerService.class, "producerService");
        const queue = this.applicationContext.getBean("topic", Destination.class);
        
        producerService.sendMessage(queue, "LiJingTang-JMS-Message-Topic");  
    });
});