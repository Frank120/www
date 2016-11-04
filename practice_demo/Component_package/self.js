(function($){
	//define self function
	$.fn.myFunction = function(options,params){
		if (typeof options == 'string') {
			return $.fn.myFunction.method[options](this,params);
		}

		options.extend({},$.fn.myFunction.default || {});

		//add default events
		var target = $(this);
		function __ChooseDirection(direction){
			if (options.direction == 'right') {
				//do something
			}else if (options.direction == 'left') {
				//do something
			}
		};
	};
	//default value
	$.fn.myFunction.default = {
		direction : 'right',
	}
})(jQuery);