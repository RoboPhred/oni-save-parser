"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../../../parser");
const utils_1 = require("../../../utils");
const parser_2 = require("./known-behaviors/storage/parser");
const EXTRA_DATA_PARSERS = {
    Storage: {
        parse: parser_2.parseStorageExtraData,
        unparse: parser_2.unparseStorageExtraData
    }
};
function* parseGameObjectBehavior(templateParser) {
    const name = yield parser_1.readKleiString();
    utils_1.validateDotNetIdentifierName(name);
    let extraData;
    let extraRaw;
    const dataLength = yield parser_1.readInt32();
    const preParsePosition = yield parser_1.getReaderPosition();
    const templateData = yield* templateParser.parseByTemplate(name);
    const extraDataParser = EXTRA_DATA_PARSERS[name];
    if (extraDataParser) {
        extraData = yield* extraDataParser.parse(templateParser);
    }
    const postParsePosition = yield parser_1.getReaderPosition();
    const dataRemaining = dataLength - (postParsePosition - preParsePosition);
    if (dataRemaining < 0) {
        throw new Error(`GameObjectBehavior "${name}" deserialized more type data than expected.`);
    }
    else if (dataRemaining > 0) {
        if (extraDataParser) {
            // If we had an extraData parser, then it should have parsed the rest of it.
            throw new Error(`GameObjectBehavior "${name}" extraData parser did not consume all extra data.`);
        }
        // No extraData parser, so this is probably extraData that we do not know how to handle.
        //  Store it so that it can be saved again.
        extraRaw = yield parser_1.readBytes(dataRemaining);
    }
    const behavior = {
        name,
        templateData,
        extraData,
        extraRaw
    };
    return behavior;
}
exports.parseGameObjectBehavior = parseGameObjectBehavior;
function* unparseGameObjectBehavior(behavior, templateUnparser) {
    const { name, templateData, extraData, extraRaw } = behavior;
    const extraDataParser = EXTRA_DATA_PARSERS[name];
    yield parser_1.writeKleiString(name);
    const lengthToken = yield parser_1.writeDataLengthBegin();
    yield* templateUnparser.unparseByTemplate(name, templateData);
    if (extraData) {
        if (!extraDataParser) {
            throw new Error(`GameObjectBehavior "${name}" has extraData set, but no extraData parser exists for this behavior.`);
        }
        yield* extraDataParser.unparse(extraData, templateUnparser);
    }
    if (extraRaw) {
        yield parser_1.writeBytes(extraRaw);
    }
    yield parser_1.writeDataLengthEnd(lengthToken);
}
exports.unparseGameObjectBehavior = unparseGameObjectBehavior;
//# sourceMappingURL=parser.js.map