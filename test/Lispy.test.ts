import { tokenize, parse, evaluate } from "../src/Lispy";

test('tokenize', () => {
    const program = "(begin (define r 10) (* pi (* r r)))";
    const expectedTokens = ['(', 'begin', '(', 'define', 'r', '10', ')', '(', '*', 'pi', '(', '*', 'r', 'r', ')', ')', ')'];
    expect(tokenize(program)).toEqual(expectedTokens)
});

test('parse', () => {
    const program = "(begin (define r 10) (* pi (* r r)))"
    const expectedTokens = ['begin', ['define', 'r', 10], ['*', 'pi', ['*', 'r', 'r']]];
    expect(parse(program)).toEqual(expectedTokens);
});

test('evaluate', () => {
    const program = "(begin (define r 10) (* pi (* r r)))";
    const expectedResult = Math.PI * 10 * 10;
    expect(evaluate(parse(program))).toEqual(expectedResult);
})