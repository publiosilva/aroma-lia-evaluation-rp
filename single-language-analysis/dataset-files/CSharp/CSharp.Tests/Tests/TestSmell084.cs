using Xunit;

public class TestSmell084
{
    [Fact]
    public void TestTopic()
    {
        this.ApplicationContext = TestUtils.InstanceContext(MODULE, CONFIG_LISTENER);
        ProducerService producerService = this.ApplicationContext.GetBean<ProducerService>("producerService");
        Destination queue = this.ApplicationContext.GetBean<Destination>("topic");

        producerService.SendMessage(queue, "LiJingTang-JMS-Message-Topic");
    }
}