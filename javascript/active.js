var flag=true;//标识是否出现2048，仅提示一次游戏成功


//绑定键盘事件
$(document).keydown(function(event){
	if($("label>p").text()==successString){
		newGame();
		return;
	}
//阻止默认事件，移动之后生成一个新的数字，并判断游戏是否结束
	event.preventDefault();

	if(move(event.keyCode)/*一个ACII码，键盘上每个键都有一个数值*/){
		setTimeout("generateOneNum()",210);
		setTimeout('isGameover()',300);
	}

})

//根据方向进行移动
//direction:	left:37,up:38,right:39,down:40
function move(direction){
	//判断能否在当前方向上移动，若不能移动返回false
	if(!canMove(direction)){
		return false;
	}
	//根据方向选择遍历的起点（这段话有点问题）
	//查找非空元素时左从第二行开始查找，右从第三行进行查找（a标识）
	//查找非空元素时下从第二列开始查找，上从第三列进行查找（a标识）
	//判断移动位置时左从第一行开始判断，右从第四行进行判断（k标识）(k=d)
	//判断移动位置时下从第一列开始判断，上从第四列进行判断（k标识）(k=d)
	//b用来标识行/列结束位置
	//c用来标识步进
	var a=1,b=4,c=1,d=0;
	if(direction==39||direction==40){
		a=2,b=-1,c=-1,d=3;
	}
	for(var i=0;i<4;i++){
		for(var j=a;j!=b;j+=c){//循环查找非空元素
			switch(direction){
				case 37:
						if(board[i][j]){
							for(var k=d;direction==37?(k<j):(k>j);k+=c/*??*/){
								//当前元素为空且待移动元素和当前元素之间没有非空元素
								if (!board[i][k]&&(direction==37?no_block_horizontal(i,k,j):no_block_horizontal(i,j,k))) {
									show_move_animation(i,j,i,k);//移动
									//更新board数组
									board[i][k]=board[i][j];
									board[i][j]=0;
									//重绘棋盘
									updateBoardView();
									break;
								}else if(board[i][k]==board[i][j]&&(direction==37?no_block_horizontal(i,k,j):no_block_horizontal(i,j,k))&&!has_conflicted[i][k]){
									//当前非空元素和移动元素相等，之间没有非空元素，之前没有合并过
									show_move_animation(i,j,i,k);
									board[i][k]+=board[i][j];
									board[i][j]=0;
									//重绘棋盘
									updateBoardView();
									//更新分数，并置合并标志
									score+=board[i][k];
									updateScore(score);
									has_conflicted[i][k]=true;
									break;
								}
							}
						}
						break;
				
				case 39:
						if(board[i][j]){
							for(var k=d;direction==37?(k<j):(k>j);k+=c/*??*/){
								//当前元素为空且待移动元素和当前元素之间没有非空元素
								if (!board[i][k]&&(direction==37?no_block_horizontal(i,k,j):no_block_horizontal(i,j,k))) {
									show_move_animation(i,j,i,k);//移动
									//更新board数组
									board[i][k]=board[i][j];
									board[i][j]=0;
									//重绘棋盘
									updateBoardView();
									break;
								}else if(board[i][k]==board[i][j]&&(direction==37?no_block_horizontal(i,k,j):no_block_horizontal(i,j,k))&&!has_conflicted[i][k]){
									//当前非空元素和移动元素相等，之间没有非空元素，之前没有合并过
									show_move_animation(i,j,i,k);
									board[i][k]+=board[i][j];
									board[i][j]=0;
									//重绘棋盘
									updateBoardView();
									//更新分数，并置合并标志
									score+=board[i][k];
									updateScore(score);
									has_conflicted[i][k]=true;
									break;
								}
							}
						}
						break;
				case 38:
						if(board[j][i]){
							for(var k=d;direction==38?(k<j):(k>j);k+=c){
								if(!board[k][i]&&(direction==38?no_block_vertical(i,k,j):no_block_vertical(i,j,k))){
									show_move_animation(j,i,k,i);
									board[k][i]=board[j][i];
									board[j][i]=0;
									//重绘棋盘
									updateBoardView();
									break;
								}else if(board[k][i]==board[j][i]&&(direction==38?no_block_vertical(i,k,j):no_block_vertical(i,j,k))&&!has_conflicted[k][i]){
									show_move_animation(j,i,k,i);
									board[k][i]+=board[j][i];
									board[j][i]=0;
									//重绘棋盘
									updateBoardView();
									score+=board[k][i];
									updateScore(score);
									has_conflicted[k][i]=true;
									break;
								}
							}
						}
						break;
				case 40:
						if(board[j][i]){
							for(var k=d;direction==38?(k<j):(k>j);k+=c){
								if(!board[k][i]&&(direction==38?no_block_vertical(i,k,j):no_block_vertical(i,j,k))){
									show_move_animation(j,i,k,i);
									board[k][i]=board[j][i];
									board[j][i]=0;
									//重绘棋盘
									updateBoardView();
									break;
								}else if(board[k][i]==board[j][i]&&(direction==38?no_block_vertical(i,k,j):no_block_vertical(i,j,k))&&!has_conflicted[k][i]){
									show_move_animation(j,i,k,i);
									board[k][i]+=board[j][i];
									board[j][i]=0;
									//重绘棋盘
									updateBoardView();
									score+=board[k][i];
									updateScore(score);
									has_conflicted[k][i]=true;
									break;
								}
							}
						}
						break;
			}
		}
	}
	return true;	
}

//移动元素
function show_move_animation(fromX,fromY,toX,toY){
	var tem = $("tr:eq("+fromX+")").children("td:eq("+fromY+")").children("p");
	tem.animate({//此处的距离需要计算后填入
		top:(toX*(100+23.6)+13)+"px",
		left:(toY*(100+23)+13)+"px"
		},100);
}

//判断水平方向上两个元素之间是否为空
function no_block_horizontal(row,col1,col2){
	for(var i=col1+1;i<col2;i++){//从当前列的下一列到第二个元素的前一列
		if(board[row][i]){//如果元素不为空返回false
			return false;
		}
	}
	return true;
}

//判断垂直方向上两个元素之间是否为空
function no_block_vertical(col,row1,row2){
	for(var i=row1+1;i<row2;i++){
		if(board[i][col]){
			return false;
		}
	}
	return true;
}

//判断游戏是否结束
function isGameover(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==2048){
				if(flag){
					$('label').append('<p>'+successString+'</p>');
					alert(successString);
					flag = false;
					return;
				}
			}
		}
	}
	if(noSpace()&&noMove()){
		gameOver();
	}
}

//没有空间
function noSapce(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(!board[i][j]){
				return false;
			}
		}
	}
	return true;
}

//判断当前是否不能移动
function noMove(){
	if(canMove(37)||canMove(38)||canMove(39)||canMove(40)){
		return false;
	}
	return true;
}

//判断当前方向上是否能移动
function canMove(direction){
	//类似move函数中的设定
	//此处a和b时没有使用的值
	var a=1,b=4,c=1;
	if(direction==39||direction==40){
		a=2,b=-1;c=-1;
	}
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			switch(direction){
				case 37:
						if (board[i][j]){
							if(board[i][j-c]==0||board[i][j]==board[i][j-c]){
								return true;
							}
						}
						break;
				
				case 39:
						if (board[i][j]){
							if(board[i][j-c]==0||board[i][j]==board[i][j-c]){
								return true;
							}
						}
						break;

				case 38:
						if(j!=0){
							if (board[j][i]){
								if (board[j-c][i]==0||board[j][i]==board[j-c][i]){
									return true;
								}
							}
						}
						break;
				case 40:
						if(j!=3){
							if (board[j][i]){
								if (board[j-c][i]==0||board[j][i]==board[j-c][i]){
									return true;
								}
							}
						}
						break;
			}
		}
	}
	return false;
}

//游戏结束提示信息
function gameOver(){
	alert(gameOverString+"\n你的分数是："+$("label>input").val());
	newGame();
}

