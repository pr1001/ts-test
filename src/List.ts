import { List } from ".";

type Expression2 =  Atom2 | List2;
type Atom2 = number | Symbol2;

class Symbol2 {
    readonly name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class List2 {
    readonly head: any;
    readonly tail: List2;

    constructor(head: any, tail: List2) {
        this.head = head;
        this.tail = tail;
    }

    private static makeNil = () => {
        const l = new List2(List2.nil, List2.nil);
        return l;
    }
    // '() which is our empty list, sometimes called nil
    static nil: List2 = List2.makeNil();
}
// console.log(List2.nil);
// console.log(new List2(3, List2.nil));
// console.log(new List2(5, new List2(3, List2.nil)));

function atom2(input: any): boolean {
    return !(input instanceof List2);
}
// console.log(atom2(1));
// console.log(atom2(List2.nil));

function eq2(left: any, right: any): boolean {
    if (left instanceof List2 || right instanceof List2) {
        throw new Error("Undefined");
    }
    return left === right;
}
// console.log(eq2(1, 2))
// console.log(eq2(2, 2))
// console.log(eq2(1, List2.nil))

function car2(list: List2): any {
    return list.head;
}
// console.log(car2(new List2(1, new List2(2, List2.nil))))
// console.log(car2(new List2(new List2(1, new List2(2, List2.nil)), new List2(3, List2.nil))));
// console.log(car2(List2.nil))

function cdr2(list: List2): List2 {
    return list.tail;
}
// console.log(cdr2(new List2(1, List2.nil)));
// console.log(cdr2(new List2(1, new List2(2, List2.nil))))
// console.log(cdr2(new List2(new List2(1, new List2(2, List2.nil)), new List2(3, List2.nil))));
// console.log(cdr2(new List2(1, new List2(2, new List2(3, List2.nil)))));
// console.log(cdr2(List2.nil))

function cons2(left: any, right: any): List2 {
    return new List2(left, new List2(right, List2.nil));
}
// console.log(cons2(1, 2));
// console.log(cons2(new List2(1, new List2(2, List2.nil)), 3));

// car [cons [x; y]] = x 
// console.log(car2(cons2(1, 2)));
// cdr [cons [x; y]] = y 
// console.log(cdr2(cons2(1, 2)));
// cons [car [x]; cdr [x]] = x, provided that x is not atomic. 
// console.log(cons2(car2(new List2(1, List2.nil)), cdr2(new List2(1, List2.nil))));

// The rules for evaluating a normal lisp expression or form is easy. Take first element in a list, look up it's value and apply it to the other elements in the list. For example:
// (+ 1 2) => 3
// Remember our discussion about symbols earlier? + is just a symbol which is by default bound to the function we know as addition. So when we enter the form (+ 1 2) into the interpreter, Lisp looks up the function associated with +, which is addition, and then applies it to the arguments 1 and 2.

let symbolTable: { [index: string]: any } = {};

symbolTable["+"] = (list: List2): number => {
    function add2Helper(accumulator: number, list: List2): number {
        if (list === List2.nil) {
            return accumulator
        }
        return add2Helper(accumulator + car2(list), cdr2(list));
    }
    return add2Helper(0, list);
};

function map2(list: List2, f: (i: any) => any): List2 {
    if (list === List2.nil) {
        return list;
    }
    const head = car2(list);
    const newHead = f(head);
    const tail = cdr2(list);
    return new List2(newHead, map2(tail, f));
}
// console.log(map2(new List2(1, new List2(2, List2.nil)), (i) => i + 1));

function eval2(list: List2): any {
    if (list === List2.nil) {
        return;
    }

    const head = car2(list);
    if (head as Symbol2) {
        const symbol = head as Symbol2;
        // look up its value
        const f = symbolTable[symbol.name];
        // apply it to the other elements in the list
        // If the arguments are also lists, rather than atoms, then evaluate the arguments first before evaluating the parent expression.
        const otherElements = cdr2(list);
        const evaluatedElements = map2(otherElements, (element) => {
            if (element instanceof List2) {
                return eval2(element);
            } else {
                return element
            }
        });
        return f(evaluatedElements);
    } else {
        throw new Error(`Expected symbol, got ${head}`)
    }
}

console.log(eval2(new List2(new Symbol2("+"), new List2(1, new List2(2, List2.nil)))))