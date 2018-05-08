var values = [5, 10, 15, 20]

function Coin(x, y, canvas) {
    this.canvas = canvas
    this.value = this.canvas.random(values);
    this.x = x;
    this.y = y;


    this.show = function() {
        this.canvas.fill(255, 255, 0);
        this.canvas.ellipse(this.x * w + (w/2), this.y * w + (w/2), this.value);
    }
}