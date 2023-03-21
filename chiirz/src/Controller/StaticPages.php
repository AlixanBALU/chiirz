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
}