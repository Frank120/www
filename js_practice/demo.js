/**
 * Created by think on 2016/9/19.
 */
//函数内部的属性

//函数的内部有两个属性： arguments, this
//arguments是一个数组对象，包含数组传入的所有参数 他还有一个callee属性，
//他是一个指针 ， 指向拥有这个arguments的函数。

//function factorial(num){
//    if(num <= 1){
//        return 1 ;
//    }else {
//        return num*factorial(num - 1);
//    }
//}

//改进
//function factorial(num){
//    if (num <= 1){
//        return 1;
//    }else{
//        return num * arguments.callee(num - 1) ;
//    }
//}
//
//var trueFactorial = factorial;
//
// factorial = function(){
//     return 0;
// };
//
//alert(trueFactorial(5));
//alert(factorial(5));

//函数里面另一个特殊的属性就是this  this执行的是函数以执行的环境对象。

//window.color = 'red';
//var o = {color :"blue"};
//
//function showColor(){
//    alert(this.color);
//}
//showColor();
//o.showColor = showColor;
//o.showColor();

//function  aa(){
//    alert(this);
//};
//
//aa(); // window

/*注意
*
* 函数的名字仅仅是一个包含指针的变量，在不同的环境中它们指向的其实是同一个函数
* 在严格模式下访问 arguments.callee会导致报错
* 严格模式下还有一个限制; 不能为callee属性赋值，否则回导致报错*/

//
//function  sum(num1,num2){
//    return num1 + num2
//};
//
//function callSum(num1,num2){
//    return sum.call(this,num1,num2) ;
//}
//
//alert(callSum(10,10))

//call() apply() 可以用来传递参数， 而最强大的功能当是可以扩充函数赖以生存的作用域



//基本的包装类型

//var s1 = "some text";
//var s2 = s1.substring(2);
//
//alert(s1);
//alert(s2);

// 读取到s2的时候，访问过程出于一种读取模式
/*1.会创建String类型的实例
* 2.在实例上调用指定方法
* 3.销毁这个方法*/
//引用类型和包装基本类型的主要区别就在于对象的生存周期


//单体内置对象 事实上没有全局变量和全局函数，所有全局作用域中定义的属性方法，都属兔global对象的属性。

//eval("function sayhi(){alert('hi')}");
//sayhi();

//global属性

//var global = function(){
//    return this ;
//}();

//var value = [1,2,3,4,5,6,7,8,9];
//var max = Math.max.apply(Math,value);
//alert(max);



//面向对象

//属性类型  包含一个属性的位置。在这个位置可以直接读取和写入值。

//访问器属性  getter and setter
// getter负责获取有效数据
// setter传入值，并且负责如何处数据
/*访问器属性只能通过Object.dedfineProperty（）来定义*/



//原型与in操作符
//单独使用和再for-in中使用
/*1.单独使用得时候，in操作符会在通过对象访问给定属性时返回true
* 2.*/

//eg 1
//function Person(){};
//
//Person.prototype.name = "frank";
//Person.prototype.age = 22;
//Person.prototype.job = 'frontend developer';
//Person.prototype.sayName = function(){
//    alert(this.name);
//};
//
//var person1 = new Person();
//var person2 = new Person();

//同时使用hasOwnProperty()方法和in操作符可以确定该属性到底是存在于对象中还是存在于原型中

//in操作符只要通过对象能访问到属性就返回true，hasOwnProperty只在属性存在于实例中才返回true
//function hasPrototypeProperty(object,name){
//    return !object.hasOwnProperty(name)||(name in object);
//}



//2016-9-25


//要获取对象上可枚举的实例属性,可以使用Object.keys();  接收一个对象做为参数，返回一个包含所有可枚属性的字符串。

//function Person(){ };
//Person.prototype.name = "frank wang";
//Person.prototype.age = "23";
//Person.prototype.job = "front end developer";
//Person.prototype.sayName = function(){
//    alert(this.name);
//}
//
//var  keys = Object.keys(Person.prototype);
//alert(keys);
//
//var p1 = new Person();
//p1.name = "andy";
//p1.age = "28";
//
//var p1keys = Object.keys(p1);
//alert(p1keys);


//function Person(){ };
//
//Person.prototype = {
//    constructor : Person,
//    name        : 'Frank Wang',
//    age         : "23",
//    job         : "front end developer",
//    sayName     : function(){
//        alert(this.name);
//    }
//};

//特地设置了一个constructor属性，并将他的值设置为Person，从而确保了通过该属性能够访问到适当的值。



//在原型中查找值是一种搜索的状态，因此对原型的任何修改都能立即从实例上面体出来，即使先创建了实例后修改原型。
//var friend = new Person();
//Person.prototype.sayHi = function(){
//    alert('Hi');
//};
//friend.sayHi();

//实例中的指针仅指向原型对象，而不会指向构造函数

//function Person(){};
//var friend = new Person();
//Person.prototype = {
//    constructor : Person,
//    name        : 'frank wang',
//    age         : '23',
//    job         : 'front end developer',
//    sayName     : function(){
//        alert(this.name);
//    }
//};
//
//friend.sayName();




// 原生对象的原型  不推介这种方法。可能会意外的重写原生对象的方法

//String.prototype.statusWith = function(text){
//    return this.indexOf(text) == 0;
//}
//
//var  msg = 'frank wang';
//alert(msg.statusWith('frank'));


//2016-9-26

//寄生构造函数模式
//基本思想--创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象，
//从表面上来看，又是一个典型的构造函数

//function Person(name,age,job){
//    var o = new Object();
//    o.name = name;
//    o.age = age;
//    o.job = job;
//    o.sayName = function(){
//        alert(this.name);
//    }
//    return o ;
//}
//
//var  friend = new Person('frank','23','front end developer');
//friend.sayName();

/*构造函数在不返回值的情况下，默认会返回对象的实例*/


//function SpecialArray() {
//    //创建数组
//    var value = new Array();
//    //添加值
//    value.push.apply(value,arguments);
//    //添加方法
//    value.toPipedString = function(){
//        return this.join("|");
//    };
//    //返回数组
//    return value;
//}
//
//var color = new SpecialArray('red','black','blue');
//alert(color.toPipedString());

/*首先：返回的对象与构造函数或者构造函数的原型属性之间没有关系，也就是说，构造函数返回的
* 对象与构造函数在外部创建的对象没有什么不同。*/

//稳妥构建模式
/*所谓稳妥对象，也就是说是没有公共属性的，而且方法之间也不引用this对象
*
* 稳妥构造函数与寄生构造函数类似，但是有两点不同
* 1.创建对象的实例方法不用this
* 2.不用new操作符操作构造函数*/

//function  Person(name,age,job){
//    var o = new Object();
//    o.sayName = function(){
//        alert(name);
//    }
//    return o;
//}



//继承
/*1.接口继承
* 2.实现继承
* ****ECMAScript只支持实现继承*****
* */

//实现原型链
//function SuperType(){
//    this.property = true;
//}
//SuperType.prototype.getSuperValue = function(){
//    return this.property;
//}
//function SubType(){
//    this.subproperty = false;
//}
////继承subtype
//SubType.prototype = new SuperType();
//SubType.prototype.getSubValue = function(){
//    return this.subproperty;
//}
//var instance = new SubType();
//alert(instance.getSubValue());

//谨慎定义方法

