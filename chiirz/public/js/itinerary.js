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

const jsonModel = {
    "numberOfSteps" : 8,
    "steps" : [
        {
            "name" : "Brasserie du Haras",
            "place_id" : "Place id de la brasserie du haras",
            "img" : [
                "https://lh5.googleusercontent.com/p/AF1QipP3rZ7RtDKzASXQOCVFo5fFm9NE0nSGChkLZvsT=w426-h240-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPlPFQREbfq98X0-toVSQCO0QACHSRl5xBr86Pz=w408-h272-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipNlHDYIcKKWqVnH6PBA8mG_yhHn9S5qGfrRBTnC=w408-h272-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPVywS9k7-EDVefG4tOG-71P6HpHjqzldW41_ew=w408-h272-k-no"
            ]
        },
        {
            "name" : "Le Meteor",
            "place_id" : "Place id du Meteor",
            "img" : [
                "https://lh5.googleusercontent.com/p/AF1QipP3rZ7RtDKzASXQOCVFo5fFm9NE0nSGChkLZvsT=w426-h240-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPlPFQREbfq98X0-toVSQCO0QACHSRl5xBr86Pz=w408-h272-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipNlHDYIcKKWqVnH6PBA8mG_yhHn9S5qGfrRBTnC=w408-h272-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPVywS9k7-EDVefG4tOG-71P6HpHjqzldW41_ew=w408-h272-k-no"
            ]
        },
        {
            "name" : "Au Brasseur",
            "place_id" : "Place id de Au Brasseur",
            "img" : [
                "https://lh5.googleusercontent.com/p/AF1QipP3rZ7RtDKzASXQOCVFo5fFm9NE0nSGChkLZvsT=w426-h240-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPlPFQREbfq98X0-toVSQCO0QACHSRl5xBr86Pz=w408-h272-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipNlHDYIcKKWqVnH6PBA8mG_yhHn9S5qGfrRBTnC=w408-h272-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPVywS9k7-EDVefG4tOG-71P6HpHjqzldW41_ew=w408-h272-k-no"
            ]
        },
        {
            "name" : "Au Cèdre",
            "place_id" : "Place id de Au Cèdre",
            "img" : [
                "https://lh5.googleusercontent.com/p/AF1QipP3rZ7RtDKzASXQOCVFo5fFm9NE0nSGChkLZvsT=w426-h240-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPlPFQREbfq98X0-toVSQCO0QACHSRl5xBr86Pz=w408-h272-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipNlHDYIcKKWqVnH6PBA8mG_yhHn9S5qGfrRBTnC=w408-h272-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPVywS9k7-EDVefG4tOG-71P6HpHjqzldW41_ew=w408-h272-k-no"
            ]
        },
        {
            "name" : "Brasserie du Haras",
            "place_id" : "Place id de la brasserie du haras",
            "img" : [
                "https://lh5.googleusercontent.com/p/AF1QipP3rZ7RtDKzASXQOCVFo5fFm9NE0nSGChkLZvsT=w426-h240-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPlPFQREbfq98X0-toVSQCO0QACHSRl5xBr86Pz=w408-h272-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipNlHDYIcKKWqVnH6PBA8mG_yhHn9S5qGfrRBTnC=w408-h272-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPVywS9k7-EDVefG4tOG-71P6HpHjqzldW41_ew=w408-h272-k-no"
            ]
        },
        {
            "name" : "Le Meteor",
            "place_id" : "Place id du Meteor",
            "img" : [
                "https://lh5.googleusercontent.com/p/AF1QipP3rZ7RtDKzASXQOCVFo5fFm9NE0nSGChkLZvsT=w426-h240-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPlPFQREbfq98X0-toVSQCO0QACHSRl5xBr86Pz=w408-h272-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipNlHDYIcKKWqVnH6PBA8mG_yhHn9S5qGfrRBTnC=w408-h272-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPVywS9k7-EDVefG4tOG-71P6HpHjqzldW41_ew=w408-h272-k-no"
            ]
        },
        {
            "name" : "Au Brasseur",
            "place_id" : "Place id de Au Brasseur",
            "img" : [
                "https://lh5.googleusercontent.com/p/AF1QipP3rZ7RtDKzASXQOCVFo5fFm9NE0nSGChkLZvsT=w426-h240-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPlPFQREbfq98X0-toVSQCO0QACHSRl5xBr86Pz=w408-h272-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipNlHDYIcKKWqVnH6PBA8mG_yhHn9S5qGfrRBTnC=w408-h272-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPVywS9k7-EDVefG4tOG-71P6HpHjqzldW41_ew=w408-h272-k-no"
            ]
        },
        {
            "name" : "Au Cèdre",
            "place_id" : "Place id de Au Cèdre",
            "img" : [
                "https://lh5.googleusercontent.com/p/AF1QipP3rZ7RtDKzASXQOCVFo5fFm9NE0nSGChkLZvsT=w426-h240-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPlPFQREbfq98X0-toVSQCO0QACHSRl5xBr86Pz=w408-h272-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipNlHDYIcKKWqVnH6PBA8mG_yhHn9S5qGfrRBTnC=w408-h272-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPVywS9k7-EDVefG4tOG-71P6HpHjqzldW41_ew=w408-h272-k-no"
            ]
        }
    ]
    
  }
  