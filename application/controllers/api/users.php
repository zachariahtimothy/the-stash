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
    		$data = array(
    			'name'       => $postData->name,
    			'password'   => md5($postData->password),
    			'email'      => $postData->email,
    			'username'   => $postData->email,
    			'facebookId' => $postData->facebookId,
    			'type'       => $postData->type
    		);
    		$this->db->insert('Users', $data);
    		$data['id'] = $this->db->insert_id();
    		$data['json'] = $data;
    	}
    	$this->load->view('json_view', $data );	
    }

	public function login(){
		if ($_SERVER['REQUEST_METHOD'] == "POST") {
			$this->load->model('user');
			
			$username = $this->input->post('email');
	   		$userpass = $this->input->post('password');

			$query = $this->db->query('
				SELECT * 
				FROM Users 
				WHERE Email = ? 
				AND Password = MD5(?)
				', array($username, $userpass));

		 	if ($query->num_rows() > 0)
		 	{	
		 		$row = $query->row_array();
		 		unset($row->Password); //Remove password from payload.
		 		$data['json'] = json_encode(array(
					'user'   => $row
				));

		 		$this->session->set_userdata(array('theStashUser' => $row));
		 		$this->_user = $row;
		 	} else {
		 		$message = "User ".$username." could not be found.";
		 		$data['status'] = 404;
		 		$data['json'] = '{"message":"User '.$message.'"}';
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
	
}

?>