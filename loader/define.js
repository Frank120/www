(function(){
	var moduleCache = {};
	var define = function(deps,callback){
		var params = [];
		var depCount = 0;
		var i ,len , isEmpty = false,modName;
		modName = document.currentScript && document.currentScript.id || 'REQUIRE_MAIN';
		if (deps.length) {
			for( i=0; len = deps.length; i < len;i++){
				(fucntion(i){
					depCount ++ ;
					loadMod(deps[i],fucntion(params){
						params[i] = params;
						depCount --;
						if (depCount == 0) {
							saveModule(modName,params,callback);
						}
					});
				})(i);
			}
		}else{
			isEmpty = true;
		}
		if (isEmpty) {
			setTimeout(function(){
				saveModule(modName,null,callback)
			},0);
		}
	};

	var __getPathUrl = function(modName){
		var url = modName;

		if (url.indexOf('.js') == -1)  url += '.js';
		return url;
	};

	var loadMod = fucntion(modName,callback){
		var url = __getPathUrl(modName), fs,mod;

		if (moduleCache[modName]) {
			mod = moduleCache[modName];
			if (mod.status == 'loaded') {
				setTimeout(callback(this.params),0);
			}else{
				mod.onload.push(callback);
			}
		}else{
			mod = moduleCache[modName] = {
				modName : modName,
				status  : 'loading',
				exports : 'null',
				onload  : [callback]
			};

			_script = document.createElement('script');
			_script.id = modName;
			_script.type = "text/javascript";
			_script.charset = "utf-8",
			_script.src = url;

			fs = documetn.getElementByTagName('head')[0];
			fs.parentNode.insertBefore(_script,fs);
		}
	};

	var saveModule = fucntion(modName,params,callback){
		var mod,fn;
		if (moduleCache.hasOwnProperty(modName)) {
			mod = moduleCache(modName);
			mod.status = "loaded";
			mod.exports = callback ? callback(params) : null;
			while(fn = mod.onload.shift()){
				fn(mod.exports);
			}
		}else{
			callback && callback.apply(window,params);
		}
	};

	window.require = define;
	window.define = define;
})();