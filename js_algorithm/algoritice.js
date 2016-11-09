// var Array = ["a","b","c","d","e"];

// function linearSearch(A,X){
// 	for(var i =0; i<A.length;i++){
// 		if (A[i] == X) {
// 			console.log(i);
// 			return i;
// 		}
// 	}
// 	console.log('-1');
// 	return -1;
// };
// linearSearch(Array,"c");


// var Array = [1,2,3,4,5,6];

// function binarySearch(A,x){
// 	var low = 0;
// 	var height = A.length - 1;
// 	while(low <= height){
// 		var mid = Math.floor((low + height)/2);
// 		if (x == A[mid]) {
// 			console.log(mid);
// 			return mid;
// 		}
// 		if (x < A[mid]) {
// 			height = mid -1;
// 		}
// 		else{
// 			low = mid + 1;
// 		}
// 	}
// 	console.log("-1");
// 	return -1;
// }
// binarySearch(Array,5)

// var Array = [1,5,6,4,8,2,7,3];

// function bubblesort(A){
// 	for(var i = 0; i < A.length; i++){
// 		var sorted = true;
// 		for(var j = A.length - 1; j > i; j--){
// 			if (A[j] < A[j -1 ]) {
// 				swap(A,j,j-1);   //------C
// 				sorted = false;
// 			}
// 		}
// 		if (sorted) {
// 			return;
// 		}
// 	}
// }
// bubblesort(Array);


function candidate(A,m){
	var count = 1;
	var c     = A[m];
	var n     = A.length - 1;

	while(m < n && count > 0){
		m++;
		if (A[m] == c) {
			count ++;
		}else{
			count --;
		}
	}
	if (m == n) {
		return c;
	}else{
		return candidate(A,m+1);
	}
};

function majority(A){
	var c     = candidate(A,0);
	var count = 0;
	for(var i = 0; i < A.length; i++){
		if (A[i] == c) {
			count ++ ;
		}
	}
	if (count > Math.floor(A.length/2)) {
		return c;
	}
	return null;
}
var m = majority([2,2,3,3,4,3]);
alert(m);