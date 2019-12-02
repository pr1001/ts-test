import { tokenize, parse, evaluate } from "../src/Lispy";

test('tokenize', () => {
    const postfixProgram = "(((r r *) pi *) (10 r define) begin)"
    const expectedTokens = ['(', '(', '(', 'r', 'r', '*', ')', 'pi', '*', ')', '(', '10', 'r', 'define', ')', 'begin' , ')'];
    expect(tokenize(postfixProgram)).toEqual(expectedTokens)
});

test('parse', () => {
    const postfixProgram = "(((r r *) pi *) (10 r define) begin)"
    const expectedTokens = [[['r', 'r', '*'], 'pi', '*'], [10, 'r', 'define'], 'begin'];
    expect(parse(postfixProgram)).toEqual(expectedTokens);
});

test('evaluate', () => {
    const postfixProgram = "(((r r *) pi *) (10 r define) begin)"
    const expectedResult = Math.PI * 10 * 10;
    expect(evaluate(parse(postfixProgram))).toEqual(expectedResult);
})