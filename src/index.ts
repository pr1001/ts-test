import { List } from "./List";
import { car, cdr } from "./SpecialForms";
import { add, subtract, multiply, divide } from "./NormalForms";
import { Symbol } from "./Symbol";

/*
 * While we don’t have any C or Fortran in our codebase yet, we want to make sure we’re ahead of the curve. Because we're masochistic, we also want to make sure there's no possibility of interop with any existing Lisp programs: we want you to make this a postfix Lisp instead of a traditional prefix Lisp. Write a basic postfix Lisp interpreter that implements a subset of the Lisp special forms. (here’s a good basic description of a basic Lisp: http://pythonpracticeprojects.com/lisp.html)
 */

// prefix vs postfix & stack evaluation: http://www.chrisbaldassano.com/class/LISP.pdf

export type Expression =  Atom | List;
export type Atom = number | Symbol;

// The rules for evaluating a normal lisp expression or form is easy. Take first element in a list, look up it's value and apply it to the other elements in the list. For example:
// (+ 1 2) => 3
// Remember our discussion about symbols earlier? + is just a symbol which is by default bound to the function we know as addition. So when we enter the form (+ 1 2) into the interpreter, Lisp looks up the function associated with +, which is addition, and then applies it to the arguments 1 and 2.

let symbolTable: { [index: string]: any } = {};

symbolTable["+"] = add;
symbolTable["-"] = subtract;
symbolTable["*"] = multiply;
symbolTable["/"] = divide;

function map(list: List, f: (i: Expression) => Expression): List {
    if (list === List.nil) {
        return list;
    }
    const head = car(list);
    const newHead = f(head);
    const tail = cdr(list);
    return new List(newHead, map(tail, f));
}
// console.log(map2(new List2(1, new List2(2, List2.nil)), (i) => i + 1));

export function evaluate(expression: Expression): any {
    if (expression instanceof List) {
        return evaluateList(expression);
    } else if (expression instanceof Symbol) {
        return symbolTable[expression.name];
    } else {
        return expression
    }
}

function evaluateList(list: List): any {
    if (list === List.nil) {
        return;
    }

    const head = car(list);
    if (head as Symbol) {
        const symbol = head as Symbol;
        // look up its value
        const f = symbolTable[symbol.name];
        // apply it to the other elements in the list
        // If the arguments are also lists, rather than atoms, then evaluate the arguments first before evaluating the parent expression.
        const otherElements = cdr(list);
        const evaluatedElements = map(otherElements, evaluate);
        return f(evaluatedElements);
    } else {
        throw new Error(`Expected symbol, got ${head}`)
    }
}

export function sillyLisp(source: string) {

}