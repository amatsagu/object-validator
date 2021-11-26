import { validate } from "./src/validator.ts";
import { Schema } from "./src/variables.ts";

const blueprint: Schema = {
    counter: {
        type: "string",
        required: true
    },
    values: {
        type: "array",
        elementType: {
            type: "int",
            finite: true,
            min: 10,
            max: 25
        },
        max: 3,
        required: true
    }
};

const obj = { counter: "Scoreboard", values: [12, 15, 24] };

validate(blueprint, obj);