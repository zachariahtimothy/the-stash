<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Index extends CI_Controller {
	private $_user;

	public function __construct() {
		parent::__construct();
		//setup user for use in class
    	$this->_user = $this->session->userdata('theStashUser');
    	$this->load->helper('url'); 
    }
	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		if ($this->_user){
			$data['user'] = json_encode($this->_user);
		} else {
			//$data['user'] = '{"name" : "Zach Curtis", "id":"1", "type":"user"}';
			$data['user'] = '{}';
		}
		$data['base_url'] = base_url();
		$this->load->view('default', $data);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */