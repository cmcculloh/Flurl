var getPhotos = function(numberOfPhotos){
	_.ajax("http://chomperstomp.com/flurl/flickr/getPhotos.php",
		{"numberOfPhotos":numberOfPhotos},
		function(data){
			var height, screenHeight;

			//clear the animation queue TODO: write some logic into the library to allow removal, or replacement, of single animations from queue automatically
			cQuery.animations = [];

			//since it takes 30 seconds for this to run, call it again immediately
			getPhotos(10);

			_("#pandaPhotos").html(data);
			height = _("#pandaPhotos").height();
			screenHeight = _("#BGContainer").height();

			_("#pandaPhotos").bottom(0).scrollDown(0, (screenHeight + height), 8, "forever");
		}
	);	
}

getPhotos(5);