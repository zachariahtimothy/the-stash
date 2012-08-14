<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Domain extends CI_Controller {
	private $_user;

	public function __construct() {
		parent::__construct();
		//setup user for use in class
    	$this->_user = $this->session->userdata('theStashUser');
    }

    public function index(){
    	$freq = $this->getFrequencies();

    	$cats = $this->getCategories();
    	$data['json'] = array(
    		'frequencies' => $freq,
    		'categories' => $cats
    	);
    	$this->load->view('json_view', $data);		
    }

    public function frequencies(){
		$data['json'] = getFrequencies();
	 	$this->load->view('json_view', $data);		
    }

     public function categories(){
		$data['json'] = getCategories();
	 	$this->load->view('json_view', $data);		
    }

    // public function frequency(){
    //     if ($_SERVER['REQUEST_METHOD'] == "POST"){
    //         $request_body = file_get_contents('php://input');
    //         $postData = json_decode($request_body);

    //         $dbData = array(
    //             'name' => $postData->name
    //         );
    //         try{
    //             $this->db->insert('Frequencies', $dbData);
    //             $data['json'] = $dbData;
    //         } catch(Exception $ex){
    //             $data['status'] = 500;
    //             $data['json'] = $ex;
    //         }
    //     } else {
    //         $data['status'] = 500;
    //         $data['json'] = array('message' => 'Could not save category, sorry.');
    //     }
       
    //     $this->load->view('json_view', $data);     
    //     }
    // }

    public function category(){
       if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($this->_user)){
            $request_body = file_get_contents('php://input');
            $postData = json_decode($request_body);
            $dbData = array(
                'name'   => $postData->name,
                'type'   => $postData->type,
                'userId' => $this->_user['id']
            );
            try{
                $this->db->insert('Categories', $dbData);
                $dbData['id'] = $this->db->insert_id();
                $data['json'] = $dbData;
            } catch(Exception $ex){
                $data['status'] = 500;
                $data['json'] = $ex;
            }
        } else {
            $data['status'] = 500;
            $data['json'] = array('message' => 'Could not save category, sorry.');
        }
       
        $this->load->view('json_view', $data);      
    }


    private function getFrequencies(){
    	$query = $this->db->query('
			SELECT f.`id`, f.`name`
			FROM Frequencies f');

    	if ($query->num_rows() > 0) {	
	 		$row = $query->result_array();
	 		return $row;
	 	} else {
	 		return array();
	 	}
    }
    private function getCategories(){
    	$query = $this->db->query('
			SELECT c.`id`, c.`name`, c.`type`
			FROM Categories c
            WHERE c.userId = ?
            ', array($this->_user['id']));

    	if ($query->num_rows() > 0) {	
	 		$row = $query->result_array();
	 		return $row;
	 	} else {
	 		return array();
	 	}
    }
}
