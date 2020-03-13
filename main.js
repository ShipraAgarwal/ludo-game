var left = [0, 33, 33, 0, -33, -33, 0, -33, 0, -33, -33, 0, 33, 33, 0, 33, 0];
var top = [32, 32, 0, 32, 0, 32, 32, 0, -32, -32, 0, -32, 0, -32, -32, 0, 32];

var r_block = 0;
var y_block = 0;
var block_number = 0;
var red_index = 0;
var yellow_index = 0;
 var value = 1;

function move(coin){
	var flag = coin.attributes[2].nodeValue;
	var x = document.getElementById(coin.id);
	var style= window.getComputedStyle(x);
	var top = parseInt(style.getPropertyValue('top'));
	var left = parseInt(style.getPropertyValue('left'));
	console.log(x);
	console.log(left);
	if(flag == 	1)
	{

	}
	else{
		for(var i=0;i<value;i++){
			console.log("hello");
			left = (left + left[yellow_index]);
			top = (top + top[yellow_index]);
			console.log(left);
			console.log(top);
			block_number++
			value --;
			if((block_number == 5)||(block_number == 6)||(block_number == 11)){
				yellow_index++;

			}
		
			else if(block_number == 13){
				yellow_index++;
				block_number = 1;

			}
		}

	}
}