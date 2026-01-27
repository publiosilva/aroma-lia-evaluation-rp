// Original URL: https://github.com/chadwishner/COP3502-Project-4-Java-/blob/d2a79f7fc4a9883f68f60744cb2866225fe449ec/TaskTest.java#L10-L54

public class TestSmell011 {
	@Test
	public void testTaskToString(){
		error += ("testTaskToString() \t Task toString\n");
		
		Task t1 = new Task("T1", 1);
		String ans = "\tTask: T1\tLevel: 1";
		String students = t1.toString();
		
		int min = Math.min(ans.length(), students.length());
		if(ans.length() !=  students.length()){
			error += ("\tSize was " + ans.length() + " but received size " + students.length() + "\n\n");
		}
		
		
		for(int i = 0; i < min; i++){
			if(ans.charAt(i) != students.charAt(i)){
				String temp1 = "";
				String temp2 = "";

				if(ans.charAt(i) == '\t'){
					temp1 = "\\t";
				}
				else if(ans.charAt(i) == '\n'){
					temp1 = "\\n";
				}
				else{
					temp1 = ("" + ans.charAt(i));
				}

				if(students.charAt(i) == '\t'){
					temp2 = "\\t";
				}
				else if(students.charAt(i) == '\n'){
					temp2 = "\\n";
				}
				else{
					temp2 = ("" + students.charAt(i));
				}
				error += ("\tIndex: " + i + " Ans: " + temp1 + " Students: " + temp2 + "\n");	
			}
		}
		error += ("\n");
		
		assert(ans.equals(students));
	}
}
