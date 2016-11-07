var arrayObejct = {
	"fristName":"backbone",
	"lastName":"react",
	"changeName":"marionette",
	"pack":"progress"
}

alert(arrayObejct.pack);

/*
$.ajaxSetup(); // can use this fun to global set param

$.ajax{
	url : " ",
	context : " " //let callback this point the object
}
*/

//Cross domain

//main domain is same sub domain is defferent 

document.domain = "a.com";

var ifr = document.createElement("iframe");
ifr.src = "http:script.a.com/b.html";
ifr.style.display = "none";
document.body.appendChild("ifr");
ifr.onload = function(){
	var doc = ifr.contentDcument || ifr.contentDcument.document;

	alert(doc.getElementByTagName("h1")[0].childNodes[0].nodeValue);
}


//create script 
js.onload = js.onreadystatechange = function(){
	if (!this.readyState || this.readyState === 'loaded' || this.readyState ==='complete') {
		//do callback
		js.onload = js.onreadystatechange = null;
	}
}


// use iframe and location.hash 

//frist a.com cs1.html
function startRequest(){
	var ifr = document.createElement("iframe");
	ifr.style.display = "none";
	ifr.src = "http://vnblogs.com/lab/cscript/cs2.html#paramdo";
	document.body.appendChild(ifr);
}

function checkHash(){
	try{
		var data = location.hash ? location.hash.substring(1) : " ";
		if (console.log) {
			console.log("now ths data is " +data)
		}
	}catch(e){

	}
}
setInterval(checkHash,2000);

//next cnblogs cs2.html
switch(location.hash){
	case'#paramdo':
		callBack();
		break;
	case'#paramset':
		//do somthing
		break;
}

function callBack(){
	try{
		parent.location.hash = "somedata";
	}catch(e){
		var ifrproxy = document.createElement("iframe");
		ifrproxy.style.display = "none";
		ifrproxy.src = "http://a.com/test/cscript/cs3/html#somedata"; //attention this file is belong a.com domain
		document.body.appendChild(ifrproxy);
	}
}

//html5 cross document meassaging 
otherWindow.postMessage(meassage,targetOrigin);

//a.com
window.onload = function(){
	var ifr = document.createElement('iframe');
	var targetOrigin = "http://b.com";
	ifr.contentDcument.postMessage("i was here",targetOrigin);
}
//b.com
window.addEventListener("meassage",function(e){
	if (e.origin == "http://a.com") {
		alert(e.data);
		alert(e.source);  // e.sourse can't call window object 
	}
},false);