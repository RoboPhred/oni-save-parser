
# TODO
- Make a sane type parser to replace the _serializeType / _deserializeType.
Could be done far better without giant switch statements.  Object map of types to serialize/deserialize func.
- Support parsing GameObjectBehaviors that implement ISaveLoadableDetails.
- assembly-types could take on some more parsing roles.  Possibly auto-generate classes from them.
- Types should not implement Parseable in their native form.  Should be aliased so .parse() isn't exposed
    when the consumer is opting to perform a parse operation itself.
- Expose props as getters, and throw if accessed before they are parsed.
- Make sure I am using ArrayBuffer / DataView / TypedArray correctly.  Not sure when its making copies vs returning views.
Might be a few places I use .buffer which might jump out of the offset/length restriction.
- Check TypeEncoders - do their encode/decode methods really need only DataViews?