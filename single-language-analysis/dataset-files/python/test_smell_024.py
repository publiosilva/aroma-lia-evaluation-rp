import pytest

class TestArrayInversion:
    @pytest.mark.skip(reason="coz it's not quick todo: to review")
    def test_smell_024(self):
        file = "resources/IntegerArray.txt"
        try:
            list_ = MyArrayUtil.list_integer_from_file(file)

            A = MyArrayUtil.list_integers_to_integer_array(list_)

            D_total = ArrayInversion.sort_and_count(A, len(A), 0, len(A) - 1)

            D = D_total.get_left()

            MyArrayUtil.check_array_integer_sorted(D)

            expected_inversions = ArrayInversion.big_integer_brute_force_count(A)
            print("expect " + str(expected_inversions) + " inversions")
            assert expected_inversions == int(D_total.get_right())

        except FileNotFoundError as e:
            print(e)
            assert False
        except IOError as e:
            print(e)
            assert False