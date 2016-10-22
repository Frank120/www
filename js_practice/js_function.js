/**
 * Created by think on 2016/9/29.
 */
//2016-9-29
/*函数表达式*/
/*1.特征：函数声明提升，在执行代码前会先读取函数声明，这意味这可以吧函数声明写在调用它
* 的语句后面。*/

//递归函数：通过调用函数名自身来实现的

//function factorial(num){
//    if (num <= 1){
//        return 1;
//    }else {
//        return num*factorial(num - 1);
//    }
//}
//
//function factorial1 (num){
//    if (num <=1){
//        return 1;
//    }else {
//        return num*arguments.callee(num - 1);
//    }
//}

//argument.callee是一个指向正在执行的函数的指针

//但是在严格模式下，同能通过脚本访问下面这个属性，这个时候可采用匿名函数来解决这个问题

//var factoryial3 = (function f(num){
//    if (num <= 1){
//        return 1;
//    }else {
//        return num*f(num - 1);
//    }
//});




//闭包
/*闭包是指有权限访问另一个函数作用域中变量的函数
* 最常见的创建闭包的方式就是在函数的内部再定义一个函数*/

//function creatComparsionFunction(propertyName){
//    return function (object1,object2){
//        var value1 = object1[propertyName];
//        var value2 = object2[propertyName];
//
//        if (value1 < value2){
//            return -1;
//        }else if (value1 > value2){
//            return 1;
//        }else {
//            return 0;
//        }
//    }
//
//}

//2016-10-08
//闭包与变量
/*闭包只能取得包含函数中任何变量的最后一个值，闭包保存的是整个变量对象，而不是某个
* 特殊的变量*/

//function createFunction(){ //因为每个函数中都保存着createFunction()函数的活动对象，
//                            //导致引用的都是同一个变量i，然而在执行函数后i的值为10
//    var  result = new Array();
//
//    for (var i=0;i<10;i++){
//        result[i] = function(){
//            return i;
//        };
//    }
//
//    return result;
//}



//function creatFuntion(){
//
//    var result = new Array();
//
//    for(var i=0; i<10;i++){
//        result[i] = function(num){
//            return function (){
//                return num;
//            };
//        }(i);
//    }
//
//    return result;
//}


//关于this对象
//匿名函数的作用域具有全局性，因此this的对象通常是指向window的（闭包中需要特别注意）

//var name = "the window";
//
//var object = {
//    name :"my object",
//    getName : function(){
//        return function (){
//            return this.name;
//        }
//    }
//};
//
//alert(object.getName()());//在非严格模式下

//var name = "the window";
//
//var object  = {
//    name  : "my object",
//    getName : function(){
//        var that = this;
//        return function(){
//            return that.name;
//        }
//    }
//}
//
//alert(object.getName()());
//
////this和argument中也会存在同样的问题，如果想访问argument中的对象，必须将该对象的引用
////保存在一个闭包能访问到的变量中。



//2016-10-9
//内存泄漏

//function assignHandler(){
//    var element = document.getElementById('someElement');
//
//    element.onclick = function(){
//        alert(element.id);
//    };
//
//    /*因为匿名函数保存了一个对assignHandler()的活动对象的引用，这样就会导致无法减少对
//    * element的引用数。只要匿名函数存在，element的引用至少为一，这样就会导致他占用的内存永远
//    * 不会被回收*/
//}
//
//function assignHandler(){
//    var element = document.getElementById('someElement');
//
//    var id  = element.id;
//
//    element.onclick = function(){
//        alert(id);
//    };
//
//    element = null;
//
//    /*闭包会引用包含函数的整个活动对象*/
//}

//模仿块级作用域

//js中从来不会告诉你多次重复声明同一个变量，如果有这种情况，它会对后续的声明视而不见
//但是还会执行后续声明中变量的初始化


//匿名函数可以用来模仿块级作用域并避免则个问题。
//(function(){
//    //这里是块级作用域
//})()

/*函数写在一对圆括号里面，表示它实际上是一个函数表达式，而后一对括号表示会立即执行这个函数*/

//function outputNumbers(count){
//    (function(){
//        for (var i = 0;i < count;i++){
//            alert(i);
//        }
//    })();
//
//    alert(i); // 会导致一个错误！
//}

//(function(){
//    var now = new Date();
//
//    if (now.getMonth() == 0 && now.getDate()==1){
//        alert('happy new year!');
//    }
//})()


//私有变量
//私有变量包括函数的参数、局部变量、函数内部定义的其他函数

//function add(num1,num2){
//
//    return num1 + num2;
//
//}

//如果在一个函数内部创建一个闭包，那么闭包可以通过自己的作用域链去访问到这些变量
//利用这一点，可以创建访问私有属性的共有方法

//function  Object(){
//    //私有变量和私有函数
//    var privateVariable = 10;
//
//    function privateFunction(){
//        return false;
//    };
//
//    //特权方法
//    this.publicMethod = function(){
//        privateVariabl++;
//
//        return privateFunction();
//    }
//}

//利用特权方法，可以隐藏那些不应该直接被修改的数据

//function  Person(name){
//    this.getName = function () {
//        return name;
//    };
//
//    this.setName = function(value){
//        name = value;
//    };
//
//}
//
//var person = new Person('frank');
//alert(person.getName());
//person.setName('helen');
//alert(person.getName());


//2016-10-10
//静态私有标量

//通过私有作用域定义私有变量或函数，同样也可以创建特权方法。

//(function(){
//    //私有变量和函数
//    var privateVriable = 10;
//
//    function peivateFunction(){
//        return false;
//    };
//
//    //构造函数
//    myObject = function(){};
//
//    //共有/特权方法
//    myObject.prototype.publicMenthod = function(){
//        privateVriable++;
//        return peivateFunction();
//    }
//
//})();

/*需要注意的是，这个模式在定义构造函数的时候并没有使用函数声明，而是使用的函数表达式，
* 函数表达式只能创建局部函数。
* 初始化未经声明的对象，总是会创建一个全局变量，但是在严格模式下会报错*/

//(function(){
//
//    var name = " ";
//
//    Person = function(value){
//        name = value;
//    };
//
//    Person.prototype.getName = function(){
//        return name;
//    };
//
//    Person.prototype.setName = function(value){
//        name = value;
//    };
//
//})();
//
//var person1 = new Person('frank');
//alert(person1.getName()); //frank
//person1.setName('nico');
//alert(person1.getName());//nico
//
//var person2  = new Person('helen');
//alert(person1.getName()); //helen
//alert(person2.getName());//helen


//2016-10-11
// page 207 模块模式

/*所谓的模块模式，则是为单例创造私有变量和特权方法，
* 所谓单例，指的就是只有一个实例的对象*/

//var singleton = {
//    name : value,
//
//    method : function(){
//        //function
//    }
//}

//var  singleton = function(){
//
//    //私有函数和私有变量
//
//    var privateVariable = 10;
//
//    function privateFunction(){
//        return false;
//    };
//
//    //特权/共有方法和属性
//
//    return {
//        publicVariable : true,
//
//        publicMenthod : function(){
//            privateVariable++;
//            return privateFunction();
//        }
//    };
//}();

/*这种模式在需要对单例进行某些初始化，同时又维护其私有变量是非常有用的*/
//eg

//var application = function(){
//    //私有变量和方法
//
//    var components = new  array( new BaseComponent());
//
//    //初始化
//
//    components.push();
//
//    //public
//
//    return {
//        getComponentCount : function(){
//            return components.length;
//        },
//
//        registerComponent :  function(component){
//            if (typeof component == "object"){
//                components.push(component);
//            }
//        }
//    };
//
//}();

/* 如果必须创建一个对象，并且以某些数据进行初始化，同时还要公开一些能够访问这些私有数据的方法，
* 那么就可以使用模块模式*/


//增强的模块模式
//适合哪些单例必须是某种类型的实例，同时还必须要添加某些属性或方法对其增强的情况。

//var singleton = function(){
//    //私有变量和函数
//
//    var privateVariable = 20;
//
//    function  privateFunction(){
//        return false;
//    };
//
//    //creat object
//
//    var object = new CustomType();
//
//    //添加特权/公有属性和方法
//    object.publicProperty = true;
//
//    object.publicMethod = function(){
//        privateVariable++;
//        return privateFunction();
//    };
//
//    //返回对象
//
//    return object;
//}();

//如果application 是baseCompoents的实例。则可以使用一下代码

//var application = function(){
//    //私有变量和函数
//    var components = new Array();
//
//    //初始化
//    components.push(new BaseComponet());
//
//    //创建一个application的局部副本
//    var app = new BaseComponent();
//
//    //公共接口
//    app.getComponentCount = function(){
//        return components.length;
//    };
//
//    app.registerComponent = function(component){
//        if(typeof components == "object"){
//            components.push(component);
//        }
//    };
//
//    //返回这个副本
//    return app;
//}();
