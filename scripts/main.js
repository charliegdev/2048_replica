/**
 * Created by charlieguan on 2016-02-13.
 */
/*  Some dimensions:
 Each tile is 104px * 104px;
 Each movement is 109px long.
 Spawning: distance to any anchor point: 4px top, 4px left.
 */
"use strict";
$(document).ready(main);

function main() {
    spawnNewTile();
    spawnNewTile();
    $(document).keydown(moveAllTiles);
}

function moveAllTiles(event) {
    const MOVE_DISTANCE = 109;
    switch (event.which) {
        /*  TODO: when an arrow key is pressed, instead of using $(".tile").each(moveOneTile), we should do it row by row,
         or column by column.
         */

        // up
        case 38:

            break;
        // down
        case 40:

            break;
        // left
        case 37:

            break;
        // right
        case 39:

            break;
    }

    $(".tile").each(moveOneTile);

    function moveOneTile(index) {
        let currentPosition = {
                row   : null,
                column: null
            },
            $this           = $(this),
            oldClassName,
            newClassName;

        // get the 1st and 2nd digit of the current coordinate class name
        currentPosition.row    = $this.attr('class').split(' ')[1][0];
        currentPosition.column = $this.attr('class').split(' ')[1][1];

        oldClassName = currentPosition.row + '' + currentPosition.column;
        $this.removeClass(oldClassName);

        switch (event.which) {
            // up
            case 38:
                if (currentPosition.row > 0) {
                    //console.log(currentPosition.column);
                    //$this.animate({marginTop: '-=109px'}, 100);
                    //currentPosition.column--;
                    currentPosition.row = moveToEdge($this, 'up', currentPosition.row, currentPosition.column);
                }
                break;
            // down
            case 40:
                if (currentPosition.row < 3) {
                    currentPosition.row = moveToEdge($this, 'down', currentPosition.row, currentPosition.column);
                }
                break;
            // left
            case 37:
                if (currentPosition.column > 0) {
                    currentPosition.column = moveToEdge($this, 'left', currentPosition.row, currentPosition.column);
                }
                break;
            // right
            case 39:
                if (currentPosition.column < 3) {
                    currentPosition.column = moveToEdge($this, 'right', currentPosition.row, currentPosition.column);
                }
                break;
        }
        console.log(currentPosition.row, currentPosition.column);
        newClassName = currentPosition.row + '' + currentPosition.column;
        $this.addClass(newClassName);
    }

    //function tileNameWildCard(index, className) {
    //    return (className.match(/[0-3][0-3]/g) || []).join(' ');
    //}
    function moveToEdge(tile, direction, rowNum, columnNum) {
        if (direction === 'up') {
            for (let i = 0; i < rowNum; i++) {
                if ($(`.${i}${columnNum}`).length === 0) {
                    tile.animate({marginTop: '-=' + (rowNum - i) * MOVE_DISTANCE + 'px'}, 100);
                    return i;
                }
            }

        } else if (direction === 'down') {
            for (let i = 3; i > rowNum; i--) {
                if ($(`.${i}${columnNum}`).length === 0) {
                    tile.animate({marginTop: '+=' + (i - rowNum) * MOVE_DISTANCE + 'px'}, 100);
                    return i;
                }
            }
        } else if (direction === 'left') {
            for (let i = 0; i < columnNum; i++) {
                if ($(`.${rowNum}${i}`).length === 0) {
                    tile.animate({marginLeft: '-=' + (columnNum - i) * MOVE_DISTANCE + 'px'}, 100);
                    return i;
                }
            }
            //tile.animate({marginLeft: '-=' + rowNum * MOVE_DISTANCE + 'px'}, 100);
        } else if (direction === 'right') {
            for (let i = 3; i > columnNum; i--) {
                if ($(`.${rowNum}${i}`).length === 0) {
                    tile.animate({marginLeft: '+=' + (i - columnNum) * MOVE_DISTANCE + 'px'}, 100);
                    return i;
                }
            }
        }
    }

}

function spawnNewTile() {
    /*
     randomly generate 1 set of coordinates. Note: the following method has a flaw:
     say if we want to generate a random number between [0, 3]; the probability of getting
     a 1 is the lowest (about 18%); the probability of getting the other 3 are roughly equal.
     */
    let colNum          = Math.floor(Math.random() * 4),
        rowNum          = Math.floor(Math.random() * 4),
        colDisplacement = colNum * 109,
        rowDisplacement = rowNum * 109;
    // create 1 new tile using the coordinates generated.
    let $newTile = $("<div>", {class: "tile"});
    $newTile.addClass(colNum + rowNum); // column based coordinate used as class name.
    $('#gameBoard').append($newTile);

    // move it to a random place.
    $newTile.animate({
        marginTop : '+=' + colDisplacement + 'px',
        marginLeft: '+=' + rowDisplacement + 'px'
    }, 0);
    let className = colNum + '' + rowNum;
    $newTile.addClass(className);
}