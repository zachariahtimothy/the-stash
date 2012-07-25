<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends CI_Controller {
	private $_user;

	public function __construct() {
		parent::__construct();
		//setup user for use in class
    	$this->_user = $this->session->userdata('theStashUser');
    }

	public function login(){
		$this->load->model('user');
		
		$username = $this->input->post('username');
   		$userpass = $this->input->post('password');

		$query = $this->db->query('
			SELECT * 
			FROM Users 
			WHERE Username = ? 
			AND Password = MD5(?)
			', array($username, $userpass));
	
	 	if ($query->num_rows() > 0)
	 	{	
	 		$row = $query->row_array();
	 		unset($row->Password); //Remove password from payload.
	 		$data['json'] = json_encode(array(
				'user'   => $row
			));

	 		//echo 'user:  '.$user;
	 		$this->session->set_userdata(array('theStashUser' => $row));
	 		//$this->_user = array('theStashUser' => $data);
	 	} else {
	 		$data['json'] = '{"status":"error"}';
	 	}

   		$this->load->view('json_view', $data);		
	}


	public function logout(){
	 	$this->session->unset_userdata('theStashUser');
	 	$data['json'] = json_encode(array(
			'status' => 'success'
		));
	 	$this->load->view('json_view', $data);		
	}
	
}

?>