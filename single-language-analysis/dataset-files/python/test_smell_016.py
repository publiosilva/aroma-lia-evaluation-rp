import pytest
import threading
import time
import logging

logging.basicConfig(level=logging.INFO)
log = logging.getLogger()

stop = False

class TestMainTest:
    def test_smell_016(self):
        global stop
        i = 0
        
        def run():
            nonlocal i
            while not stop:
                i += 1
                log.info("loop thread %d", i)
                time.sleep(0.7)
            log.info("stopThread[Thread:%s]: count i is %d", threading.current_thread().name, i)

        t = threading.Thread(target=run)
        t.start()
        
        time.sleep(7)
        stop = True
        log.info("stopThread[Thread:%s]: stopped!", t.name)