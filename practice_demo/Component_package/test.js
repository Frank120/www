window.onload = function(){
	$(".search_container").hide();
	$(".search_li").each(function(index,e){
		$(e).attr('data-index',index);
	});
};

$(".myInput").click(function(){
	// $(".search_container").show();
	var dom = $(".myInput"),
	targetDom = $(".search_li");
	methods.__jugment();
	methods.__keyupEvent(dom,targetDom);
})

var methods = {
	flag: 'true',
	__jugment : function(){
		// var flag = true;
		if (this.flag) {
			$(".search_container").show();
			return this.flag = false;
		}else if (!this.flag) {}{
			$(".search_container").hide();
			return this.flag = true;
		}
	},
	__keyupEvent : function(dom,targetDom,options){
		dom.on("keyup",function(e){
			if (targetDom.length) {
				var selectedItem = $('.search_li.selected'),
				items = targetDom,
				selectedIndex = Math.min(selectedItem.data("index") === undefined ? -1 : selectedItem.data("index"), items.length - 1),
				offsetHeight = $(".search_container").offset().top;

				switch (e.keyCode){
					case 38 :
					if (selectedIndex != -1) {
						selectedItem.removeClass("selected");
						selectedIndex--;
						$('.search_li[data-index ="'+selectedIndex+'"]').addClass("selected");
					}
					return false;
					break;
					case 40 :
					if (selectedItem!= items.length - 1) {
						selectedItem.removeClass("selected");
						selectedItem++;
						$('.search_li[data-index ="'+selectedIndex+'"]').addClass("selected");
					}
					return false;
					break;
				}
			}
		});
	}
}