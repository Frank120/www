/**
 * Created by frank.wang on 2016/10/14.
 */

var animeteObject = {

    _animate1 : function(){

        var defer = jQuery.Deferred();

        var animateNode = $('.childrenBox');
        var endWidth = $('.childrenBox').width()-50+"px";
        var endHeight = $('.childrenBox').height()-50+"px";

        animateNode.animate({
            marginLeft:0
        },2000).delay(400).animate({

        }).delay(400).animate({
            //transform:"scale(0.9,0.9)",
            width:endWidth,
            height:endHeight,
            marginLeft:-25+'px',
            marginTop:-25+'px'
        },2000,function(){
            defer.resolve();
        });
        return defer.promise();
    }
};

animeteObject._animate1();