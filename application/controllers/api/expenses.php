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
        $id = $this->input->get('id');

    	if ($_SERVER['REQUEST_METHOD'] == "GET") {
    		$expenses = $this->get();
    		if (isset($expenses['error'])){
    			$data['status'] = 404;
    		} 
    		$data['json'] = $expenses;

    	} else if ($_SERVER['REQUEST_METHOD'] == "POST"){
    	 	$expense = $this->post();
    		if (!$expense){
    		 	$data['status'] = 404;
    		}
    		 $data['json'] = $expense;
    	} else if ($_SERVER['REQUEST_METHOD'] == "DELETE" && $id > 0){
           
            $result = $this->delete($id);
            if (isset($result['error'])){
                 $data['status'] = 400;
            } 
            $data['json'] =  $result;
        }
    	
		
	 	$this->load->view('json_view', $data);		
    }

    private function get($id = 0){
    	$data = array();
    	$query = $this->db->query('
				SELECT e.`id`, e.`amount`,e.`frequencyId`, c.`name`, ed.`date`
				FROM Expenses e
				INNER JOIN Categories c on e.`categoryId` = c.id
				INNER JOIN ExpenseDates ed on e.`id` = ed.`expenseId`
				WHERE e.`userId` = ?
				', array($this->_user['id']));
//TODO: Add get by id to query
    	if ($query->num_rows() > 0) {	
	 		$row = $query->result_array();
			$data = $row;
	 	} else {
	 		$data = array('error'=>'No expenses for user');
	 	}
	 	return $data;
    }

    private function post(){
     	//Example: {"amount":"420","date":"2012-08-20","category":"20","note":"Honda payment"}
    	$request_body = file_get_contents('php://input');
     	$postData = json_decode($request_body);
    	
    	$data = array(
    		'amount'      => $postData->amount,
		   	'categoryId'  => $postData->category,
		   	'note'        => $postData->note,
		   	'userId'      => $this->_user['id']
    	);

     	try{
     		$insertGood = $this->db->insert('Expenses', $data);
     		$id = $this->db->insert_id();
     		$data['id'] = $id;

     		$expenseDateData = array('expenseId' => $id, 'date' => $postData->date);
     		$insertGood = $this->db->insert('ExpenseDates', $expenseDateData);
    		
     	} catch(Exception $ex){
		 	$data = $ex;
		}
		
		return $data;
    }

    private function delete($id){
        $data = array();;
        $data['expenseDates'] = $this->db->delete('expensedates', array('expenseId' => $id));
        $data['expenses'] = $this->db->delete('expenses', array('id' => $id));
        return $data;
    }
}
