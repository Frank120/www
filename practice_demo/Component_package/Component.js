
(function($){
	// first get target object
	var _ajax = $.ajax;

	//definition default error function
	$.ajax = function(options){
		var fn = {
			error : function(XMLHttpRequest,textStatus,errorThrown){
				toastr.error(XMLHttpRequest.responseText,"error information",{closeButton:true,timeOut:0,positionClass:"toast-top-full-width"});
			},
			success : function(data,dataStatus){ },
			beforeSend : function(XHR){},
			complete : function(){}
		}
		// if has writed error fun ,not use default error function
		if (options.error) {
			fn.error = options.error;
		}
		if (options.success) {
			fn.success = options.success;
		}
		if (options.beforeSend) {
			fn.beforeSend = options.beforeSend;
		}
		if (options.complete) {
			fn.complete = options.complete;
		}
		//extend $.ajax fun and return new params
		var _options = $.extend(options,{
			error : function(XMLHttpRequest,textStatus,errorThrown){
				fn.error(XMLHttpRequest,textStatus,errorThrown);
			},
			success : function(data,textStatus){
				fn.success(data,textStatus);
			},
			beforeSend : function(XHR){
				fn.beforeSend(XHR);
			},
			complete :function(SHR,TS){
				fn.complete(SHR,TS);
			}
		});
			// transmit new params to $.ajax
			_ajax(_options);
	};
})(jQuery);