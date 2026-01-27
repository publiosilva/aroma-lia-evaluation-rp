// Original URL: https://github.com/bennn/NLP/blob/7d0c90feeaac03308791641dc6c864e88eba2ed0/TrieTest.java#L79-L99

public class TestSmell013 {
	@Test
	public void SimpleTestFrequencies(){
		simpleT.insertAll(Arrays.asList(toInsert));
		HashMap<String, Integer> wordMap = new HashMap<String, Integer>();
		for(int i = 0; i < toInsert.length; i++){
			if(wordMap.containsKey(toInsert[i])){
				int freq = wordMap.get(toInsert[i]);
				wordMap.put(toInsert[i], freq + 1);
			} else {
				wordMap.put(toInsert[i], 1);
			}
		}
		Collection<TrieNode> children = (Collection<TrieNode>)simpleT.getRoot().getChildren();
		if(children != null){
			Iterator<TrieNode> iterator = children.iterator();
			while(iterator.hasNext()) {
				TrieNode child = iterator.next();
				assertEquals(child.getFreq(), (int) wordMap.get(child.getKey()));
			}
		} 
	}
}
