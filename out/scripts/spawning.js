"use strict";

function spawnNewTile() {
    "use strict";

    /*
     randomly generate 1 set of coordinates. Note: the following method has a flaw:
     say if we want to generate a random number between [0, 3]; the probability of getting
     a 1 is the lowest (about 18%); the probability of getting the other 3 are roughly equal.
     */

    var rowNum = undefined,
        colNum = undefined;
    // generate a row/column coordinate that we don't already have
    do {
        rowNum = Math.floor(Math.random() * 4);
        colNum = Math.floor(Math.random() * 4);
    } while ($("." + rowNum + colNum).length !== 0 && $('.tile').length < 16); // guard against race condition

    // create this tile and give it the correct class name
    var $newTile = $("<div>", { class: "tile value2" }),
        className = rowNum + '' + colNum;
    $newTile.addClass(className);
    $newTile.append("<div class='tileNumber'>2</div>");
    $('#gameBoard').append($newTile);

    // move the tile to its location.
    var rowDisplacement = rowNum * 109,
        colDisplacement = colNum * 109;

    // move it to a random place.
    $newTile.animate({
        marginTop: '+=' + rowDisplacement + 'px',
        marginLeft: '+=' + colDisplacement + 'px'
    }, 0);
}

function spawnTwoNewTiles() {
    "use strict";
    // a temporary solution for the tile spawning racing condition. We use 1 function to create 2!

    var rowNum1 = undefined,
        colNum1 = undefined,
        rowNum2 = undefined,
        colNum2 = undefined,
        $gameBoard = $('#gameBoard');
    // generate a row/column coordinate that we don't already have
    do {
        rowNum1 = Math.floor(Math.random() * 4);
        colNum1 = Math.floor(Math.random() * 4);
        rowNum2 = Math.floor(Math.random() * 4);
        colNum2 = Math.floor(Math.random() * 4);
    } while (rowNum1 === rowNum2 && colNum1 === colNum2);

    // create this tile and give it the correct class name
    var $newTile1 = $("<div>", { class: "tile value2" }),
        className1 = rowNum1 + '' + colNum1,
        $newTile2 = $("<div>", { class: "tile value2" }),
        className2 = rowNum2 + '' + colNum2;
    $newTile1.addClass(className1);
    $newTile1.append("<div class='tileNumber'>2</div>");
    $newTile2.addClass(className2);
    $newTile2.append("<div class='tileNumber'>2</div>");
    $gameBoard.append($newTile1);
    $gameBoard.append($newTile2);

    // move the tile to its location.
    var rowDisplacement1 = rowNum1 * 109,
        colDisplacement1 = colNum1 * 109,
        rowDisplacement2 = rowNum2 * 109,
        colDisplacement2 = colNum2 * 109;

    // move it to a random place.
    $newTile1.animate({
        marginTop: '+=' + rowDisplacement1 + 'px',
        marginLeft: '+=' + colDisplacement1 + 'px'
    }, 0);
    $newTile2.animate({
        marginTop: '+=' + rowDisplacement2 + 'px',
        marginLeft: '+=' + colDisplacement2 + 'px'
    }, 0);
}
//# sourceMappingURL=spawning.js.map