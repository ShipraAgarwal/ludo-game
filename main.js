var left = [0, 33, 33, 0, -33, -33, 0, -33, 0, -33, -33, 0, 33, 33, 0, 33, 0];
var topx = [32, 32, 0, 32, 0, 32, 32, 0, -32, -32, 0, -32, 0, -32, -32, 0, 32];
var dice_img = ["url(images/one.jpg)", "url(images/two.jpg)", "url(images/three.jpg)", "url(images/four.jpg)", "url(images/five.jpg)",
				"url(images/six.jpg)"];

var turn = 0; // 0 is for yellow, and 1 is for red;
var move_val = [];
var spn = document.getElementById("mesg");
var i;
var msg1 = "choose another coin";
var obj_yellow = document.getElementsByClassName("yellow");
var obj_red = document.getElementsByClassName("red");


var d = document.getElementById("dice");
d.addEventListener("click",dice,false);

// This function runs on dice click
function dice(){
	var v = Math.floor(Math.random()*6);
	d.style.backgroundImage = dice_img[v];
	v = v+1;
	move_val.push(v);
	if(v < 6){
		d.removeEventListener("click",dice,false);
		if(turn == 0){
			for(i=0;i<4;i++){
				obj_yellow[i].attributes.onclick.nodeValue = "move(this)";	// REMOVE ONCLICK FROM YELLOW COINS
			}
		}
		else{
			for(i=0;i<4;i++){
				obj_red[i].attributes.onclick.nodeValue = "move(this)";	// REMOVE ONCLICK FROM YELLOW COINS
			}
		}
	}
}
// This Function counts the move for the clicked coin
function move(coin){
	var flag = parseInt(coin.attributes[2].nodeValue);
	var index = parseInt(coin.attributes[3].nodeValue);
	var block = parseInt(coin.attributes[4].nodeValue);
	var dist = parseInt(coin.attributes[5].nodeValue);
	var x = document.getElementById(coin.id);
	var style = window.getComputedStyle(x);
	var t = parseInt(style.getPropertyValue('top'));
	var l = parseInt(style.getPropertyValue('left'));
	var value = move_val[0];
	// WHEN COIN IS NOT OPEN YET-------
	if(flag ==	0){		
		if(value === 6 && turn === 0){
			coin.style.top = "40px";
			coin.style.left = "265px";
			coin.attributes[2].nodeValue = "1";
			block = 1;
			dist =1;
			coin.attributes[4].nodeValue = block;
			coin.attributes[5].nodeValue = dist;
			move_val.splice(0,1);
		}
		else if(value === 6 && turn === 1){
			coin.style.top = "430px";
			coin.style.left = "200px";
			coin.attributes[2].nodeValue = "1";
			block = 1;
			dist =1;
			coin.attributes[4].nodeValue = block;
			coin.attributes[5].nodeValue = dist;
			move_val.splice(0,1);
		}
		else if(turn === 0){	
			for(i=0;i<4;i++){
				var temp = obj_yellow[i].attributes[2].nodeValue;
				if(temp == 1){
					spn.innerHTML = msg1;
					break;
				}
			}
			if(i==4){
				move_val.splice(0,1);
			}
		}
		else if(turn === 1){
			for(i=0;i<4;i++){
				var temp = obj_red[i].attributes[2].nodeValue;
				if(temp == 1){
					spn.innerHTML = msg1;
					break;
				}
			}
			if(i==4){
				move_val.splice(0,1);
			}
		}


	}

//----------------------------------------
	
// WHEN THE COIN HAS ALREADY BEEN OPENED
	else{
		for(var i=0;i<value;i++){
			if(dist>=51){
				final(value-i);
				break;
			}
			else{
			l = (l + left[index]);
			t = (t + topx[index]);
			coin.style.left = l + "px";
			coin.style.top = t + "px";
			
			block = block + 1;
			dist = dist + 1;
			if((block == 5)||(block == 6)||(block == 11)){
				index = index+ 1;
			}
			else if(block == 13){
				index = index + 1;
				block = 0;
			}
			else if(index == 16 && turn == 1){
				index = 0;
			}
			coin.attributes[3].nodeValue = index;
			coin.attributes[4].nodeValue = block;
			coin.attributes[5].nodeValue = dist;
		}
		}
		if(i == value){
			move_val.splice(0,1);
			collapse();
		}

	}
// ----- THINGS TO DO AFTER ALL THE MOVES HAVE BEEN DONE ----
	if(move_val.length === 0){
		refresh();
	}


// FUNCTION FOR ENTERING INTO HOME------------------
	function final(fv){
		if((dist+fv)<=57){
			for(i=0;i<fv;i++){
				if(turn == 0)
					t = t+32;
				else
					t = t -32;
				coin.style.top = t + "px";
				dist = dist+1;
			}
			coin.attributes[5].nodeValue = dist;
			move_val = [];
		}
	
		else{
			var count=0;
			if(turn == 0){
				for(i=0;i<4;i++){
					if((obj_yellow[i].attributes[2].nodeValue) == 1)
						count++;
				}
			}
			else{
				for(i=0;i<4;i++){
					if((obj_red[i].attributes[2].nodeValue) == 1)
						count++;
				}
			}
			if((count === 1) && (fv < 6)){
				move_val = [];
			}
		}
		if(dist==57){
			coin.attributes[2].nodeValue = "0";
			coin.style.display = "none";
			if(turn === 0){
				turn =1;
			}
			else{
				turn = 0;
			}
		}
	
	}

// FUNCTION TO CHECK WETHER COINS COLLIDES
function collapse(){
	if(turn == 0){
			var d1 = 0;
			var count = 0;
			var safe = 0;
			console.log("yellow");
			for(var j = 0; j<4; j++){
				d1 = parseInt(obj_red[j].attributes[5].nodeValue);
				var dif = dist - d1;
				if(((dif === 26)|| (dif === -26)) && (d1>0 && d1 < 51) && (dist < 52))
				{
					count++;
					ind = j;				}
			}
			if(count === 1){
				for(var j=0;j<4;j++){
					if((dist === (1+(8*j)+(5*j))) || (dist === (1+(8*(j+1)+(5*j)))))
						safe = 1;
				}
				if(safe == 0){
				obj_red[ind].attributes[2].nodeValue = 0;
				obj_red[ind].attributes[3].nodeValue = 8;
				obj_red[ind].attributes[4].nodeValue = 0;
				obj_red[ind].attributes[5].nodeValue = 0;
				obj_red[ind].style= "";
				if(turn === 0){
					turn =1;
				}
				else{
					turn = 0;
				}
				}
			}
			}
		else
		{
			var d1 = 0;
			var count = 0;
			var safe = 0;
			for(var j = 0; j<4; j++)
			{
				d1 = parseInt(obj_yellow[j].attributes[5].nodeValue);
				var dif = dist - d1;
				if(((dif === 26)|| (dif === -26)) && (d1>0 && d1 < 51) && (dist<52)){		
					count++;
					ind = j;
				}
			}
			if(count === 1){
				for(var j=0;j<4;j++){
					if((dist === (1+(8*j)+(5*j))) || (dist === (1+(8*(j+1)+(5*j)))))
						safe = 1;
				}
				if(safe == 0){
					obj_yellow[ind].attributes[2].nodeValue = 0;
					obj_yellow[ind].attributes[3].nodeValue = 0;
					obj_yellow[ind].attributes[4].nodeValue = 0;
					obj_yellow[ind].attributes[5].nodeValue = 0;
					obj_yellow[ind].style="";
				if(turn === 0){
					turn =1;
				}
				else{
					turn = 0;
				}
				}
			}
		}
}
}

// FUNCTION FOR RESETTING DICE AND COINS FOR THE TURN OF NEXT PLAYER
function refresh(){
	for(i=0;i<4;i++){
			obj_red[i].attributes.onclick.nodeValue = "";	// REMOVE ONCLICK FROM YELLOW COINS
		}
		for(i=0;i<4;i++){
			obj_yellow[i].attributes.onclick.nodeValue = "";  // REMOVE ONCLICK FROM RED COINS
		}
		d.style.backgroundImage = "url(images/dice1.gif)";
		d.addEventListener("click",dice,false);				// ADD EVENT lISTENERE BACK TO DICE	
		if(turn === 0){
			turn =1;
			d.style.backgroundColor = "red";
		}
		else{
			turn = 0;
			d.style.backgroundColor = "yellow";	
		}
}
