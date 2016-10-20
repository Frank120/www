/**
 * Created by frank.wang on 2016/10/20.
 */
/*
* RESTful
*
* 1. 协议 HTTPs
*
* 2. 域名
*
* 3. 版本
*
* 4. 路径
*
* 5. HTTP动词，get post put patch delete  (head options)
*
* 6. 过滤信息
*
* 7. 状态码 200 201 202 204 400 401 403 404 406 410 422 500
*
* 8. 错误处理
*
* 9. 返回结果
*
* 10. Hypermedia API
* */


//UMD

(function(root,factory){
    if (typeof define ==='function' && define.amd){
        difine([jQuery,'underscore'],factory);
    }else if (typeof exports === 'object'){
        module.exports = factory(require('jquery'),require('underscore'));
    }else {
        root.returnExports = factory(root.jQuery,root._);
    }
}(this,function($,_){
    function a(){}; //private
    function b(){}; //public
    function c(){}; //public

    return {
        b:b,
        c:c
    };
}));