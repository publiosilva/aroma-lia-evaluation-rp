const { expect } = require('jest');

describe('TaskTest', () => {
    it("test_smell_011", () => {
        let error = "";
        error += ("testTaskToString() \t Task toString\n");
        
        const t1 = new Task("T1", 1);
        const ans = "\tTask: T1\tLevel: 1";
        const students = t1.toString();
        
        const min = Math.min(ans.length, students.length);
        if (ans.length !== students.length) {
            error += ("\tSize was " + ans.length + " but received size " + students.length + "\n\n");
        }
        
        for (let i = 0; i < min; i++) {
            if (ans.charAt(i) !== students.charAt(i)) {
                let temp1 = "";
                let temp2 = "";

                if (ans.charAt(i) === '\t') {
                    temp1 = "\\t";
                } else if (ans.charAt(i) === '\n') {
                    temp1 = "\\n";
                } else {
                    temp1 = ("" + ans.charAt(i));
                }

                if (students.charAt(i) === '\t') {
                    temp2 = "\\t";
                } else if (students.charAt(i) === '\n') {
                    temp2 = "\\n";
                } else {
                    temp2 = ("" + students.charAt(i));
                }
                error += ("\tIndex: " + i + " Ans: " + temp1 + " Students: " + temp2 + "\n");    
            }
        }
        error += ("\n");
        
        expect(ans).toBe(students);
    });
});