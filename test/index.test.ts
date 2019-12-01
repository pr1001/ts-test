import { sillyLisp, Atom, List, Symbol } from "../src/index";

test('new Atom(3) has a value of 3', () => {
    const a = new Atom(3);
    expect(a.eval()).toBe(3);
    expect(a.value).toBe(3);
});

test('List.nil has a value of []', () => {
    const n = List.nil;
    expect(n.eval()).toStrictEqual([]);
    expect(n.expressions.length).toBe(0);
});

test('new List([]) returns List.nil', () => {
    const l = new List([]);
    expect(l).toStrictEqual(List.nil);
});

test('new Symbol(\'a\', 3) has a value of 3', () => {
    const s = new Symbol('a', 3);
    expect(s.eval()).toBe(3);
});

test('(1 2 +) to equal 3', () => {
    expect(sillyLisp('(1 2 +)')).toBe(3);
});