"use strict";

/**
 * Created by charlieguan on 2016-02-23.
 */
function moveAllTiles(event) {
    "use strict";

    var MOVE_DISTANCE = 109;

    var isAnyTileMoved = false,
        $zeroRow = $("[class*=' 0']"),
        $firstRow = $("[class*=' 1']"),
        $secondRow = $("[class*=' 2']"),
        $thirdRow = $("[class*=' 3']"),
        $zeroColumn = $("[class$='0']"),
        $firstColumn = $("[class$='1']"),
        $secondColumn = $("[class$='2']"),
        $thirdColumn = $("[class$='3']");

    switch (event.which) {
        // up
        case 38:
            /*
             When 'up' is pressed, leave 0th row alone; handle 1st row, then 2nd row, then 3rd row.
             +---+---+---+---+
             | 0 | 0 | 0 | 0 |  <-- 0th row
             +---+---+---+---+
             | 1 | 1 | 1 | 1 |  <-- 1st row
             +---+---+---+---+
             | 2 | 2 | 2 | 2 |  <-- 2nd row
             +---+---+---+---+
             | 3 | 3 | 3 | 3 |  <-- 3rd row
             +---+---+---+---+
             */
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

    if (isAnyTileMoved === true && $('.tile').length < 16) {
        window.setTimeout(spawnNewTile, 200);
    }

    function moveOneTile(index) {
        var currentPosition = {
            row: null,
            column: null
        },

        // since this function is called inside .each(), 'this' refers to the DOM element.
        $this = $(this),
            // jshint ignore: line
        oldClassName = undefined,
            newClassName = undefined;

        // get the 1st and 2nd digit of the current coordinate class name
        currentPosition.row = $this.attr('class').split(' ')[2][0];
        currentPosition.column = $this.attr('class').split(' ')[2][1];

        oldClassName = "" + currentPosition.row + currentPosition.column;
        $this.removeClass(oldClassName);
        switch (event.which) {
            // up
            case 38:
                if (currentPosition.row > 0) {
                    /*
                     Press 'up':
                      Start:                 Step 1:                         Step 2:
                     merge 3rd row          Double value and stack          Delete stacked tile
                     +---+                  +------+                        +---+
                     | 8 |                  | 8    |                        | 8 |
                     +---+                  +------+                        +---+
                     | 2 |                  | 4(2) |                        | 4 |
                     +---+                  +------+                        +---+
                     | 0 |                  | 0    |                        | 0 |
                     +---+                  +------+                        +---+
                     | 2 |                  | 0    |                        | 0 |
                     +---+                  +------+                        +---+
                     */
                    var newRow = moveToEdge($this, 'up', currentPosition.row, currentPosition.column);
                    if (newRow === -1) {
                        $this.remove();
                    } else {
                        currentPosition.row = newRow;
                        newClassName = "" + currentPosition.row + currentPosition.column;
                        $this.addClass(newClassName);
                    }
                }
                break;
            // down
            case 40:
                if (currentPosition.row < 3) {
                    var newRow = moveToEdge($this, 'down', currentPosition.row, currentPosition.column);
                    if (newRow === -1) {
                        $this.remove();
                    } else {
                        currentPosition.row = newRow;
                        newClassName = "" + currentPosition.row + currentPosition.column;
                        $this.addClass(newClassName);
                    }
                }
                break;
            // left
            case 37:
                if (currentPosition.column > 0) {
                    var newColumn = moveToEdge($this, 'left', currentPosition.row, currentPosition.column);
                    if (newColumn === -1) {
                        $this.remove();
                    } else {
                        currentPosition.column = newColumn;
                        newClassName = "" + currentPosition.row + currentPosition.column;
                        $this.addClass(newClassName);
                    }
                }
                break;
            // right
            case 39:
                if (currentPosition.column < 3) {
                    var newColumn = moveToEdge($this, 'right', currentPosition.row, currentPosition.column);
                    if (newColumn === -1) {
                        $this.remove();
                    } else {
                        currentPosition.column = newColumn;
                        newClassName = "" + currentPosition.row + currentPosition.column;
                        $this.addClass(newClassName);
                    }
                }
                break;
        }
    }

    function moveToEdge(tile, direction, rowNum, columnNum) {
        var isThisTileMoved = false;
        switch (direction) {

            case 'up':
                for (var i = 0; i < rowNum; i++) {
                    if ($("." + i + columnNum).length === 0) {
                        // $('.xy').length === 0 means no tile is currently occupying the xy grid.
                        if (i > 0) {
                            /*
                             if i === 0, we're moving all the way to the edge, and no tile to merge with. No point try merging.
                             Case 1: There is 1 or 2 empty grid between current tile and the tile we want to merge.
                             +---+                      +---+                       +---+
                             | 4 |                      | 4 |                       | 4 |
                             +---+                      +---+                       +---+
                             | 0 |<-- i = 1             | 2 |                       | 0 |  <--  i = 1
                             +---+                      +---+                       +---+
                             | 4 |<-- rowNum = 2        | 0 |<-- i = 2              | 0 |
                             +---+                      +---+                       +---+
                             | 0 |                      | 2 |<-- rowNum = 3         | 4 |  <--  rowNum = 3
                             +---+                      +---+                       +---+
                             rowNum-i==1                rowNum-i==1                  rowNum-i==2
                             */
                            isThisTileMoved = tryMergeCase1(tile, 'up', i, rowNum, columnNum, MOVE_DISTANCE);
                            /*
                             tryMergeCase1: if we cannot merge a tile, we won't move it at all. If the attempt is
                             successful (they have the same value), tryMergeCase1 will move current tile and return true.
                             */
                            if (isThisTileMoved === true) {
                                // return -1 so moveOneTile() will remove this tile from DOM.
                                isAnyTileMoved = true;
                                return -1;
                            }
                        }
                        /*
                         if we reach here, either i === 0, and we just found an empty grid on the edge,
                         or we attempted to merge but failed, so w're just gonna move this tile to the empty space.
                         +---+                          +---+
                         | 0 |    i === 0               | 4 |
                         +---+                          +---+
                         | 0 |                          | 2 |
                         +---+                          +---+
                         | 2 |                          | 0 |   <-- i === 2, but merge failed. Just move.
                         +---+                          +---+
                         | 0 |                          | 4 |
                         +---+                          +---+
                         */
                        tile.animate({ marginTop: '-=' + (rowNum - i) * MOVE_DISTANCE + 'px' }, 100);
                        isAnyTileMoved = true;
                        return i;
                    }
                }
                /*
                 If we get out of the for-loop, we know there is no empty grid between our current tile and the tile
                 we attempt to merge with. This is Case 2:
                 +---+                                  +---+
                 | 4 |                                  | 8 |
                 +---+                                  +---+
                 | 2 |                                  | 4 |
                 +---+                                  +---+
                 | 4 |                                  | 2 |
                 +---+                                  +---+
                 | 4 |                                  | 4 |
                 +---+                                  +---+
                 Case 2: Merge the 2 "4"'s.            Nothing we can do.
                 */
                if (rowNum > 0) {
                    isThisTileMoved = tryMergeCase2(tile, 'up', rowNum, columnNum, MOVE_DISTANCE);
                }
                if (isThisTileMoved === true) {
                    isAnyTileMoved = true;
                    return -1;
                }
                return rowNum;

            case 'down':
                for (var i = 3; i > rowNum; i--) {
                    if ($("." + i + columnNum).length === 0) {
                        if (i < 3) {
                            isThisTileMoved = tryMergeCase1(tile, 'down', i, rowNum, columnNum, MOVE_DISTANCE);
                            if (isThisTileMoved === true) {
                                // return -1 so moveOneTile() will remove this tile from DOM.
                                isAnyTileMoved = true;
                                return -1;
                            }
                        }
                        tile.animate({ marginTop: '+=' + (i - rowNum) * MOVE_DISTANCE + 'px' }, 100);
                        isAnyTileMoved = true;
                        return i;
                    }
                }
                if (rowNum < 3) {
                    isThisTileMoved = tryMergeCase2(tile, 'down', rowNum, columnNum, MOVE_DISTANCE);
                }
                if (isThisTileMoved === true) {
                    isAnyTileMoved = true;
                    return -1;
                }
                return rowNum;

            case 'left':
                for (var j = 0; j < columnNum; j++) {
                    if ($("." + rowNum + j).length === 0) {
                        if (j > 0) {
                            isThisTileMoved = tryMergeCase1(tile, 'left', j, rowNum, columnNum, MOVE_DISTANCE);
                            if (isThisTileMoved === true) {
                                // return -1 so moveOneTile() will remove this tile from DOM.
                                isAnyTileMoved = true;
                                return -1;
                            }
                        }
                        tile.animate({ marginLeft: '-=' + (columnNum - j) * MOVE_DISTANCE + 'px' }, 100);
                        isAnyTileMoved = true;
                        return j;
                    }
                }
                if (columnNum > 0) {
                    isThisTileMoved = tryMergeCase2(tile, 'left', rowNum, columnNum, MOVE_DISTANCE);
                }
                if (isThisTileMoved === true) {
                    isAnyTileMoved = true;
                    return -1;
                }
                return columnNum;

            case 'right':
                for (var j = 3; j > columnNum; j--) {
                    if ($("." + rowNum + j).length === 0) {
                        if (j < 3) {
                            isThisTileMoved = tryMergeCase1(tile, 'right', j, rowNum, columnNum, MOVE_DISTANCE);
                            if (isThisTileMoved === true) {
                                // return -1 so moveOneTile() will remove this tile from DOM.
                                isAnyTileMoved = true;
                                return -1;
                            }
                        }
                        tile.animate({ marginLeft: '+=' + (j - columnNum) * MOVE_DISTANCE + 'px' }, 100);
                        isAnyTileMoved = true;
                        return j;
                    }
                }
                if (columnNum < 3) {
                    isThisTileMoved = tryMergeCase2(tile, 'right', rowNum, columnNum, MOVE_DISTANCE);
                }
                if (isThisTileMoved === true) {
                    isAnyTileMoved = true;
                    return -1;
                }
                return columnNum;
        }
    }
}
//# sourceMappingURL=movement.js.map