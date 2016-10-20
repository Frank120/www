/**
 * Created by think on 2016/10/12.
 */
//2016-10-12

//BOM
//1.核心对象是window，即使 js访问浏览器的一个接口，又是ECMAScript规定的一个Global对象，


//窗口位置
//跨浏览器获取窗口左边喝上边的位置

//var leftPos  = (typeof window.screenLeft == "number")?window.screenLeft : window.screenX;
//
//var topPos = (typeof window.screenTop == "number")? window.screenTop : window.screenY;


//窗口大小

//2016-10-13
/*跨浏览器确定一个窗口的大小不容易，
* innerWidth innerHeight outerWidth outerHeight*/

//var pageWidth = window.innerWidth;
//var pageHeight = window.innerHeight;
//
//if (typeof pageWidth !="number"){
//
//    if (document.compatMode == "CSS1Compat"){
//
//        pageWidth = document.documentElement.clientWidth;
//        pageHeight = document.documentElement.clientHeight;
//    }else {
//
//        pageWidth = document.body.clientWidth;
//        pageHeight = document.body.clientHeight;
//    }
//}

//2016-10-17 导航和打开窗口

//window.open()方法既可以导航到一个特定的url，也可以打开一个新的浏览窗口
//可以接收四个参数
/*1.需要加载的url
2.窗口目标
3.一个特性字符穿
4.一个代表新页面是否取代刘浏览器历史中当前加载页面的布尔值
！！！通常只需要传入第一个值，最后一个参数只再不打开新窗口的情况下传递
*/

//window.close(); 关闭新打开的窗口，仅适用于window.open()打开的窗口。

//弹出窗口屏蔽程序

//var blocked = false;
//
//try {
//    var wroxWin = window.open("http://www.wrox.com","_blank");
//
//    if(wroxWin == null){
//
//        blocked = true;
//    }
//}catch (ex){
//    blocked = true;
//}
//
//if(blocked){
//    alert("the popup was blocked!");
//}



//page 221  间隙调用和超时调用

alert();
confirm();
prompt();