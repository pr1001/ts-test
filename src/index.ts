import { logicalExpression } from "@babel/types";
import { type } from "os";

/*
 * While we don’t have any C or Fortran in our codebase yet, we want to make sure we’re ahead of the curve. Because we're masochistic, we also want to make sure there's no possibility of interop with any existing Lisp programs: we want you to make this a postfix Lisp instead of a traditional prefix Lisp. Write a basic postfix Lisp interpreter that implements a subset of the Lisp special forms. (here’s a good basic description of a basic Lisp: http://pythonpracticeprojects.com/lisp.html)
 */

 // prefix vs postfix & stack evaluation: http://www.chrisbaldassano.com/class/LISP.pdf

// Every Lisp expression evalutes to value.
type Value = any;
interface Expression {
    eval(args: Expression[]): Value;
}

type Expression2 = Atom | List;

// A Lisp expression is either an atom or a list. Atoms are strings of characters, basically anything except a parentheses.
class Atom implements Expression {
    readonly value: Value;
    constructor(value: Value) {
        this.value = value;
    }
    eval(args: Expression[] = []) {
        if (args.length > 0) {
            throw new Error("No args expected for an Atom")
        }
        return this.value;
    }
}

// Let's take a look at these atom examples. 1 is just a number, similar to an int in C or Python. However, +, john and burger are a bit unusual. In Lisp, these are called symbols. 
// The concept of a symbol is implicit in other languages, Lisp just exposes the concept explicitly. In other languages, symbols are used as variable names. To execute your programs, a compiler/interpreter will tokenize your source code and then identify these symbols. In Lisp, symbols are also used to as identifiers for variables, however you get to muck with them directly. Symbols are just entities that you can bind values to.
let symbolTable: { [index: string]: Symbol } = {};
class Symbol extends Atom {
    readonly name: string;
    constructor(name: string, value: Value) {
        super(value);
        this.name = name;
    }
}

// A list is a number of expressions enclosed within parentheses. Notice how I didn't say a list of atoms.
class List implements Expression {
    // TODO: replace this with head: Expression and tail: List?
    readonly expressions: Expression[];

    constructor(expressions: Expression[]) {
        this.expressions = expressions;
        if (expressions.length === 0) {
            return List.nil;
        }
    }

    private static prefixBased = true;

    private getApplicable(args: Expression[]): Applicable {
        const first = List.prefixBased ? args[0] : args.slice(-1)[0];
        if (first === undefined) {
            throw new Error(`${first} is not callable`);
        }
        if (first instanceof Applicable) {
            return first as Applicable;
        }
        throw new Error(`${first} is not callable`);
    }

    private getArgs(args: Expression[]): Expression[] {
        return List.prefixBased ? args.slice(1) : args.slice(0, -1);
    }

    eval(args: Expression[] = []) {
        // The rules for evaluating a normal lisp expression or form is easy.
        // Take ~first~ (LAST!) element in a list
        const applicable = this.getApplicable(this.expressions);
        console.log('applicable:', applicable);
        // look up its value
        // and apply it to the other elements in the list.
        const newArgs = this.getArgs(args);
        console.log('newArgs:', newArgs);
        return applicable.eval(newArgs).value;
    }

    private static makeNil = () => {
        const l = new List([]);
        l.eval = (args: Expression[]) => { return [] };
        return l;
    }
    // '() which is our empty list, sometimes called nil
    static nil = List.makeNil();
}

// Functions
class Applicable implements Expression {
    readonly func: (args: Expression[]) => Atom;
    constructor(func: (args: Expression[]) => Atom) {
        this.func = func;
    }
    eval(args: Expression[]) {
        return this.func(args);
    }
}

// Normal Forms
const add2 = new Applicable(add);
function add(args: Expression[]): Atom {
    if (args.length < 2) {
        throw new Error(`Expected at least 2 arguments, got ${args.length}`)
    }
    // TODO: reduceRight instead?
    const a = args.reduce((accumulator, expression) => new Atom(accumulator.eval([]) + expression.eval([])));
    return a as Atom;
}
function subtract(args: Expression[]): Atom {
    if (args.length < 2) {
        throw new Error(`Expected at least 2 arguments, got ${args.length}`)
    }
    // TODO: reduceRight instead?
    const a = args.reduce((accumulator, expression) => new Atom(accumulator.eval([]) - expression.eval([])));
    return a as Atom;
}
function multiply(args: Expression[]): Atom {
    if (args.length !== 2) {
        throw new Error(`Expected 2 arguments, got ${args.length}`)
    }
    const [left, right] = args;
    return new Atom(left.eval([]) * right.eval([]))
}
function divide(args: Expression[]): Atom {
    if (args.length !== 2) {
        throw new Error(`Expected 2 arguments, got ${args.length}`)
    }
    const [left, right] = args;
    return new Atom(left.eval([]) / right.eval([]))
}

// Remember how I said Lisp only has a handful of primitives? Here are ALL the primitives required for a fully functioning Lisp.:
// eq?
// eq? just tests for equality. It returns True if the two arguments are the same, otherwise false.
// quote
// Quote says to Lisp, "don't evaluate what I'm about to pass in, just give me back the symbols exactly as I typed them".
// cons
// Cons is like a piece of velcro, it sticks two things together.
// car
// Car let's you get back the first piece
// cdr
// cdr lets you get the second piece.

// atom?
// atom? will tell you whether or not the argument is an atom.
// function isAtom(item: Expression): Boolean {
//     return (item as Atom) ? true : false;
// }

// define binds values to symbols.
function define(name: string, value: Value) {
    const symbol = new Symbol(name, value);
    symbolTable[name] = symbol;
}

// lambda creates a function. It takes in a list of parameters and a body and spits out a function that takes in the parameters and executes the body with the parameters substituted with the passed in values.
// function lambda(argumentNames, expression) {
//
// }

// cond
// cond, the generalized if statement. It is just a bunch of if/else blocks that executes the first matching condition and returns the associated value. 

function sillyLisp(source: string) {

}

export { sillyLisp, Atom, Expression, List, Symbol, add, subtract, multiply, divide };