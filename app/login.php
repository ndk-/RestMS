<?php

// Self-explanatory	
	@date_default_timezone_set('UTC');
// Destroy all previous session data
    $_SESSION = array();
    @setcookie(session_name(), '', time() - 45000); 
    @session_destroy();

	header('Cache-Control: no-cache, must-revalidate');
	header('Content-Type: application/json');

	// Get JSON data
    $data = json_decode(file_get_contents('php://input'), true);

// Connect to DB if data has username and encoded password
    if ($data[username] != '' && $data[password] !='') {

// Try connect to DB
	try {
// Change here		
@	    $db = new PDO('mysql:host=HOST;dbname=DB', 'USER', 'PASS');
@		$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
@	    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// Guarantees no SQL injections, kind of :) 
@	    $stmt = $db->prepare("SELECT * FROM access WHERE username = :username AND password = :password");
@		$stmt->execute(array('username' =>$data[username], 'password' => $data[password]));
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
@		ini_set("session.cookie_lifetime","36000");
@		ini_set('session.gc_maxlifetime', 60*60*10);
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
