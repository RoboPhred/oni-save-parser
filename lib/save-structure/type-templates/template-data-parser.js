"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unparseByTemplate = exports.parseByTemplate = void 0;
const type_data_parser_1 = require("./type-data-parser");
function* parseByTemplate(templates, templateName) {
    const template = templates.find(x => x.name === templateName);
    if (!template) {
        throw new Error(`Template "${templateName}" not found.`);
    }
    const result = {};
    for (let field of template.fields) {
        const { name, type } = field;
        const value = yield* type_data_parser_1.parseByType(type, templates);
        result[name] = value;
    }
    for (let prop of template.properties) {
        const { name, type } = prop;
        const value = yield* type_data_parser_1.parseByType(type, templates);
        result[name] = value;
    }
    return result;
}
exports.parseByTemplate = parseByTemplate;
function* unparseByTemplate(templates, templateName, obj) {
    const template = templates.find(x => x.name === templateName);
    if (!template) {
        throw new Error(`Template "${templateName}" not found.`);
    }
    for (let field of template.fields) {
        const { name, type } = field;
        const value = obj[name];
        yield* type_data_parser_1.unparseByType(value, type, templates);
    }
    for (let prop of template.properties) {
        const { name, type } = prop;
        const value = obj[name];
        yield* type_data_parser_1.unparseByType(value, type, templates);
    }
}
exports.unparseByTemplate = unparseByTemplate;
//# sourceMappingURL=template-data-parser.js.map