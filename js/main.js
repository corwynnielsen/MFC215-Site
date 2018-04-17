function* range(begin, end) {
    for (let i = begin; i <= end; i++){
        yield i;
    }
} 

function dateUntilOrDateSinceDue(due) {
    var day = 24*60*60*1000;
    var now = Date.now();
    var due = new Date(due);

    if (now < due) {
        return Math.round((due - now) / day);
    } else {
        return Math.round((now-due) / day)
    }
}

function setupTimeDiv() {
    var now = new Date(Date.now());

    var options = {
        'hour' : '2-digit',
        'minute' : '2-digit',
        'second' : '2-digit'
    };
    
    time_div = document.getElementsByClassName('time')[0];

    time_div.innerHTML = now.toLocaleString([], options);

    setInterval(setupTimeDiv, 1000);
}

function setupDateDiv() {
    var now = new Date(Date.now());

    var options = {
        'day' : '2-digit',
        'month' : 'long',
        'year' : 'numeric'
    };


    date_div = document.getElementsByClassName('date')[0];
    date_div.innerHTML = now.toLocaleString([], options);

    setInterval(setupDateDiv, 60000);
}

document.addEventListener('DOMContentLoaded', function() {

    assignment_time = document.createElement("DIV");
    text = document.createTextNode(dateUntilOrDateSinceDue('April 23, 2018 11:59:00'));
    assignment_time.appendChild(text);
    document.body.appendChild(assignment_time);

    setupTimeDiv();
    
    setupDateDiv();
});