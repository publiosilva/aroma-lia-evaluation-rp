import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell111 {

    @Test
    public void testTestAppProperEnviron() {
        flask.Flask app = new flask.Flask("test");
        app.config.update("SERVER_NAME", "localhost.localdomain:5000");

        app.route("/");
        app.route("/", "foo");

        flask.Response rv = app.test_client().get("/");
        assertEquals("Foo", rv.data);

        rv = app.test_client().get("/", "http://localhost.localdomain:5000");
        assertEquals("Foo", rv.data);

        rv = app.test_client().get("/", "https://localhost.localdomain:5000");
        assertEquals("Foo", rv.data);

        app.config.update("SERVER_NAME", "localhost.localdomain");
        rv = app.test_client().get("/", "https://localhost.localdomain");
        assertEquals("Foo", rv.data);

        try {
            app.config.update("SERVER_NAME", "localhost.localdomain:443");
            rv = app.test_client().get("/", "https://localhost.localdomain");
            assertEquals(404, rv.status_code);
        } catch (ValueError e) {
            assertEquals("the server name provided ('localhost.localdomain:443') does not match the server name from the WSGI environment ('localhost.localdomain')", e.getMessage());
        }

        try {
            app.config.update("SERVER_NAME", "localhost.localdomain");
            rv = app.test_client().get("/", "http://foo.localhost");
            assertEquals(404, rv.status_code);
        } catch (ValueError e) {
            assertEquals("the server name provided ('localhost.localdomain') does not match the server name from the WSGI environment ('foo.localhost')", e.getMessage());
        }

        rv = app.test_client().get("/", "http://foo.localhost.localdomain");
        assertEquals("Foo SubDomain", rv.data);
    }
}