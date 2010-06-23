var getPhotos = function(numberOfPhotos){
	_.ajax("http://chomperstomp.com/flurl/flickr/getPhotos.php",
		{"numberOfPhotos":numberOfPhotos},
		function(data){
			var height;

			//since it takes 30 seconds for this to run, call it again immediately
			getPhotos(10);

			_("#pandaPhotos").html(data);
			height = _("#pandaPhotos").height();

			_("#pandaPhotos").top(-height).scrollDown(-height, 0, 8, "forever");
		}
	);	
}

getPhotos(5);