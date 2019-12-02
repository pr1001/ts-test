import { atom, cons, car } from "../src/SpecialForms";
import { List } from "../src/List";
import { Symbol } from "../src/Symbol";
import { evaluate } from "../src";

// Direct Invocation

// cons
test('cons(1, 2)', () => {
    expect(cons(1, 2)).toEqual(new List(1, new List(2, List.nil)));
});

test('cons((1 2) 3', () => {
    const expectedList = new List(new List(1, new List(2, List.nil)), new List(3, List.nil));
    expect(cons(new List(1, new List(2, List.nil)), 3)).toEqual(expectedList);
});

// car
test('car((1 2))', () => {
    expect(car(new List(1, new List(2, List.nil)))).toBe(1);
});

test('car(((1 2) 3', () => {
    const expectedList = new List(1, new List(2, List.nil));
    expect(car(new List(new List(1, new List(2, List.nil)), new List(3, List.nil)))).toEqual(expectedList);
})

test('car(())', () => {
    expect(car(List.nil)).toBeUndefined();
})

// cdr

// atom
test('atom(1)', () => {
    expect(atom(1)).toBe(true);
});

test('atom((1 2))', () => {
    expect(atom(new List(1, new List(2, List.nil)))).toBe(false);
});

// Evaluation

// cons
test('evaluate (cons 1 2)', () => {
    const list = new List(new Symbol('cons'), new List(1, new List(2, List.nil)));
    expect(evaluate(list)).toEqual(new List(1, new List(2, List.nil)));
});

test('evaluate (cons (1 2) 3)', () => {
    const list = new List(new Symbol('cons'), new List(new List(1, new List(2, List.nil)), new List(3, List.nil)));
    const expectedList = new List(new List(1, new List(2, List.nil)), new List(3, List.nil));
    expect(evaluate(list)).toEqual(expectedList);
});

// car

// cdr

// atom
test('evaluate (atom? 1)', () => {
    const list = new List(new Symbol("atom?"), new List(1, List.nil));
    expect(evaluate(list)).toBe(true);
});