# 2048 Replica
**You can view the live version [here](http://charliegdev.github.io/2048_replica/).**

This is my own replica of the popular game [2048](https://gabrielecirulli.github.io/2048/).
I wrote it in HTML, CSS, Javascript (ECMAScript 6) and jQuery. Everything (except jQuery library) is written from scratch.

The project is not entirely finished yet, but you can view the source code here, and click the link
above to see the work in progress.

ES 2015 once caused compatibility problems on Safari and IE; as a result, I transpiled the source code from ES 2015 to ES 5 using Babel. 
Now the game should run fine on all modern desktop browsers.

## Progress
- UI (mostly) 
- Tile Spawning
- Tile movement
- Collision detection 
- Tile merge algorithm
- Display Correct Numbers in Tiles
- Github page
- Transpile

## Goals
- [ ] Score
- [ ] Mobile Page

## Issues
- [ ] Might redo interface with Bootstrap
- [ ] Block scope variable declarations cause compatibility issues in Safari
- [ ] Zooming in/out the page will leave gaps between tile and board grid
- [ ] The current way of tile movement utilize marginTop/marginLeft, that might be improved

## ECMAScript 6 Features Used
- Block scope variable declarations
- Constants
- Arrow functions
- Template literals

