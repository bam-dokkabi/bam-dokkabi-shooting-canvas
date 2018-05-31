$(document).ready(function() {
	var canvas = document.querySelector("#gameCanvas");
	var context = canvas.getContext("2d");

	var screenWidth = 914, screenHeight = 490;
	var scene = 1;
	var screenOpacity = 1;
	var startBtnColor = "#df6f5f";
	var canPressBtn = true;
	var charSizes = [
		{width: 84, height:100},
		{width:100, height:78},
		{width:90, height:96},
		{width:110, height:100}
	];

	var charStats = [
		{range:3, speed:2, splash:1, skill: "6초간 무적"},
		{range:2, speed:1, splash:3, skill: "맵 전체에 포크 공격"},
		{range:1, speed:2, splash:3, skill: "공격을 한 번 방어해주는 보호막 생성"},
		{range:2, speed:2, splash:2, skill: "전방에 강력한 빔 공격"}
	];

	var charNames = ['타코', '큐크', '투이', '피치'];

	var chooseChar1 = new Image();
	var chooseChar2 = new Image();
	var chooseChar3 = new Image();
	var chooseChar4 = new Image();
	var cursor = new Image();
	var startBtn = new Image();

	chooseChar1.src = "images/c01.png";
	chooseChar2.src = "images/c02.png";
	chooseChar3.src = "images/c03.png";
	chooseChar4.src = "images/c04.png";
	var charImgs = [chooseChar1, chooseChar2, chooseChar3, chooseChar4];

	cursor.src = "images/pin.png";
	startBtn.src = "images/start_btn.png"

	var chooseCharPosX = [250, 350, 450, 550];
	var chooseCharPosY = 180;
	var cursorX, cursorY;
	cursorX = chooseCharPosX[0] + charSizes[0].width/2 - 9;
	cursorY = chooseCharPosY - 50;
	cursorIdx = 0;

	var charPosX, charPosY;

	var drawingIntervalId = setInterval(drawScreen, 20);

	function drawScreen() {
		if(scene==1) {
			drawScene1();
		} else if(scene==2) {
			drawScene2();
		}
	}

	function drawScene1() {
		context.fillStyle="#0f1d3a";
		context.fillRect(0, 0, screenWidth, screenHeight);
		context.font = "40px DoHyeon";
		context.fillStyle = "#b22615";
		context.textAlign = "center";
		context.fillText("[함께 할 밤도깨비 캐릭터 선택]",457,80);
		context.drawImage(cursor, cursorX, cursorY, 19, 18);
		context.drawImage(chooseChar1,chooseCharPosX[0], chooseCharPosY, charSizes[0].width, charSizes[0].height);
		context.drawImage(chooseChar2,chooseCharPosX[1], chooseCharPosY, charSizes[1].width, charSizes[1].height);
		context.drawImage(chooseChar3,chooseCharPosX[2], chooseCharPosY, charSizes[2].width, charSizes[2].height);
		context.drawImage(chooseChar4,chooseCharPosX[3], chooseCharPosY, charSizes[3].width, charSizes[3].height);

		context.font = "30px DoHyeon";
		context.fillStyle = "white";
		context.textAlign = "center";
		context.fillText(charNames[cursorIdx], 457,320);

		context.font = "20px DoHyeon";
		context.fillStyle = "#8f5633";
		context.textAlign = "left";
		context.fillText("일반공격", 150,370);
		context.fillText("필살기", 150,400);

		context.font = "16px DoHyeon";
		context.fillStyle ="white";
		context.textAlign = "left";
		var range = charStats[cursorIdx].range;
		var speed = charStats[cursorIdx].speed;
		var splash = charStats[cursorIdx].splash;
		var statText = "사정거리 " + "●".repeat(range) + "○".repeat(3-range) + "  공격속도 " + "●".repeat(speed) + "○".repeat(3-speed) + "  공격범위 " + "●".repeat(splash) + "○".repeat(3-splash);
		context.fillText(statText, 280, 367);
		context.fillText(charStats[cursorIdx].skill, 280, 397);

		context.drawImage(startBtn, 457-90, 420);
	}

	function drawScene2() {
		if(screenOpacity < 1) {
			screenOpacity += 0.1;
			context.globalAlpha = screenOpacity;
			canPressBtn = true;
		}
		context.fillStyle="#0f1d3a";
		context.fillRect(0, 0, screenWidth, screenHeight);
		context.drawImage(charImgs[cursorIdx], charPosX, charPosY);
	}

	function changeCursorPos(idx) {
		cursorX = chooseCharPosX[idx] + charSizes[idx].width/2 - 9;
	}

	$(document).keydown(function(e) {
		var keyCode = e.which;
		if(!canPressBtn) return;
		if(scene == 1) {
			if(keyCode == 37 || keyCode == 39) {
				if(keyCode == 37) cursorIdx--;
				if(keyCode == 39) cursorIdx++;

				if(cursorIdx < 0) cursorIdx = 0;
				if(cursorIdx >= charSizes.length) cursorIdx = charSizes.length-1;

				changeCursorPos(cursorIdx);
			} else if(keyCode == 32) {
				canPressBtn = false;
				startBtnColor = "#999";
				var fadeOutIdx = setInterval(function() {
					screenOpacity -= 0.1;
					context.globalAlpha = screenOpacity;
					if(screenOpacity <= 0) {
						scene = 2;
						charPosX = 0;
						charPosY = screenHeight/2 - charSizes[cursorIdx].height/2;
						clearInterval(fadeOutIdx);
					}
				}, 100);
			}
		} else if(scene == 2) {
			if(keyCode >= 37 && keyCode <= 40) {
				if(keyCode == 37) charPosX-=10;
				else if(keyCode == 38) charPosY-=10;
				else if(keyCode == 39) charPosX+=10;
				else if(keyCode == 40) charPosY+=10;

				if(charPosX < 0) charPosX = 0;
				if(charPosY < 0) charPosY = 0;
				if(charPosX > screenWidth*(2/3) - charSizes[cursorIdx].width) charPosX = screenWidth*(2/3)- charSizes[cursorIdx].width;
				if(charPosY > screenHeight - charSizes[cursorIdx].height) charPosY = screenHeight - charSizes[cursorIdx].height;
			}
		}
	});

	
});