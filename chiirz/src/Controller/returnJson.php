<?php 

    // On définit un tableau qui détaille les informations de connexion
    $config = array(
        'driver' => 'mysql',
        'serveur' => 'localhost:3306',
        'base' => 'chiirzdb',
        'utilisateur' => 'root',
        'mdp' => ''
    );

    $id = $_GET['id'] ?? '';

    // indique qu'on utilise la variable globale $config, définie dans le fichier 'config.php'
    // (sinon $config serait une variable locale uniquement définie dans cette fonction et donc vide)
    
    var_dump($config);
    // connexion en utilisant les informations stockées dans la variable $config
    $pdo = new PDO($config['driver'].':host='.$config['serveur'].';dbname='.$config['base'].';charset=utf8', $config['utilisateur'], $config['mdp']);
    
    
    // test de la variable PDO et renvoi de sa valeur
    if ($pdo) {
        return $pdo;
    } else {
        echo '<p>Connexion impossible !</p>';
        exit; // arrêt des scripts PHP
    }
    // définition de la requête SQL avec un paramètre :valeur
    $sql= 'select bar from itinerary where id = :valeur';
    
    // préparation de la requête
    $query = $pdo->prepare($sql);
    
    // on lie le paramètre :valeur à la variable $id reçue
    $query->bindValue(':valeur', $id, PDO::PARAM_INT);
    
    // exécution de la requête
    $query->execute();
    
    // récupération de l'unique ligne
    $objet = $query->fetchObject('itinerary');
    
    // retourne l'objet contenant résultat
    echo $objet;

    // FIN DE PDO 
    $pdo = null
?> 