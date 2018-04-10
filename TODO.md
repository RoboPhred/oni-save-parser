
# TODO

## Medium Priority
- Support parsing GameObjectBehaviors that implement ISaveLoadableDetails.
- Allow passing a logger object
- Show parse progress: ```const progress = ProgressLogger.start("Game Objects", {max: 250}); progress.set(4); progress.done();```
- DiagnosticDataWriter(...): take an ArrayBuffer and ensure each write operation is equal to the existing ArrayBuffer.  For testing.

## Refactor
- Move all service implementations into a flat folder of versions/7_3.
    These are all implementations for this specific version.  Move them all into there and bind them (auto-discover with webpack require.context).
- Once save component services are all under versions, try to simplify the save interface structure.  Ideally, same interfaces used in toJSON()
- Make DataReader/DataWriter created from IoC factory function for ```DiagnosticDataWriter```.
    - Somehow get compression / child writers more structured, to support ```DiagnosticDataWriter```.  Support "when in scope" bindings in microinject?
- Expose props as getters, and throw if accessed before they are parsed.
 