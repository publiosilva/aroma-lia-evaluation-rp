using Xunit;

public class TestSmell111 : BaseConverter
{
    [Fact]
    public void TestTestAppProperEnviron()
    {
        var App = new Flask(__name__);
        App.Config.Update(
            "SERVER_NAME", "localhost.localdomain:5000"
        );

        App.Route("/", () => "Foo");

        App.Route("/", "foo", () => "Foo SubDomain");

        var Rv = App.TestClient().Get("/");
        Assert.Equal(b"Foo", Rv.Data);

        Rv = App.TestClient().Get("/", "http://localhost.localdomain:5000");
        Assert.Equal(b"Foo", Rv.Data);

        Rv = App.TestClient().Get("/", "https://localhost.localdomain:5000");
        Assert.Equal(b"Foo", Rv.Data);

        App.Config.Update("SERVER_NAME", "localhost.localdomain");
        Rv = App.TestClient().Get("/", "https://localhost.localdomain");
        Assert.Equal(b"Foo", Rv.Data);

        try
        {
            App.Config.Update("SERVER_NAME", "localhost.localdomain:443");
            Rv = App.TestClient().Get("/", "https://localhost.localdomain");
            Assert.Equal(404, Rv.StatusCode);
        }
        catch (ValueError E)
        {
            Assert.Equal(
                "the server name provided ('localhost.localdomain:443') does not match the server name from the WSGI environment ('localhost.localdomain')",
                E.ToString()
            );
        }

        try
        {
            App.Config.Update("SERVER_NAME", "localhost.localdomain");
            Rv = App.TestClient().Get("/", "http://foo.localhost");
            Assert.Equal(404, Rv.StatusCode);
        }
        catch (ValueError E)
        {
            Assert.Equal(
                "the server name provided ('localhost.localdomain') does not match the server name from the WSGI environment ('foo.localhost')",
                E.ToString()
            );
        }

        Rv = App.TestClient().Get("/", "http://foo.localhost.localdomain");
        Assert.Equal(b"Foo SubDomain", Rv.Data);
    }
}