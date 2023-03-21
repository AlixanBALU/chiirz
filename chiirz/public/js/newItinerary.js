// New itinaraary page


function initMap() {

    const jsonBar = {
        "numberOfSteps" : 0,
        "steps" : []
    } 

    // "name" : "Brasserie du Haras",
    // "place_id" : "ChIJMeZc_bLJlkcRmWB8Ns6akSo",
    // "img" : [
    //     "https://lh5.googleusercontent.com/p/AF1QipP3rZ7RtDKzASXQOCVFo5fFm9NE0nSGChkLZvsT=w426-h240-k-no",
    //     "https://lh5.googleusercontent.com/p/AF1QipPlPFQREbfq98X0-toVSQCO0QACHSRl5xBr86Pz=w408-h272-k-no",
    //     "https://lh5.googleusercontent.com/p/AF1QipNlHDYIcKKWqVnH6PBA8mG_yhHn9S5qGfrRBTnC=w408-h272-k-no",
    //     "https://lh5.googleusercontent.com/p/AF1QipPVywS9k7-EDVefG4tOG-71P6HpHjqzldW41_ew=w408-h272-k-no"
    // ]

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

    const map = new google.maps.Map(document.querySelector('#newMap'), {
        center: jsonPos[citySelect.value],
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false
    });

    // lancement du service 'Places' pour les requêtes
    const service = new google.maps.places.PlacesService(map);

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
                        for (let i = 0; i < 10 && i < photos.length; i++) {
                            const photoUrl = photos[i].getUrl();
                            imgArray.push(photoUrl);
                        }
                    }
                });

                // On ajoute le bar à l'itinéraire
                jsonBar.numberOfSteps++;
                
                jsonBar.steps.push({
                    "name" : e.target.parentElement.parentElement.querySelector('.new__bar-input__prop__list__item__name').innerHTML,
                    "place_id" : placeId,
                    "img" : imgArray
                });
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
            </li>
            `;
        });

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

        let googleSearchRequest = {
            location: city,
            query : value,
            radius: '4000',
            type: ['bar'],
            fields: ['name', 'place_id', 'formatted_address', 'geometry'],
            maxResults: 5
        };

        service.textSearch(googleSearchRequest, function (results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
        
                // boucle sur le tableau de lieux
                results.forEach(function (place, i) {  
                    if (i < 5 ) {
                        // On stock ca dans les array et enfin on les affiche pour economiser des requetes
                        nameArray.push(place.name);
                        locationArray.push(place.vicinity);
                        placeIdArray.push(place.place_id);
    
                        // création d'un marqueur sur la carte
                        var marker = new google.maps.Marker({
                            map: map,
                            position: place.geometry.location,
                            icon: {
                                url: linkToPinImg,
                                scaledSize: new google.maps.Size(24, 24)
                            }
                        });
                    }       
                });

                // On remplie nos listes
                nameArray = nameArray.slice(0, 5);
                locationArray = locationArray.slice(0, 5);
                placeIdArray.slice(0, 5);

                // On vide la liste
                barList.innerHTML = "";

                // On ajoute les éléments
                nameArray.forEach(function (name, i) {
                    barList.innerHTML += "<li class='new__bar-input__prop__list__item' data-placeid='" + placeIdArray[i] + "'><div class='new__bar-input__prop__list__item__name'>" + name + "</div><div class='new__bar-input__prop__list__item__address'><img src='" + linkToPosImg + "' alt=''><div></div><div class='new__bar-input__prop__list__item__address__add' id='addBarBtn'>+</div></div></li>";
                });

                // On ajoute la fonctionnalité 'ajouter' aux boutons
                initAddButton();
            }
        });
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
}