import { sillyLisp, Atom, List, Symbol, add, subtract, multiply, divide } from "../src/index";

// Data Types

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

// Simple Forms

test("add(new Atom(1), new Atom(2)) has a value of 3", () => {
    const a = add([new Atom(1), new Atom(2)]);
    expect(a.eval()).toBe(3);
});

test("add(new Atom(1), new Atom(2), new Atom(3)) has a value of 6", () => {
    const a = add([new Atom(1), new Atom(2), new Atom(3)]);
    expect(a.eval()).toBe(6);
});

test("add(new Atom(1), add(new Atom(2), new Atom(3))) has a value of 6", () => {
    const a = add([new Atom(1), add([new Atom(2), new Atom(3)])]);
    expect(a.eval()).toBe(6);
});

test("subtract(new Atom(2), new Atom(1)) has a value of 1", () => {
    const s = subtract([new Atom(2), new Atom(1)]);
    expect(s.eval()).toBe(1);
});

test("subtract(new Atom(3), new Atom(2), new Atom(1)) has a value of 0", () => {
    const s = subtract([new Atom(3), new Atom(2), new Atom(1)]);
    expect(s.eval()).toBe(0);
});

test("subtract(new Atom(3), subtract(new Atom(2), new Atom(1))) has a value of 1", () => {
    const s = subtract([new Atom(3), subtract([new Atom(2), new Atom(1)])]);
    expect(s.eval()).toBe(2);
});

test("multiply(new Atom(2)) throws an error", () => {
    expect(() => multiply([new Atom(2)])).toThrowError();
});

test("multiply(new Atom(1), new Atom(2), new Atom(3)) throws an error", () => {
    expect(() => multiply([new Atom(1), new Atom(2), new Atom(3)])).toThrowError();
});

test("multiply(new Atom(2), new Atom(3)) has a value of 6", () => {
    const m = multiply([new Atom(2), new Atom(3)]);
    expect(m.eval()).toBe(6);
});

test("divide(new Atom(2)) throws an error", () => {
    expect(() => divide([new Atom(2)])).toThrowError();
});

test("divide(new Atom(1), new Atom(2), new Atom(3)) throws an error", () => {
    expect(() => divide([new Atom(1), new Atom(2), new Atom(3)])).toThrowError();
});

test("divide(new Atom(4), new Atom(2)) has a value of 2", () => {
    const m = divide([new Atom(4), new Atom(2)]);
    expect(m.eval()).toBe(2);
});

// Evaluation

test('(1 2 +) to equal 3', () => {
    expect(sillyLisp('(1 2 +)')).toBe(3);
});