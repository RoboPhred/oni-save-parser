"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unparseTemplates = exports.parseTemplates = void 0;
const parser_1 = require("../../parser");
const utils_1 = require("../../utils");
const type_info_parser_1 = require("./type-info-parser");
function* parseTemplates() {
    const templateCount = yield parser_1.readInt32();
    const templates = new Array(templateCount);
    for (let i = 0; i < templateCount; i++) {
        const template = yield* parseTemplate();
        templates[i] = template;
    }
    return templates;
}
exports.parseTemplates = parseTemplates;
function* unparseTemplates(templates) {
    yield parser_1.writeInt32(templates.length);
    for (const template of templates) {
        yield* unparseTemplate(template);
    }
}
exports.unparseTemplates = unparseTemplates;
function* parseTemplate() {
    const name = utils_1.validateDotNetIdentifierName(yield parser_1.readKleiString());
    const fieldCount = yield parser_1.readInt32();
    const propCount = yield parser_1.readInt32();
    const fields = new Array(fieldCount);
    for (let i = 0; i < fieldCount; i++) {
        const name = utils_1.validateDotNetIdentifierName(yield parser_1.readKleiString());
        const type = yield* type_info_parser_1.parseTypeInfo();
        fields[i] = {
            name,
            type
        };
    }
    const properties = new Array(propCount);
    for (let i = 0; i < propCount; i++) {
        const name = utils_1.validateDotNetIdentifierName(yield parser_1.readKleiString());
        const type = yield* type_info_parser_1.parseTypeInfo();
        properties[i] = {
            name,
            type
        };
    }
    const template = {
        name,
        fields,
        properties
    };
    return template;
}
function* unparseTemplate(template) {
    yield parser_1.writeKleiString(template.name);
    yield parser_1.writeInt32(template.fields.length);
    yield parser_1.writeInt32(template.properties.length);
    for (const field of template.fields) {
        const { name, type } = field;
        yield parser_1.writeKleiString(name);
        yield* type_info_parser_1.unparseTypeInfo(type);
    }
    for (const prop of template.properties) {
        const { name, type } = prop;
        yield parser_1.writeKleiString(name);
        yield* type_info_parser_1.unparseTypeInfo(type);
    }
}
//# sourceMappingURL=template-parser.js.map