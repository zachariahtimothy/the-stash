<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Email extends CI_Controller {

	public function __construct() {
		parent::__construct();
    }

    public function index(){
    	if ($_SERVER['REQUEST_METHOD'] == "POST"){
            $request_body = file_get_contents('php://input');
            $postData = json_decode($request_body);
            $this->load->library('email');

			$this->email->from($postData->email, 'The Stash');
			$this->email->to('zachariahtimothy@gmail.com'); 
			$this->email->subject('Email from The Stash');
			$this->email->message($postData->name.' has sent a message on The Stash website. Here is what they said:     '.$postData->message);	
			$data = array();
			try{
				$this->email->send();
				$data['json'] = array('status'=>'success');
			} catch(Exception $ex){
				$data['json'] = $ex;
			}

			$this->load->view('json_view', $data);	
        }
    }
}