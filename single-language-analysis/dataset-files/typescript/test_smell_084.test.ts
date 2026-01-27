import { expect } from '@jest/globals';

describe('JMSTest', () => {
    it("test_smell_084", () => {
        this.applicationContext = TestUtils.instanceContext(MODULE, CONFIG_LISTENER);
        const producerService: ProducerService = this.applicationContext.getBean(ProducerService, "producerService");
        const queue: Destination = this.applicationContext.getBean("topic", Destination);

        producerService.sendMessage(queue, "LiJingTang-JMS-Message-Topic");
    });
});