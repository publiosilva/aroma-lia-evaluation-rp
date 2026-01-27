// Original URL: https://github.com/hyleei/Fisa3_JPAPractice/blob/8a381a9c126ebca2d4c6fae58040e10fad8ee56d/RunTest.java#L13-L37

public class TestSmell041 {
    @Test
    public void test() {
        EntityManager em = DBUtil.getEntityManager();
        
        try {

            List<Object[]> results = em.createQuery(
                "SELECT e.ENAME, e.JOB, d.DNAME, d.LOC FROM EMP e JOIN e.DEPTNO d", Object[].class)
                .getResultList();
            
            //results.stream().forEach(System.out::println); -> 주소값만 나옴
            
            results.stream().forEach(result -> System.out.println(
                    "EMP Name: " + result[0] + ", Job: " + result[1] +
                    ", Dept Name: " + result[2] + ", Location: " + result[3]
                ));
            
            
        } catch (Exception e) {
            e.printStackTrace();
            
        } finally {
            em.close();
        }
    }
}
