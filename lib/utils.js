"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedKeys = exports.typed = exports.validateDotNetIdentifierName = void 0;
// Serialization seems to use . for namespaces and + for inner classes.
//  We can also see explicit types, such as
//  "SerializedList`1[[Message, Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null]]"
// "WorkChore`1+StatesInstance[[Clinic, Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null]]"
// "<SomeType>k__BackingField"
const REGEX_IDENTIFIER = /^(\<[a-zA-Z0-9\_]+\>)?[a-zA-Z0-9\_\+\.]+(\`\d+)?(\+[a-zA-Z0-9\_\+\.]+)?(\[\[.+\]\])?$/;
// Any non-printable character shouldn't be in an identifier name, regardless of CLR standards.
// This doesn't check for formats, start-with-number, or symbols.  Giving up on vetting those,
//  lots of mods doing weird things.
const REGEX_IDENTIFIER_INVAL_CHARS = /[\x00-\x1F]/;
/**
 * Check if we parsed a meaningful .NET identifier name.
 * If the name looks valid, the name is returned.
 * If the name appears to not be valid, and error is thrown.
 * @param name The name to validate.
 */
function validateDotNetIdentifierName(name) {
    if (!name || name.length === 0) {
        throw new Error("A .NET identifier name must not be null or zero length.");
    }
    if (name.length >= 512) {
        // We can reasonably assume anything over 512 characters is a bad parse and not a real template.
        //  Specifically, anything at or over 512 makes a "CS0645: Identifier too long." error in Microsoft's C# compiler.
        //  The .Net standard itself does not specify any limit.
        // We want to bail out in these cases without trying to include the template name in the error, as it is likely to be
        //  enormous.
        throw new Error("A .NET identifier name exceeded 511 characters.  This most likely indicates a parser error.");
    }
    // Since we can no longer check against the regex, we need another way to catch
    //  rogue strings due to parser errors.
    // Null check is the best I can think of right now.
    if (REGEX_IDENTIFIER_INVAL_CHARS.test(name)) {
        throw new Error("A .NET identifier name contains non-printable characters.  This most likely indicates a parser error.");
    }
    // Disabled as mods are using non-conformant property names.
    //  This probably means a different ruleset applied to property names,
    //  or the properties are being written in IL rather than through the C# compiler.
    //validateCLRConformantVariableName();
    return name;
}
exports.validateDotNetIdentifierName = validateDotNetIdentifierName;
/**
 * Validate a name against the apparent rules for CLR variable names.
 * 'Apparant', as many mods are using names that do not conform, including
 * dashes, expanded unicode characters, and other such nonsense.
 */
function validateCLRConformantVariableName(name) {
    if (!REGEX_IDENTIFIER.test(name)) {
        throw new Error(`Identifier "${name}" has invalid characters.  This most likely indicates a parser error or change in serializer standards.`);
    }
}
function typed(s) {
    return s;
}
exports.typed = typed;
function typedKeys(x) {
    return Object.keys(x);
}
exports.typedKeys = typedKeys;
//# sourceMappingURL=utils.js.map