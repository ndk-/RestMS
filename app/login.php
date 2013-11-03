<?php

// Self-explanatory	
	@date_default_timezone_set('UTC');
// Destroy all previous session data
    $_SESSION = array();
    @setcookie(session_name(), '', time() - 45000); 
    @session_destroy();

// Get JSON data
    $data = json_decode(file_get_contents('php://input'), true);

// Connect to DB if data has username and encoded password
    if ($data[username] != '' && $data[password] !='') {

// Try connect to DB
	try {
@	    $db = new PDO('mysql:host=student-db.cse.unt.edu;dbname=dn0086', 'dn0086', 'csce4444p');
@	    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
@	    $stmt = $db->query("SELECT * FROM access WHERE username='".$data[username]."' AND password='".$data[password]."'");
@	    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

// Catch the problem
	catch(PDOException $e) {
	    header("HTTP/1.1 503 Service Unavailable");
	    echo json_encode(array('error' => 'DB problem'));
	};

// If given result is empty, deny access
	if (empty($result)) {
	    header("HTTP/1.1 403 Forbidden");
	    echo json_encode(array( 'error' => 'Login failed' ));
	}

// Otherwise, allow access
	else {
@		$stmt = $db->query("UPDATE access SET `last_time`='".date(c)."' WHERE id='".$result[0]['id']."'");
	    session_start();
	    $_SESSION[credentials]=$result[0];
	    echo json_encode(array('success' => 'Login successful',
				   'access' => $result[0]['a_lvl'],
				   'id' => $result[0]['id']));
	}
    }
    else {
	    header("HTTP/1.1 401 Authorization Required");
	    echo json_encode(array( 'error' => 'Authorization required' ));
    }
?>
