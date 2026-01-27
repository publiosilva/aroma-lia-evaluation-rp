const { expect } = require('jest');

describe('WeiboTest', () => {
    it("test_smell_072", async () => {
        expect(weibo.createFriendship("1646678371")).not.toBeNull();
        await new Promise(resolve => setTimeout(resolve, 1000));
        expect(weibo.destroyFriendship("1646678371")).not.toBeNull();
        expect(weibo.existsFriendship("1377583044", "1646678371")).not.toBeNull();
    });
});