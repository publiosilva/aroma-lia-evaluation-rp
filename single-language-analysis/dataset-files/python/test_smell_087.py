# Original URL: https://github.com/entrymissing/advent-of-code-23/blob/257265de25a632b39c1d4ef23f7c94c1b5fea3ac/day17.py#L155-L158

def test_smell_087():
  if os.path.exists('input'):
    assert solve_1() == 102
    assert solve_2() == 94