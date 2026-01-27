const { expect } = require('jest');

describe('ListConverter', () => {
    it("test_smell_111", async () => {
        const app = require('express')();
        app.set('trust proxy', true);
        app.locals = {
            config: {
                SERVER_NAME: 'localhost.localdomain:5000'
            }
        };

        app.get('/', (req, res) => {
            res.send('Foo');
        });

        app.get('/', (req, res) => {
            if (req.subdomains[0] === 'foo') {
                res.send('Foo SubDomain');
            }
        });

        let rv = await app.testClient().get('/');
        expect(rv.data).toBe('Foo');

        rv = await app.testClient().get('/', { headers: { host: 'localhost.localdomain:5000' } });
        expect(rv.data).toBe('Foo');

        rv = await app.testClient().get('/', { headers: { host: 'localhost.localdomain:5000', protocol: 'https' } });
        expect(rv.data).toBe('Foo');

        app.locals.config.SERVER_NAME = 'localhost.localdomain';
        rv = await app.testClient().get('/', { headers: { host: 'localhost.localdomain', protocol: 'https' } });
        expect(rv.data).toBe('Foo');

        try {
            app.locals.config.SERVER_NAME = 'localhost.localdomain:443';
            rv = await app.testClient().get('/', { headers: { host: 'localhost.localdomain', protocol: 'https' } });
            expect(rv.statusCode).toBe(404);
        } catch (e) {
            expect(e.message).toBe(
                "the server name provided " +
                "('localhost.localdomain:443') does not match the " +
                "server name from the WSGI environment ('localhost.localdomain')"
            );
        }

        try {
            app.locals.config.SERVER_NAME = 'localhost.localdomain';
            rv = await app.testClient().get('/', { headers: { host: 'foo.localhost' } });
            expect(rv.statusCode).toBe(404);
        } catch (e) {
            expect(e.message).toBe(
                "the server name provided " +
                "('localhost.localdomain') does not match the " +
                "server name from the WSGI environment ('foo.localhost')"
            );
        }

        rv = await app.testClient().get('/', { headers: { host: 'foo.localhost.localdomain' } });
        expect(rv.data).toBe('Foo SubDomain');
    });
});