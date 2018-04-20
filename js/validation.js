/**
 * Changes the background filter to something random
 */

function changeBackground() {
    let options = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity']
    let current_mode = document.body.style["background-blend-mode"];
    let random_mode = options[Math.floor(Math.random() * options.length)];

    while (random_mode == current_mode) {
        random_mode = options[Math.floor(Math.random() * options.length)];
    }

    document.body.style["background-blend-mode"] = random_mode;
}

/**
 * Changes the font color of page
 */

function changeFontColor() {

    hue = Math.floor(Math.random() * 359);
    sat = Math.floor(Math.random() * 100) + '%';
    lightness = Math.floor(Math.random() * 100) + '%';
    color = 'hsl(' + hue + ',' + sat + ',' + lightness, ');';
    
    document.body.style['color'] = color;
    document.getElementsByClassName('form-container')[0].style['color'] = color;
}

/**
 * 
 */

function validate() {
    // All the elements that need to be checked
    let first = document.getElementsByName('first-name')[0];
    let last = document.getElementsByName('last-name')[0];
    let zip_code = document.getElementsByName('zip')[0];
    let phone = document.getElementsByName('phone')[0];
    let email = document.getElementsByName('email')[0];

    //Regular expressions that aid is checking formatting
    let zip_regex = /\d{5}-\d{4}/;
    let phone_regex = /\(\d{3}\) \d{3}-\d{4}/
    let email_regex = /\w+@\w+.\w{2,}/

    if (first.value.length <= 0) {
        first.focus();
        return false;
    } else if (last.value.length <= 0) {
        last.focus();
        return false;
    } else if (zip_code.value.length != 5 && zip_code.value.length != 9 && !zip_regex.test(zip_code.value)) {
        zip_code.focus();
        return false;
    } else if (phone.value.length != 10 && !phone_regex.test(phone.value)) {
        phone.focus();
        return false;
    } else if (!email_regex.test(email.value)) {
        email.focus();
        return false;
    } else {
        document.getElementById('personal-info').setAttribute('action', 'mailto:corwynni@buffalo.edu?Personal-Info-From_Stranger');
    }
}

/**
 * Generates the time and updates it every seconds through recursive call.
 */

function setupTimeDiv() {
    let now = new Date(Date.now());

    let options = {
        'hour': '2-digit',
        'minute': '2-digit',
        'second': '2-digit'
    };

    let time_div = document.getElementsByClassName('time')[0];

    time_div.innerHTML = 'Current time: ' + now.toLocaleString([], options);

    setInterval(setupTimeDiv, 1000);
}

/**
 * Generates the current date and updates it every minute through a recursive call.
 */

function setupDateDiv() {
    let now = new Date(Date.now());

    let options = {
        'day': '2-digit',
        'month': 'long',
        'year': 'numeric'
    };


    let date_div = document.getElementsByClassName('date')[0];
    date_div.innerHTML = 'Current date: ' + now.toLocaleString([], options);

    setInterval(setupDateDiv, 60000);
}

document.addEventListener('DOMContentLoaded', function() {

    setupDateDiv();
    setupTimeDiv();
    
    // Button listeners
    document.getElementsByClassName('change-background')[0].addEventListener('click', changeBackground);
    document.getElementsByClassName('change-font-color')[0].addEventListener('click', changeFontColor);
    document.getElementsByName('submit')[0].addEventListener('click', validate);
});