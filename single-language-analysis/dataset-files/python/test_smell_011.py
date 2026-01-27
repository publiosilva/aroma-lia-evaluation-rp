import pytest

class TestTaskTest:
    def test_smell_011(self):
        error = ""
        error += ("test_task_to_string() \t Task toString\n")
        
        t1 = Task("T1", 1)
        ans = "\tTask: T1\tLevel: 1"
        students = t1.to_string()
        
        min_length = min(len(ans), len(students))
        if len(ans) != len(students):
            error += ("\tSize was " + str(len(ans)) + " but received size " + str(len(students)) + "\n\n")
        
        for i in range(min_length):
            if ans[i] != students[i]:
                temp1 = ""
                temp2 = ""

                if ans[i] == '\t':
                    temp1 = "\\t"
                elif ans[i] == '\n':
                    temp1 = "\\n"
                else:
                    temp1 = ans[i]

                if students[i] == '\t':
                    temp2 = "\\t"
                elif students[i] == '\n':
                    temp2 = "\\n"
                else:
                    temp2 = students[i]
                error += ("\tIndex: " + str(i) + " Ans: " + temp1 + " Students: " + temp2 + "\n")    
        
        error += ("\n")
        
        assert ans == students