var getPhotos = function(numberOfPhotos){
	_.ajax("http://chomperstomp.com/flurl/flickr/getPhotos.php",
		{"numberOfPhotos":numberOfPhotos},
		function(data){
			var height, screenHeight, theHTML;

			//clear the animation queue TODO: write some logic into the library to allow removal, or replacement, of single animations from queue automatically
			cQuery.animations = [];

			//since it takes 30 seconds for this to run, call it again immediately
			setTimeout("getPhotos(5);", 10000);


			data = JSON.parse(data);

			theHTML = "";
			for(var i = 0; i < data.length; i++){
				var photo = data[i];
				//build the HTML
				theHTML += ['<a href="' + photo['shortUrl'] + '" class="photo">',
								'<img alt="' + photo['title'] + '" title="' + photo['title'] + '" src="' + photo['imgSrc'] + '">',
							'</a>'].join('');				
			}

			_("#pandaPhotos").html(theHTML);

			height = _("#pandaPhotos").height();
			screenHeight = _("#BGContainer").height();

			_("#pandaPhotos").bottom(0).scrollDown(0, (screenHeight + height), 5, "forever");
		}
	);	
}

getPhotos(5);