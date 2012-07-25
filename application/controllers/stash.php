<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Stash extends CI_Controller {
	private $_user;

	public function __construct() {
		parent::__construct();
		//setup user for use in class
    	$this->_user = $this->session->userdata('theStashUser');
    }

    public function index(){

    	$query = $this->db->query('
			SELECT s.Id, s.Month, id.`Amount`, id.`Day`
			FROM Stashes s 
			INNER JOIN Incomes i on s.`Id` = i.`StashId`
			LEFT OUTER JOIN IncomeDates id on i.`Id` = id.`IncomeId`
			WHERE s.`UserId` = ?
			AND s.`Month` = ?
			AND id.`Day` < ?
			', array($this->_user['Id'], date('n'), date('j')));
    	
    	if ($query->num_rows() > 0)
	 	{	
	 		$row = $query->row_array();
	 		$data['stash'] = array(
	 			'Id'        => $row['Id'], 
	 			'Month'     => $row['Month'],
	 			'MonthName' => $this->monthName($row['Month'])
	 		);
	 		$data['income'] = $row;
	 	}

	 	$query = $this->db->query('
			SELECT s.Id, s.Month, e.`Amount`, e.`Day`
			FROM Stashes s 
			INNER JOIN Expenses e on s.`Id` = e.`StashId`
			WHERE s.`UserId` = ?
			AND s.`Month` = ?
			AND e.`Day` < ?
			', array($this->_user['Id'], date('n'), date('j')));

	 	if ($query->num_rows() > 0)
	 	{	
	 		$rows = $query->result_array();

	 		$expense_amount = 0;
	 		foreach ($rows as $row) {
 				$expense_amount = $expense_amount + $row['Amount'];
	 		}
	 		
	 		$data['expense'] = array('ExpensesLeft' => $expense_amount);
	 	}
	 	$this->load->view('a0-current-month', $data);		
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