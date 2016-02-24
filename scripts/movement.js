/**
 * Created by charlieguan on 2016-02-23.
 */
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
        window.setTimeout(spawnNewTile, 200);
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
        currentPosition.row    = $this.attr('class').split(' ')[2][0];
        currentPosition.column = $this.attr('class').split(' ')[2][1];

        oldClassName = `${currentPosition.row}${currentPosition.column}`;
        $this.removeClass(oldClassName);
        switch (event.which) {
            // up
            case 38:
                if (currentPosition.row > 0) {
                    //console.log(currentPosition.column);
                    //$this.animate({marginTop: '-=109px'}, 100);
                    //currentPosition.column--;
                    let newRow = moveToEdge($this, 'up', currentPosition.row, currentPosition.column);
                    if (newRow === -1) {
                        $this.remove();
                    } else {
                        currentPosition.row = newRow;
                    }

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
        newClassName = `${currentPosition.row}${currentPosition.column}`;
        $this.addClass(newClassName);
    }

    function moveToEdge(tile, direction, rowNum, columnNum) {
        if (direction === 'up') {
            for (let i = 0; i < rowNum; i++) {
                if ($(`.${i}${columnNum}`).length === 0) {
                    //merge routine
                    //we don't wanna compare something outside of the board!
                    if (i > 0) {
                        let returnValue = tryMergeTilesCase1(tile, i, columnNum);
                        console.log(returnValue);
                        if (returnValue === true) {
                            return -1;
                        }
                    }
                    tile.animate({marginTop: '-=' + (rowNum - i) * MOVE_DISTANCE + 'px'}, 100);
                    tilesMoved = true;
                    return i;
                }
            }
            return rowNum;
        }
        else if (direction === 'down') {
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
        function tryMergeTilesCase1(tile, row, column) {
            let $tileAbove      = $(`.${row - 1}${column}`),
                aboveClassArray = $tileAbove.attr('class').split(' '),
                abovePosition   = aboveClassArray[2],
                aboveValue      = aboveClassArray[1].slice(5),
                currentValue    = tile.attr('class').split(' ')[1].slice(5);
            if (aboveValue === currentValue) {
                //this tile and the tile above it has the same value. merge them.
                $tileAbove.attr('class', function (index, attr) {
                    return `tile value${aboveValue * 2} ${abovePosition}`;
                });
                tile.animate({marginTop: '-=' + (rowNum - row + 1) * MOVE_DISTANCE + 'px'}, 100);
                tilesMoved = true;
                // return true, so we can remove this tile in moveOneTile().
                return true;
            }
            // return false if we haven't merged this tile.
            return false;

        }
    }
}

