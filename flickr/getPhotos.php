<?
$numPhotos = filter_input(INPUT_POST, numberOfPhotos, FILTER_VALIDATE_INT);

if($numPhotos < 1){
	$numPhotos = 1;
}

$flickr = new Flickr($numPhotos);
print json_encode($flickr->displayPhotos());

class Flickr{
	private $url;
	private $numPhotos;

	function __construct($numPhotos){
		$this->numPhotos = $numPhotos;
		
		$params = array(
			'api_key'	=> 'dadb8a86209ab2e8b7cdd532068b6939',
			'method'	=> 'flickr.panda.getPhotos',
			'panda_name'	=> 'ling ling',
			'format' => 'php_serial',
			'per_page' => $numPhotos,
			'page' => 1 
		);
		
		$encoded_params = array();
		
		foreach ($params as $k => $v){
			$encoded_params[] = urlencode($k).'='.urlencode($v);
		}
		
		$this->url = "http://api.flickr.com/services/rest/?".implode('&', $encoded_params);
	}

	function displayPhotos(){
		$photos = $this->getPhotos();
		$output = array();
		
		//loop through photos array
		for($i = 0, $numPhotos = count($photos); $i < $numPhotos; $i++){
			$photo = $photos[$i];
			
			$imgSrc = "http://farm{$photo['farm']}.static.flickr.com/{$photo['server']}/{$photo['id']}_{$photo['secret']}_m.jpg";
			$photoPageUrl = "http://www.flickr.com/photos/{$photo['owner']}/{$photo['id']}";
			$photo["imgSrc"] = $imgSrc;
			$photo["photoPageUrl"] = $photoPageUrl;			
			
			$output[$i] = $photo;
		}

		return $output;
	}
	
	function getPhotos(){
		$rsp = file_get_contents($this->url);
		
		$rsp_obj = unserialize($rsp);

		if ($rsp_obj['stat'] == 'ok'){
			return $rsp_obj['photos']['photo'];
		}else{
			//just make and return an empty array;
			$photos = array();
			
			return $photos;
		}	
	}
}
?>