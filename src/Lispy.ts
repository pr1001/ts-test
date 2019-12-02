import { isString } from "util"

// implementation based on http://norvig.com/lispy.html

type SSymbol = string            // A Scheme Symbol is implemented as a string
type SNumber = number            // A Scheme Number is implemented as a number
type SAtom   = SSymbol | SNumber // A Scheme Atom is a Symbol or Number
type SList   = any[]             // A Scheme List is implemented as a Python list
type SExp    = SAtom | SList     // A Scheme expression is an Atom or List
type SEnv    = { [key: string]: any } // A Scheme environment (defined below) is a mapping of {variable: value}

export function tokenize(chars: string): string[] {
    // "Convert a string of characters into a list of tokens."
    const padded = chars.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ');
    return padded.split(/\s+/).filter(s => s.length > 0);
}

export function parse(program: string): SExp {
    // "Read a Scheme expression from a string."
    return read_from_tokens(tokenize(program))
}

export function read_from_tokens(tokens: SList): SExp {
    // "Read an expression from a sequence of tokens."
    if (tokens.length === 0) {
        throw new SyntaxError('unexpected EOF');
    }
    const token = tokens.shift();
    if (token === '(') {
        let L: any[] = [];
        while (tokens[0] !== ')') {
            L.push(read_from_tokens(tokens));
        }
        tokens.shift();
        return L;
    } else if (token === ')') {
        throw new SyntaxError('unexpected )');
    } else {
        return atom(token)
    }
}

export function atom(token: string): SAtom {
    // "Numbers become numbers; every other token is a symbol."
    let n = parseInt(token);
    if (isNaN(n)) {
        n = parseFloat(token);
        if (isNaN(n)) {
            return token;
        }
    }
    return n;
}

export function evaluate(x: SExp, env: SEnv = global_env): SExp | undefined {
    // "Evaluate an expression in an environment."
    // variable reference
    if (typeof x === 'string') {
        return env[x as SSymbol];
    }
    // constant number
    else if (typeof x === 'number') {
        return x
    }
    // conditional
    else if ((x as SList)[0] == 'if') {
        const [_, test, conseq, alt] = (x as SList);
        const exp = evaluate(test, env) ? conseq : alt;
        return evaluate(exp, env)
    }
    // definition
    else if ((x as SList)[0] == 'define') {
        const [_, symbol, exp] = (x as SList);
        env[symbol] = evaluate(exp, env);
    }
    // procedure call
    else {
        const l = (x as SList);
        const proc = evaluate(l[0], env) as unknown as Function;
        const args = l.slice(1).map(arg => evaluate(arg, env));
        return proc(...args);
    }
}

function standard_env(): SEnv {
    // "An environment with some Scheme standard procedures."
    let env: SEnv = {}
    // env.update(vars(math)) # sin, cos, sqrt, pi, ...
    env['pi'] = Math.PI;
    env['+'] = (...args: SNumber[]) => {
        return args.reduce((accumulator, element) => accumulator + element)
    };
    env['-'] = (...args: SNumber[]) => {
        return args.reduce((accumulator, element) => accumulator - element)
    };
    env['*'] = (...args: SNumber[]) => {
        return args.reduce((accumulator, element) => accumulator * element)
    }
    env['/'] = (...args: SNumber[]) => {
        return args.reduce((accumulator, element) => accumulator / element)
    }
    env['begin'] = (...args: SExp[]) => {
        return args.slice(-1)[0];
    }
    // env.update({
    //     '+':op.add, '-':op.sub, '*':op.mul, '/':op.truediv, 
    //     '>':op.gt, '<':op.lt, '>=':op.ge, '<=':op.le, '=':op.eq, 
    //     'abs':     abs,
    //     'append':  op.add,  
    //     'apply':   lambda proc, args: proc(*args),
    //     'begin':   lambda *x: x[-1],
    //     'car':     lambda x: x[0],
    //     'cdr':     lambda x: x[1:], 
    //     'cons':    lambda x,y: [x] + y,
    //     'eq?':     op.is_, 
    //     'expt':    pow,
    //     'equal?':  op.eq, 
    //     'length':  len, 
    //     'list':    lambda *x: List(x), 
    //     'list?':   lambda x: isinstance(x, List), 
    //     'map':     map,
    //     'max':     max,
    //     'min':     min,
    //     'not':     op.not_,
    //     'null?':   lambda x: x == [], 
    //     'number?': lambda x: isinstance(x, Number),  
	// 	'print':   print,
    //     'procedure?': callable,
    //     'round':   round,
    //     'symbol?': lambda x: isinstance(x, Symbol),
    // })
    return env
}

let global_env = standard_env()