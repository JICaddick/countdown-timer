let countdown; // global variable to store the setInterval method - It lives on the window object.
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    // Date.now is a static method that returns the current timestamp in milliseconds.
    // switch milliseconds to seconds
    // display time left
    // setInterval doesn't run immediately, it waits for the first interval to pass before running (if the first interval is 1 second, it will wait 1 second before running).
    // check if we should stop it! clearInterval is a static method that stops the setInterval method.
    // when we start a new timer, we want to clear the old one. Now, if there's a timer in countdown, it will clear it.
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);


    // modulo operator returns the remainder of the division (the seconds left over).
    // if there are less than 10 seconds left we'll return a 0 before the seconds.
    // document.title is the title tag of the page in our HTML.
    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
        timerDisplay.textContent = display;
        document.title = display;
    }
}

// funnily, new Data actually gives us the milliseconds that have elapsed since January 1st 1970. You can pass new date the number of milliseconds you want to start from/ convert and it will give you the date. There's also getHours, getMinutes, getSeconds, getDay, getMonth, getFullYear, getMilliseconds.
function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    // this.dataset gives us an object with all the data attributes on the element.
    // this.dataset.time gives us a string of the number of seconds.
    // parseInt converts the string to a number.
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

// here, e.preventDefault() prevents the default behavior of the form (which is to refresh the page).
buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
});

// stretch goals: add some animations/ more interactions/ features. Switch minutes to hours is > 60 on custom form. 