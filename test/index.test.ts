import { sillyLisp, Atom, List, Symbol, add } from "../src/index";

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

test("new Symbol('a', 3) has a value of 3", () => {
    const s = new Symbol('a', 3);
    expect(s.eval()).toBe(3);
});

test("add(new Atom(1), new Atom(2)) has a value of 3", () => {
    const a = add(new Atom(1), new Atom(2));
    expect(a.eval()).toBe(3);
});

test("add(new Atom(1), add(new Atom(2), new Atom(3))) has a value of 6", () => {
    const a = add(new Atom(1), add(new Atom(2), new Atom(3)));
    expect(a.eval()).toBe(6);
});

test('(1 2 +) to equal 3', () => {
    expect(sillyLisp('(1 2 +)')).toBe(3);
});