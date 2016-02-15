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
    placeSpawningTile();
    $(document).keydown(moveAllTiles);
}
function moveAllTiles(event) {
    var $tile = $(".tile");
    switch (event.which) {
        // up
        case 38:
            $tile.animate({marginTop: '-=109px'}, 100);
            break;
        // down
        case 40:
            $tile.animate({marginTop: '+=109px'}, 100);
            break;
        // left
        case 37:
            $tile.animate({marginLeft: '-=109px'}, 100);
            break;
        // right
        case 39:
            $tile.animate({marginLeft: '+=109px'}, 100);
            break;
    }
}

function placeSpawningTile() {
    var $gameBoard = $('#gameBoard');
    /*
     randomly generate 2 sets of coordinates. Note: the following method has a flaw:
     say if we want to generate a random number between [0, 3]; the probability of getting
     a 1 is the lowest (about 18%); the probability of getting the other 3 are roughly equal.
     */
    var col1 = Math.floor(Math.random() * 4),
        row1 = Math.floor(Math.random() * 4),
        col2 = Math.floor(Math.random() * 4),
        row2 = Math.floor(Math.random() * 4);

    // make sure those 2 tiles are not on top of each other!
    while (col1 === col2 && row1 === row2) {
        col2 = Math.floor(Math.random() * 4);
        row2 = Math.floor(Math.random() * 4);
    }

    // generate 2 tiles using the coordinates generated.
    var $tile1 = $("<div>", {class: "tile"});
    $tile1.addClass("tile" + col1 + row1);
    $gameBoard.append($tile1);

    var $tile2 = $("<div>", {class: "tile"});
    $tile2.addClass("tile" + col2 + row2);
    $gameBoard.append($tile2);
}
