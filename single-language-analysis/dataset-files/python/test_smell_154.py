# Original URL: https://github.com/bluedatainc/Impala/blob/d520a9cdea2fc97e8d5da9fbb0244e60ee416bfa/tests/shell/test_shell_interactive.py#L77-L90

class TestImpalaShellInteractive(object):

  @pytest.mark.execute_serially
  def test_smell_154(self):
    impalad = ImpaladService(socket.getfqdn())
    impalad.wait_for_num_in_flight_queries(0)
    command = "select sleep(10000);"
    p = self._start_new_shell_process()
    self._send_cmd_to_shell(p, command)
    sleep(1)
    # iterate through all processes with psutil
    shell_pid = cancellation_helper()
    sleep(2)
    os.kill(shell_pid, signal.SIGINT)
    result = get_shell_cmd_result(p)
    assert impalad.wait_for_num_in_flight_queries(0)