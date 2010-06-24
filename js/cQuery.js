(function(window, document, undefined) {

/**
 * Class: cQuery
 
 * DOM Element selector shortcut function. Very rudimentary.
 
 * Either pass in an ID, a class or a tag, but not a combination (this isn't as robust as jQuery)
 
 * 
 */
var cQuery = function(elm){
	//if the user didn't pass through an element to be selected, they are chaining or just trying to use a function, so don't re-select
	if(elm != undefined){
		cQuery.DOMSelection(elm);
	}
	
	//enable chaining by adding shortcut references to other cQuery functions
	return {
		html:function(newHTML){
			return cQuery.html(newHTML);
		},
		height:function(){
			return cQuery.height();
		},
		top:function(position){
			return cQuery.top(position);
		},
		bottom:function(position){
			return cQuery.bottom(position);
		},
		scrollDown:function(startPosition, stopPosition, speed, repeat){
			return cQuery.scrollDown(startPosition, stopPosition, speed, repeat);
		},
		runAnimations:function(){
			return cQuery.runAnimations();
		}
	};
};

cQuery.DOMSelection = function(elm){
	var firstCharacter, body, elements;
	
	cQuery.DOMElements = [];//initialize empty array for selected DOM elements

	body = document.getElementsByTagName("body")[0];
	
	firstCharacter = elm.charAt(0);

	//Determine if we are trying to select a single element by ID, multiple elements by classname, or multiple elements by tag name
	if(firstCharacter === "#"){
		//select by ID
		
		//remove the "#" from the DOM Selector
		elm = elm.substr(1);
		DOMElement = document.getElementById(elm);
		cQuery.DOMElements = [DOMElement];
	}else if(firstCharacter === "."){
		//select by className
		
		elm = elm.substr(1);		
		elements = body.getElementsByTagName("*");
		for(var i = 0; i < elements.length; i++){
			if(elements[i].className === elm){
				cQuery.DOMElements.push(elements[i]);
			}
		}
	}else{
		//select by tagName
		elements = body.getElementsByTagName(elm);
		cQuery.DOMElements = elements;
	}	
}

cQuery.height = function(){
	return cQuery.DOMElements[0].offsetHeight;
}

cQuery.top = function(position){
	if(position === undefined){
		return cQuery.DOMElements[0].offsetTop;
	}else{
		for(var i = 0; i < cQuery.DOMElements.length; i++){
			cQuery.DOMElements[i].style.top = position + "px";
		}

		return cQuery();		
	}
}

cQuery.bottom = function(position){
	if(position === undefined){
		return cQuery.DOMElements[0].offsetTop + cQuery.height();
	}else{
		for(var i = 0; i < cQuery.DOMElements.length; i++){
			cQuery.DOMElements[i].style.top = (position + cQuery.height()) + "px";
		}

		return cQuery();		
	}
}

cQuery.animations = [];
setInterval("cQuery.runAnimations()", 1);

cQuery.runAnimations = function(){
	for(var i=0; i < cQuery.animations.length; i++){
		cQuery.animations[i].animation();
	}
}

cQuery.scrollDown = function(startPosition, stopPosition, speed, repeat){
		for(var i = 0; i < cQuery.DOMElements.length; i++){
			cQuery.animations.push({
				"animation":function(){
					if(this.currentPosition === undefined){
						this.currentPosition = this.startPosition;
					}
					
					//move the element
					this.currentPosition = this.currentPosition + this.speed;
					//apply the move
					this.element.style.top = this.currentPosition - this.element.offsetHeight + "px";

					//check to make sure it hasn't moved too far
					if(this.currentPosition > this.stopPosition 
						&& (this.repeat === "forever" || this.repeat < this.iteration)){
						this.currentPosition = this.startPosition;
						this.element.style.top = this.currentPosition - this.element.offsetHeight + "px";
					}
				},
				"speed":speed,
				"repeat":repeat,
				"startPosition":startPosition,
				"stopPosition":stopPosition,
				"currentPosition":undefined,
				"element":cQuery.DOMElements[i],
				"iteration":0
			});
		}

		return cQuery();	
}

cQuery.html = function(newHTML){
	var theHTML;
	
	if(newHTML === undefined){
		for(var i = 0; i < cQuery.DOMElements.length; i++){
			theHTML = cQuery.DOMElements[i].innerHTML;
		}
		return theHTML;
	}else{
		for(var i = 0; i < cQuery.DOMElements.length; i++){
			cQuery.DOMElements[i].innerHTML = newHTML;
		}

		return cQuery();
	}
}

cQuery.ajax = function(url, data, success, error){
	var postVars, request;
	
	request = cQuery.createNewRequest();
	
	if(url === undefined){
		return;
	}
	

	if(typeof error === "function"){
		error();
	}

	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
	if(typeof success === "function"){
		request.success = success;
	}else{
		//simple fail safe so we don't have to test success before we call it.
		request.success = function(){};
	}
	
	if(typeof error === "function"){
		request.error = error;
	}else{
		//simple fail safe so we don't have to test error before we call it.
		request.error = function(){};
	}
	
	request.onreadystatechange = function(){
		if(this.readyState == 4){
			if(this.status == 200){
				this.success(this.responseText);
			}else{
				this.error();
			}
		}
	}
	
	postVars = "";
	if(data !== undefined){
		var count = 0;
		//can only handle a JSON object one level deep.
		for(key in data){
			if(count > 0){
				postVars += "&";
			}
			postVars += key + "=" + data[key];
			
			count++; 
		}
	}
	
	request.send(postVars);
}

cQuery.requests = [];

cQuery.createNewRequest = function(){
	var request;
	
	try{
		request = new XMLHttpRequest();
	}catch(trymicrosoft){
		try{
			request = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(othermicrosoft){
			try{
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(failed){
				return;
			}
		}
	}
	
	cQuery.requests[cQuery.requests.length] = request;
	
	return request;
};

//make sure our library is exposed to the global namespace and make a shortcut "_" so we don't have to type cQuery every time.
window.cQuery = window._ = cQuery;
	
})(this, document);