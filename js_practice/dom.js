
// (function(element){
// 	var pairs = new Array();
// 	var attrName,
// 	attrValue,
// 	i,len;

// 	for(i = 0; i < element.attributes.length; i++){
// 		attrName = element.attributes[i].nodeName;
// 		attrValue= element.attributes[i].nodeValue;
// 		pairs.push(attrName = "+\""+attrValue+"\"");
// 	}
// 	return pairs.join(" ");
// })();


// var i ,
// 	len,
// 	child = element.firstChild;

// while(child != element.lastChild){
// 	if(child.nodeType ==1){  //check child is element or not
// 		processChild(child);
// 	}
// 	child = child.nextSibing;
// }

// //use Element Traversal
// var i,
// 	len,
// 	child = element.firstElementChild;

// while(child != element.lastFirstChild){
// 	processChild(child); //  has been know it is element
// 	child = child.nextElementChild;
// }



// function initUI(){
// 	with(document){
// 		var bd    = body,
// 			links = getElementsByTagName('a'),
// 			i     = 0,
// 			len   = links.length;
// 		while( i < len){
// 			update(links[i++]);
// 		}
// 		getElementById("id").onclick = function(){
// 			doSomething();
// 		};
// 	}
// }


//closure
// function f1(){
// 	var n = 999;

// 	nAdd = function(){n += 1};

// 	function f2(){
// 		alert(n);
// 	}
// 	return f2;
// }

// var result = f1();
// result();
// nAdd();
// result();

// var name = "the window";

// var object = {
// 	name : "my object",
// 	getNameFunction :  function(){
// 		return function(){
// 			return this.name;
// 		};
// 	}
// };

// alert(object.getNameFunction()());


// var name = "the window";

// var object = {
// 	name : "my object",
// 	getNameFunction : function(){
// 		var that = this;

// 		return function(){
// 			return that.name;
// 		};
// 	}
// };

// alert(object.getNameFunction()());