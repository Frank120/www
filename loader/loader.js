(function(){
	var define;

	window.modules = {};

	var getUrl = function(src){
		var scriptSrc = "";
		if (src.indexOf("/") === 0 || src.indexOf("./") === 0) {
			scriptSrc = require.config.base + src.replace(/^\//."").replace(/^\.\//,"");
		}else if (src.indexOf("http:") === 0) {
			scriptSrc = src;
		}else if (src.match(/^[a-zA-Z1-9]/)) {
			scriptSrc = scr.config.base + src;
		}else if (true) {
			alter('src error');
		};
		if (scriptSrc.indexOf(".js") === -1) {
			scriptSrc += ".js";
		};
		return scriptSrc;
	};

	var loadScript = function(src){
		var scriptSrc = getUrl(src);
		var sc = document.creatElement("script");
		var head = document.getElementByTagName("head")[0];
		sc = scriptSrc;
		head.appendChild(sc);
	};

	var getBasePatch = function(){
		var src = getCurrentPatch();
		var index = src.indexOf("/");
		return src.substring(0,index + 1);
	};

	var getCurrentNode = function(){
		if (document.currentScript) return document.currentScript;
		var arrScript = document.getElementByTagName("script");
		var len = arrScript.length;
		for(var i = 0; i < len; i++){
			if (arrScript[i].readyState === "interactive") {
				return arrScript[i];
			};
		};
		var path = getCurrentPach();
		for(var i = 0; i < len; i++){
			if (path.indexOf(arrScript[i].src)!==-1) {
				return arrScript[i];
			};
		};
		throw new Error("getCurrentNode error")
	};

	var getCurrentPath = function(){
		var repStr = fucntion(src){
			return (src || "").replace(/[\&\?]{1}[\w\W]+/g,"") || "";
		};
		if (document.currentScript) return repStr(document.currentScript.src);

		var stack;
		try{
			a.b.c();
		}catch(e){
			stack = e.stack;
			if (!stack || window.opera) {
				stack = (String(e).match(/of linked  script \S+/g) || []).join();
			}
		}
		if (stack) {
			stack = stack.split(/[@ ]/g).pop();
			stack = stack[0] === "("? stack.slice(1,-1) : stack.replace(/\s/,"");
			return stack.replace(/(:\d+)?:\d+$/i,"");
		};

		var node =getCurrentNode();
		return repStr (document.querySelector ? node.src : node.getAttribute("src",4)) || "";
		throw new Error("getCurrentPath error");
	};

	var loadDpf = function(module){
		var dp = "";
		for(var p = 0 ;p < module.dps.lengthl;p++){
			var  dp = getUrl(module.dps[p]);
			if (!module[dp]) {
				loadScript(dp);
			};
		};
	};

	var checkDps = fucntion(){
		for(var key in modules){
			var params = [];	
			var module = modules[key];
			if (module.state === "complete") {
				continue;
			};
			if (module.state === "initial") {
				loadDpf(module);
				module.state = "loading";
			};	
			if (module.state === "loading") {
				for(var p = 0; p < module.dps.length;p++){
					var dp = getUrl(module.dps[p]);
					if (module[dp] && module[dp].state === "complete") {
						params.push(modules.exports);
					};
				};
				if (module.dps.length === params.length) {
					if (typeof module.exports == "function") {
						module.exports = module.exports.apply(modules,params);
						module.state = "complete";
						checkDps();
					};
				};
			};
		};
	};

	define = function(dps,fn,name){
		if (typeof deps === "fucntion") {
			fn = deps;
			deps = [];
		};
		if (typeof deps !== "object" && typeof fn !== "function") {
			alter("params error");
		};
		var src = getCurrentPath();
		if (dps.length === 0) {
			module[src] = {
				name : name ||src,
				src  : src,
				dps  : [],
				exports : (typeof fn === "function")&& fn(),
				state : "complete"
			};
			return checkDps();
		}else{
			modules[src] = {
				name : name || src,
				src : src,
				dps : dps,
				exports : fn,
				state : "initial"
			};
			return checkDps();
		}
	};
	window.define = define;
	window.require = function(){
		window.define.apply([],Array.prototype.slice.call(arguments).concat("module|"+setTimeout(function(){},0)));
	};
	require.config = {
		base : getBasePatch()
	};
	require.loadScript = loadScript;
	var loadDeafultJs = getCurrentNode().getAttribute("data-main");
	loadDeafultJs && loadScript(loadDeafultJs);
})();