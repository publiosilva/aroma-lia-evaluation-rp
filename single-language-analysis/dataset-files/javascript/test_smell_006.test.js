const { expect } = require('jest');

describe('WeiboTest', () => {
  it("test_smell_006", async () => {
    expect(weibo.getFavorites()).toBeTruthy();
    expect(weibo.getFavorites(2)).toBeTruthy();
    const id = 4052331047;
    expect(weibo.createFavorite(id)).toBeTruthy();
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(weibo.destroyFavorite(id)).toBeTruthy();
  });
});