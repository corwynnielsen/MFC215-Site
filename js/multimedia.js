function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.addEventListener("DOMContentLoaded", function(event) {
    var scroll_elem = document.getElementsByClassName('scroll')[0];
    var scroll_elem_width = -scroll_elem.offsetWidth;

    var position = scroll_elem_width;

    setInterval(function() {
        var w = window.innerWidth;
        var scroll_elem_width = -scroll_elem.offsetWidth;
        if(position < w) {
            scroll_elem.style.left = position + 'px';
            position++;
        } else if(position == w) {
            position = scroll_elem_width;
            scroll_elem.style.left = position + 'px';
        }
    }, 1);

    var font_state = false;
    var pulse = 36;
    const max_pulse = 72;

    setInterval(function() {
        if (pulse == max_pulse) {
            font_state = true
        } else if (pulse == 36) {
            font_state = false;
        }

        if (pulse <= max_pulse && !font_state) {
            pulse++;
            scroll_elem.style.fontSize = pulse + 'px';
        } else {
            pulse--;
            scroll_elem.style.fontSize = pulse + 'px';
        }
    }, 20);

    var bod = document.getElementsByTagName('BODY')[0];

    setInterval(function () {
        bod.style.background = getRandomColor();
    }, 500);

});


