<?
$numPhotos = filter_input(INPUT_POST, numberOfPhotos, FILTER_VALIDATE_INT);

if($numPhotos < 1){
	$numPhotos = 1;
}

$flickr = new Flickr($numPhotos);
print $flickr->displayPhotos();

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
		$output = "";
		
		//loop through photos array
		for($i = 0; $i < $this->numPhotos; $i++){
			$photo = $photos[$i];
			$farmid = $photo["farm"];
			$serverid = $photo["server"];
			$id = $photo["id"];
			$secret = $photo["secret"];
			$title = $photo["title"];
			$userid = $photo["owner"];
			
			$imgSrc = "http://farm{$farmid}.static.flickr.com/{$serverid}/{$id}_{$secret}.jpg";
			$photoPageUrl = "http://www.flickr.com/photos/{$userid}/{$id}";
			
			
			//shorten URL using Qurl
			$shortUrl = file_get_contents("http://qurl.com/automate.php?url=" . urlencode($photoPageUrl));
			
			//build HTML
			$output .= <<<HERE
				<a class="photo" href="$shortUrl">
					<img src="$imgSrc" title="{$title}" alt="{$title}" />
				</a>
HERE;
		}

		return $output;
	}
	
	function getPhotos(){
		$rsp = file_get_contents($this->url);
		
		$rsp_obj = unserialize($rsp);

		#
		# display the photo title (or an error if it failed)
		#
		if ($rsp_obj['stat'] == 'ok'){
			//$photo_title = $rsp_obj['photos']['photo'][0]['title'];
		
			//echo "Title is $photo_title!";
			
			return $rsp_obj['photos']['photo'];
		}else{
			//echo "Call failed!";
			
			//just make and return an empty array;
			$photos = array();
			
			return $photos;
		}	
	}
}
?>