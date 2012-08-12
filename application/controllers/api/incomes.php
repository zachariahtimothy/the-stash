<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Incomes extends CI_Controller {
	private $_user;

	public function __construct() {
		parent::__construct();
		//setup user for use in class
    	$this->_user = $this->session->userdata('theStashUser');
    }

    public function index(){
    	if ($_SERVER['REQUEST_METHOD'] == "GET") {
    		$incomes = $this->get();
    		if (array_key_exists('status',$incomes) && $incomes['status'] == 400){
    			$data['status'] = 400;
    			$data['json'] = $incomes;
    		} else {
    			$data['json'] = $incomes;
    		}
    		
    	} else if ($_SERVER['REQUEST_METHOD'] == "POST"){
			$data['json'] = $this->post();
    	}
    
	 	$this->load->view('json_view', $data);		
    }

    private function get(){
    	$query = $this->db->query('
			SELECT i.`id`, i.`amount`,i.`frequencyId`, c.`name`, id.`date`
			FROM Incomes i
			INNER JOIN Categories c on i.`categoryId` = c.id
			INNER JOIN IncomeDates id on i.`id` = id.`incomeId`
			WHERE i.`userId` = ?
			', array($this->_user['id']));

    	if ($query->num_rows() > 0) {	
	 		$row = $query->result_array();
	 		
			$data = $row;
	 	} else {
	 		$data['status'] = 400;
	 		$data['error'] = '{message:No incomes}';
	 	}
	 	return $data;
    }

    private function post(){
    	//Example: {"amount":"asdfs","date":"sdfs","frequency":"0","category":"0","note":""}
    	$request_body = file_get_contents('php://input');
    	$postData = json_decode($request_body);
    	
    	$data = array(
    		'amount'      => $postData->amount,
		   	'frequencyId' => $postData->frequency,
		   	'categoryId'  => $postData->category,
		   	'note'        => $postData->note,
		   	'userId'      => $this->_user['id']
    	);

    	try{
    		//var_dump($data);
    		$this->db->insert('Incomes', $data);
    		$incomeId = $this->db->insert_id();
    		$incomeDateData = array('incomeId' => $incomeId, 'date' => $postData->date);

    		$this->db->insert('IncomeDates', $incomeDateData);
    		
    		
    	} catch(Exception $ex){
			$data = $ex;
		}
		
		return $data;
    }

}
