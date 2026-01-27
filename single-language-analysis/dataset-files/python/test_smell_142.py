# Original URL: https://github.com/ogrisel/scikit-learn/blob/b20998d4ec606558ae86cba7ff5a84aea094c397/sklearn/cluster/tests/test_k_means.py#L770-L781

def test_smell_142(global_random_seed):
    # test calling the k_means function directly
    cluster_centers, labels, inertia = k_means(
        X, n_clusters=n_clusters, sample_weight=None, random_state=global_random_seed
    )

    assert cluster_centers.shape == (n_clusters, n_features)
    assert np.unique(labels).shape[0] == n_clusters

    # check that the labels assignment are perfect (up to a permutation)
    assert_allclose(v_measure_score(true_labels, labels), 1.0)
    assert inertia > 0.0