function Player(x, y, canvas) {

    this.MAX_SIZE = 24;
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.w = 5;
    this.score = 0;

    this.draw = function() {
        this.canvas.fill(255, 150, 0);
        this.canvas.strokeWeight(1);
        this.canvas.stroke(0, 215, 255);
        this.canvas.rectMode(this.canvas.CENTER);
        this.canvas.rect(this.x * w + (w/2), this.y * w + (w/2), this.w, this.w);
        this.canvas.rectMode(this.canvas.CORNER);

        if (coins == 0) {
            this.w *= 1.05;
        }
    }

    this.updatePos = function(x, y) {
        // Sets new position
        this.x = x;
        this.y = y;

        if (board[x][y].coin) {
            // Adds coins score value
            this.score += board[x][y].coin.value;

            // Grows player
            if (this.w <= this.MAX_SIZE){
                this.w += this.canvas.floor(this.score * 0.05);

                // Accounts for when a coin is eaten and it makes the size greater than the max.
                if (this.w > w) {
                    let diff = this.w - w;
                    this.w -= diff;
                }
            }

            // Removes coin from board
            board[x][y].coin = undefined;
        }
    }
}
