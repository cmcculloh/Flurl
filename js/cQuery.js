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
	alert("doing AJAX");
	success();
}

//make sure our library is exposed to the global namespace and make a shortcut "_" so we don't have to type cQuery every time.
window.cQuery = window._ = cQuery;
	
})(this, document);