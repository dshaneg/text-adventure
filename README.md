# text adventure

     _____         _
    |_   _|____  _| |_
      | |/ _ \ \/ / __|
      | |  __/>  <| |_
      |_|\___/_/\_\\__|
              _       _                 _
             / \   __| |_   _____ _ __ | |_ _   _ _ __ ___
            / _ \ / _` \ \ / / _ \ '_ \| __| | | | '__/ _ \
           / ___ \ (_| |\ V /  __/ | | | |_| |_| | | |  __/
          /_/   \_\__,_| \_/ \___|_| |_|\__|\__,_|_|  \___|

This project represents an exercise in learning. When completed, this will be a game engine for a
text-based adventure game. No fancy graphics--not even procedurally generated
maps. All game configuration is to be set up in json files.

## status

I'm tracking a very simple backlog on
[a Trello board](https://trello.com/b/AayYDKae/text-adventure). Feel free to vote for a feature.

Currently, travelling around the map is supported, so feel free to give it a try or fork the repo
and build your own adventure--just change up the json files in the game folder.

I'm sure most if not all of what I do will be very naive when it comes to building games.
I have purposefully avoided looking into code and conversations about the genre
(that dates back to the 70's or 80's at the latest), so I'm sure I'll make mistakes that
real game devs will chuckle about. That said, I'm finding that I'm enjoying building this
crappy game more than I enjoy playing triple-A titles. The goal here is to learn,
and the best way to learn is by trying and failing and trying again.

## setup

To get started, just hit the command shell with...

```shell
npm install
```
...to get things set up and then...

```shell
tsc
```

...to build the application and then...

```shell
node lib/index
```

...to run the game. I've added a debugging listener that will spit out all of the events it sees
to the console. To turn it on use the debug flag.

```shell
node lib/index --debug
```

## developer (cheat) mode

In the course of developing features, I found it useful to add cheats to the game that let the developer
set up a situation to be tested while the game is running. To enable dev mode when starting the game,
use the dev flag.

```sh
node lib/index --dev
```

If the flag is on, the game will respond to additional commands:

```sh
conjureitem {item-id} // adds the item to your inventory. the shortcut is "ci"
teleport {map-node-id} // sets your current location to the given map node
```

## development environment

I'm using Visual Studio Code as my editor, so you'll notice some VSC-specific files sprinkled in.
Also, I'm using a fair amount of ES6 syntax, so check your node version if you run into problems.

## design

The original idea was to make the game engine an EventEmitter and the client(text-engine) would respond to events and submit commands via parsers.
Command handlers would respond to commands, updating the game state and raising events using the game engine.

The current thought is that I'll use the Postal npm package, which provides an in-memory message bus. Now I can decouple all the things. The game state
objects, as well as the client(text-engine) respond to events published by the command handlers. Everyone knows about the message bus but nothing else.

The contracts of the application now come down to commands, queries, and events, which are each published
in a different postal channel.

### game engine channels

Commands

* game.create
* game.start
* game.stop
* player.location.move
* player.location.teleport
* player.inventory.add
* player.inventory.equip-item
* player.inventory.list
* item.conjure
* help

Queries

* player.location
* player.inventory.current
* player.inventory.equipped

Events

* game.created
* game.started
* game.stop-requested
* game.stopped
* game.help-requested
* player.location.moved
* player.location.move-blocked
* player.location.teleported
* player.inventory.added
* player.inventory.item-equipped
* player.inventory.list-requested
* item.conjured
* error

### console client channels

Commands

* style.list
* style.apply

Events

* style.applied
* style.list-requested
