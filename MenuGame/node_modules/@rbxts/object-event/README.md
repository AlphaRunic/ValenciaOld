<h1><p align="center">@rbxts/object-event</p></h1>

<p align="center"><a href="https://badge.fury.io/js/%40rbxts%2Fobject-event"><img src="https://badge.fury.io/js/%40rbxts%2Fobject-event.svg" alt="npm version" height="18"></a></p>

This NPM Package for Roblox-TS allows developers to implement custom Events for custom classes, without resorting to `BindableEvents`.

This should be particularly useful for projects that heavily rely on the OOP paradigm for libraries and other game components.

The module can be used both in pure Lua(u) scripts (via Rojo or any other way) or with Roblox-TS (includes compile-time type-checking).

## Example

```ts
/////// Module.ts ///////

import ObjectEvent from "@rbxts/object-event"

const event = new ObjectEvent<[number, String, Vector3]>()

event.Connect((id, msg, position) => {
    // We can safely assume that:
    // id is a number
    // msg is a string
    // position is a Vector3
})

export event


/////// Waiter.server.ts ///////

import {event} from "./Module"

event.Fire(10, "oof", new Vector3(1, 2, 3))  // all good
event.Fire(10, "oof")                        // will not compile!

export {}
```

To allow all kinds of arguments, of any number:

```ts
let event = new ObjectEvent<[...unknown]>()
```

## `ObjectEvent` API

- `Connect(f)` - `f` is a function that takes the arguments typed accordingly and returns `void`. Returns an `ObjectEventConnection`
- `Wait()` - yields the thread until the event is fired. Returns the values typed accordingly.
- `Fire(...)` - fires the event. Arguments must be the same number and type of the event.
- `Event` - an `RBXScriptSignal`-like interface supporting the `Connect()` and `Wait()`, just in case you prefer to use it as a BindableEvent.
- `SubscribedConnections` - an array of `ObjectEventConnection`s with all the connections currently listening to the event.

## `ObjectEventConnection` API

- `Disconnect()` - disconnects from the event
- `Reconnect()` - reverts a disconnection
- `IsConnected()` - returns `true` if the connection is listening to the event (this is, not Disconnect()'ed), `false` otherwise.
- `Event` - the `ObjectEvent` associated with this connection
- `Listener` - the function associated with this connection

## Current Features:

- **Standard Roblox Event Feature Set:**
- - Connecting to an event;
- - Disconnecting a connection;
- - Yielding a thread until the event is fired;
- - Passing arguments through the functions;
- **Custom features:**
- - Reconnecting a disconnected connection without having to make a new one (ability to reuse connections).
- - Reading all active connections for a given event.

## Goals:

- Abstraction from internals;
- Roblox-like syntax while keeping a minimum of decency for TypeScript syntax;
- Code readability for OOP implementations.
- Complement Roblox's implementation with extra (useful) features.
