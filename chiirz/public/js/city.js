// Redirect between city page
const redirectCity = document.querySelector('#redirectCity');
redirectCity.addEventListener('change', (event) => {
  window.open('/city/'+event.target.value, '_self');
});

const redirectOrder = document.querySelector('#redirectOrder');
redirectOrder.addEventListener('change', (event) => {
  redirectOrder.submit();
});

const btnOrder = document.querySelector('#ascOrDesc');
btnOrder.addEventListener('click', (event) => {
  
});