function initMap() {
    // position pour centrer la carte
    const myLatlng = new google.maps.LatLng(48.816475, 7.786471);
   
    // création d'une carte
    const map = new google.maps.Map(document.getElementById('carte'), {
      center: myLatlng,
      zoom: 15
    });
   
    // lancement du service 'Places' pour les requêtes
    const service = new google.maps.places.PlacesService(map);

    
   
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
            console.log(place);
            
            div.innerHTML += '<p>'+place.name+' ('+place.photos[0].getUrl()+')</p>';
    
            // création d'un marqueur sur la carte
            var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
            });
        });
        }
    });

    const request_id = {
        // Stocker dans la base de donnée le placeId. 
        placeId: 'ChIJexFvnNnqlkcRzRaRygzL6Lc'
      };
       
    service.getDetails(request_id, function (place, status) {
        // pour comprendre ce qui est obtenu
        console.log("place : ");
        console.log(place);
       
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          // récupération d'un élément pour l'affichage
          const div = document.getElementById('info');
       
          // génération de l'affichage
          div.innerHTML += '<p><strong>' + place.name + '</strong></p>' +
            '<p>Adresse :' + place.formatted_address + '</p>';
        }
    });
}