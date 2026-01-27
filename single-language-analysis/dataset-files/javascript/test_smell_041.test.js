const { expect } = require('jest');

describe('RunTest', () => {
    it("test_smell_041", () => {
        const em = DBUtil.getEntityManager();
        
        try {
            const results = em.createQuery(
                "SELECT e.ENAME, e.JOB, d.DNAME, d.LOC FROM EMP e JOIN e.DEPTNO d", Object
            ).getResultList();
            
            results.forEach(result => console.log(
                "EMP Name: " + result[0] + ", Job: " + result[1] +
                ", Dept Name: " + result[2] + ", Location: " + result[3]
            ));
            
        } catch (e) {
            throw new Error(e);
            
        } finally {
            em.close();
        }
    });
});