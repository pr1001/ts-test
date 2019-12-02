import { sillyLisp, evaluate } from "../src";
import { Symbol } from "../src/Symbol";
import { List } from "../src/List";

// Evaluation
test('evaluate (+ 1 2)', () => {
    const list = new List(new Symbol("+"), new List(1, new List(2, List.nil)))
    expect(evaluate(list)).toBe(3);
});

test('evaluate (+ (+ 1 2) 3 4)', () => {
    const list = new List(
        new Symbol("+"),
        new List(
            new List(
                new Symbol("+"),
                new List(1, new List(2, List.nil)),
            ),
            new List(3, new List(4, List.nil))
        )
    )
    expect(evaluate(list)).toBe(10);
});

test('evaluate (- 7 2)', () => {
    const list = new List(new Symbol("-"), new List(7, new List(2, List.nil)));
    expect(evaluate(list)).toBe(5);
});

test('evaluate (* 2 3)', () => {
    const list = new List(new Symbol("*"), new List(2, new List(3, List.nil)));
    expect(evaluate(list)).toBe(6);
});

test('evaluate (/ 10 2)', () => {
    const list = new List(new Symbol("/"), new List(10, new List(2, List.nil)));
    expect(evaluate(list)).toBe(5);
});

// console.log(eval2(new List2(new Symbol2("+"), new List2(new Symbol2('a'), new List2(2, List2.nil)))));

test('(1 2 +) to equal 3', () => {
    expect(sillyLisp('(1 2 +)')).toBe(3);
});