# Original URL: https://github.com/prayagverma/flask/blob/f17e6061fcffdc290f615d3fdc9d949e9e719574/tests/test_basic.py#L1138-L1192

def test_smell_111():
    app = flask.Flask(__name__)
    app.config.update(
        SERVER_NAME='localhost.localdomain:5000'
    )

    @app.route('/')
    def index():
        return 'Foo'

    @app.route('/', subdomain='foo')
    def subdomain():
        return 'Foo SubDomain'

    rv = app.test_client().get('/')
    assert rv.data == b'Foo'

    rv = app.test_client().get('/', 'http://localhost.localdomain:5000')
    assert rv.data == b'Foo'

    rv = app.test_client().get('/', 'https://localhost.localdomain:5000')
    assert rv.data == b'Foo'

    app.config.update(SERVER_NAME='localhost.localdomain')
    rv = app.test_client().get('/', 'https://localhost.localdomain')
    assert rv.data == b'Foo'

    try:
        app.config.update(SERVER_NAME='localhost.localdomain:443')
        rv = app.test_client().get('/', 'https://localhost.localdomain')
        # Werkzeug 0.8
        assert rv.status_code == 404
    except ValueError as e:
        # Werkzeug 0.7
        assert str(e) == (
            "the server name provided "
            "('localhost.localdomain:443') does not match the "
            "server name from the WSGI environment ('localhost.localdomain')"
        )

    try:
        app.config.update(SERVER_NAME='localhost.localdomain')
        rv = app.test_client().get('/', 'http://foo.localhost')
        # Werkzeug 0.8
        assert rv.status_code == 404
    except ValueError as e:
        # Werkzeug 0.7
        assert str(e) == (
            "the server name provided "
            "('localhost.localdomain') does not match the "
            "server name from the WSGI environment ('foo.localhost')"
        )

    rv = app.test_client().get('/', 'http://foo.localhost.localdomain')
    assert rv.data == b'Foo SubDomain'