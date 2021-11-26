export type Variable = (StringVariable | IntVariable | FloatVariable | BooleanVariable | FunctionVariable | ObjectVariable | ArrayVariable | TupleVariable) & { required?: boolean; };
export type Schema = Record<string, Variable>;

export interface StringVariable {
    type: "string";
    max?: number;
    min?: number;
    match?: RegExp;
}

export interface IntVariable {
    type: "int";
    max?: number;
    min?: number;
    finite?: boolean;
}

export interface FloatVariable {
    type: "float";
    max?: number;
    min?: number;
    finite?: boolean
}

export interface BooleanVariable {
    type: "boolean";
}

export interface ObjectVariable {
    type: "object";
    records: Schema;
}

export interface ArrayVariable {
    type: "array";
    elementType: Variable;
    min?: number;
    max?: number;
}

export interface TupleVariable {
    type: "tuple";
    min?: number;
    max?: number;
}

export interface FunctionVariable {
    type: "function";
}