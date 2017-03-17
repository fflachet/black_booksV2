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
use Symfony\Component\HttpFoundation\Request;

/**
 * Description of AdminController
 *
 * @author fflachet
 * @Route("/administration")
 */
class AdminController extends Controller{
    
    /**
     * @Route("/")
     * @Method({"GET"})
     */
    public function getView() {
        return $this->render("default/administrationView.html.twig");
        
    }
    
    /**
     * @Route("/books/{id}/copy")
     * @Method({"POST"})
     * @param Request $r
     */
    public function addCopy(Request $r,$id) {
        $copy = new Copy();
        $doctrine = $this->getDoctrine();
        $copy->setBook($doctrine->getRepository(Book::class)->find($id));
        $copy->setState($doctrine->getRepository(State::class)->find($r->get("state")));
        $copy->setStatus($doctrine->getRepository(Status::class)->find($r->get("status")));
        $copy->setPrice($r->get("price"));
        $em = $doctrine->getManager();
        $em->persist($copy);
        $em->flush();
        return new JsonResponse($copy);
        
    }
    
    /**
     * @Route("/copies/{id}/state")
     * @Method({"PUT"})
     * @param Request $r
     */
    public function updateCopyState(Request $r,$id){
        $copy = $this->getDoctrine()->getRepository(Copy::class)->find($id);
        $state = $this->getDoctrine()->getRepository(State::class)->find($r->get("stateId"));
        $em = $this->getDoctrine()->getManager();
        
        $copy->setState($state);
        $em->merge($copy);
        $em->flush();
        
        return new JsonResponse($copy);
    }
    
    /**
     * @Route("/copies/{id}/status")
     * @Method({"PUT"})
     * @param Request $r
     */
    public function updateCopyStatus(Request $r,$id){
        $copy = $this->getDoctrine()->getRepository(Copy::class)->find($id);
        $status = $this->getDoctrine()->getRepository(Status::class)->find($r->get("statusId"));
        $em = $this->getDoctrine()->getManager();
        
        $copy->setStatus($status);
        $em->merge($copy);
        $em->flush();
        
        return new JsonResponse($copy);
    }   
    /**
     * @Route("/copies/{id}/price")
     * @Method({"PUT"})
     * @param Request $r
     */
    public function updateCopyPrice(Request $r,$id){
        $copy = $this->getDoctrine()->getRepository(Copy::class)->find($id);
        $em = $this->getDoctrine()->getManager();
        
        $copy->setPrice($r->get("price"));
        $em->merge($copy);
        $em->flush();
        
        return new JsonResponse($copy);
    }   
}
