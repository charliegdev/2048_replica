function tryMergeCase1(tile, direction, ij, row, column, moveDistance) {
    /*
     Let's say we press 'up', here is case 1:
     For 1 column:
     +---+
     | 4 |  Since we will always process 0th row, then 1st row, then 2nd row, then 3rd row,
     +---+  we know for sure that when we want to process the "2" at the bottom, all rows above it has been processed.
     | 2 |
     +---+
     | 0 |  Case 1: There are 1 or more empty grids between our tile and the tile it attempts to merge to.
     +---+
     | 2 |  If we succeed, we move our tile and return true; if we fail, we don't do anything and return false.
     +---+
     */

    "use strict";
    let $tileAbove      = $(`.${ij - 1}${column}`),
        aboveClassArray = $tileAbove.attr('class').split(' '),
        abovePosition   = aboveClassArray[2],
        aboveValue      = aboveClassArray[1].slice(5),
        currentValue    = tile.attr('class').split(' ')[1].slice(5);
    if (aboveValue === currentValue) {
        //this tile and the tile above it has the same value. merge them.
        $tileAbove.attr('class', function (index, attr) {
            return `tile value${aboveValue * 2} ${abovePosition}`;
        });
        tile.animate({marginTop: '-=' + (row - ij + 1) * moveDistance + 'px'}, 100);
        return true;
    }
    return false;
}

function tryMergeCase2(tile, direction, row, column, moveDistance) {
    /*
     Case 2 when pressing 'up', for example
     For 1 column:
     +---+
     | 4 |  Case 2: Say we're attempting to merge the "2" on the 2nd row to the "2" on the 1st row,
     +---+  and there is no empty grid between our tile and the tile we attempt to merge.
     | 2 |
     +---+  If we succeed, we move our tile and return true; if we fail, we don't do anything and return false.
     | 2 |
     +---+
     | 0 |
     +---+
     */
    "use strict";
    console.log(`Case 2 Test: ${row}${column}`);
}
