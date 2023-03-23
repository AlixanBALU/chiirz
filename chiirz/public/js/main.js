// function initMap() {
//   // position pour centrer la carte
//   const myLatlng = new google.maps.LatLng(48.816475, 7.786471);
 
//   // création d'une carte
//   const map = new google.maps.Map(document.getElementById('carte'), {
//     center: myLatlng,
//     zoom: 15
//   });
 
//   // lancement du service 'Places' pour les requêtes
//   const service = new google.maps.places.PlacesService(map);

  
 
//   // ... requêtes et affichage ...

//   // position autour de laquelle la recherche est effectuée
//   var iut = new google.maps.LatLng(48.816475, 7.786471);
  
//   // Requête par type de lieu (restaurant 2km autour de l'IUT)
//   var request = {
//   location: iut,
//   radius: '2000',
//   type: 'restaurant'
//   };
  
//   // Une autre requête
//   var request = {
//   location: iut,
//   radius: '2000',
//   type: 'restaurant',
//   keyword: 'palais' // Permet de faire une recherche google maps sur le mot palais. 
//   };

//   // exécution de la requête
//   service.nearbySearch(request, function (results, status) {
//       if (status == google.maps.places.PlacesServiceStatus.OK) {
//       // récupération d'un élément pour générer l'affichage
//       const div = document.getElementById('places');
  
//       // boucle sur le tableau de lieux
//       results.forEach(function (place) {
//           console.log("Near by Search");
//           console.log(place);
          
//           // Récupère le nom du restaurant
//           div.innerHTML += '<p>'+place.name+'</p>';

//           // Price level 
//           div.innerHTML += '<p>Price level : '+place.price_level+'</p>';

//           // Note du restaurant.
//           div.innerHTML += '<p>Note du restaurant :'+ place.rating +'</p>';
          
//           let ouverture;
//           if (place.opening_hours.open_now) {
//             ouverture = "Ouvert";
//           } else {
//             ouverture = "Fermée";
//           }

//           // Ouverture du restaurant :
//           div.innerHTML += '<p>' + ouverture +'</p>';

//           // Place id 
//           div.innerHTML += '<p>' + place.place_id +'</p>';

//           // récupère la première photo du restaurant
//           div.innerHTML += '<img height ="200" width="200" src="'+place.photos[0].getUrl()+'" alt="'+place.name+'">';
  
//           // création d'un marqueur sur la carte
//           var marker = new google.maps.Marker({
//           map: map,
//           position: place.geometry.location
//           });
//       });
//       }
//   });

//   const request_id = {
//       // Stocker dans la base de donnée le placeId. 
//       placeId: 'ChIJ6VN-xNjqlkcRQM9OJ4zsbFI'
//     };
     
//   service.getDetails(request_id, function (place, status) {
//       // pour comprendre ce qui est obtenu
//       console.log("place : ");
//       console.log(place);
     
//       if (status == google.maps.places.PlacesServiceStatus.OK) {
//         // récupération d'un élément pour l'affichage
//         const div = document.getElementById('info');
     
//         // génération de l'affichage
//         div.innerHTML += '<p><strong>' + place.name + '</strong></p>' +
//           '<p>Adresse : ' + place.formatted_address + '</p>';
//         div.innerHTML += '<p>Description du lieu :' + place.formatted_address + '</p>';

//         // Numéro de téléphone internationnal
//         div.innerHTML += '<p>Numéro de téléphone :'+ place.international_phone_number +'</p>';
//         div.innerHTML += '<a href="https://maps.google.com/?cid=5939382095293894464">Voir sur google map</a>';

//         // Commentaires
//         place.reviews.forEach(function(review){
//           div.innerHTML += '<h1>'+review.author_name+'</h1>';
//           div.innerHTML += '<img src="'+review.profile_photo_url+'" alt="Photo de profil de '+review.author_name+'" height="100" width="100">';
//           div.innerHTML += '<p>Commentaire : '+review.text+'</p>';
//           div.innerHTML += '<p>Rating : '+review.rating+'</p>';
//         });
//         div.innerHTML += "fin de place détail";
//         // Gestion de l'heure : 
//         const today = new Date().getDay();
//         const openingHours = place.opening_hours;
//         div.innerHTML += openingHours;
//         const todayHours = openingHours.weekday_text[today];
//         const closingTime = todayHours.split(': ')[1];

//         const currentDate = new Date().toLocaleDateString();
//         const currentDay = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'][new Date().getDay()];
//         const dateTimeString = `${currentDate}, ${currentDay} ${closingTime}`;
//         div.innerHTML += '<h1>Heure d\'ouverture : '+ dateTimeString +'</h1>';

//       }
//   });

//   // Gestion des distances avec ou sans des étapes | waypoint
//   // Doc sur l'api direction
//   // https://developers.google.com/maps/documentation/javascript/directions?hl=fr

//   function calculerDistance() {
//     const service = new google.maps.DirectionsService();
//     const origine = 'Paris, France';
//     const destination = 'Marseille, France';
//     const waypoint1 = {location: 'Toulouse, France', stopover: true};
//     const waypoint2 = {location: 'Strasbourg, France', stopover: true};
//     const div = document.getElementById('info');
  
//     const request = {
//       origin: origine,
//       destination: destination,
//       waypoints: [waypoint1, waypoint2],
//       travelMode: 'WALKING',
//       unitSystem: google.maps.UnitSystem.METRIC,
//       avoidHighways: false,
//       avoidTolls: false
//     };
  
//     service.route(request, function(result, status) {
//       if (status == "OK") {
//         const distance = result.routes[0].legs[0].distance.text;
//         const duration = result.routes[0].legs[0].duration.text;
//         div.innerHTML+= "Distance: " + distance + ", Durée: " + duration + "<hr>";
//       }
//     });
//   }
  
//   calculerDistance(); 
// }
