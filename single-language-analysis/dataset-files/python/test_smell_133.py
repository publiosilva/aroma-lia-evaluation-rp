# Original URL: https://github.com/RonJeffries/wordle/blob/e999dceebbe2ee28f5c4b0c3edb675e8b8830d23/test_speed.py#L74-L81

class TestSpeed:

    @pytest.mark.skip("5 seconds is also too long")
    def test_smell_133(self):
        t0 = time.time()
        results = self.check_numbers_prime_concurrently()
        count = sum(1 for result in results if result[1])
        delta_time = time.time() - t0
        assert count == 112
        assert delta_time < 5