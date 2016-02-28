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
    let currentValue = tile.attr('class').split(' ')[1].slice(5);
    switch (direction) {
        case 'up':
            let $tileAbove      = $(`.${ij - 1}${column}`),
                aboveClassArray = $tileAbove.attr('class').split(' '),
                abovePosition   = aboveClassArray[2],
                aboveValue      = aboveClassArray[1].slice(5);
            if (aboveValue === currentValue) {
                // this tile and the tile above it has the same value. merge them.
                // double the text
                $tileAbove.children().text((index, text) => aboveValue * 2);
                // change class name
                $tileAbove.attr('class', (index, attr) => `tile value${aboveValue * 2} ${abovePosition}`);
                tile.animate({marginTop: '-=' + (row - ij + 1) * moveDistance + 'px'}, 100);
                return true;
            }
            return false;

        case 'down':
            let $tileBelow      = $(`.${ij + 1}${column}`),
                belowClassArray = $tileBelow.attr('class').split(' '),
                belowPosition   = belowClassArray[2],
                belowValue      = belowClassArray[1].slice(5);
            if (belowValue === currentValue) {
                $tileBelow.children().text((index, text) => belowValue * 2);
                $tileBelow.attr('class', (index, attr) => `tile value${belowValue * 2} ${belowPosition}`);
                tile.animate({marginTop: '+=' + (ij - row + 1) * moveDistance + 'px'}, 100);
                return true;
            }
            return false;

        case 'left':
            let $tileLeft      = $(`.${row}${ij - 1}`),
                leftClassArray = $tileLeft.attr('class').split(' '),
                leftPosition   = leftClassArray[2],
                leftValue      = leftClassArray[1].slice(5);
            if (leftValue === currentValue) {
                $tileLeft.children().text((index, text) => leftValue * 2);
                $tileLeft.attr('class', (index, attr) => `tile value${leftValue * 2} ${leftPosition}`);
                tile.animate({marginLeft: '-=' + (column - ij + 1) * moveDistance + 'px'}, 100);
                return true;
            }
            return false;

        case 'right':
            let $tileRight      = $(`.${row}${ij + 1}`),
                rightClassArray = $tileRight.attr('class').split(' '),
                rightPosition   = rightClassArray[2],
                rightValue      = rightClassArray[1].slice(5);
            if (rightValue === currentValue) {
                $tileRight.children().text((index, text) => rightValue * 2);
                $tileRight.attr('class', (index, attr) => `tile value${rightValue * 2} ${rightPosition}`);
                tile.animate({marginLeft: '+=' + (column - ij + 1) * moveDistance + 'px'}, 100);
                return true;
            }
            return false;
    }

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
    let currentValue = tile.attr('class').split(' ')[1].slice(5);
    switch (direction) {
        case 'up':
            let $tileAbove      = $(`.${parseInt(row) - 1}${column}`),
                aboveClassArray = $tileAbove.attr('class').split(' '),
                abovePosition   = aboveClassArray[2],
                aboveValue      = aboveClassArray[1].slice(5);

            if (aboveValue === currentValue) {
                $tileAbove.children().text((index, text) => aboveValue * 2);
                $tileAbove.attr('class', (index, attr) => `tile value${aboveValue * 2} ${abovePosition}`);
                tile.animate({marginTop: `-=${moveDistance}px`}, 100);
                return true;
            }
            return false;

        case 'down':
            let $tileBelow = $(`.${parseInt(row) + 1}${column}`);
            console.log($tileBelow);

            let belowClassArray = $tileBelow.attr('class').split(' '),
                belowPosition   = belowClassArray[2],
                belowValue      = belowClassArray[1].slice(5);

            if (belowValue === currentValue) {
                $tileBelow.children().text((index, text) => belowValue * 2);
                $tileBelow.attr('class', (index, attr) => `tile value${belowValue * 2} ${belowPosition}`);
                tile.animate({marginTop: `+=${moveDistance}px`}, 100);
                return true;
            }
            return false;

        case 'left':
            let $tileLeft      = $(`.${row}${parseInt(column) - 1}`),
                leftClassArray = $tileLeft.attr('class').split(' '),
                leftPosition   = leftClassArray[2],
                leftValue      = leftClassArray[1].slice(5);

            if (leftValue === currentValue) {
                $tileLeft.children().text((index, text) => leftValue * 2);
                $tileLeft.attr('class', (index, attr) => `tile value${leftValue * 2} ${leftPosition}`);
                tile.animate({marginLeft: `-=${moveDistance}px`}, 100);
                return true;
            }
            return false;

        case 'right':
            let $tileRight      = $(`.${row}${parseInt(column) + 1}`),
                rightClassArray = $tileRight.attr('class').split(' '),
                rightPosition   = rightClassArray[2],
                rightValue      = rightClassArray[1].slice(5);

            if (rightValue === currentValue) {
                $tileRight.children().text((index, text) => rightValue * 2);
                $tileRight.attr('class', (index, attr) => `tile value${rightValue * 2} ${rightPosition}`);
                tile.animate({marginLeft: `+=${moveDistance}px`}, 100);
                return true;
            }
            return false;
    }
}
