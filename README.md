# A short programming exercise

## Build a Lisp interpreter

Greenspun’s tenth rule of programming states: 

> Any sufficiently complicated C or Fortran program contains an ad hoc, informally-specified, bug-ridden, slow implementation of half of Common Lisp.

While we don’t have any C or Fortran in our codebase yet, we want to make sure we’re ahead of the curve. Because we're masochistic, we also want to make sure there's no possibility of interop with any existing Lisp programs: we want you to make this a postfix Lisp instead of a traditional prefix Lisp.

Write a basic postfix Lisp interpreter that implements a subset of the Lisp special forms. ([here’s a good basic description of a basic Lisp](http://pythonpracticeprojects.com/lisp.html))

## My process

I figured this would be a fun way to write my first [Typescript](http://typescriptlang.org) project from scratch and use one of my favorite techniques, [parser combinators](https://en.wikipedia.org/wiki/Parser_combinator).

After a little poking around, I found [Parsimmon](https://github.com/jneen/parsimmon), which meant there was already a nice, Typescript-friendly parser combinators library available. Great!

Writing combinators is normally easy, so the important part is building up the abstract syntax tree objects that the combinators will create when parsing.

Unfortunately there I got bogged down. I was struggling with making type-safe relationships between everything and not really seen how things could actually be evaluated. I was taking a pretty object-orientied approach with an `eval()` method on every class, which of course is a massive code smell considering how notorious Lisp is for being functional.

I decided to step back and started skimming the [original Lisp paper](http://www-formal.stanford.edu/jmc/recursive/recursive.html) and trying to implement what I read. This gave me a recursive `List` implementation and evaluation steps that were generally looking much better. You can see the work in [`index.ts`](src/index.ts). Basic evaluation of the AST is working, but I had issues with `cons`, `car`, and `cdr`.

In the interest of time and actually implementing a postfix Lisp, I decided to translate Norvig's [Lispy](http://norvig.com/lispy.html) from Python to Typescript. Implementing his simpler Lispy Calculator form was relatively straight-forward, with a fair amount of the time simply spent translating how Python references arrays and their indices. I implemented the bare minimum environment to get his examples to evaluate correctly.

Once I got the Lispy Calculator form working, it didn't take long at all to switch to postfix evaluation. I did it by reading from the end of lists and reversing them as appropriate, but from looking atthe [reverse Polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation) Wikipedia article right now, I might have benefited from using a [Stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)).
