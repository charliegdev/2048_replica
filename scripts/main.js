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
    spawnNewTile();
    spawnNewTile();
    $(document).keydown(moveAllTiles);
}

function moveAllTiles(event) {
    $(".tile").each(moveOneTile);

    function moveOneTile(index) {
        var currentPosition = {
                column: null,
                row   : null
            },
            $this           = $(this),
            oldClassName,
            newClassName;

        // get the 1st and 2nd digit of the current coordinate class name
        currentPosition.column = $this.attr('class').split(' ')[1][0];
        currentPosition.row    = $this.attr('class').split(' ')[1][1];

        oldClassName = currentPosition.column + '' + currentPosition.row;
        $this.removeClass(oldClassName);

        switch (event.which) {
            // up
            case 38:
                if (currentPosition.column > 0) {
                    $this.animate({marginTop: '-=109px'}, 100);
                    currentPosition.column--;
                }
                break;
            // down
            case 40:
                if (currentPosition.column < 3) {
                    $this.animate({marginTop: '+=109px'}, 100);
                    currentPosition.column++;
                }
                break;
            // left
            case 37:
                if (currentPosition.row > 0) {
                    $this.animate({marginLeft: '-=109px'}, 100);
                    currentPosition.row--;
                }
                break;
            // right
            case 39:
                if (currentPosition.row < 3) {
                    $this.animate({marginLeft: '+=109px'}, 100);
                    currentPosition.row++;
                }
                break;
        }
        newClassName = currentPosition.column + '' + currentPosition.row;
        $this.addClass(newClassName);
    }

    //function tileNameWildCard(index, className) {
    //    return (className.match(/[0-3][0-3]/g) || []).join(' ');
    //}
}

function spawnNewTile() {
    /*
     randomly generate 1 set of coordinates. Note: the following method has a flaw:
     say if we want to generate a random number between [0, 3]; the probability of getting
     a 1 is the lowest (about 18%); the probability of getting the other 3 are roughly equal.
     */
    var colNum          = Math.floor(Math.random() * 4),
        rowNum          = Math.floor(Math.random() * 4),
        colDisplacement = colNum * 109,
        rowDisplacement = rowNum * 109;
    // create 1 new tile using the coordinates generated.
    var $newTile = $("<div>", {class: "tile"});
    $newTile.addClass(colNum + rowNum); // column based coordinate used as class name.
    $('#gameBoard').append($newTile);

    // move it to a random place.
    $newTile.animate({
        marginTop : '+=' + colDisplacement + 'px',
        marginLeft: '+=' + rowDisplacement + 'px'
    }, 0);
    var className = colNum + '' + rowNum;
    $newTile.addClass(className);
}