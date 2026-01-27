import pytest

class TestRunTest:
    def test(self):
        em = DBUtil.get_entity_manager()
        
        try:
            results = em.create_query(
                "SELECT e.ENAME, e.JOB, d.DNAME, d.LOC FROM EMP e JOIN e.DEPTNO d"
            ).get_result_list()
            
            for result in results:
                print(
                    "EMP Name: " + result[0] + ", Job: " + result[1] +
                    ", Dept Name: " + result[2] + ", Location: " + result[3]
                )
                
        except Exception as e:
            print(e)
            
        finally:
            em.close()