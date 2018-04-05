# oni-save-parser

Parses save data from Oxygen Not Included.  Supports NodeJS and (eventually) Web.

Currently under development

## Compatibility

This project makes use of some ES6 constructs such as Symbols, and a few nodejs libraries.
The most intrusive external dependency is on node's builtin zlib module.  This should be shimmed on the web
using something like [browserify-zlib](https://www.npmjs.com/package/browserify-zlib).

A webpack build will be produced and included later on.

## Current Progress

Parser currently performs the following:
- Loads and understands the file header
- Loads and understands the serializer templates
- Checks for and handles compressed game data.
- Successfully loads the root object by looking up their templates.

Still to do:
- Expose the game state data to the outside world.
- Load and expose the more interesting bits, such as game object data.
- Handle the special-case manual-parse data used by a few of the game object types.
- Save logic.  All of it.
- Provide, and automatically select from, different container module sets based on the save file version.
    Currently, this is not needed as the only breaking change has been TU's compression, and that is
    accounted for in the header parser.
- Webpack build.

Also, adjust some of the class names to closer fit what they are called in the ONI assembly.

## Design

This library makes use of dependency injection.  Mostly to provide an easy way to swap out save file
components as new versions make breaking changes, but really because I wanted to test my IoC library.
Objects dealing with save data are scoped under the root OniSaveData for the load, allowing
easy access to things like the logger or type template deserializer wherever they may be needed.

## Future Plans

I intend to eventually make an in-browser save editor that works on the files locally.  Maybe.  If I get to it.