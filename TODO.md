
# TODO

- Support parsing GameObjectBehaviors that implement ISaveLoadableDetails.
- assembly-types could take on some more parsing roles.  Possibly auto-generate classes from them.
- Types should not implement Parseable in their native form.  Should be aliased so .parse() isn't exposed
    when the consumer is opting to perform a parse operation itself.
- Make Parseable more robust.
    - Base class that takes an array of sub-objects to parse.
    - Expose props as getters, and throw if accessed before they are parsed.