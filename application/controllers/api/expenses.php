<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Expenses extends CI_Controller {
	private $_user;

	public function __construct() {
		parent::__construct();
		//setup user for use in class
    	$this->_user = $this->session->userdata('theStashUser');
    }

    public function index(){
    	$data = array();
    	$query = $this->db->query('
			SELECT e.`id`, e.`amount`,e.`frequencyId`, c.`name`, ed.`date`
			FROM Expenses e
			INNER JOIN Categories c on e.`categoryId` = c.id
			INNER JOIN ExpenseDates ed on e.`id` = ed.`expenseId`
			WHERE e.`userId` = ?
			', array($this->_user['id']));

    	if ($query->num_rows() > 0) {	
	 		$row = $query->result_array();
	 		
			$data['json'] = $row;

	 	}
		
	 	$this->load->view('json_view', $data);		
    }
}
