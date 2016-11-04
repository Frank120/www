(function($){
	//define jquery extend fun 
	$.fn.combobox = function(options,params){
		if (typeof options == 'string') {
			return $.fn.combobox.methods[options](this,params);
		}
		//merge transmit params and default parmas
		options = $.extend({},$.fn.combobox.defaults,options || {});
		// add default value
		var target = $(this);
		target.attr('valuefield',options.valueField);
		target.attr("textfield",options.textField);
		target.empty();
		var option = $("<option></option>");
		option.attr("value",' ');
		option.text(options.palceholder);
		target.append(option);
		// judge user trandmit params whether has data list ,if has ,not use ajax or use ajax
		if (options.data) {
			init(target,options.data);
		}else{
			options.onBeforeLoad.call(target,options.param);
			if (!options.ur) return;
			$.getJSON(options.url, options.params, function(data){
				init(target,data);
			});
		}
		function init(target,data){
			$.each(data,function(i,item){
				var option = $("<option></option>");
				option.attr('value',item[options.valueField]);
				option.text(item[options,textField]);
				target.append(option);
			});
			options.onLoadSuccess.call(target);
		}
		target.unbind("change");
		target.on("change",function(e){
			return options.onChange(target.val());
		});
	}
	//if transmit is string , call fun
	$.fn.combobox.methods = {
		getValue : function(jq){
			return jq.val();
		},
		setValue : function(jq,params){
			jq.val(params);
		},
		load: function(jq,url){
			$.getJSON(url,function(data){
				jq.empty();
				var option = $('<option></option>');
				option.attr('value',' ');
				option.text('pelase choose');
				jq.append(option);
				$.each(data,function(i,item){
					var option = $('<option></option>');
					option.attr('value',jq.attr('valuefield'));
					option.text(item[jq.attr('valuefield')]);
					jq.append(option);
				});
			});
		}
	};

	//default params list
	$.fn.combobox.defaults ={
		url : null,
		params : null,
		data : null,
		valueField : 'value',
		textField : 'text',	
		palceholder : 'plases choose',
		onBeforeLoad : function(param){},
		onLoadSuccess : function(){},
		onChange : function(value){}
	};
})(jQuery)