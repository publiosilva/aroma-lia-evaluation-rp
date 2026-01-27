using Xunit;

public class TestSmell042
{
    [Fact]
    public void TestProcessExchange()
    {
        // Test status OK and Result correct
        Exchange.Builder b = new Exchange.Builder();
        RequestStatus status = new RequestStatus();
        b.AddCompatible(new SerialNumber(new BigInteger("13"))).AddCompatible(new SerialNumber(new BigInteger("16")));
        Opad myOpad = new Opad(new SerialNumber(new BigInteger("15")), Optional.Empty());
        try
        {
            Exchange exchange = b.Build();
            myOpad.Process(exchange, status);
            Assert.Equal(RequestStatus.StatusCode.OK, status.GetStatusCode());
            Assert.Equal(Optional.Of(new BigInteger("13")), status.GetResult());
        }
        catch (Exception e)
        {
            System.Console.WriteLine("exception: " + e);
        }
        
        // Test status FAIL and result empty
        Exchange.Builder builder = new Exchange.Builder();
        try
        {
            Exchange exchange = builder.Build();
            myOpad.Process(exchange, status);
            Assert.Equal(RequestStatus.StatusCode.FAIL, status.GetStatusCode());
            Assert.Equal(Optional.Empty(), status.GetResult());
        }
        catch (Exception e)
        {
            System.Console.WriteLine("exception: " + e);
        }
        
        builder.AddCompatible(new SerialNumber(new BigInteger("17"))).AddCompatible(new SerialNumber(new BigInteger("201")));
        try
        {
            Exchange exchange = builder.Build();
            myOpad.Process(exchange, status);
            Assert.Equal(RequestStatus.StatusCode.FAIL, status.GetStatusCode());
            Assert.Equal(Optional.Empty(), status.GetResult());
        }
        catch (Exception e)
        {
            System.Console.WriteLine("exception: " + e);
        }

        // The following is the JUNIT test required in the SPEC
        Exchange.Builder myBuilder = new Exchange.Builder();
        myBuilder.AddCompatible(new SerialNumber(new BigInteger("1032"))).AddCompatible(new SerialNumber(new BigInteger("1244")));
        myOpad = new Opad(new SerialNumber(new BigInteger("1048")), Optional.Empty());
        try
        {
            Exchange exchange = myBuilder.Build();
            myOpad.Process(exchange, status);
            Assert.Equal(RequestStatus.StatusCode.OK, status.GetStatusCode());
            Assert.Equal(Optional.Of(new BigInteger("1032")), status.GetResult());
        }
        catch (Exception e)
        {
            System.Console.WriteLine("exception: " + e);
        }
    }
}