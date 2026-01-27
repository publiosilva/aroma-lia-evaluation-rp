# Original URL: https://github.com/3rdTools/gradio/blob/24e048196e8f7bd309ef5c597d4ffc6ca4ed55d0/client/python/test/test_client.py#L220-L238

class TestClientPredictions:

    def test_smell_158(self, progress_demo):
        with connect(progress_demo) as client:
            job = client.submit("hello", api_name="/predict")
            statuses = []
            while not job.done():
                statuses.append(job.status())
                time.sleep(0.02)
            assert any(s.code == Status.PROGRESS for s in statuses)
            assert any(s.progress_data is not None for s in statuses)
            all_progress_data = [
                p for s in statuses if s.progress_data for p in s.progress_data
            ]
            count = 0
            for i in range(20):
                unit = ProgressUnit(
                    index=i, length=20, unit="steps", progress=None, desc=None
                )
                count += unit in all_progress_data
            assert count