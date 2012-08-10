<?php
	header("Content-Type: application/json");
	$statusCode = 200;

	if (isset($status)){
		$statusCode = $status;
	}
	header("HTTP/1.0 ".$statusCode);
	if (is_array($json)){
		echo json_encode($json);
	} else {
		echo $json;
	}
	
?>
