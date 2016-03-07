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

    $('#newGameButton').click(() => { location.reload() });
}


