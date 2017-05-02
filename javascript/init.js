var board = new Array(),//每个格子的数字
						//board[i][j], i 代表行, j代表列
	score = 0,//分数
	has_conflicted = new Array(),//解决连续消除的标记
	successString = 'Success',
	gameOverString = 'GameOver';

// 此段落加载html文本最后
// ele = document.querySelector('#start');
// ele.addEventListener('click',function(){
// 	newGame();
// });

// $('#start').delegate('','click',newGame);
// 这段代码没有用,按钮并没有绑定好事件

/*
js的引入方式

js 可以放在页面中的任何位置，我们通常将其放在</body>标签的上面。原因是html自上而下的加载顺序问题，js通常用来控制DOM元素的，所以先加载完DOM元素再加载js.

js可以放在页面的头部，用window.onload=function(){}包起来，或者可以用JQuery的$(document).ready(function(){});
2者区别是window.onload是将所用的文字、图片、元素加载完成再执行函数内的命令，只能出现1次，出现多次，最后一个覆盖前者。

$(document).ready(function(){});是等所有的DOM都加载完成执行这个函数，可以出现多次。
 */
$("#start").ready(function(){
	$("#start").click(function(){
    newGame();
})
});
$("#start").ready(newGame);//加载完之后开始游戏，这句话的意思不明?????????????????????????

function newGame(){
	//初始化数组
	for(var i=0;i<4;i++){
		board[i] = new Array();
		has_conflicted[i] = new Array();
		for(var j=0;j<4;j++){
			board[i][j]=0;
			has_conflicted[i][j]=false;
		}
	}
	//通过newGame按钮开始游戏是初始化棋盘
	updateBoardView();
	score = 0;
	updateScore(score);//通过newGame按钮开始游戏时初始化分数
	//棋盘上随机出现两个数字
	generateOneNum();
	generateOneNum();
}

//重绘棋盘
function updateBoardView(){
	$("td").empty();
	for(var i_2=0;i_2<4;i_2++){
		for(var j_2=0;j_2<4;j_2++){
			if(board[i_2][j_2]){
				var tem=$("tr:eq("+i_2+")").children("td:eq("+j_2+")").append("<p>"+board[i_2][j_2]+"</p>").children("p");
					tem.css("background-color",getNumBackcolor(board[i_2][j_2]));
					tem.css("color",getNumColor(board[i_2][j_2]));
					//With no parameters, the .show() method 
					//is the simplest way to display an element
					tem.show()
			}
			//两个数字会和后，有些has_conflicted[][]变为true
			//之后每次调用updateBoardView函数，会将所有格子的has_conflicted变为false
			has_conflicted[i_2][j_2] = false;
		}
	}
}

//根据不同数字显示不同背景颜色
function getNumBackcolor(num){
	switch(num){
		case 2:return "#eee4da";break;
		case 4:return "#eee0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return '#edcf72';break;
		case 256:return '#edcc61';break;
		case 512:return '#9c0';break;
		case 1024:return '#33b5e5';break
		case 2048:return '#09c';break;
		case 4096:return '#a6c';break;
		case 8192:return '#93c';break;
	}
	return 'black';
}

//根据不同数字显示不同字体颜色
function getNumColor(num){
	if(num>4){
		return "snow";
	}
	else{
		return "#776e65";
	}
}

//jQuery .attr( attributeName, value ) 方法
function updateScore(){
	$("label>input").attr("value",""+score);
}



//随机一个位置和一个数字
//并将数字显示出来
function generateOneNum(){
	//如果棋盘已满返回
	if(noSpace()){//noSpace 是一个定义的函数
		return false;
	}
	var randX,randY,time=0;
	//最多随机50次
	//保证随机出来的位置上为空
	do{
		time++;
		//  Math.floor() 向下取整
		//  Math.random() 随机返回一个0到1之间的数字
		randX = Math.floor(Math.random()*4)
		randY = Math.floor(Math.random()*4)
	}while(board[randX][randY]&&(time<50))
	//50次之后依然随机不到，循环查找空位
	if(time==50){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(!board[i][j]){
					randX=i;
					randY=j;
				}
			}
		}
	}
	//随机出现一个数字2或者4
	randNum = Math.random()>0.1?2:4;
	board[randX][randY] = randNum;//设定棋盘上的数字
	showNumAnimate(randX,randY,randNum);
	return true;
}

//动态显示数字
function showNumAnimate(i,j,randNum){
	//为目标单元添加p元素
	var tem=$("tr:eq("+i+")").children("td:eq("+j+")")
							.append("<p>"+randNum+"</p>")
							.children("p");
	//动态显示数字
	tem.css("background-color",getNumBackcolor(randNum));
	tem.css("color",getNumColor(randNum));
	//jQuery .fadeIn()   显示速度 fast,normal,slow
	tem.fadeIn("normal");
}

function noSpace(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(!board[i][j]){
				return false;
			}
		}
	}
	return true;
}