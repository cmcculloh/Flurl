<?
# build the API URL to call
#

$params = array(
	'api_key'	=> 'dadb8a86209ab2e8b7cdd532068b6939',
	'method'	=> 'flickr.panda.getPhotos',
	'panda_name'	=> 'ling ling'
);

$encoded_params = array();

foreach ($params as $k => $v){

	$encoded_params[] = urlencode($k).'='.urlencode($v);
}


#
# call the API and decode the response
#

$url = "http://api.flickr.com/services/rest/?".implode('&', $encoded_params);
print($url);
$rsp = file_get_contents($url);
print($rsp);
$rsp_obj = unserialize($rsp);


#
# display the photo title (or an error if it failed)
#
print 'stat: ' . $rsp_obj['stat'];

if ($rsp_obj['stat'] == 'ok'){

	$photo_title = $rsp_obj['photo']['title']['_content'];

	echo "Title is $photo_title!";
}else{
	
	echo "Call failed!";
}
?>