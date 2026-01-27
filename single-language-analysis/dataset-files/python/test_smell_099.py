# Original URL: https://github.com/ogrisel/scikit-learn/blob/b20998d4ec606558ae86cba7ff5a84aea094c397/sklearn/cluster/tests/test_k_means.py#L381-L405

@pytest.mark.parametrize("algorithm", ["lloyd", "elkan"])
@pytest.mark.parametrize("tol", [1e-2, 0])
def test_smell_099(algorithm, tol, capsys):
    # Check verbose mode of KMeans for better coverage.
    X = np.random.RandomState(0).normal(size=(5000, 10))

    KMeans(
        algorithm=algorithm,
        n_clusters=n_clusters,
        random_state=42,
        init="random",
        n_init=1,
        tol=tol,
        verbose=1,
    ).fit(X)

    captured = capsys.readouterr()

    assert re.search(r"Initialization complete", captured.out)
    assert re.search(r"Iteration [0-9]+, inertia", captured.out)

    if tol == 0:
        assert re.search(r"strict convergence", captured.out)
    else:
        assert re.search(r"center shift .* within tolerance", captured.out)