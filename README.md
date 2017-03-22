# Git in glitch 

This is a proof of concept for using `git` in `glitch` 

The project is hosted in `Github` at [EmbeddedMike/git-glitch](https://github.com/EmbeddedMike/git-glitch)

I plan to make improvements to suit my workflow and would welcome others 
improving it. If you would like an invite to the `glitch` project, you can message me through `git`. Or you can fork my project on github, remix this to your own, make changes and send me a PR

# How it works
## Overview

Two files control the automated behavior of the project

1. `package.json`
2. `watch.json`

Two files control git operations

1. `doit.sh`
2. `DO-IT`

This file forces the project to restart

1. `.trigger-rebuild`

Your project will also restart (after trying to install) if you modify `package.json` or `.env`


## `package.json` 
The relevant parts of the file are below:

```
	"watch": {
		"doit": "DO-IT"
	},
	"scripts": {
		"start": "npm-watch & node server.js",
		"doit": "./doit.sh"
	},
  "dependencies": {
	...
		"npm-watch": "^0.1.7"
	},
```

The package `npm-watch` is launched by the `start` script

The `watch` section configures `npm-watch`. When `DO-IT` changes, 
the script `doit` runs. This invokes `doit.sh`



## `watch.json`

This tells `gomix` how to respond to some other changes

```
{
  "install": {
    "include": [
      "^package\\.json$",
      "^\\.env$"
    ]
  },
  "restart": {
    "include": [
      "^.trigger-rebuild$"
    ]
  },
  "throttle": 1000
}

```
The `throttle` value debounces changes. So actions controlled by this file
will take effect, in this csae, after 1000 msecs. 

If you are making pervasive changes to files that trigger actions you can change change the `throttle` value to some big number like `10000` Then when you are ready for more response, change it to a lower number.

Note that the `npm-watch` behavior is independent and occurs as soon as there
is any change.

The `install` member tells `gomix` to rerun the install process when `package.json` or `.env` changes (modulated by `throttle`)

The `restart` member tells `gomix` to run the `start` script in `scripts` in `.tirggle-rebuild` (moduldated by `throttle`) 

## Running a command
The file `doit.sh` contains a bash script.

The file `DO-IT` controls execution of `doit.sh.` A single character change in `DO-IT`will cause execution of the current commands in `doit.sh.`

So the normal workflow is:

Uncomment the lines in `doit.sh.` that you want to execute, or add or modify the lines to meet your needs. For example, you might uncomment and modify the line:

#`git checkout "README.md"`

to checkout a different file. See the not on problems after checkouts.

You can put any commands that you want, not just git commands, into `doit.sh` 



# Problems and improvements
## Updating editors
When you modify your working directory by a `git` operation (for example by a checkout or a fetch) the glitch editor does NOT update. To force an update you need to reload the current project in your browser. Annoying, but it works.

## `doit.sh` reruns last command on reload
When the project reloads, the `glitch` invokes the `start` script, which 
in turn invokes `node-watch` which will run the `doit` script. So whatever is left in this file will be rerun.

For this reason it's a good idea to re-comment any lines after you do a commit.

#
