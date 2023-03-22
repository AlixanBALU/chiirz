<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use App\Entity\Itinerary;
use App\Entity\City;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;

 
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
    public function insertBar($id, EntityManagerInterface $entityManager)
    {

        // Get the JSON data from the request body
        $json = file_get_contents('php://input');

        // Decode the JSON data into a PHP associative array
        $data = json_decode($json, true);

        $img = $data["img"];
        $text = $data["text"];
        $name = $data["name"];
        $distance = $data["distance"];
        $bar = $data["bar"];

        $fk_city_id = $data["fk_city_id"];
        $city = $entityManager->getRepository(City::class)->find($fk_city_id);

        $fk_user_id = $data["fk_user_id"];
        $user = $entityManager->getRepository(User::class)->find($fk_user_id);

        $entityManager = $this->getDoctrine()->getManager();

        $itinerary = new Itinerary();
        $itinerary->setImg($img);
        $itinerary->setText($text);
        $itinerary->setName($name);
        $itinerary->setFkCity($city);
        $itinerary->setDistance($distance);
        $itinerary->setFkUser($user);
        $itinerary->setBar($bar);

        return new Response($itinerary->getImg());

        $entityManager->persist($itinerary);
        $entityManager->flush();

        return new Response('Saved new itinerary with img '.$itinerary->getImg());
    }
}