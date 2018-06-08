
# TODO

## Medium Priority
- Support parsing GameObjectBehaviors that implement ISaveLoadableDetails.
- DiagnosticDataWriter(...): take an ArrayBuffer and ensure each write operation is equal to the existing ArrayBuffer.  For testing.

## Refactor
- Simplify type-serializer.
    Refactor is too verbose.  Don't really have a use for typed / discriminated explicit TypeDefinition interfaces outside of their serialization info.
