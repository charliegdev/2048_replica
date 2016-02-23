/**
 * Created by charlieguan on 2016-02-13.
 */
/*  Some dimensions:
 Each tile is 104px * 104px;
 Each movement is 109px long.
 Spawning: distance to any anchor point: 4px top, 4px left.
 */
$(document).ready(main);

function main() {
    "use strict";
    spawnTwoNewTiles();
    $(document).keydown(moveAllTiles);
}

function moveAllTiles(event) {
    "use strict";
    const MOVE_DISTANCE = 109;
    let tilesMoved      = false,
          $zeroRow      = $("[class*=' 0']"),
          $firstRow     = $("[class*=' 1']"),
          $secondRow    = $("[class*=' 2']"),
          $thirdRow     = $("[class*=' 3']"),
          $zeroColumn   = $("[class$='0']"),
          $firstColumn  = $("[class$='1']"),
          $secondColumn = $("[class$='2']"),
          $thirdColumn  = $("[class$='3']");

    switch (event.which) {
        // up
        case 38:
            //when up is pressed, first handle 1st row, then 2nd row, then 3rd row.
            $firstRow.each(moveOneTile);
            $secondRow.each(moveOneTile);
            $thirdRow.each(moveOneTile);
            break;
        // down
        case 40:
            // when down is pressed, first handle 2nd row, then 1st row, then 0th row.
            $secondRow.each(moveOneTile);
            $firstRow.each(moveOneTile);
            $zeroRow.each(moveOneTile);
            break;
        // left
        case 37:
            // when left is pressed, first handle 1st column, then 2nd column, then 3rd column.
            $firstColumn.each(moveOneTile);
            $secondColumn.each(moveOneTile);
            $thirdColumn.each(moveOneTile);
            break;
        // right
        case 39:
            // when right is pressed, first handle 2nd column, then 1st column, then 0th column.
            $secondColumn.each(moveOneTile);
            $firstColumn.each(moveOneTile);
            $zeroColumn.each(moveOneTile);
            break;
    }


    if (tilesMoved === true && $('.tile').length < 16) {
        window.setTimeout(spawnNewTile, 300);
    }

    function moveOneTile(index) {
        let currentPosition = {
                row   : null,
                column: null
            },
            // since this function is called inside .each(), 'this' refers to the DOM element.
            $this           = $(this), // jshint ignore: line
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
                    tilesMoved = true;
                    return i;
                }
            }
            return rowNum;

        } else if (direction === 'down') {
            for (let i = 3; i > rowNum; i--) {
                if ($(`.${i}${columnNum}`).length === 0) {
                    tile.animate({marginTop: '+=' + (i - rowNum) * MOVE_DISTANCE + 'px'}, 100);
                    tilesMoved = true;
                    return i;
                }
            }
            return rowNum;
        } else if (direction === 'left') {
            for (let i = 0; i < columnNum; i++) {
                if ($(`.${rowNum}${i}`).length === 0) {
                    tile.animate({marginLeft: '-=' + (columnNum - i) * MOVE_DISTANCE + 'px'}, 100);
                    tilesMoved = true;
                    return i;
                }
            }
            return columnNum;
        } else if (direction === 'right') {
            for (let i = 3; i > columnNum; i--) {
                if ($(`.${rowNum}${i}`).length === 0) {
                    tile.animate({marginLeft: '+=' + (i - columnNum) * MOVE_DISTANCE + 'px'}, 100);
                    tilesMoved = true;
                    return i;
                }
            }
            return columnNum;
        }
    }

}

function spawnNewTile() {
    "use strict";
    /*
     randomly generate 1 set of coordinates. Note: the following method has a flaw:
     say if we want to generate a random number between [0, 3]; the probability of getting
     a 1 is the lowest (about 18%); the probability of getting the other 3 are roughly equal.
     */
    let rowNum, colNum;
    // generate a row/column coordinate that we don't already have
    do {
        rowNum = Math.floor(Math.random() * 4);
        colNum = Math.floor(Math.random() * 4);
    } while ($(`.${rowNum}${colNum}`).length !== 0);

    // create this tile and give it the correct class name
    let $newTile  = $("<div>", {class: "tile"}),
        className = rowNum + '' + colNum;
    $newTile.addClass(className);
    $('#gameBoard').append($newTile);

    // move the tile to its location.
    let rowDisplacement = rowNum * 109,
        colDisplacement = colNum * 109;

    // move it to a random place.
    $newTile.animate({
        marginTop : '+=' + rowDisplacement + 'px',
        marginLeft: '+=' + colDisplacement + 'px'
    }, 0);

}

function spawnTwoNewTiles() {
    "use strict";
    // a temporary solution for the tile spawning racing condition. We use 1 function to create 2!
    let rowNum1, colNum1, rowNum2, colNum2,
        $gameBoard = $('#gameBoard');
    // generate a row/column coordinate that we don't already have
    do {
        rowNum1 = Math.floor(Math.random() * 4);
        colNum1 = Math.floor(Math.random() * 4);
        rowNum2 = Math.floor(Math.random() * 4);
        colNum2 = Math.floor(Math.random() * 4);
    } while (rowNum1 === rowNum2 && colNum1 === colNum2);

    // create this tile and give it the correct class name
    let $newTile1  = $("<div>", {class: "tile"}),
        className1 = rowNum1 + '' + colNum1,
        $newTile2  = $("<div>", {class: "tile"}),
        className2 = rowNum2 + '' + colNum2;
    $newTile1.addClass(className1);
    $newTile2.addClass(className2);
    $gameBoard.append($newTile1);
    $gameBoard.append($newTile2);

    // move the tile to its location.
    let rowDisplacement1 = rowNum1 * 109,
        colDisplacement1 = colNum1 * 109,
        rowDisplacement2 = rowNum2 * 109,
        colDisplacement2 = colNum2 * 109;

    // move it to a random place.
    $newTile1.animate({
        marginTop : '+=' + rowDisplacement1 + 'px',
        marginLeft: '+=' + colDisplacement1 + 'px'
    }, 0);
    $newTile2.animate({
        marginTop : '+=' + rowDisplacement2 + 'px',
        marginLeft: '+=' + colDisplacement2 + 'px'
    }, 0);
}