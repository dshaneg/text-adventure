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

To get started, just hit the command shell with

```shell
npm install
```

to get things set up and then

```shell
node lib/index
```

to run the game.

## development environment

I'm using Visual Studio Code as my editor, so you'll notice some VSC-specific files sprinkled in.
Also, I'm using a fair amount of ES6 syntax, so check your node version if you run into problems.