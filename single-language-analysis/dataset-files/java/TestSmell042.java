// Original URL: https://github.com/joejensen8/Orange/blob/dac8bf7f4ed4120504e5652ddc0f79b7e1721e51/OpadTest.java#L137-L193

public class TestSmell042 {
    @Test
    public void testProcessExchange() throws Exception
    {
        // Test status OK and Result correct
        Exchange.Builder b = new Exchange.Builder();
        RequestStatus status = new RequestStatus();
        b.addCompatible(new SerialNumber(new BigInteger("13"))).addCompatible(new SerialNumber(new BigInteger("16")));
        Opad myOpad = new Opad(new SerialNumber(new BigInteger("15")), Optional.empty());
        try
        {
            Exchange exchange = b.build();
            myOpad.process(exchange, status);
            assertEquals(RequestStatus.StatusCode.OK, status.getStatusCode());
            assertEquals(Optional.of(new BigInteger("13")), status.getResult());
        }catch(Exception e)
        {
            System.out.println("exception: " + e);
        }
        // Test status FAIL and result empty
        Exchange.Builder builder = new Exchange.Builder();
        try
        {
            Exchange exchange = builder.build();
            myOpad.process(exchange, status);
            assertEquals(RequestStatus.StatusCode.FAIL, status.getStatusCode());
            assertEquals(Optional.empty(), status.getResult());
        }catch (Exception e)
        {
            System.out.println("exception: " + e);
        }
        builder.addCompatible(new SerialNumber(new BigInteger("17"))).addCompatible(new SerialNumber(new BigInteger("201")));
        try
        {
            Exchange exchange = builder.build();
            myOpad.process(exchange, status);
            assertEquals(RequestStatus.StatusCode.FAIL, status.getStatusCode());
            assertEquals(Optional.empty(), status.getResult());
        }catch (Exception e)
        {
            System.out.println("exception: " + e);
        }

        // The following is the JUNIT test required in the SPEC
        Exchange.Builder myBuilder = new Exchange.Builder();
        myBuilder.addCompatible(new SerialNumber(new BigInteger("1032"))).addCompatible(new SerialNumber(new BigInteger("1244")));
        myOpad = new Opad(new SerialNumber(new BigInteger("1048")), Optional.empty());
        try
        {
            Exchange exchange = myBuilder.build();
            myOpad.process(exchange, status);
            assertEquals(RequestStatus.StatusCode.OK, status.getStatusCode());
            assertEquals(Optional.of(new BigInteger("1032")), status.getResult());
        }catch (Exception e)
        {
            System.out.println("exception: " + e);
        }
    }
}
