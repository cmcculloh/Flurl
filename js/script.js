var getPhotos = function(numberOfPhotos){
	_.ajax("http://chomperstomp.com/flurl/flickr/getPhotos.php",
		{"numberOfPhotos":numberOfPhotos},
		function(data){
			var height;
			
			_("#pandaPhotos").html(data);
			height = _("#pandaPhotos").height();
			console.log("height" + height);
			_("#pandaPhotos").top(-height).scrollDown(-height, 0, 8, "forever");
			
			//since it takes FOREVER for this to run, call it again immediately
			getPhotos(10);
		}
	);	
}

getPhotos(5);