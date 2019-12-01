import { sillyLisp, Atom, List } from "../src/index";

test('new Atom(3) has a value of 3', () => {
    const a = new Atom(3);
    expect(a.eval()).toBe(3);
    expect(a.value).toBe(3);
});

test('List.nil has a value of []', () => {
    const n = List.nil;
    expect(n.eval()).toStrictEqual([]);
});

test('(1 2 +) to equal 3', () => {
    expect(sillyLisp('(1 2 +)')).toBe(3);
});