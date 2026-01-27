# Original URL: https://github.com/code-refactor/schedualpy_fintech_maria/blob/8c9486e6c3b96e6137731514889bba90b5cd08ab/test_api.py#L22-L34

def test_smell_153(client):
    rv = client.post('/jobs/recurring', json={'interval': 0.1, 'sla_jitter': 0, 'func': 'y'})
    jid = rv.get_json()['job_id']
    time.sleep(0.3)
    rv2 = client.delete(f'/jobs/{jid}/cancel')
    assert rv2.status_code == 200
    rv3 = client.post(f'/jobs/{jid}/reschedule', json={'interval': 0.05})
    assert rv3.status_code == 200
    # Rescheduling a cancelled job should error or do nothing
    # We accept no exception; check response content
    data = rv3.get_json()
    assert data['rescheduled'] == jid
    assert data['new_interval'] == 0.05