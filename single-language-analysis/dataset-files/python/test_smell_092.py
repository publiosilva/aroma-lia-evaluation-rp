# Original URL: https://github.com/ogrisel/scikit-learn/blob/b20998d4ec606558ae86cba7ff5a84aea094c397/sklearn/cluster/tests/test_k_means.py#L522-L537

def test_smell_092():
    # Check the internal _init_size attribute of MiniBatchKMeans

    # default init size should be 3 * batch_size
    km = MiniBatchKMeans(n_clusters=10, batch_size=5, n_init=1).fit(X)
    assert km._init_size == 15

    # if 3 * batch size < n_clusters, it should then be 3 * n_clusters
    km = MiniBatchKMeans(n_clusters=10, batch_size=1, n_init=1).fit(X)
    assert km._init_size == 30

    # it should not be larger than n_samples
    km = MiniBatchKMeans(
        n_clusters=10, batch_size=5, n_init=1, init_size=n_samples + 1
    ).fit(X)
    assert km._init_size == n_samples