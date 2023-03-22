// New itinaraary page


function initMap() {

    const jsonBar = {
        "numberOfSteps" : 0,
        "steps" : []
    } 

    const Position = {
        paris : new google.maps.LatLng(48.8566, 2.3522),
        lyon : new google.maps.LatLng(45.7640, 4.8357),
        strasbourg : new google.maps.LatLng(48.5734, 7.7521),
    }

    // On relie les pos à leur identifier
    const jsonPos = {
        '1' : Position.paris,
        '2' : Position.lyon,
        '3' : Position.strasbourg
    }

    const barNameInput = document.querySelector('#barNameInput');
    const citySelect = document.querySelector('#itinerary_fk_city');
    const barList = document.querySelector('#barList');

    const linkToPosImg = document.querySelector('#linkToPosImg').dataset.link;
    const linkToPinImg = document.querySelector('#linkToPosImg').dataset.pin;
    const linkToCityImg = document.querySelector('#linkToPosImg').dataset.city;
    
    const map = new google.maps.Map(document.querySelector('#newMap'), {
        center: jsonPos[citySelect.value],
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false
    });

    // lancement du service 'Places' pour les requêtes
    const service = new google.maps.places.PlacesService(map);
    let markers = [];

    barNameInput.addEventListener('input', function (e) {
        googleApiSearch(e.target.value, jsonPos[citySelect.value], barList);
    });

    citySelect.addEventListener('change', function (e) {
        if (barNameInput.value != "") {
            googleApiSearch(barNameInput.value, jsonPos[e.target.value], barList);
        }
        map.setCenter(jsonPos[e.target.value]);

        // On reset le json
        jsonBar.numberOfSteps = 0;
        jsonBar.steps = [];
        printSelectedBar();
    });

    // Permet d'initialiser tout les boutons 'ajouter'
    function initAddButton() {
        let addBarBtn = document.querySelectorAll('#addBarBtn');

        addBarBtn.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                // On vide tout les champs
                barNameInput.value = "";
                barList.innerHTML = "";

                let placeId = e.target.parentElement.parentElement.dataset.placeid
                let imgArray = [];

                // On recupere les images
                const imagesRequest = {
                    placeId : placeId,
                    fields : ['photos']
                }

                service.getDetails(imagesRequest, (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        // On recupere les 10 premieres photos
                        const photos = place.photos;
                        for (let i = 0; i < 10; i++) {
                            try {
                                const photoUrl = photos[i].getUrl();
                                imgArray.push(photoUrl);
                            }
                            catch(e) {
                                if (i === 0) {
                                    imgArray.push(linkToCityImg);
                                }
                                console.log(i + " photo recupérées");
                            }
                        }
                    }
                });

                // On ajoute le bar à l'itinéraire
                jsonBar.numberOfSteps++;
                
                jsonBar.steps.push({
                    "name" : e.target.parentElement.parentElement.querySelector('.new__bar-input__prop__list__item__name').innerHTML,
                    "place_id" : placeId,
                    "lat" : e.target.parentElement.parentElement.dataset.lat,
                    "lng" : e.target.parentElement.parentElement.dataset.lng,
                    "img" : imgArray
                });

                // On affiche les bars de l'itinéraire
                printSelectedBar();
            });
        });
    }

    function printSelectedBar() {
        let barStepList = document.querySelector('#barStepList');
        barStepList.innerHTML = "";

        jsonBar.steps.forEach(function (bar, i) {
            barStepList.innerHTML += `
            <li class="new__step__list__item">
                <div class="new__step__list__item__bar">
                    <div class="new__step__list__item__bar__step">Étape ${i + 1} : </div>
                    <div class="new__step__list__item__bar__name">${bar.name}</div>
                </div>
                <div class="new__step__list__item__btn">
                    <button class="btn btn--secondary" id="deleteBarBtn">Supprimer</button>
                </div>
            </li>`;
        });

        // On definit la distance du parcours
        calculateRouteLength(jsonBar);

        initDeleteBar();
    }

    function initDeleteBar() {
        let deleteBarBtn = document.querySelectorAll('#deleteBarBtn');

        deleteBarBtn.forEach(function (btn) {
            btn.addEventListener('click', function (e) {

                // On supprime le bar de l'itinéraire
                jsonBar.numberOfSteps--;
                jsonBar.steps.splice(e.target.parentElement.parentElement.dataset.index, 1);
                printSelectedBar();
            });
        });
    }

    function googleApiSearch(value, city, barList) {   

        let nameArray = [];
        let locationArray = [];
        let placeIdArray = [];
        let latArray = [];
        let lngArray = [];

        let googleSearchRequest = {
            location: city,
            query : value,
            radius: '4000',
            type: ['bar'],
            fields: ['name', 'place_id', 'formatted_address', 'geometry']
        };

        // Tableau des marqueurs
        markers = [];

        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }

        service.textSearch(googleSearchRequest, function (results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
        
                // boucle sur le tableau de lieux
                results.forEach(function (place, i) {  
                    if (i < 5 ) {
                        // On stock ca dans les array et enfin on les affiche pour economiser des requetes
                        nameArray.push(place.name);
                        locationArray.push(place.vicinity);
                        placeIdArray.push(place.place_id);

                        latArray.push(place.geometry.location.lat());
                        lngArray.push(place.geometry.location.lng());

    
                        // création d'un marqueur sur la carte
                        var marker = new google.maps.Marker({
                            map: map,
                            position: place.geometry.location,
                            icon: {
                                url: linkToPinImg,
                                scaledSize: new google.maps.Size(24, 24)
                            }
                        });
                        markers.push(marker);
                    }       
                });

                // On remplie nos listes
                nameArray = nameArray.slice(0, 5);
                locationArray = locationArray.slice(0, 5);
                placeIdArray.slice(0, 5);
                latArray.slice(0, 5);
                lngArray.slice(0, 5);

                // On vide la liste
                barList.innerHTML = "";

                // On ajoute les éléments
                nameArray.forEach(function (name, i) {
                    barList.innerHTML += "<li class='new__bar-input__prop__list__item' data-lat='" + latArray[i] +"' data-lng='" + lngArray[i] +"' data-placeid='" + placeIdArray[i] + "'><div class='new__bar-input__prop__list__item__name'>" + name + "</div><div class='new__bar-input__prop__list__item__address'><img src='" + linkToPosImg + "' alt=''><div></div><div class='new__bar-input__prop__list__item__address__add' id='addBarBtn'>+</div></div></li>";
                });

                // On ajoute la fonctionnalité 'ajouter' aux boutons
                initAddButton();
            }
        });
    }

    function calculateRouteLength(array) {
        const newDistance = document.querySelector('#newDistance');

        // Au cas ou il n'y a qu'un bar
        if (array.steps.length == 1) return '0.00km';

        let origin = {placeId: array.steps[0].place_id};
        let destination = {placeId: array.steps[array.steps.length - 1].place_id};

        
        let waypoints = [];

        if (array.steps.length > 2) {
            for (let i = 1; i <= array.steps.length - 2; i++) {
                waypoints.push(
                    {
                        location: {lat: parseFloat(array.steps[i].lat), lng: parseFloat(array.steps[i].lng)},
                        stopover: true
                    }
                );
            }
        }

        var directionsService = new google.maps.DirectionsService();

        var request = {
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            travelMode: 'WALKING',
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        };
        
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                let route = response.routes[0];
                let lengthInMeters = 0;

                for (let i = 0; i < route.legs.length; i++) {
                    lengthInMeters += route.legs[i].distance.value;
                }
                let lengthInKm = lengthInMeters / 1000;

                newDistance.innerHTML = parseFloat(lengthInKm.toFixed(1)) + ' km';
            }
        });
    }

    function ajaxSendItinerary() {
        let img = document.querySelector('#newImg');

        const imagesRequest = {
            placeId : placeId,
            fields : ['photos']
        }

        service.getDetails(imagesRequest, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                // On recupere les 10 premieres photos
                const photos = place.photos;
                for (let i = 0; i < 10; i++) {
                    try {
                        const photoUrl = photos[i].getUrl();
                        imgArray.push(photoUrl);
                    }
                    catch(e) {
                        if (i === 0) {
                            imgArray.push(linkToCityImg);
                        }
                        console.log(i + " photo recupérées");
                    }
                }
            }
        });
    }

    // function calculerDistanceTotal(array) {
    //     const service = new google.maps.DirectionsService();
    //     let routeWaypoints = [];
      
    //     // On utilise promises pour attendre que toutes les requêtes soient terminées
    //     const promises = array.steps.slice(1, -1).map(step => {
    //         return new Promise((resolve, reject) => {
    //             let placeId = step.place_id;
    //             let placeService = new google.maps.places.PlacesService(map);
    //             placeService.getDetails({ placeId: placeId }, function (result, status) {
    //                 if (status === google.maps.places.PlacesServiceStatus.OK) {
    //                     let latlng = result.geometry.location;
    //                     routeWaypoints.push({
    //                         location: latlng,
    //                         stopover: true
    //                     });
    //                     resolve();
    //                 } 
    //             });
    //         });
    //     });
      
    //     // On attend que toutes les promesses soient résolues
    //     Promise.all(promises).then(() => {
    //         console.log(routeWaypoints);
    //         let routeOrigin = {placeId: array.steps[0].place_id};
    //         let routeDestination = {placeId: array.steps[array.steps.length - 1].place_id};
        
    //         const request = { 
    //             origin: routeOrigin,
    //             destination: routeDestination,
    //             waypoints: routeWaypoints,
    //             travelMode: 'WALKING',
    //             unitSystem: google.maps.UnitSystem.METRIC,
    //             avoidHighways: false,
    //             avoidTolls: false
    //         };
      
    //         service.route(request, function(result, status) {
    //             if (status == "OK") {
    //                 console.log(result.routes[0].legs[0].distance.text);
    //                 return result.routes[0].legs[0].distance.text;
    //             } 
    //             else {
    //                 console.error('Impossible de recuperer la route');
    //                 return 'Erreur';
    //             }
    //         });
    //     });
      
    // }
    // function calculerDistanceTotal(array) {

    //     console.log(array)

    //     // const dataCity = input.dataset.city;
        
    //     const service = new google.maps.DirectionsService();
    //     let routeWaypoints = [];

    //     for (let i = 0; i < array['steps'].length - 1; i++) {
    //         if (i !== 0 || i !== array['steps'].length - 1) {
    //             // routeWaypoints.push({placeId: array['steps'][i]['place_id'], stopover: true})
    //             let placeId = array['steps'][i]['place_id'];

    //             // Utilisez l'API Google Places pour obtenir les coordonnées géographiques du lieu
    //             let placeService = new google.maps.places.PlacesService(map);
    //             placeService.getDetails({ placeId: placeId }, function (result, status) {
    //                 if (status === google.maps.places.PlacesServiceStatus.OK) {
    //                     let latlng = result.geometry.location;
    //                     routeWaypoints.push({
    //                         location: latlng,
    //                         placeId: placeId,
    //                         stopover: true
    //                     });
    //                 }
    //             });
    //         }
    //     }

    //     console.log('waypoints', routeWaypoints);

    //     let routeOrigin = {placeId: array['steps'][0]['place_id']};
    //     let routeDestination = {placeId: array['steps'][array['steps'].length - 1]['place_id']};
    
    //     const request = {
    //         origin: routeOrigin,
    //         destination: routeDestination,
    //         waypoints: routeWaypoints,
    //         // waypoints: [waypoint1, waypoint2],
    //         travelMode: 'WALKING',
    //         unitSystem: google.maps.UnitSystem.METRIC,
    //         avoidHighways: false,
    //         avoidTolls: false
    //     };
    
    //     service.route(request, function(result, status) {
    //         if (status == "OK") {
    //             return result.routes[0].legs[0].distance.text;
    //         }
    //         else {
    //             throw new console.error('Impossible de recuperer la route');
    //         }
    //     });

    // }    
}