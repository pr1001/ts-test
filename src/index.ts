/*
 * While we don’t have any C or Fortran in our codebase yet, we want to make sure we’re ahead of the curve. Because we're masochistic, we also want to make sure there's no possibility of interop with any existing Lisp programs: we want you to make this a postfix Lisp instead of a traditional prefix Lisp. Write a basic postfix Lisp interpreter that implements a subset of the Lisp special forms. (here’s a good basic description of a basic Lisp: http://pythonpracticeprojects.com/lisp.html)
 */

 // prefix vs postfix & stack evaluation: http://www.chrisbaldassano.com/class/LISP.pdf

// Every Lisp expression evalutes to value.
type Value = any;
interface Expression {
    eval(): Value;
}

// A Lisp expression is either an atom or a list. Atoms are strings of characters, basically anything except a parentheses.
class Atom implements Expression {
    readonly value: Value;
    constructor(value: Value) {
        this.value = value;
    }
    eval() {
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
    readonly expressions: Expression[];

    constructor(expressions: Expression[]) {
        this.expressions = expressions;
        if (expressions.length === 0) {
            return List.nil;
        }
    }

    eval() {
        // The rules for evaluating a normal lisp expression or form is easy. Take ~first~ (LAST!) element in a list, look up its value and apply it to the other elements in the list.
        throw new Error("Method not implemented.");
    }

    private static makeNil = () => {
        const l = new List([]);
        l.eval = () => { return [] };
        return l;
    }
    // '() which is our empty list, sometimes called nil
    static nil = List.makeNil();
}

// Normal Forms
function add(left: Expression, right: Expression): Atom {
    return new Atom(left.eval() + right.eval())
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
// define
// define binds values to symbols.
// lambda
// lambda creates a function. It takes in a list of parameters and a body and spits out a function that takes in the parameters and executes the body with the parameters substituted with the passed in values.
// cond
// cond, the generalized if statement. It is just a bunch of if/else blocks that executes the first matching condition and returns the associated value. 

function sillyLisp(source: string) {

}

export { sillyLisp, Atom, Expression, List, Symbol, add };