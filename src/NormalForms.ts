import { evaluate } from ".";

import { car, cdr } from "./SpecialForms";
import { List } from "./List";

export function add(list: List): number {
    function add(accumulator: number, list: List): number {
        if (list === List.nil) {
            return accumulator
        }
        return add(accumulator + evaluate(car(list)), cdr(list));
    }
    return add(0, list);
}

export function subtract(list: List): number {
    function subtract(accumulator: number, list: List): number {
        if (list === List.nil) {
            return accumulator
        }
        return subtract(accumulator - evaluate(car(list)), cdr(list));
    }
    const head = evaluate(car(list));
    const tail = cdr(list);
    return subtract(head, tail);
}

export function multiply(list: List): number {
    const left = evaluate(car(list));
    const right = evaluate(car(cdr(list)));
    return left * right;
}

export function divide(list: List): number {
    const left = evaluate(car(list));
    const right = evaluate(car(cdr(list)));
    return left / right;
}