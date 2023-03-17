// Redirect between city page
const redirectCity = document.querySelector('#redirectCity');
  redirectCity.addEventListener('change', (event) => {
    window.open('/city/'+event.target.value, '_self');
  });