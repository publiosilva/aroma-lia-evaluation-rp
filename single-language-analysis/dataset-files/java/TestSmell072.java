// Original URL: https://github.com/yuchting/yuchbox/blob/c4e3d7c87a47f192a4a7632fbb91d68fb3dbd719/server/src/weibo4j/WeiboTest.java#L231-L237

public class TestSmell072 {
	@Test
	public void testFriendship() throws WeiboException, InterruptedException {
		assertNotNull(weibo.createFriendship("1646678371"));
		Thread.sleep(1000);
		assertNotNull(weibo.destroyFriendship("1646678371"));
		assertNotNull(weibo.existsFriendship("1377583044", "1646678371"));
	}
}
