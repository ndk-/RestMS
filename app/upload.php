<?php

// Should be image and less thank 204800 bytes (~200kb)
if ( !empty( $_FILES ) && ((($_FILES["file"]["type"] == "image/gif") || ($_FILES["file"]["type"] == "image/jpeg")
		|| ($_FILES["file"]["type"] == "image/jpg")   || ($_FILES["file"]["type"] == "image/pjpeg")
		|| ($_FILES["file"]["type"] == "image/x-png") || ($_FILES["file"]["type"] == "image/png"))
		&& ($_FILES["file"]["size"] < 204800))) {

// Check if the user has the appropriate access level
	session_start();

// Otherwise, send error and stop
	if ($_SESSION['credentials']['a_lvl'] !== '0') {
			
		header("HTTP/1.1 401 Unauthorized");
	    echo json_encode(array('error' => 'Unauthorized request'));
		exit();		
	}

// Retrieve file extension 
	preg_match('/^.*(\.[a-z]+)$/i', $_FILES['file'][ 'name' ], $ext);

// Our temp file
    $tempPath = $_FILES['file'][ 'tmp_name' ];

// Our image directory (security risk)
    $uploadPath = dirname( __FILE__ ) . '/img/' . $_POST['myfile'].$ext[1];

// Move the temporary file to the image directory
    move_uploaded_file( $tempPath, $uploadPath );

// Send success
    echo json_encode(array( 'success' => 'File transfer completed',
    						'name' => $_POST['myfile'].$ext[1] ));

// No file, no talking :)
} else {

	header("HTTP/1.1 406 Not Acceptable");
    echo json_encode(array('error' => 'Invalid request'));

}

?>