# Object Validator

<a href="https://deepscan.io/dashboard#view=project&tid=15317&pid=19329&bid=498727"><img src="https://deepscan.io/api/teams/15317/projects/19329/branches/498727/badge/grade.svg" alt="DeepScan grade"></a>
<img alt="Github license badge" src="https://img.shields.io/github/license/Amatsagu/Object_Validator" />
<img alt="Maintenance badge" src="https://img.shields.io/maintenance/yes/2024" />

> Super lean, simple **object** validation with TypeScript support.

### Usage
#### For Deno (TS support, 6KB)
```ts
import { Schema, validate } from "https://deno.land/x/object_validator@1.0.0/mod.ts";
```
#### For browsers (lack of TS support, 3.7KB)
```js
<script type="module" src="https://deno.land/x/object_validator@1.0.0/bundle.js"></script>
```

`Schema` is a TypeScript interface that will help you build proper schema. **Make sure your schema is correct because it's not being checked.** `Validate` is the function that accepts the schema model and object you want to test. It will throw detailed error message when finds that object doesn't match schema rules.

### Examples
<img alt="Example code snippet" src="https://raw.githubusercontent.com/Amatsagu/Object_Validator/master/.github/example%20usage%202.png" />
<img alt="Example code snippet" src="https://raw.githubusercontent.com/Amatsagu/Object_Validator/master/.github/example%20usage.png" />

### Documentation
#### Schema is built from rules. To create rule you need to specify variable "type" and then you can specify requirements.
For example: `{ type: "float", max: 100, finite: false }`

> There's also `required` key that can be added to any type. It enforces whenever param is required or not. For example:<br/>
> `{ type: "float", max: 100, finite: false, required: true }`

#### Supported variable types:
`STRING`, `INT`, `FLOAT`, `BOOLEAN`, `OBJECT`, `ARRAY`, `FUNCTION` & `UNKNOWN`
> **"UNKNOWN"** type means literally no type. It can be used for example to create a tuples *(arrays without strong typing)*.

#### Available rules to enforce:
|          **OPTION**          |                                                                             **DESCRIPTION**                                                                             |         **VARIABLE TYPE(S)**        |
|:----------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------:|
|          max *(int)*         |                                Checks max size/length of value.<br>Can also be used on arrays to enforce max amount of elements for list.                               |  `STRING`, `INT`, `FLOAT`, `ARRAY`  |
|          min *(int)*         |                                Checks max size/length of value.<br>Can also be used on arrays to enforce max amount of elements for list.                               |  `STRING`, `INT`, `FLOAT`, `ARRAY`  |
|      filter *(function)*     | Uses provided filter function to validate value.<br>For example: `(value) => value.toUpperCase() === value`<br><br>**Filter function needs to return `BOOLEAN` value!** | `STRING`, `INT`, `FLOAT`, `UNKNOWN` |
|         match (regex)        |                                                                 Tests string value with provided RegExp.                                                                |               `STRING`              |
|      finite *(boolean)*      |                                                                  Checks whether value is finite or not.                                                                 |            `INT`, `FLOAT`           |
| elementType ***(Variable)*** |                                       A rule for items inside an array. This can potentially be another array or object (nested).                                       |               `ARRAY`               |
|    records ***(Schema)***    |                                                             A record used to define another, nested object.                                                             |               `OBJECT`              |

⚠️ It's highly recommended to check higher examples to understand how rules for arrays and objects are built. Those 2 values can be **nested** potentially infinite number of times.

⚙️ **Object Validator** will print detailed error about which element failed check *(even if it's nested)*. Remember to add proper error handling.

♻️ Higher list most likely won't change because thanks to `filter` you can already validate anything. It's very easy to make custom rules for emails *(look example)*, passwords or tokens.
### License
This project is licensed under the unlicense. You're free to do whatever you want with it. Attribution is appreciated but not required - these are simple utilities that I think the language should already provide.