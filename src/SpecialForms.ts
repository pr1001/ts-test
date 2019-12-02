import { Expression } from ".";
import { List } from "./List";

export function atom(input: Expression): boolean {
    return !(input instanceof List);
}

export function eq(left: Expression, right: Expression): boolean {
    if (left instanceof List || right instanceof List) {
        throw new Error("Undefined");
    }
    return left === right;
}
// console.log(eq2(1, 2))
// console.log(eq2(2, 2))
// console.log(eq2(1, List2.nil))

export function car(list: List): Expression {
    return list.head;
}
// console.log(car2(new List2(1, new List2(2, List2.nil))))
// console.log(car2(new List2(new List2(1, new List2(2, List2.nil)), new List2(3, List2.nil))));
// console.log(car2(List2.nil))

export function cdr(list: List): List {
    return list.tail;
}
// console.log(cdr2(new List2(1, List2.nil)));
// console.log(cdr2(new List2(1, new List2(2, List2.nil))))
// console.log(cdr2(new List2(new List2(1, new List2(2, List2.nil)), new List2(3, List2.nil))));
// console.log(cdr2(new List2(1, new List2(2, new List2(3, List2.nil)))));
// console.log(cdr2(List2.nil))

export function cons(left: Expression, right: Expression): List {
    return new List(left, new List(right, List.nil));
}

// car [cons [x; y]] = x 
// console.log(car2(cons2(1, 2)));
// cdr [cons [x; y]] = y 
// console.log(cdr2(cons2(1, 2)));
// cons [car [x]; cdr [x]] = x, provided that x is not atomic. 
// console.log(cons2(car2(new List2(1, List2.nil)), cdr2(new List2(1, List2.nil))));