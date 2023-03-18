// Fonction principale avec laquelle on recupere le itineraryJson
function getItinerary(itineraryJson) {
    // ...
    console.log('toto');
}


// back button
const backButton = document.querySelector('#backButton');

backButton.addEventListener('click', () => {
    history.back()
});

// Splide js
import Splide from 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js';

new Splide( '.splide' ).mount();