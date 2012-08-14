<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Users extends CI_Controller {
	private $_user;

	public function __construct() {
		parent::__construct();
		//setup user for use in class
    	$this->_user = $this->session->userdata('theStashUser');
    }

    public function index(){
    	if ($_SERVER['REQUEST_METHOD'] == "POST") {
    		$request_body = file_get_contents('php://input');
    		$postData = json_decode($request_body);
     		$dataToInsert = array(
     			'name'       => $postData->name,
     			'password'   => md5($postData->password),
     			'email'      => $postData->email,
     			'username'   => $postData->email,
     			'facebookId' => $postData->facebookId,
     			'type'       => $postData->type
     		);
     		try{
				$insertGood = $this->db->insert('Users', $dataToInsert);
				if ($insertGood){
				 	$userId = $this->db->insert_id();
				 	
				 	$dataToInsert['id'] = $userId;
		 	 		unset($dataToInsert->password); //Remove password from payload.
			  	 	$data['json'] = array('user' => $dataToInsert);

			  	// 	$this->session->set_userdata(array('theStashUser' => $row));
			  	// 	$this->_user = $row;
				} else {
				// 	 //$errMsg = $this->db->_error_message();
				// 	$data['json'] = array('message' => 'Sorry but you already have an account with that email address.'; 
				// 	//  if (strrpos($errMsg, 'Duplicate')){
				// 	//  	$insertGood = $this->db->update('Users', $data);
				// 	//  } else {
				// 	// // 	throw Exception('Could not insert user');
				// 	//  }
				}
    			
     		} catch (Exception $ex){
     			var_dump($ex);
     			$data['json'] = array('error' => $ex);
     		}
    		
    		
    	}
    	$this->load->view('json_view', $data);	
    }

	public function login(){
		if ($_SERVER['REQUEST_METHOD'] == "POST") {
				$fbId = $this->input->post('facebookId');
			 if ($fbId){
			 	$data = $this->loginFacebook($fbId);
			 } else {
				$username = $this->input->post('email');
		   		$userpass = $this->input->post('password');

				$query = $this->db->query('
					SELECT * 
					FROM Users 
					WHERE username = ? 
					AND password = MD5(?)
					', array($username, $userpass));

			 	if ($query->num_rows() > 0)
			 	{	
			 		$row = $query->row_array();
			 		unset($row->password); //Remove password from payload.
			 		$data['json'] = array('user' => $row);

			 		$this->session->set_userdata(array('theStashUser' => $row));
			 		$this->_user = $row;
			 	} else {
			 		$message = "User ".$username." could not be found.";
			 		$data['status'] = 404;
			 		$data['json'] = '{"message":"'.$message.'"}';
			 	}
			}
			

	   		$this->load->view('json_view', $data);	
   		}	
	}


	public function logout(){
	 	$this->session->unset_userdata('theStashUser');
	 	$this->_user = null;
	 	$data['json'] = json_encode(array(
			'status' => 'success',
			'sesstion' => $this->session->userdata('theStashUser')
		));
	 	$this->load->view('json_view', $data);		
	}

	private function loginFacebook($facebookId){
		$query = $this->db->query('
				SELECT * 
				FROM Users 
				WHERE facebookId = ? 
				', array($facebookId));

	 	if ($query->num_rows() > 0)
	 	{	
	 		$row = $query->row_array();
	 		unset($row->password);
	 		$this->session->set_userdata(array('theStashUser' => $row));
			$this->_user = $row;
	 		$data['json'] = array('user' => $row);
	 	} else {
	 		$data['status'] = 404;
	 		$data['json'] = array('message' => 'No user');
	 	}
	 	return $data;
	}
	
}

?>