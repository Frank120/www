/**
 * Created by frank.wang on 2016/10/18.
 */
var number = document.getElementById("number");

function changeNumber(){
    var text = number.innerText;
    var newText = Number(text.replace(/%/,''));

    if (newText<100){
        newText++;
    }else {
        clearTimeout(timer);
    }

    number.innerText = newText+"%";
    var timer = setTimeout(changeNumber,20);
}

changeNumber();