<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Stash extends CI_Controller {
	private $_user;

	public function __construct() {
		parent::__construct();
		//setup user for use in class
    	$this->_user = $this->session->userdata('theStashUser');
    }

    public function index(){
 		$errors = array();
    	//Get 
    	$query = $this->db->query('
			SELECT i.`id`, i.`note`, i.`amount`
			FROM Incomes i
			WHERE i.`userId` = ?
			', array($this->_user['id'], date('n'), date('j')));
    	
    	if ($query->num_rows() > 0)
	 	{	
	 		$row = $query->row_array();
	 		$data['stash'] = array(
	 			'id'        => $row['id'], 
	 			'month'     => $row['month'],
	 			'month_name' => $this->monthName($row['month'])
	 		);
	 		$data['json'] = array('income' => $row);
	 	} else {
	 		$errors[count($errors)] = array(
	 			'type' => 'incomeerror', 
	 			'message' => 'Income not setup yet. Please visit your <a href="/account" title="Click to visit your account">account</a> to set it up.'
	 			);
	 	}

	 	if ($errors){
	 		$data['status'] = 404;
	 		$data['json'] = $errors;
	 	}
	 	
		$this->load->view('json_view', $data);			
    }

    public function detail($stashId){

    }

    public function setup(){
    	if ( ! isset($_POST['income'])){
	    	$query = $this->db->query('
				SELECT * 
				FROM Frequencies
				');

		 	if ($query->num_rows() > 0)
		 	{
		 		$rows = $query->result_array();
		 		$data['frequencies'] = $rows;
		 	}
	    	$this->load->view('s0-setup', $data);
	    } else {
	    	//TODO: Save income
	    }
    }

	private function monthName($month_int) {
		$month_int = (int)$month_int;
		$months = array("","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
		return $months[$month_int];
	}

}

?>