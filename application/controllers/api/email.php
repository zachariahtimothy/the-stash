<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Email extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->library('email');
    }

    public function index(){
    	if ($_SERVER['REQUEST_METHOD'] == "POST"){
            $request_body = file_get_contents('php://input');
            $postData = json_decode($request_body);
            $emailType = $postData->email_type;

            if ($emailType == 'contact'){
            	$this->sendContactForm($postData->email, $postData->name, $postData->message);
            } else if ($emailType == 'forgotpassword') {
            	$this->sendPassword($postData->email, $postData->hostname);
            }

			
			try{
				$this->email->send();
				$data['json'] = array('status'=>'success');
			} catch(Exception $ex){
				$data['json'] = $ex;
			}

			$this->load->view('json_view', $data);	
        }
    }

    private function sendContactForm($from, $name, $message){
    	$this->email->from($from, 'The Stash');
		$this->email->to('zachariahtimothy@gmail.com'); 
		$this->email->subject('Email from The Stash');
		$this->email->message($name.' has sent a message on The Stash website. Here is what they said: '.$message);	
		$data = array();
		try{
			$this->email->send();
			$data['json'] = array('status'=>'success');
		} catch(Exception $ex){
			$data['json'] = $ex;
		}
		return $data;
    }

    private function sendPassword($emailAddress, $hostname){
    	$data = array();
    	$resetId = uniqid();
 		
		
		$query = $this->db->query('
				SELECT * 
				FROM Users 
				WHERE email = ?
				', array($emailAddress));

	 	if ($query->num_rows() > 0){	
	 		$row = $query->row_array();
	 		$row['passwordResetId'] = $resetId;
	 		$dataToUpdate = $row;
	 		
	 		try{
	 
				$this->db->where('id', $row['id']);
				unset($row['id']);
				$insertGood = $this->db->update('Users', $dataToUpdate);

				if ($insertGood){

					$this->email->from('zachariahtimothy@gmail.com', 'The Stash');
					$this->email->to($emailAddress); 
					$this->email->subject('Forgot Passsword from The Stash');
					$this->email->message('Here is your password reset link from The Stash: http://'.$hostname.'/resetpassword/'.$resetId );	
					$this->email->send();
				}
				
				$data['json'] = array('status'=>'success');
			} catch(Exception $ex){
				$data['json'] = $ex;
			}
	 	}

    	
		return $data;
    }
}