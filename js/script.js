var FLURL = FLURL || {};

FLURL.getPhotos = function(numberOfPhotos){
	if(numberOfPhotos === undefined){
		numberOfPhotos = 20;
	}
	
	_.ajax("http://chomperstomp.com/flurl/flickr/getPhotos.php",
		{"numberOfPhotos":numberOfPhotos},
		function(data){
			var height, screenHeight, theHTML;

			//clear the animation queue TODO: write some logic into the library to allow removal, or replacement, of single animations from queue automatically
			cQuery.animations = [];

			data = JSON.parse(data);
			
			theHTML = "";
			for(var i = 0; i < data.length; i++){
				var photo = data[i];

				//build the HTML
				theHTML += ['<img ',
								'onclick="FLURL.getURL(\'' + photo['photoPageUrl'] + '\');"',
								' class="photo"',
								' alt="' + photo['title'] + '"',
								' title="' + photo['title'] + '"',
								' src="' + photo['imgSrc'] + '"',
								'/>'].join('');				
			}

			_("#pandaPhotos").html(theHTML);

			FLURL.adjustContainerHeight();

			height = _("#pandaPhotos").height();
			screenHeight = _("#BGContainer").height();

			_("#pandaPhotos").bottom(screenHeight).scrollDown((screenHeight * -1), (screenHeight + height), 4, "forever");
		}
	);	
}

FLURL.adjustContainerHeight = function(){
	var imgs, totalHeight;
	
	imgs = _(".photo").getElements();
	
	totalHeight = 0;
	for(var i = 0; i < imgs.length; i++){
		if(imgs[i].offsetHeight > 75){
			totalHeight += imgs[i].offsetHeight;
		}else{
			totalHeight += 240;//use default height, 240 is about as large as it could possibly get, better too big than too small
		}
		
	}
	
	_("#pandaPhotos").height(totalHeight);
}

FLURL.getURL = function(url){
	_("h3").show();
	_("#shortUrl").html("Loading...");
	
	_.ajax("http://chomperstomp.com/flurl/qurl/getUrl.php",
		{"photoPageUrl":url},
		function(data){
			data = JSON.parse(data);
			
			if(data["success"] === true){
				_("#shortUrl").html(data[0]);
				_("#shortUrl").attr("href", data[0]);
			}else{
				_("#shortUrl").html("error");
				_("#shortUrl").attr("href", "javascript:void('');");
			}		
		}
	);
	
	return false;
}

FLURL.getPhotos();
setTimeout("FLURL.getPhotos();", 60000);//get new ones every 60 seconds regardless of success of last call for new photos