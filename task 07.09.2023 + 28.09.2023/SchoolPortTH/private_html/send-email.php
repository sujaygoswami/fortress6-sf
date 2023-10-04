<?php 
	unset($_POST['submit']);

	foreach($_POST as $k => $v) $body .= $k . ": " . $v ."\r\n\r\n";

	$headers  = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/plain; charset=utf-8\r\n";
	$headers .= "From:".$_POST['email']."\r\n";
	$headers .= "Reply-To:".$_POST['email']."\r\n";
	

	mail('youremail@yourdomain.com', 'Contact form from your website', $body, $headers);

?>