//Turns off using arrow keys as scroll bar.
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

var board, cols, rows, player, coins, coinsCountSB;
var w = 30;

var g = function(p){

    var startTile, current, stack;

    p.setup = function(){
        p.createCanvas(600, 480);
        cols = p.floor(p.width/w);
        rows = p.floor(p.height/w);
        
        board = new Array(cols);
        for (let i = 0; i < cols; i++) {
            board[i] = new Array(rows);
        }
    
        for(let i = 0; i < cols; i++) {
            for(let j = 0; j < rows; j++) {
                board[i][j] = new Tile(i, j, p);
            }
        }
    
        current = board[p.floor(p.random(0, cols))][p.floor(p.random(0, rows))];
        startTile = current;

        player = new Player(current.x, current.y, p);
        
        current.visited = true;
        stack = [];
    
        p.genMaze();
        p.genCoins();
    }
    
    p.draw = function() {
        p.background(51);
        for(let i = 0; i < cols; i += 1) {
            for(let j = 0; j < rows; j+=1) {
                let cur = board[i][j];
                cur.show();
    
                if(cur.coin) {
                    coins += 1;
                    cur.coin.show();
                }
            }
        }
    
        player.draw();

        if (coins == 0){
            let r = p.floor(p.random(0, 256));
            let g = p.floor(p.random(0, 255));
            let b = p.floor(p.random(0, 255));

            p.fill(r, g, b);
            p.strokeWeight(8);
            p.stroke(0);
            p.textSize(100);
            p.textAlign(p.CENTER)
            p.text("YOU WON!", p.width/2, p.height/2);
        }

        coinsCountSB = coins;
        coins = 0;
    }
    
    p.genCoins = function() {
        for(let i = 0; i < cols; i++) {
            for(let j = 0; j < rows; j++) {

                let tile = board[i][j];
                if (tile === current || tile === startTile) {
                    continue;
                }
    
                let walls = tile.walls;
                let wallCount = 0;
                for (let wallNum = 0; wallNum < walls.length; wallNum++) {
                    if (walls[wallNum] == true) {
                        wallCount++;
                    }
                }
    
                if (wallCount == 3) {
                    board[i][j].coin = new Coin(i, j, p);
                }
            }
        }
    }
    
    p.hasUnvisited = function() {
        for(let i = 0; i < cols; i++) {
            for(let j = 0; j < rows; j++) {
                if (!(board[i][j].visited)){
                    return true;
                }
            }
        }
        return false;
    }
    
    p.genMaze = function() {
        while(p.hasUnvisited()){
            // Choose a random unvisited neighbor of current cell
            let neighbor = current.unvisitedNeighbors();
    
            if (neighbor != null) {
                stack.push(current);
                current.removeWalls(neighbor);
                current = neighbor;
                neighbor.visited = true;
            } else if (stack.length > 0) {
                current = stack.pop();
            } 
        }    
    }
    
    p.keyPressed = function() {
        pX = player.x;
        pY = player.y;
        tileUnderPlayer = board[pX][pY];
        
        if (p.keyCode == p.UP_ARROW && !(tileUnderPlayer.walls[0])) {
            player.updatePos(pX, pY-1);
        } else if (p.keyCode == p.RIGHT_ARROW && !(tileUnderPlayer.walls[1])) {
            player.updatePos(pX+1, pY);
        } else if (p.keyCode == p.DOWN_ARROW && !(tileUnderPlayer.walls[2])) {
            player.updatePos(pX, pY+1);
        } else if(p.keyCode == p.LEFT_ARROW && !(tileUnderPlayer.walls[3])) {
            player.updatePos(pX-1, pY);
        }
    }
}

var scoreboard = function(p) {

    p.setup = function() {
        p.createCanvas(600, 400);
    }

    p.draw = function() {
        p.background(230);
        p.textAlign(p.CENTER);
        p.textSize(60);
        p.text("Scoreboard/\nPlayer Data", p.width/2, 100);

        p.textSize(32);
        p.text('Score: ' + player.score, p.width/2, 250);
        p.text('Size: ' + player.w + 'x' + player.w  + ' pixels', p.width/2, 300);
        p.text('Coins Left: ' + coinsCountSB + ' left!', p.width/2, 350);
    }

}

var gamep5 = new p5(g, 'canvas1');
var scoreboardp5 = new p5(scoreboard, 'canvas2');