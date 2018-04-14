
document.addEventListener("DOMContentLoaded", function(event) {
    var scroll_elem = (document.getElementsByClassName('scroll'))[0];
    var w = window.innerWidth;
    var h = window.innerHeight;
    
    var position = 0;
    var pulse = 36;
    const max_pulse = 72;

    setInterval(function() {
        if(position < w) {
            scroll_elem.style.left = position + 'px';
            position++;
        } else if(position == w) {
            scroll_elem.style.left = position + 'px';
            position = 0;
        }
    }, 10);

    setInterval(function() {
        if (pulse <= max_pulse) {
            pulse++;
            scroll_elem.style.fontSize = pulse + 'px';
        } else {
            pulse--;
            scroll_elem.style.fontSize = pulse + 'px';
        }
    }, 40);
});


