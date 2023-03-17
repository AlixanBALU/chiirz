// Redirect between city page
const redirectCity = document.querySelector('#redirectCity');
try {
  redirectCity.addEventListener('change', (event) => {
    window.open('/city/'+event.target.value, '_self');
  });
}
catch(error) {
    console.log("Redirect city not found : Are you in the city page ? ; \n", error);
}