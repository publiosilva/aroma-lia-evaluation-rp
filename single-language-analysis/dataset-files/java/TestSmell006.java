// Original URL: https://github.com/yuchting/yuchbox/blob/c4e3d7c87a47f192a4a7632fbb91d68fb3dbd719/server/src/weibo4j/WeiboTest.java#L276-L283

public class TestSmell006 {
	@Test
	public void testFavorites() throws WeiboException, InterruptedException {
		assertNotNull(weibo.getFavorites());
		assertNotNull(weibo.getFavorites(2));
		long id = 4052331047L;
		assertNotNull(weibo.createFavorite(id));
		Thread.sleep(1000);
		assertNotNull(weibo.destroyFavorite(id));
	}
}
