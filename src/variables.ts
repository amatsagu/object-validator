export type Variable = (StringVariable | IntVariable | FloatVariable | BooleanVariable | FunctionVariable | UnknownVariable | ObjectVariable | ArrayVariable) & { required?: boolean; };
export type Schema = Record<string, Variable>;
export type Filter<T> = (item: T) => boolean;

export interface StringVariable {
    type: "string";
    max?: number;
    min?: number;
    match?: RegExp;
    filter?: Filter<string>;
}

export interface IntVariable {
    type: "int";
    max?: number;
    min?: number;
    finite?: boolean;
    filter?: Filter<number>;
}

export interface FloatVariable {
    type: "float";
    max?: number;
    min?: number;
    finite?: boolean
    filter?: Filter<number>;
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

export interface FunctionVariable {
    type: "function";
}

export interface UnknownVariable {
    type: "unknown";
    filter?: Filter<unknown>;
}