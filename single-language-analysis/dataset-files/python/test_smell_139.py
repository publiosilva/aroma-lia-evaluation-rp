# Original URL: https://github.com/code-refactor/schedualpy_dataeng_alex/blob/493c004678c9dcf408a12e7faf17daa35dd7be81/test_plugins.py#L4-L19

def test_smell_139():
    scheduler = ThreadSafeScheduler()
    results = []
    def plugin(data):
        results.append(data)
    scheduler.load_plugin('p1', plugin)
    # simulate using plugin in post-hook
    def job(): scheduler.plugins['p1']('ok')
    scheduler.schedule('jobp', job, cron_expr=1)
    scheduler.schedule_one_off('onep', job, run_at=__import__('datetime').datetime.now() + __import__('datetime').timedelta(seconds=1))
    time = __import__('time')
    time.sleep(1.1)
    scheduler._run_pending()
    time.sleep(0.1)
    # two runs: one recurring, one one-off
    assert results.count('ok') == 2