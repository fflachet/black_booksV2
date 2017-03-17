<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace LibraryBundle\Controller;

use LibraryBundle\Entity\Book;
use LibraryBundle\Entity\Copy;
use LibraryBundle\Entity\State;
use LibraryBundle\Entity\Status;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Description of ConsultingController
 *
 * @author vien34
 * @Route("/consulting")
 */
class ConsultingController extends Controller{
    
    /**
     * @Route("/states")
     * @Method({"GET"})
     */
    public function getState() {
        $states = $this->getDoctrine()->getRepository(State::class)->findAll();
        return new JsonResponse($states);
    }
    
    /**
     * @Route("/status")
     * @Method({"GET"})
     */
    public function getStatus() {
        $status = $this->getDoctrine()->getRepository(Status::class)->findAll();
        return new JsonResponse($status);
    }
    
   /**
     * @Route("/")
     * @Method({"GET"})
     */
   public function getView() {
        return $this->render("default/consultingView.html.twig");
        
    }
    
   /**
     * @Route("/books")
     * @Method({"GET"})
     */
   public function getBooks() {
        $books = $this->getDoctrine()->getRepository(Book::class)->findAll();
        return new JsonResponse($books);
    }
    
    /**
     * @Route("/books/{id}/copies")
     * @Method({"GET"})
     */
    public function getCopiesFromBook($id) {
        $copies = $this->getDoctrine()->getRepository(Copy::class)->findByBook($id);
        return new JsonResponse($copies);
    }
}
