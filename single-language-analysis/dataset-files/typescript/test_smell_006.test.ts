import { expect } from '@jest/globals';

describe('WeiboTest', () => {
    test("test_smell_006", async () => {
        expect(weibo.getFavorites()).toBeTruthy();
        expect(weibo.getFavorites(2)).toBeTruthy();
        const id: number = 4052331047;
        expect(weibo.createFavorite(id)).toBeTruthy();
        await new Promise(resolve => setTimeout(resolve, 1000));
        expect(weibo.destroyFavorite(id)).toBeTruthy();
    });
});