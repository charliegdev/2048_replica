/**
 * Created by charlieguan on 2016-02-13.
 */






$(document).ready(main);

function main() {
    $(document).keydown(function (event) {
        switch (event.which) {
            // up
            case 38:
                console.log('up');
                break;
            // down
            case 40:
                console.log('down');
                break;
            // left
            case 37:
                console.log('left');
                break;
            // right
            case 39:
                console.log('right');
                break;
        }
    });
}
