<?

$photoPageUrl = filter_input(INPUT_POST, photoPageUrl, FILTER_VALIDATE_URL);

$shortUrl = file_get_contents("http://qurl.com/automate.php?url=" . urlencode($photoPageUrl));

if(strlen($shortUrl) > 10){
	$success = true;
}else{
	$success = false;
}

$shortUrls = array($shortUrl, "success"=>$success);

print json_encode($shortUrls);

?>