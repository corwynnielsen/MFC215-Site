function Tile(x, y, canvas) {
    this.canvas = canvas;
    this.visited = false;
    this.walls = [true, true, true, true];
    this.x = x;
    this.y = y;
    this.coin = undefined;

    this.show = function () {
        realX = this.x * w;
        realY = this.y * w;
        this.canvas.stroke(255);
        this.canvas.strokeWeight(3);
        //top
        if (this.walls[0]) {
            this.canvas.line(realX, realY, realX + w, realY);
        }
        //right
        if (this.walls[1]) {
            this.canvas.line(realX + w, realY, realX + w, realY + w);
        }
        //bottom
        if (this.walls[2]) {
            this.canvas.line(realX + w, realY + w, realX, realY + w);
        }
        //left
        if (this.walls[3]) {
            this.canvas.line(realX, realY + w, realX, realY);
        }

        if (this.visited) {
            this.canvas.noStroke();
            this.canvas.fill(60, 255, 0, 100);
            this.canvas.rect(realX, realY, w, w);
        }

    }

    this.removeWalls = function (adjacent) {
        let leftOrRight = this.x - adjacent.x;
        let topOrBottom = this.y - adjacent.y;

        if (leftOrRight == 1) {
            this.walls[3] = false;
            adjacent.walls[1] = false;
        } else if (leftOrRight == -1) {
            this.walls[1] = false;
            adjacent.walls[3] = false;
        }

        if (topOrBottom == 1) {
            this.walls[0] = false;
            adjacent.walls[2] = false;
        } else if (topOrBottom == -1) {
            this.walls[2] = false;
            adjacent.walls[0] = false;
        }
    }

    this.unvisitedNeighbors = function () {
        let neighbors = [];
        if (this.y - 1 >= 0 && !(board[this.x][this.y - 1]).visited) {
            neighbors.push(board[this.x][this.y - 1]);
        }

        if (this.x + 1 < cols && !(board[this.x + 1][this.y]).visited) {
            neighbors.push(board[this.x + 1][this.y]);
        }

        if (this.y + 1 < rows && !(board[this.x][this.y + 1]).visited) {
            neighbors.push(board[this.x][this.y + 1]);
        }

        if (this.x - 1 >= 0 && !(board[this.x - 1][this.y]).visited) {
            neighbors.push(board[this.x - 1][this.y]);
        }

        if (neighbors.length > 0) {
            return neighbors[this.canvas.floor(this.canvas.random(0, neighbors.length))];
        } else {
            return null;
        }
    }

    this.highlight = function () {
        this.canvas.noStroke();
        this.canvas.noFill();
        this.canvas.fill(80, 0, 180);
        this.canvas.rect(this.x * w, this.y * w, w, w);
    }
}