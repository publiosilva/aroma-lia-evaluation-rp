using Xunit;

public class TestSmell077
{
    [Fact]
    public void TestSessionAwareMessageListener()
    {
        this.ApplicationContext = TestUtils.InstanceContext(MODULE, CONFIG_SESSION);
        ProducerService producerService = this.ApplicationContext.GetBean<ProducerService>("producerService");
        Destination sessionAwareQueue = this.ApplicationContext.GetBean<Destination>("sessionAwareQueue");

        producerService.SendMessage(sessionAwareQueue, "测试SessionAwareMessageListener");

        try
        {
            System.Threading.Thread.Sleep(1000);
        }
        catch (System.Exception e)
        {
            System.Console.WriteLine(e.StackTrace);
        }

        System.Console.Error.WriteLine("实例化一个消息监听容器，开始接收返回给生产者的消息...");

        DefaultMessageListenerContainer container = new DefaultMessageListenerContainer();
        container.SetConnectionFactory(this.ApplicationContext.GetBean<ConnectionFactory>("connectionFactory"));
        container.SetDestination(this.ApplicationContext.GetBean<Destination>("queue"));
        container.SetMessageListener(new ConsumerMessageListener());
        container.Initialize();
        container.Start();
    }
}