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

//page  217 导航和打开窗口