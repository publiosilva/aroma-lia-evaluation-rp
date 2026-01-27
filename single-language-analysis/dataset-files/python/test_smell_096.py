# Original URL: https://github.com/jupyterhub/jupyterhub-deploy-docker/blob/892ac57d758df0da44ed49aded712fa3fc2cd8b4/basic-example/tests/test_spawn.py#L35-L61

def test_smell_096(api_request):
    wait_for_hub(api_request)

    # Create a new user
    username = str(uuid4())
    api_request("post", "/hub/api/users", json={"usernames": [username]})

    # Start a server for the user
    api_request("post", f"/hub/api/users/{username}/server")

    # Wait for the server
    ready = False
    now = time.time()
    while not ready:
        wait_r = api_request("get", f"/hub/api/users/{username}").json()
        if wait_r["servers"][""]["ready"]:
            ready = True
            break
        if time.time() - now > TIMEOUT:
            raise TimeoutError(f"Singleuser server did not start in {TIMEOUT} seconds")
        time.sleep(5)

    # Call the jupyter-server API
    server_r = api_request("get", f"/user/{username}/api").json()
    assert "version" in server_r
    contents_r = api_request("get", f"/user/{username}/api/contents").json()
    assert "content" in contents_r