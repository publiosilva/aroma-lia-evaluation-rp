using Xunit;

public class TestSmell011
{
    [Fact]
    public void TestTaskToString()
    {
        error += ("testTaskToString() \t Task toString\n");

        Task t1 = new Task("T1", 1);
        string ans = "\tTask: T1\tLevel: 1";
        string students = t1.ToString();

        int min = Math.Min(ans.Length, students.Length);
        if (ans.Length != students.Length)
        {
            error += ("\tSize was " + ans.Length + " but received size " + students.Length + "\n\n");
        }

        for (int i = 0; i < min; i++)
        {
            if (ans[i] != students[i])
            {
                string temp1 = "";
                string temp2 = "";

                if (ans[i] == '\t')
                {
                    temp1 = "\\t";
                }
                else if (ans[i] == '\n')
                {
                    temp1 = "\\n";
                }
                else
                {
                    temp1 = ("" + ans[i]);
                }

                if (students[i] == '\t')
                {
                    temp2 = "\\t";
                }
                else if (students[i] == '\n')
                {
                    temp2 = "\\n";
                }
                else
                {
                    temp2 = ("" + students[i]);
                }
                error += ("\tIndex: " + i + " Ans: " + temp1 + " Students: " + temp2 + "\n");
            }
        }
        error += ("\n");

        Assert.Equal(students, ans);
    }
}