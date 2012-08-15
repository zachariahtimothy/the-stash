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
    	 
	 	$incomes = $this->getIncomes();
	 	$expenses = $this->getExpenses();

	 	if (count($incomes) == 0) {
	 		$errors['incomeserror'] = array('message' => 'No incomes defined, please set income up in your account');
	 	}
	 	if (count($expenses) == 0) {
	 		$errors['expenseserror'] = array('message' => 'No expenses defined, please set income up in your account');
	 	}

 		$data['json'] = array(
 			'incomes'  => $incomes,
 			'expenses' => $expenses
		);

	 	if ($errors){
	 		$data['status'] = 404;
	 		$data['json'] = $errors;
	 	}
	 	
		$this->load->view('json_view', $data);			
    }

    private function getExpenses(){
    	$data = array();
    	$query = $this->db->query('
			SELECT e.`id`, e.`note`, e.`amount`, ed.date
			FROM Expenses e
			INNER JOIN ExpenseDates ed on e.id = ed.expenseId
			WHERE e.`userId` = ?
			', array($this->_user['id'], date('n'), date('j')));
    	
    	if ($query->num_rows() > 0)
	 	{	
	 		$row = $query->result_array();
	 		$data = $row;
	 	}
	 	return $data;
    }

    private function getIncomes(){
    	$data = array();
    	$query = $this->db->query('
			SELECT i.`id`, i.`note`, i.`amount`, id.date
			FROM Incomes i
			INNER JOIN IncomeDates id on i.id = id.incomeId
			WHERE i.`userId` = ?
			', array($this->_user['id'], date('n'), date('j')));
    	
    	if ($query->num_rows() > 0)
	 	{	
	 		$row = $query->result_array();
	 		$data = $row;
	 	}
	 	return $data;
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