using Xunit;

public class TestSmell041
{
    [Fact]
    public void Test()
    {
        var Em = DBUtil.GetEntityManager();
        
        try
        {
            var Results = Em.CreateQuery(
                "SELECT e.ENAME, e.JOB, d.DNAME, d.LOC FROM EMP e JOIN e.DEPTNO d", typeof(object[]))
                .GetResultList();
            
            foreach (var Result in Results)
            {
                System.Console.WriteLine(
                    "EMP Name: " + Result[0] + ", Job: " + Result[1] +
                    ", Dept Name: " + Result[2] + ", Location: " + Result[3]
                );
            }
        }
        catch (System.Exception e)
        {
            System.Console.WriteLine(e.StackTrace);
        }
        finally
        {
            Em.Close();
        }
    }
}