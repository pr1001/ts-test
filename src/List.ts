import { Expression } from "./index";

export class List {
    readonly head: Expression;
    readonly tail: List;

    constructor(head: Expression, tail: List) {
        this.head = head;
        this.tail = tail;
    }

    private static makeNil = () => {
        const l = new List(List.nil, List.nil);
        return l;
    };

    // '() which is our empty list, sometimes called nil
    static nil: List = List.makeNil();
}
