<?php

namespace Tests\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

// WebTestCase is the base class for functional tests.

class DefaultControllerTest extends WebTestCase
{
    public function testIndex()
    {
        // Creates a Client. 
        $client = static::createClient();
        
        // get the content 
        $crawler = $client->request('GET', '/');
        $crawler->
        // check if the statuscode is 200
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        // check if in the #container h1 there is 'Welcome to Symfony' string
        $this->assertContains('Welcome to Symfony', $crawler->filter('#container h1')->text());
    }
}
