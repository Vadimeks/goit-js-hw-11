import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = this.elements.delay;
  const stateRadios = this.elements.state;
  const delay = Number(delayInput.value);
  let selectedState = null;

  for (const radio of stateRadios) {
    if (radio.checked) {
      selectedState = radio.value;
      break;
    }
  }

  if (isNaN(delay)) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a valid delay in milliseconds',
      position: 'topRight',
    });
    return;
  }

  if (!selectedState) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please select the state of the promise (Fulfilled or Rejected)',
      position: 'topRight',
    });
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState === 'fulfilled') {
        resolve(delay);
      } else if (selectedState === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(resolvedDelay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${resolvedDelay}ms`,
        position: 'topRight',
      });
    })
    .catch(rejectedDelay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${rejectedDelay}ms`,
        position: 'topRight',
      });
    });

  this.reset();
});
