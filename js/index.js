$(document).ready(function() {
	var canvas = document.querySelector("#gameCanvas");
	var context = canvas.getContext("2d");

	var scene = 1;
	var charSizes = [
		{width: 84, height:100},
		{width:100, height:78},
		{width:90, height:96},
		{width:110, height:100}
	]

	var chooseChar1 = new Image();
	var chooseChar2 = new Image();
	var chooseChar3 = new Image();
	var chooseChar4 = new Image();
	var cursor = new Image();

	chooseChar1.src = "images/c01.png";
	chooseChar2.src = "images/c02.png";
	chooseChar3.src = "images/c03.png";
	chooseChar4.src = "images/c04.png";
	cursor.src = "images/down_arrow.png";

	var chooseCharPosX = [250, 350, 450, 550];
	var chooseCharPosY = 200;
	var cursorX, cursorY;
	cursorX = chooseCharPosX[0] + charSizes[0].width/2 - 25;
	cursorY = chooseCharPosY - 50;
	cursorIdx = 0;

	var drawingIntervalId = setInterval(drawScreen, 20);

	function drawScreen() {
		if(scene==1) {
			drawScene1();
		}
	}

	function drawScene1() {
		context.fillStyle="#00004d";
		context.fillRect(0, 0, 914, 490);
		context.font = "40px Helvetica";
		context.fillStyle = "red";
		context.fillText("[함께 할 밤도깨비 캐릭터 선택]", 230, 100);
		context.drawImage(cursor, cursorX, cursorY, 50, 50);
		context.drawImage(chooseChar1,chooseCharPosX[0], chooseCharPosY, charSizes[0].width, charSizes[0].height);
		context.drawImage(chooseChar2,chooseCharPosX[1], chooseCharPosY, charSizes[1].width, charSizes[1].height);
		context.drawImage(chooseChar3,chooseCharPosX[2], chooseCharPosY, charSizes[2].width, charSizes[2].height);
		context.drawImage(chooseChar4,chooseCharPosX[3], chooseCharPosY, charSizes[3].width, charSizes[3].height);
	}

	$(document).keyup(function(e) {
		var nextCursorIdx;
		switch(e.which) {
			case 37:
				nextCursorIdx--;
				break;
			case 39:
				nextCursorIdx++;
				break;
		}

		if(nextCursorIdx < 0) nextCursorIdx = 0;
		if(nextCursorIdx >= charSizes.length) nextCursorIdx = charSizes.length-1;

		changeCursorPos(nextCursorIdx);
	});

	function changeCursorPos(idx) {

	}
});