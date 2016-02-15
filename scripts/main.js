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
    var $tile = $("tile");
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
    $('<div/>', {
        class: 'tile'
    }).appendTo('#gameBoard');
}
