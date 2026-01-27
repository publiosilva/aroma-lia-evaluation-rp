# Original URL: https://github.com/ogrisel/scikit-learn/blob/b20998d4ec606558ae86cba7ff5a84aea094c397/sklearn/cluster/tests/test_k_means.py#L508-L519

def test_smell_160():
    # Test for the case that the number of clusters to reassign is bigger
    # than the batch_size. Run the test with 100 clusters and a batch_size of
    # 10 because it turned out that these values ensure that the number of
    # clusters to reassign is always bigger than the batch_size.
    MiniBatchKMeans(
        n_clusters=100,
        batch_size=10,
        init_size=n_samples,
        random_state=42,
        verbose=True,
    ).fit(X)