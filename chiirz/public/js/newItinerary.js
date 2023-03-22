// New itinaraary page


function initMap() {

    const jsonBar = {
        "numberOfSteps" : 0,
        "avgPrice" : 0,
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

    let priceTotal = 0;
    let priceIndex = 0;

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

    const sendBtn = document.querySelector('#sendBtn'); 
    sendBtn.addEventListener('click', function (e) {
        if (isFormValid()) ajaxSendItinerary()
    });

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
                    "price" : e.target.parentElement.parentElement.dataset.price,
                    "img" : imgArray
                });
            
                jsonBar['steps'].forEach(function (step) {
                    let price = parseInt(step.price)
                    if (!isNaN(price)) {
                        priceTotal += price;
                        priceIndex++;
                    }
                });
                jsonBar.avgPrice = Math.round(priceTotal / priceIndex);

                console.log(jsonBar)
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
        let priceArray = [];

        let googleSearchRequest = {
            location: city,
            query : value,
            radius: '4000',
            type: ['bar'],
            fields: ['name', 'place_id', 'formatted_address', 'geometry', 'price_level', 'rating', 'photos']
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
                        
                        priceArray.push(place.price_level);
    
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
                    barList.innerHTML += "<li class='new__bar-input__prop__list__item' data-price='" + priceArray[i] + "' data-lat='" + latArray[i] +"' data-lng='" + lngArray[i] +"' data-placeid='" + placeIdArray[i] + "'><div class='new__bar-input__prop__list__item__name'>" + name + "</div><div class='new__bar-input__prop__list__item__address'><img src='" + linkToPosImg + "' alt=''><div></div><div class='new__bar-input__prop__list__item__address__add' id='addBarBtn'>+</div></div></li>";
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

    function isFormValid() {
        // try {
            let img = jsonBar['steps'][0].img[0];
            let name = document.querySelector('#itinerary_name');
            let distance = document.querySelector('#newDistance').innerHTML;
            const userId = document.querySelector('#linkToPosImg').dataset.user;
    
            if (img == undefined || name.value == '' || distance == '' || userId == '') {
                alert('Veuillez remplir tous les champs')
                console.log(jsonBar, name.value, distance, userId)
                return false;
            }
            return true;
        // }
        // catch(err) {
        //     console.log(jsonBar, names.value, )
        //     alert('Veuillez remplir tous les champs')
        //     return false;
        // }
        
    }

    function ajaxSendItinerary() {

        let data = {
            'img': jsonBar['steps'][0].img[0],
            'name': document.querySelector('#itinerary_name').value,
            'fk_city_id': citySelect.value,
            'distance': document.querySelector('#newDistance').innerHTML,
            'fk_user_id': document.querySelector('#linkToPosImg').dataset.user,
            'bar': jsonBar
        }

        const url = window.location.href;
        const urlSegments = url.split("/");
        // ItineraryID -> Id de l'itinéraire. 
        const itineraryId = parseInt(urlSegments[urlSegments.length - 1]);
        

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log(this.readyState);
            if (this.readyState == 4 && this.status == 200) {
                const json = this.responseText;
                console.log(json);
                console.log('--------\nJSON loaded\n--------');

                return json;
            }
            else {
                console.log('Status:', xhr.status, xhr.statusText);
                console.log('Response:', xhr.responseText);
            }
        };
        xhr.onerror = function() {
            console.log('error');
        }
        xhr.open("POST", "./insert_bar/1", true);
        xhr.send(JSON.stringify(data));
    }
}