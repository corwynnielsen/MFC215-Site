/**
 * Constant for the table rows.
 */

const ROWS = 12;

/**
 * Costants for the table columns.
 */

const COLS = 3;

/**
 * Helper function that to tell if the assignment is past the due date.
 * 
 * @return {boolean} Represents weather or not the assignment time is up.
 */

function assignmentPastDue(due) {
    let now = new Date(Date.now());
    let Objdue = new Date(due);

    return now > Objdue;
}

/**
 * @param {string} due 
 * @return {int} Number representing the days to or since assignment due date.
 */

function dateUntilOrDateSinceDue(due) {
    let day = 24 * 60 * 60 * 1000;
    let now = new Date(Date.now());
    let Objdue = new Date(due);

    if (!assignmentPastDue(due)) {
        return Math.round((Objdue - now) / day);
    } else {
        return Math.round((now - Objdue) / day)
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

/**
 * Generates a table full months and their responding month numbers and day counts.
 */

function setupTable() {

    let table = document.getElementsByClassName('js-table')[0];
    let border_style = '1px solid black';
    let months = [
        [1, 'January', 31],
        [2, 'February', 29],
        [3, 'March', 31],
        [4, 'April', 30],
        [5, 'May', 31],
        [6, 'June', 30],
        [7, 'July', 31],
        [8, 'August', 31],
        [9, 'September', 30],
        [10, 'October', 31],
        [11, 'November', 30],
        [12, 'December', 31]
    ];

    table.style.border = border_style;

    for (let i = 1; i <= ROWS; i++) {
        let newRow = table.insertRow(i);
        newRow.style.border = border_style;

        for (let j = 0; j < COLS; j++) {
            let newTD = newRow.insertCell(j);

            newTD.innerText = months[i - 1][j];
            newTD.style.border = border_style;

            if (!(j % 2)) newTD.style.textAlign = 'center';
        }
        if (i % 2) {
            newRow.style.background = '#d3d3d3';
        }

    }
}


//Wait until DOM is loaded to exectue JS.
document.addEventListener('DOMContentLoaded', function () {

    setupTimeDiv();

    setupDateDiv();

    setupTable();

    // Logic to check if the assignment is past due
    let assignment_time = document.getElementsByClassName('assignment-time')[0];
    let due = 'April 23, 2018 11:59:00';
    let assignmentTimeString = '';
    if (!assignmentPastDue(due)) {
        assignmentTimeString += 'Days until assignment is due: ';
    } else {
        assignmentTimeString += 'Days since assignment was due: ';
    }

    assignmentTimeString += dateUntilOrDateSinceDue(due);

    assignment_time.innerHTML = assignmentTimeString;

});