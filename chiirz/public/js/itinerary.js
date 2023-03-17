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