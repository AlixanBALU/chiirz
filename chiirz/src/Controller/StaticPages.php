<?php
namespace App\Controller;
 
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
 
class StaticPages extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function home(): Response
    {
        $titre = 'Bienvenue';
 
        return $this->render('home.html.twig', [
            'titre' => $titre
        ]);
    }

    /** 
     * @Route("/itinerary/get_bar/{id}", name="get_bar") 
    */ 
    public function getBar($id)
    {
        // Get the 'bar' field from the 'itinerary' table
        $entityManager = $this->getDoctrine()->getManager();
        $query = $entityManager->createQueryBuilder()
            ->select('i.bar')
            ->from('App\Entity\Itinerary', 'i')
            ->where('i.id = :id')
            ->setParameter('id', $id)
            ->getQuery();
        $bars = $query->getResult();

        // Convert the results to a JSON response
        $response = new JsonResponse($bars);

        return $response;
    }

    /** 
     * @Route("/itinerary/insert_bar/{id}", name="insert_bar") 
    */ 
    public function insertBar($id)
    {

        // Get the JSON data from the request body
        $json = file_get_contents('php://input');

        // Decode the JSON data into a PHP associative array
        $data = json_decode($json, true);

        $img = $data["img"];
        $name = $data["name"];
        $fk_city_id = $data["fk_city_id"];
        $distance = $data["distance"];
        $fk_user_id = $data["fk_user_id"];
        $bar = $data["bar"];



        $entityManager = $this->getDoctrine()->getManager();
        $queryBuilder = $entityManager->createQueryBuilder()
            ->insert('App\Entity\Itinerary', 'i')
            ->set('i.img', ':img')
            ->setParameter('img', $img)
            ->set('i.name', ':name')
            ->setParameter('name', $name)
            ->set('i.fk_city_id', ':fk_city_id')
            ->setParameter('fk_city_id', $fk_city_id)
            ->set('i.distance', ':distance')
            ->setParameter('distance', $distance)
            ->set('i.fk_user_id', ':fk_user_id')
            ->setParameter('fk_user_id', $fk_user_id)
            ->set('i.bar', ':bar')
            ->setParameter('bar', $bar);

        $query = $queryBuilder->getQuery();
        $query->execute();
    }
}