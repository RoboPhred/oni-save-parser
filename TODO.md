
# TODO

## Major Rewrite
- Save data represented by a non-class (json-serializable) object.
    - Object properties to use flattened, normalized layout that does not try to follow the save data layout.
- Convert parser from representing its own data to working on the object ref.
- Parse header seperately from template and body, so version can be inspected and the correct parser versions configured.
- Dogfood versioning with 7.3 => 7.4 breaking change (semver, klei!): SerializationTypeInfo IS_VALUE_TYPE flag (64)

## Medium Priority
- Support parsing GameObjectBehaviors that implement ISaveLoadableDetails.
- DiagnosticDataWriter(...): take an ArrayBuffer and ensure each write operation is equal to the existing ArrayBuffer.  For testing.

## Refactor
- Simplify type-serializer.
    Refactor is too verbose.  Don't really have a use for typed / discriminated explicit TypeDefinition interfaces outside of their serialization info.
