export class UserController {
    public title: string = 'aaa';
    constructor() { }
}


describe('AppComponent', () => {
    const uc = new UserController();
    it('UserController가 존재해야 함', () => {
        const title: string = "aaa";
        //expect(title).toBe("aaa");
        expect(uc).not.toBeUndefined();
    });

    it('title이 존재해야하며, title은 aaa 여야함', () => {
        expect(uc.title).not.toBeUndefined();
        expect(uc.title).toBe('aaa');
    })

    // it('router가 존재햐아함', () => {
    //     expect(router).toBe('HI');
    // });
});
