# Original URL: https://github.com/ogrisel/scikit-learn/blob/b20998d4ec606558ae86cba7ff5a84aea094c397/sklearn/cluster/tests/test_k_means.py#L205-L266

@pytest.mark.parametrize("X_csr", X_as_any_csr)
def test_smell_093(X_csr, global_random_seed):
    # Check that dense and sparse minibatch update give the same results
    rng = np.random.RandomState(global_random_seed)

    centers_old = centers + rng.normal(size=centers.shape)
    centers_old_csr = centers_old.copy()

    centers_new = np.zeros_like(centers_old)
    centers_new_csr = np.zeros_like(centers_old_csr)

    weight_sums = np.zeros(centers_old.shape[0], dtype=X.dtype)
    weight_sums_csr = np.zeros(centers_old.shape[0], dtype=X.dtype)

    sample_weight = np.ones(X.shape[0], dtype=X.dtype)

    # extract a small minibatch
    X_mb = X[:10]
    X_mb_csr = X_csr[:10]
    sample_weight_mb = sample_weight[:10]

    # step 1: compute the dense minibatch update
    old_inertia = _mini_batch_step(
        X_mb,
        sample_weight_mb,
        centers_old,
        centers_new,
        weight_sums,
        np.random.RandomState(global_random_seed),
        random_reassign=False,
    )
    assert old_inertia > 0.0

    # compute the new inertia on the same batch to check that it decreased
    labels, new_inertia = _labels_inertia(X_mb, sample_weight_mb, centers_new)
    assert new_inertia > 0.0
    assert new_inertia < old_inertia

    # step 2: compute the sparse minibatch update
    old_inertia_csr = _mini_batch_step(
        X_mb_csr,
        sample_weight_mb,
        centers_old_csr,
        centers_new_csr,
        weight_sums_csr,
        np.random.RandomState(global_random_seed),
        random_reassign=False,
    )
    assert old_inertia_csr > 0.0

    # compute the new inertia on the same batch to check that it decreased
    labels_csr, new_inertia_csr = _labels_inertia(
        X_mb_csr, sample_weight_mb, centers_new_csr
    )
    assert new_inertia_csr > 0.0
    assert new_inertia_csr < old_inertia_csr

    # step 3: check that sparse and dense updates lead to the same results
    assert_array_equal(labels, labels_csr)
    assert_allclose(centers_new, centers_new_csr)
    assert_allclose(old_inertia, old_inertia_csr)
    assert_allclose(new_inertia, new_inertia_csr)