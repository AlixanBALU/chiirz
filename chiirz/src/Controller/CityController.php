<?php

namespace App\Controller;

use App\Entity\City;
use App\Form\CityType;
use App\Repository\CityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Common\Collections\Criteria;

#[Route('/city')]
class CityController extends AbstractController
{
    #[Route('/', name: 'app_city_index', methods: ['GET'])]
    public function index(CityRepository $cityRepository): Response
    {
        return $this->render('city/index.html.twig', [
            'cities' => $cityRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_city_new', methods: ['GET', 'POST'])]
    public function new(Request $request, CityRepository $cityRepository): Response
    {
        $city = new City();
        $form = $this->createForm(CityType::class, $city);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $cityRepository->save($city, true);

            return $this->redirectToRoute('app_city_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('city/new.html.twig', [
            'city' => $city,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_city_show', methods: ['GET', 'POST'])]
    public function show(City $city, CityRepository $cityRepository): Response
    {


        $itineraries = $city->getItineraries();
        $order = "views";


        if (isset($_POST["order"])) {
            $order = $_POST["order"];

            if (!isset($_POST["ascOrDesc"]) || $_POST["ascOrDesc"] == "ASC") {
                $isAsc = true;
                $orderBy = [$order => Criteria::ASC];
            }
            else {
                $isAsc = false;
                $orderBy = [$order => Criteria::DESC];
            }
            // On ordonne les itinéraires
            $criteria = Criteria::create()->orderBy($orderBy);
            $itineraries = $itineraries->matching($criteria);

        }
        else {
            if (!isset($_POST["ascOrDesc"]) || $_POST["ascOrDesc"] == "ASC") {
                $isAsc = true;
                $orderBy = [$order => Criteria::ASC];
            }
            else {
                $isAsc = false;
                $orderBy = [$order => Criteria::DESC];
            }
            // On ordonne les itinéraires
            $criteria = Criteria::create()->orderBy($orderBy);
            $itineraries = $itineraries->matching($criteria);
        }



        return $this->render('city/show.html.twig', [
            'isAsc' => $isAsc,
            'order' => $order,
            'city' => $city,
            'itineraries' => $itineraries,
            'cities' => $cityRepository->findAll(),
        ]);
    }

    #[Route('/{id}/edit', name: 'app_city_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, City $city, CityRepository $cityRepository): Response
    {
        $form = $this->createForm(CityType::class, $city);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $cityRepository->save($city, true);

            return $this->redirectToRoute('app_city_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('city/edit.html.twig', [
            'city' => $city,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_city_delete', methods: ['POST'])]
    public function delete(Request $request, City $city, CityRepository $cityRepository): Response
    {

        if ($this->isCsrfTokenValid('delete'.$city->getId(), $request->request->get('_token'))) {
            $cityRepository->remove($city, true);
        }

        return $this->redirectToRoute('app_city_index', [], Response::HTTP_SEE_OTHER);
    }
}
