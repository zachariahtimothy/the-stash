<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Index extends CI_Controller {
	private $_user;

	public function __construct() {
		parent::__construct();
		//setup user for use in class
    	$this->_user = $this->session->userdata('theStashUser');
    	$this->load->helper('url'); 
    }

	public function index()
	{
		if ($this->_user){
			$data['user'] = json_encode($this->_user);
		} else {
			$data['user'] = '{}';
		}
		$data['base_url'] = base_url();
		$this->load->view('default', $data);
	}
}
