// imports
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// links for elements DOM
const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerInterval = null;
startButton.disabled = true;
//flatpickr init
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate && selectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
      userSelectedDate = null;
    } else if (selectedDate) {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

//click on Start and start timer
startButton.addEventListener('click', () => {
  if (userSelectedDate) {
    datetimePicker.disabled = true;
    startButton.disabled = true;

    timerInterval = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = userSelectedDate.getTime() - currentTime.getTime();

      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        datetimePicker.disabled = false;
        updateTimerDisplay({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        });
        iziToast.info({
          title: 'Info',
          message: 'Countdown finished',
          position: 'topRight',
        });
        return;
      }
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      updateTimerDisplay({
        days: addLeadingZero(days),
        hours: addLeadingZero(hours),
        minutes: addLeadingZero(minutes),
        seconds: addLeadingZero(seconds),
      });
    }, 1000);
  } else {
    iziToast.warning({
      title: 'Warning',
      message: 'Please select a future date first',
      position: 'topRight',
    });
  }
});
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysValue.textContent = days;
  hoursValue.textContent = hours;
  minutesValue.textContent = minutes;
  secondsValue.textContent = seconds;
}
