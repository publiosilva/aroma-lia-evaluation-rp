using Xunit;

public class TestSmell096
{
    [Fact]
    public void TestCreateUserAndServer()
    {
        WaitForHub(apiRequest);

        // Create a new user
        string username = Guid.NewGuid().ToString();
        apiRequest("post", "/hub/api/users", new { usernames = new[] { username } });

        // Start a server for the user
        apiRequest("post", $"/hub/api/users/{username}/server");

        // Wait for the server
        bool ready = false;
        double now = Time.Time();
        while (!ready)
        {
            var waitR = apiRequest("get", $"/hub/api/users/{username}").json();
            if (waitR["servers"][""]["ready"])
            {
                ready = true;
                break;
            }
            if (Time.Time() - now > TIMEOUT)
            {
                throw new TimeoutException($"Singleuser server did not start in {TIMEOUT} seconds");
            }
            Thread.Sleep(5000);
        }

        // Call the jupyter-server API
        var serverR = apiRequest("get", $"/user/{username}/api").json();
        Assert.True(serverR.ContainsKey("version"));
        var contentsR = apiRequest("get", $"/user/{username}/api/contents").json();
        Assert.True(contentsR.ContainsKey("content"));
    }
}