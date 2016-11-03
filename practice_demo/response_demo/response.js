function resetPage(){
	var deviceWidth = document.documentElement.clientWidth;
	console.log(deviceWidth);

	var changeWidth = (deviceWidth - 120)/2;
	var pecChangeWidth = changeWidth / deviceWidth * 100;
	console.log(pecChangeWidth);

	document.getElementById('change4').style.width = document.getElementById("change5").style.width = pecChangeWidth + '%';
}

window.onload = function(){
	resetPage();
}

window.onresize = function(){
	resetPage();
}


