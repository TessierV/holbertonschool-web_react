import $ from 'jquery';
import _ from 'lodash';



function updateCounter() {
    let count = $('#count').text();
    count = parseInt(count) + 1;
    $('#count').text(`${count} clicks on the button`);
}

const debouncedUpdateCounter = _.debounce(updateCounter, 500);

$(document).ready(function () {
    $('body').append('<p>Holberton Dashboard</p>');
    $('body').append('<p>Dashboard data for the students</p>');
    $('body').append('<button id="start-btn">Click here to get started</button>');
    $('body').append('<p id="count"></p>');
    $('body').append('<p>Copyright - Holberton School</p>');

    $('#start-btn').on('click', debounce(updateCounter, 500));
});
