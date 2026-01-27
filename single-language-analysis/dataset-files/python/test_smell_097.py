# Original URL: https://github.com/ogrisel/scikit-learn/blob/b20998d4ec606558ae86cba7ff5a84aea094c397/sklearn/cluster/tests/test_k_means.py#L114-L153

@pytest.mark.parametrize("array_constr", data_containers, ids=data_containers_ids)
def test_smell_097(array_constr):
    # test for the _relocate_empty_clusters_(dense/sparse) helpers

    # Synthetic dataset with 3 obvious clusters of different sizes
    X = np.array([-10.0, -9.5, -9, -8.5, -8, -1, 1, 9, 9.5, 10]).reshape(-1, 1)
    X = array_constr(X)
    sample_weight = np.ones(10)

    # centers all initialized to the first point of X
    centers_old = np.array([-10.0, -10, -10]).reshape(-1, 1)

    # With this initialization, all points will be assigned to the first center
    # At this point a center in centers_new is the weighted sum of the points
    # it contains if it's not empty, otherwise it is the same as before.
    centers_new = np.array([-16.5, -10, -10]).reshape(-1, 1)
    weight_in_clusters = np.array([10.0, 0, 0])
    labels = np.zeros(10, dtype=np.int32)

    if array_constr is np.array:
        _relocate_empty_clusters_dense(
            X, sample_weight, centers_old, centers_new, weight_in_clusters, labels
        )
    else:
        _relocate_empty_clusters_sparse(
            X.data,
            X.indices,
            X.indptr,
            sample_weight,
            centers_old,
            centers_new,
            weight_in_clusters,
            labels,
        )

    # The relocation scheme will take the 2 points farthest from the center and
    # assign them to the 2 empty clusters, i.e. points at 10 and at 9.9. The
    # first center will be updated to contain the other 8 points.
    assert_array_equal(weight_in_clusters, [8, 1, 1])
    assert_allclose(centers_new, [[-36], [10], [9.5]])