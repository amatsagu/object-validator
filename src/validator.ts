import { Schema, ArrayVariable, Variable } from "./variables.ts";

export function validate(schema: Schema, input: Record<string, unknown>, customName?: string) {
    if (typeof schema !== "object") throw new TypeError("Schema is not an object!");
    if (typeof input !== "object") throw new TypeError("Tested  is not an object!");

    const path = { name: customName ?? "Item", key: "" };

    for (const key in schema) {
        path.key = key;
        const checker = schema[key];
        const item = input[key];

        if (item !== undefined) scan(checker, item, path);
        else if (checker.required === true) throw new TypeError(`${path.name}.${path.key} is required.`);
    }
}

function scan(checker: Variable, item: unknown, path: { name: string, key: string }) {
    console.log(`[${path.name}.${path.key}] Scanning: ${item} with `, checker);

    switch(checker.type) {
        case "string": {
            if (typeof item !== "string") throw new TypeError(`${path.name}.${path.key} needs to be type of string.`);
            if (checker.min !== undefined && checker.min > item.length) throw new TypeError(`${path.name}.${path.key} needs to be at least ${checker.min} characters.`);
            if (checker.max !== undefined && checker.max < item.length) throw new TypeError(`${path.name}.${path.key} exceeds max length limit by ${item.length - checker.max} characters.`);
            if (checker.match instanceof RegExp && checker.match.test(item) === false) throw new TypeError(`${path.name}.${path.key} doesn't met regex (${String(checker.match)}) requirements.`);
            break;
        }
        case "int":
        case "float": {
            if (typeof item !== "number") throw new TypeError(`${path.name}.${path.key} needs to be type of ${checker.type}.`);
            if (checker.type === "int" && (item | 0) !== item) throw new TypeError(`${path.name}.${path.key} needs to be type of int.`);
            if (checker.min !== undefined && checker.min > item) throw new TypeError(`${path.name}.${path.key} cannot be greater than ${checker.min}.`);
            if (checker.max !== undefined && checker.max < item) throw new TypeError(`${path.name}.${path.key} cannot be smaller than ${checker.max}.`);
            if (checker.finite === true && Number.isFinite(item) === false) throw new TypeError(`${path.name}.${path.key} needs to be finite.`);
            break;
        }
        case "boolean":
        case "function": {
            // deno-lint-ignore valid-typeof
            if (typeof item !== checker.type) throw new TypeError(`${path.name}.${path.key} needs to be type of ${checker.type}.`);
            break;
        }
        case "array": {
            scanArray(checker, item as unknown[], path);
            break;
        }
    }

    console.log(`[${path.name}.${path.key}] Success!`);
}

function scanArray(checker: ArrayVariable, item: unknown[], path: { name: string, key: string }) {
    if (Array.isArray(item) === false) throw new TypeError(`${path.name}.${path.key} needs to be type of array.`);
    if (checker.min !== undefined && checker.min > item.length) throw new TypeError(`${path.name}.${path.key} needs to contain at least ${checker.min} element(s).`);
    if (checker.max !== undefined && checker.max < item.length) throw new TypeError(`${path.name}.${path.key} can't contain more than ${checker.min} element(s).`);

    for (let i = 0; i < item.length; i++) {
        path.key = `${path.key}[${i}]`;
        scan(checker.elementType, item[i], path);
    }
}