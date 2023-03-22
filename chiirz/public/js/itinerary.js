// Fonction principale avec laquelle on recupere le itineraryJson
function getItinerary(itineraryJson) {
    // ...
    // console.log('toto');
}


// back button
const backButton = document.querySelector('#backButton');

backButton.addEventListener('click', () => {
    history.back()
});

// Splide js

const splidesPics = document.querySelectorAll('#splidePics');
    splidesPics.forEach(splidePics => {
    new Splide(splidePics).mount();
});

new Splide('#carouselSteps', {
    drag: false,
}).mount();

function initMap() {
    /*
    *
    *   Cette fonction permet de récuperer en ajax les bars d'un itinaires stocker dans un json.
    * 
    */ 
    function getJsonBar() {
        const url = window.location.href;
        const urlSegments = url.split("/");
        // ItineraryID -> Id de l'itinéraire. 
        const itineraryId = parseInt(urlSegments[urlSegments.length - 1]);

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log(this.readyState);
            if (this.readyState == 4 && this.status == 200) {
                const json = JSON.parse(this.responseText);
                console.log(json);
                console.log('--------\nJSON loaded\n--------');
                afficheEtape(json);

            }
        };
        xhr.open("GET", "./get_bar/" + itineraryId, true);
        xhr.send();
    }

    let json = getJsonBar();

    // position pour centrer la carte
    const myLatlng = new google.maps.LatLng(48.816475, 7.786471);

    // création d'une carte
    const map = new google.maps.Map(document.getElementById('carte'), {
    center: myLatlng,
    zoom: 15
    });

    // lancement du service 'Places' pour les requêtes
    const service = new google.maps.places.PlacesService(map);

    async function afficheEtape(json) {
        const nbEtape = document.querySelectorAll(".stepIndex");
        const tel = document.querySelectorAll(".stepPhone");
        const noteMoyenne = document.querySelectorAll(".stepRateNumber");
        const nbNote = document.querySelectorAll(".stepOpinion");
        const isOpen = document.querySelectorAll(".stepIsOpen");
        const content = document.querySelectorAll(".divContent");
        const openGoogleMap = document.querySelectorAll(".stepName");
        
        for (let i = 0; i < nbEtape.length; i++) {
            const request_id = {
            placeId: json[0].bar.steps[i].place_id,
            };

            const place = new Promise((resolve, reject) => {
                service.getDetails(request_id, function (place, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        resolve(place);
                    } else {
                        reject(status);
                    }
                });
            });
            place.then((value) => {
                // Affichage des données reçues
                console.log("La valeur");
                console.log(value);

                // Placer le reste du code utilisant "place" ici
                let numTelephone = value.international_phone_number;
                let googleMapUrl = value.url;
                let openingHours = value.opening_hours;
                let reviews = value.reviews;
                console.log(numTelephone);
                tel[i].innerHTML += `<p>Numéro de téléphone : ${numTelephone}</p>`;

                // Commentaires
                if (!(typeof reviews === 'undefined')) {
                    let s= "";
                    s +='<section id="slide_comment" class="splide" aria-label="Slide sur les commentaires">'+
                        '<div class="splide__track">' +
                                '<ul class="splide__list">';
                    reviews.forEach(function(review){
                        s += '<li class="splide__slide">'
                        s += '<h4>'+review.author_name+'</h4>';
                        s += '<p>'+review.text+'</p>';
                        s += '<p>Rating : '+review.rating+'</p>';
                        s += '</li>';
                    });
                    s+= '</ul>' +
                        '</div>' +
                    '</section>';
                    content[i].innerHTML += s;
                    document.querySelectorAll('#slide_comment').forEach(slide => {
                        
                        new Splide(slide, {
                            type : "loop",
                            padding : "10rem",
                            pagination : false
                        }).mount();
                    });
                }
                
                openGoogleMap[i].href = value.url;
                console.log("lien google map :" +openGoogleMap[i].href);
                
                // Gestion de l'heure : 
                const today = new Date().getDay();
                
                const todayHours = openingHours.weekday_text[today];
                const closingTime = todayHours.split(': ')[1];
                const currentDate = new Date().toLocaleDateString();
                const currentDay = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'][new Date().getDay()];
                const dateTimeString = `${currentDate}, ${currentDay} ${closingTime}`;
                const c = 'Heure d\'ouverture : '+ dateTimeString ;
                isOpen[i].innerHTML = c;
                console.log(isOpen[i].innerHTML);
            });

            // const place = new Promise((resolve, reject) => {
            //     service.getDetails(request_id, function (place, status) {
            //       if (status === google.maps.places.PlacesServiceStatus.OK) {
            //         resolve(place);
            //       } else {
            //         reject(status);
            //       }
            //     });
            // });
              
            // place.then((value) => {
            //     // Affichage des données reçues
            //     console.log("La valeur est :");
            //     console.log(value);
            //     // Placer le reste du code utilisant "place" ici
            //     let numTelephone = value.international_phone_number;
            //     let googleMapUrl = value.url;
            //     let openingHours = value.opening_hours;
            //     let reviews = value.reviews;
            //     console.log(numTelephone);
            //     tel[i].innerHTML += `<p>Numéro de téléphone : ${numTelephone}</p>`;

            //     // Commentaires
            //     if (!(typeof reviews === 'undefined')) {
            //         let s= "";
            //         s +='<section id="slide_comment" class="splide" aria-label="Slide sur les commentaires">'+
            //             '<div class="splide__track">' +
            //                     '<ul class="splide__list">';
            //         reviews.forEach(function(review){
            //             s += '<li class="splide__slide">'
            //             s += '<h4>'+review.author_name+'</h4>';
            //             s += '<p>'+review.text+'</p>';
            //             s += '<p>Rating : '+review.rating+'</p>';
            //             s += '</li>';
            //         });
            //         s+= '</ul>' +
            //             '</div>' +
            //         '</section>';
            //         content[i].innerHTML += s;
            //         document.querySelectorAll('#slide_comment').forEach(slide => {
                        
            //             new Splide(slide, {
            //                 type : "loop",
            //                 padding : "10rem",
            //                 pagination : false
            //             }).mount();
            //         });
            //     }
                
                // openGoogleMap[i].href = value.url;
                // console.log("lien google map :" +openGoogleMap[i].href);
                
                // Gestion de l'heure : 
            //     const today = new Date().getDay();
                
            //     const todayHours = openingHours.weekday_text[today];
            //     const closingTime = todayHours.split(': ')[1];
            //     const currentDate = new Date().toLocaleDateString();
            //     const currentDay = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'][new Date().getDay()];
            //     const dateTimeString = `${currentDate}, ${currentDay} ${closingTime}`;
            //     const c = 'Heure d\'ouverture : '+ dateTimeString ;
            //     isOpen[i].innerHTML = c;
            //     console.log(isOpen[i].innerHTML);
            // }).catch((error) => {
            //     // Gérer l'erreur ici
            //     console.error(error);
            // });
            
        }
    }
    
    function afficheEtapeDisynchrone(json){
        // Nombre d'étape
        const nbEtape = document.querySelectorAll("#stepIndex");
        // Récupération des balises numéro de téléphone
        const tel = document.querySelectorAll("#stepPhone");
        // Récupération des balises noteMoyenne
        const noteMoyenne = document.querySelectorAll("#stepRateNumber");
        // Récupération des balises pour le nombre total de rate.
        const nbNote = document.querySelectorAll("#stepOpinion");
        // Récupération des balises pour l'heure d'ouverture.
        const isOpen = document.querySelectorAll("#stepIsOpen");
        // Récupération de div du contenu 
        const content = document.querySelectorAll("#divContent");
        const openGoogleMap = document.querySelectorAll("#stepName");
        for (let i=0; i<nbEtape.length; i++){
            const request_id = {
                // Stocker dans la base de donnée le placeId. 
                placeId: json[0].bar.steps[i].place_id
            };

            // Récupère PlaceId. 
            // placeId: barJson['steps'][i + 1]['place_id']

            service.getDetails(request_id, function (place, status) {
                // pour comprendre ce qui est obtenu
                // console.log("place : ");
                // console.log(place);
            
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    // récupération d'un élément pour l'affichage
                    // const div = document.getElementById('info');
                
                    // génération de l'affichage
                    // Nom du lieu et son adresse :
                    // div.innerHTML += '<p><strong>' + place.name + '</strong></p>' +
                    // '<p>Adresse : ' + place.formatted_address + '</p>';
                    // div.innerHTML += '<p>Description du lieu :' + place.formatted_address + '</p>';

                    // Numéro de téléphone internationnal
                    tel[i].innerHTML += '<p>Numéro de téléphone :'+ place.international_phone_number +'</p>';

                    // Lien : voir sur google map
                    // div.innerHTML += '<a href="https://maps.google.com/?cid=5939382095293894464">Voir sur google map</a>';

                    // Commentaires
                    if (!(typeof place.reviews === 'undefined')) {
                        let s= "";
                        s +='<section id="slide_comment" class="splide" aria-label="Slide sur les commentaires">'+
                            '<div class="splide__track">' +
                                    '<ul class="splide__list">';
                        place.reviews.forEach(function(review){
                            s += '<li class="splide__slide">'
                            s += '<h4>'+review.author_name+'</h4>';
                            s += '<p>'+review.text+'</p>';
                            s += '<p>Rating : '+review.rating+'</p>';
                            s += '</li>';
                        });
                        s+= '</ul>' +
                            '</div>' +
                        '</section>';
                        content[i].innerHTML += s;
                        document.querySelectorAll('#slide_comment').forEach(slide => {
                            
                            new Splide(slide, {
                                type : "loop",
                                padding : "10rem",
                                pagination : false
                            }).mount();
                        });
                    }

                    console.log("Lien d'origine" + openGoogleMap[i].href);
                    openGoogleMap[i].href = place.url;
                    console.log("lien google map :" +openGoogleMap[i].href);
                    
                    // Gestion de l'heure : 
                    const today = new Date().getDay();
                    const openingHours = place.opening_hours;
                    // div.innerHTML += openingHours;
                    const todayHours = openingHours.weekday_text[today];
                    const closingTime = todayHours.split(': ')[1];

                    const currentDate = new Date().toLocaleDateString();
                    const currentDay = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'][new Date().getDay()];
                    const dateTimeString = `${currentDate}, ${currentDay} ${closingTime}`;
                    const c = 'Heure d\'ouverture : '+ dateTimeString ;
                    isOpen[i].innerText = c;
                    console.log(isOpen[i].innerText);
                    
                }
            });
        }

    }
    
    /*
    // ... requêtes et affichage ...

    // position autour de laquelle la recherche est effectuée
    var iut = new google.maps.LatLng(48.816475, 7.786471);
    
    // Requête par type de lieu (restaurant 2km autour de l'IUT)
    var request = {
        location: iut,
        radius: '2000',
        type: 'restaurant'
    };
    
    // Une autre requête
    var request = {
        location: iut,
        radius: '2000',
        type: 'restaurant',
        keyword: 'palais' // Permet de faire une recherche google maps sur le mot palais. 
    };

    // exécution de la requête
    
    service.nearbySearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
        // récupération d'un élément pour générer l'affichage
        const div = document.getElementById('places');
    
        // boucle sur le tableau de lieux
        results.forEach(function (place) {
            // console.log("Near by Search");
            // console.log(place);
            
            // Récupère le nom du restaurant
            div.innerHTML += '<p>'+place.name+'</p>';

            // Price level 
            div.innerHTML += '<p>Price level : '+place.price_level+'</p>';

            // Note du restaurant.
            div.innerHTML += '<p>Note du restaurant :'+ place.rating +'</p>';
            
            let ouverture;
            if (place.opening_hours.open_now) {
              ouverture = "Ouvert";
            } else {
              ouverture = "Fermée";
            }

            // Ouverture du restaurant :
            div.innerHTML += '<p>' + ouverture +'</p>';

            // Place id 
            div.innerHTML += '<p>' + place.place_id +'</p>';

            // récupère la première photo du restaurant
            div.innerHTML += '<img height ="200" width="200" src="'+place.photos[0].getUrl()+'" alt="'+place.name+'">';
    
            // création d'un marqueur sur la carte
            var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
            });
        });
        }
    });
    */



    // Gestion des distances avec ou sans des étapes | waypoint
    // Doc sur l'api direction
    // https://developers.google.com/maps/documentation/javascript/directions?hl=fr

    function WriteItineraryArguments(barJson) {
        
        // On initialise les fields qui vont contenir nos données
        let lenghtField = document.querySelectorAll('#parcoursLength')
        let phoneField = document.querySelectorAll('#stepPhone')

        let rateField = document.querySelectorAll('#stepRate')
        let opinionField = document.querySelectorAll('#stepOpinion')

        let priceField = document.querySelectorAll('#stepPrice')
        let openField = document.querySelectorAll('#stepIsOpen')

        for (let i = 0; i < barJson['steps'].length - 1; i++) {

            // Longueur du parcours
            let routeOrigin = {placeId: barJson['steps'][i]['place_id']};
            let routeDestination = {placeId: barJson['steps'][i + 1]['place_id']};
        
            const request = {
                origin: routeOrigin,
                destination: routeDestination,
                travelMode: 'WALKING',
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
            };
        
            service.route(request, function(result, status) {
                if (status == "OK") {
                    console.log(result)
                    lengthField[i].innerHTML = result.routes[0].legs[0].distance.text;
                }
                else {
                    distanceArray.push('ERROR');
                }
            }); 
        }
        
        // const dataCity = input.dataset.city;

        let distanceArray = [];
        
        const service = new google.maps.DirectionsService();
        let routeWaypoints = [];

        

            let distance
            // dataCity.push(distance)


            // if (i !== 0 || i !== array['steps'].length - 1) {
            //     // routeWaypoints.push({placeId: array['steps'][i]['place_id'], stopover: true})
            //     let placeId = array['steps'][i]['place_id'];

            //     // Utilisez l'API Google Places pour obtenir les coordonnées géographiques du lieu
            //     let placeService = new google.maps.places.PlacesService(map);
            //     placeService.getDetails({ placeId: placeId }, function (result, status) {
            //         if (status === google.maps.places.PlacesServiceStatus.OK) {
            //             let latlng = result.geometry.location;
            //             routeWaypoints.push({
            //                 location: latlng,
            //                 placeId: placeId,
            //                 stopover: true
            //     });
            //     }
            // });
            // }
            
        // }

        // input.forEach(function (elem, i) {
        //     elem.innerHTML+= 'Input' + i;
        // });
    }

    function calculerDistanceTotal(array) {
        

        // const dataCity = input.dataset.city;
        
        const service = new google.maps.DirectionsService();
        let routeWaypoints = [];

        for (let i = 0; i < array['steps'].length - 1; i++) {
            if (i !== 0 || i !== array['steps'].length - 1) {
                // routeWaypoints.push({placeId: array['steps'][i]['place_id'], stopover: true})
                let placeId = array['steps'][i]['place_id'];

                // Utilisez l'API Google Places pour obtenir les coordonnées géographiques du lieu
                let placeService = new google.maps.places.PlacesService(map);
                placeService.getDetails({ placeId: placeId }, function (result, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        let latlng = result.geometry.location;
                        routeWaypoints.push({
                            location: latlng,
                            placeId: placeId,
                            stopover: true
                        });
                    }
                });
            }
        }

        console.log('waypoints', routeWaypoints);

        let routeOrigin = {placeId: array['steps'][0]['place_id']};
        let routeDestination = {placeId: array['steps'][array['steps'].length - 1]['place_id']};
    
        const request = {
            origin: routeOrigin,
            destination: routeDestination,
            waypoints: routeWaypoints,
            // waypoints: [waypoint1, waypoint2],
            travelMode: 'WALKING',
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        };
    
        service.route(request, function(result, status) {
            if (status == "OK") {
                return result.routes[0].legs[0].distance.text;
            }
            else {
                throw new console.error('Impossible de recuperer la route');
            }
        });

    }
    
    const jsonModel = {
        "numberOfSteps" : 8,
        "steps" : [
            {
                "name" : "Brasserie du Haras",
                "place_id" : "ChIJMeZc_bLJlkcRmWB8Ns6akSo",
                "img" : [
                    "https://lh5.googleusercontent.com/p/AF1QipP3rZ7RtDKzASXQOCVFo5fFm9NE0nSGChkLZvsT=w426-h240-k-no",
                    "https://lh5.googleusercontent.com/p/AF1QipPlPFQREbfq98X0-toVSQCO0QACHSRl5xBr86Pz=w408-h272-k-no",
                    "https://lh5.googleusercontent.com/p/AF1QipNlHDYIcKKWqVnH6PBA8mG_yhHn9S5qGfrRBTnC=w408-h272-k-no",
                    "https://lh5.googleusercontent.com/p/AF1QipPVywS9k7-EDVefG4tOG-71P6HpHjqzldW41_ew=w408-h272-k-no"
                ]
            },
            {
                "name" : "Le Meteor",
                "place_id" : "ChIJu0dm8oHJlkcRqXTYHkfYgK0",
                "img" : [
                    "https://lh5.googleusercontent.com/p/AF1QipP3rZ7RtDKzASXQOCVFo5fFm9NE0nSGChkLZvsT=w426-h240-k-no",
                    "https://lh5.googleusercontent.com/p/AF1QipPlPFQREbfq98X0-toVSQCO0QACHSRl5xBr86Pz=w408-h272-k-no",
                    "https://lh5.googleusercontent.com/p/AF1QipNlHDYIcKKWqVnH6PBA8mG_yhHn9S5qGfrRBTnC=w408-h272-k-no",
                    "https://lh5.googleusercontent.com/p/AF1QipPVywS9k7-EDVefG4tOG-71P6HpHjqzldW41_ew=w408-h272-k-no"
                ]
            },
            {
                "name" : "Au Brasseur",
                "place_id" : "ChIJN7WSOFTIlkcRnF8aSbkqvH0",
                "img" : [
                    "https://lh5.googleusercontent.com/p/AF1QipP3rZ7RtDKzASXQOCVFo5fFm9NE0nSGChkLZvsT=w426-h240-k-no",
                    "https://lh5.googleusercontent.com/p/AF1QipPlPFQREbfq98X0-toVSQCO0QACHSRl5xBr86Pz=w408-h272-k-no",
                    "https://lh5.googleusercontent.com/p/AF1QipNlHDYIcKKWqVnH6PBA8mG_yhHn9S5qGfrRBTnC=w408-h272-k-no",
                    "https://lh5.googleusercontent.com/p/AF1QipPVywS9k7-EDVefG4tOG-71P6HpHjqzldW41_ew=w408-h272-k-no"
                ]
            },
            {
                "name" : "Au Cèdre",
                "place_id" : "ChIJObNrNFXIlkcRtqb7ocKZgj0",
                "img" : [
                    "https://lh5.googleusercontent.com/p/AF1QipP3rZ7RtDKzASXQOCVFo5fFm9NE0nSGChkLZvsT=w426-h240-k-no",
                    "https://lh5.googleusercontent.com/p/AF1QipPlPFQREbfq98X0-toVSQCO0QACHSRl5xBr86Pz=w408-h272-k-no",
                    "https://lh5.googleusercontent.com/p/AF1QipNlHDYIcKKWqVnH6PBA8mG_yhHn9S5qGfrRBTnC=w408-h272-k-no",
                    "https://lh5.googleusercontent.com/p/AF1QipPVywS9k7-EDVefG4tOG-71P6HpHjqzldW41_ew=w408-h272-k-no"
                ]
            }
        ]
        
    } 
    
    // WriteItineraryArguments(jsonModel, 'parcoursLength');


    // calculerDistance(jsonModel, 'le');
    
    // // Initialize the Places service
    // const services = new google.maps.places.PlacesService(map);

    // // Define the search parameters
    // const stras  = new google.maps.LatLng(48.578063, 7.741058);
    // const requestas = {
    //     query: 'Au Brasseur',
    //     location: stras,
    //     radius: 2000,
    // };

    // // Perform the search and retrieve the first result
    // console.log(services);

    // services.textSearch(requestas, function(results, status) {
    //     console.log(results);

    // if (status === google.maps.places.PlacesServiceStatus.OK) {
    //     const placeId = results[0].place_id;
    //     console.log(results)
    //     // Use the place_id in your code
    // }
    // });




    
}






  