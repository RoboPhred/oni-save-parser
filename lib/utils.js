"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Serialization seems to use . for namespaces and + for inner classes.
//  We can also see explicit types, such as
//  "SerializedList`1[[Message, Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null]]"
// "WorkChore`1+StatesInstance[[Clinic, Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null]]"
const REGEX_IDENTIFIER = /^[a-zA-Z0-9\_\+\.]+(\`\d+)?(\+[a-zA-Z0-9\_\+\.]+)?(\[\[.+\]\])?$/;
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
    if (!REGEX_IDENTIFIER.test(name)) {
        throw new Error(`Identifier "${name}" has invalid characters.  This most likely indicates a parser error or change in serializer standards.`);
    }
    return name;
}
exports.validateDotNetIdentifierName = validateDotNetIdentifierName;
function typed(s) {
    return s;
}
exports.typed = typed;
//# sourceMappingURL=utils.js.map