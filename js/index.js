$(document).ready(function() {
	$('html')
	.css('background-size', 'auto ' + screen.height + 'px')
	.css('min-width', screen.width +'px');

	var canvas = document.querySelector("#game-canvas");
	var context = canvas.getContext("2d");

	var screenWidth = 914, screenHeight = 490;
	var screenTopBorder = 20;
	var scene = 1;
	var screenOpacity = 1;
	var startBtnColor = "#df6f5f";
	var canPressBtn = true;
	var charSizes = [
		{width: 54, height:84},
		{width:78, height:77},
		{width:85, height:84},
		{width:89, height:73}
	];

	var charStats = [
		{range:3, speed:3, splash:1, skill: "6초간 무적"},
		{range:2, speed:2, splash:2, skill: "맵 전체에 포크 공격"},
		{range:1, speed:2, splash:3, skill: "공격을 한 번 방어해주는 보호막 생성"},
		{range:3, speed:1, splash:2, skill: "전방에 강력한 빔 공격"}
	];

	var missileSizes = [
		{width: 32, height: 4},
		{width: 32, height: 4},
		{width: 32, height: 4},
		{width: 32, height: 4}
	];

	var monsterSizes = [
		{width: 27, height: 27},
		{width: 51, height: 44},
		{width: 29, height: 45},
		{width: 31, height: 62},
		{width: 41, height: 61}
	];

	var explosionSizes = [
		{width:128, height:128}
	]

	var monsterMovingSpeed = [1,2,3,4,5];

	var charNames = ['타코', '큐크', '투이', '피치'];
	var stageNames = [
		'[문화비축기지 1]'
	];

	var charMovingSpeed = 5;
	var missileMovingSpeed = 5;

	var LEFTMOVE = false;
	var UPMOVE = false;
	var RIGHTMOVE = false;
	var DOWNMOVE = false;

	var canFire = true;
	var sceneCount = 0;
	var life = 3;
	var skillBar = 0;
	var skillBarSize = {width:240, height:12};
	var timeMin = 3;
	var timeSec = 0;
	var curStage = 0;
	var monsterKills = 0;
	var monsterKillMax = 30;

	var chooseChar1 = new Image();
	var chooseChar2 = new Image();
	var chooseChar3 = new Image();
	var chooseChar4 = new Image();
	var cursor = new Image();
	var startBtn = new Image();
	var missileImg1 = new Image();
	var missileImg2 = new Image();
	var missileImg3 = new Image();
	var missileImg4 = new Image();
	var backImg = new Image();
	var monsterImg1 = new Image();
	var monsterImg2 = new Image();
	var monsterImg3 = new Image();
	var monsterImg4 = new Image();
	var monsterImg5 = new Image();
	var skillBarFrameImg = new Image();
	var skillBarImg = new Image();
	var skillMaxImg = new Image();

	chooseChar1.src = "images/c01.png";
	chooseChar2.src = "images/c02.png";
	chooseChar3.src = "images/c03.png";
	chooseChar4.src = "images/c04.png";
	var charImgs = [chooseChar1, chooseChar2, chooseChar3, chooseChar4];

	cursor.src = "images/pin.png";
	startBtn.src = "images/start_btn.png";

	missileImg1.src = "images/attack1.png";
	missileImg2.src = "images/attack1.png";
	missileImg3.src = "images/attack1.png";
	missileImg4.src = "images/attack1.png";
	var missileImgs = [missileImg1, missileImg2, missileImg3, missileImg4];

	backImg.src = "images/game_bg1.png";

	monsterImg1.src = "images/enemy/e01.png";
	monsterImg2.src = "images/enemy/e02.png";
	monsterImg3.src = "images/enemy/e03.png";
	monsterImg4.src = "images/enemy/e04.png";
	monsterImg5.src = "images/enemy/e05.png";
	var monsterImgs = [monsterImg1,monsterImg2,monsterImg3,monsterImg4,monsterImg5];

	var explosionImgs = [];
	for(var i=0;i<48;i++) {
		var newImage = new Image();
		var num = (i+1).toString();
		if(i+1 < 10) {
			num = "0" + num;
		}

		newImage.src = "images/explosion/explosion" + num + ".png";
		explosionImgs.push(newImage);
	}

	skillBarFrameImg.src = "images/skill_bar.png";
	skillBarImg.src = "images/skill_bar2.png";
	skillMaxImg.src = "images/max.png";


	var chooseCharPosX = [250, 350, 450, 550];
	var chooseCharPosY = 180;
	var cursorX, cursorY;
	cursorX = chooseCharPosX[0] + charSizes[0].width/2 - 9;
	cursorY = chooseCharPosY - 50;
	cursorIdx = 0;

	var charPosX, charPosY;

	var missileList = [];
	var monsterList = [];
	var explosionList = [];

	var drawingIntervalId = setInterval(drawScreen, 20);

	var back1X = 0, back2X = -2736;

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
		context.font = "30px DoHyeon";
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

		context.font = "16px SandollGothicM";
		context.fillStyle ="white";
		context.textAlign = "left";
		var range = charStats[cursorIdx].range;
		var speed = charStats[cursorIdx].speed;
		var splash = charStats[cursorIdx].splash;
		var statText = "사정거리 " + "●".repeat(range) + "○".repeat(3-range) + "  공격속도 " + "●".repeat(speed) + "○".repeat(3-speed) + "  공격범위 " + "●".repeat(splash) + "○".repeat(3-splash);
		context.fillText(statText, 280, 370);
		context.fillText(charStats[cursorIdx].skill, 280, 400);

		context.drawImage(startBtn, 457-90, 420);
	}

	function drawScene2() {
		if(screenOpacity < 1) {
			screenOpacity += 0.1;
			context.globalAlpha = screenOpacity;
			canPressBtn = true;
		}
		sceneCount++;
		if(sceneCount > 10000) sceneCount = 0;
		context.drawImage(backImg, back1X, 0, 2736, 490);
		context.drawImage(backImg, back2X, 0, 2736, 490);

		context.drawImage(charImgs[cursorIdx], charPosX, charPosY);

		for(var i=0;i<missileList.length;i++) {
			context.drawImage(missileImgs[cursorIdx], missileList[i].x, missileList[i].y, missileList[i].width, missileList[i].height);
		}

		for(var i=0;i<monsterList.length;i++) {
			context.drawImage(monsterImgs[monsterList[i].idx], monsterList[i].x, monsterList[i].y, monsterList[i].width, monsterList[i].height);
		}
		
		for(var i=0;i<explosionList.length;i++) {
			if(explosionList[i].imgIdx < 48) 
				context.drawImage(explosionImgs[explosionList[i].imgIdx], explosionList[i].x, explosionList[i].y, explosionList[i].width, explosionList[i].height);
		}

		context.font = "20px SandollGothicM";
		context.fillStyle = "white";
		context.textAlign = "left";
		context.textBaseline = "top";
		context.fillText("LIFE", 12, 10);

		var heartString = "";
		for(var i=0;i<life;i++) {
			heartString += "❤️";
		}
		context.font ="18px SandollGothicM";
		context.fillText(heartString, 60, 10);
		context.font = "20px SandollGothicM";
		context.fillText("SKILL", 165, 10);
		context.fillText("TIME", 565, 10);
		context.fillText(getTimeText(), 624, 10);
		context.fillText("STAGE", 696, 10);
		context.fillText(stageNames[curStage],762, 10);
		context.fillText(getKillText(), 762, 30);

		context.drawImage(skillBarFrameImg, 225, 12);
		if(skillBar > 0)
			context.drawImage(skillBarImg, 228, 14, skillBar*240/100,12);

		if(skillBar == 100)
			context.drawImage(skillMaxImg, 480, 13);

		moveBackground();
		movePlayer();
		moveMissile();
		moveMonster();
		if(sceneCount%50 == 0) createMonster();
		changeExplosion();
		changeTime();
		checkCollision();
		removeUselessThings();
	}

	function changeCursorPos(idx) {
		cursorX = chooseCharPosX[idx] + charSizes[idx].width/2 - 9;
	}

	function getTimeText() {
		var timeSecText = timeSec.toString();
		if(timeSec < 10) {
			timeSecText = "0" + timeSecText;
		}

		return timeMin + ":" + timeSecText;
	}

	function getKillText() {
		return "KILL : " + monsterKills + "/" + monsterKillMax;
	}

	function moveBackground() {
		//배경이미지의 좌표 증가시키기
		back1X-=3;
		back2X-=3;

		//배경1이 화면을 벗어나면
		if(back1X < -2736) {
			back1X = 2736;
		} else if(back2X < -2736) {
			back2X = 2736;
		}
	}

	function movePlayer() {
		if(LEFTMOVE) charPosX -= charMovingSpeed;
		if(UPMOVE) charPosY -= charMovingSpeed;
		if(RIGHTMOVE) charPosX += charMovingSpeed;
		if(DOWNMOVE) charPosY += charMovingSpeed;
		if(charPosX < 0) charPosX = 0;
		if(charPosY < screenTopBorder) charPosY = screenTopBorder;
		if(charPosX > screenWidth*(2/3) - charSizes[cursorIdx].width) charPosX = screenWidth*(2/3)- charSizes[cursorIdx].width;
		if(charPosY > screenHeight - charSizes[cursorIdx].height) charPosY = screenHeight - charSizes[cursorIdx].height;
	}

	function moveMissile() {
		for(var i=0;i<missileList.length;i++) {
			missileList[i].x += missileMovingSpeed;
		}
	}

	function moveMonster() {
		for(var i=0;i<monsterList.length;i++) {
			monsterList[i].x -= monsterMovingSpeed[monsterList[i].idx];

			if(sceneCount%3 !=0) continue;

			var moveYRandom = parseInt(Math.random() * 3);
			if(moveYRandom == 0) monsterList[i].y -= Math.random() * 5;
			if(moveYRandom == 1 && monsterList[i].y < screenHeight - monsterList[i].height) monsterList[i].y += Math.random() * 5;

			if(monsterList[i].y < screenTopBorder) monsterList[i].y = screenTopBorder;
		}
	}

	function changeExplosion() {
		for(var i=0;i<explosionList.length;i++) {
			explosionList[i].imgIdx++;
			if(explosionList[i].imgIdx > 48) {
				explosionList[i].isEnd = true;
			}
		}
	}

	function changeTime() {
		if(sceneCount%50 != 0) return;
		if(timeSec > 0) timeSec--;
		else {
			if(timeMin > 0) {
				timeMin--;
				timeSec = 59;
			}
		}
	}

	function createMonster() {
		var monsterIdx = parseInt(Math.random() * monsterImgs.length);
		var monsterY = screenTopBorder + Math.random() * (screenHeight - monsterSizes[monsterIdx].height/2 - screenTopBorder);
		var newMonster = {
			idx: monsterIdx,
			x: screenWidth,
			y: monsterY,
			width: monsterSizes[monsterIdx].width,
			height: monsterSizes[monsterIdx].height,
			isDead: false
		}

		monsterList.push(newMonster);
	}

	function checkCollision() {
		for(var i=0;i<missileList.length;i++) {
			for(var j=0;j<monsterList.length;j++) {
				var missileTipX = missileList[i].x + missileList[i].width;
				var missileTipY = missileList[i].y + missileList[i].height/2;
				if((missileTipX >= monsterList[j].x && missileTipX <= monsterList[j].x + monsterList[j].width) &&
					(missileTipY >= monsterList[j].y && missileTipY <= monsterList[j].y + monsterList[j].height)) {
					missileList[i].isHit = true;
					monsterList[j].isDead = true;

					var newExplosion = {
						imgIdx: 0,
						x: missileTipX - explosionSizes[0].width/2,
						y: missileTipY - explosionSizes[0].height/2,
						width: explosionSizes[0].width,
						height: explosionSizes[0].height,
						isEnd: false
					}

					skillBar += 20;
					if(skillBar > 100) skillBar = 100;
					if(monsterKills < monsterKillMax) monsterKills++;
					explosionList.push(newExplosion);
				}
			}
		}
	}

	function removeUselessThings() {
		for(var i=missileList.length-1;i>=0;i--) {
			if(missileList[i].x > missileList[i].endX
				|| missileList[i].x > screenWidth
				|| missileList[i].isHit) {
				missileList.splice(i, 1);
			}
		}

		for(var i=monsterList.length-1;i>=0;i--) {
			if(monsterList[i].x < -monsterList[i].width || monsterList[i].isDead) {
				monsterList.splice(i, 1);
			}
		}

		for(var i=explosionList.length-1;i>=0;i--) {
			if(explosionList[i].isEnd) {
				explosionList.splice(i, 1);
			}
		}
	}

	$(document).keydown(function(e) {
		var keyCode = e.which;

		if(keyCode == 37) $('.game-btn-arrow').css('left', '415px');
		if(keyCode == 38) $('.game-btn-arrow').css('top', '703px');
		if(keyCode == 39) $('.game-btn-arrow').css('left', '421px');
		if(keyCode == 40) $('.game-btn-arrow').css('top', '709px');
		if(keyCode == 32) $('.game-btn-space').css('top', '710px');
		if(keyCode == 13) $('.game-btn-enter').css('top', '719px');


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
				var fadeOutId = setInterval(function() {
					screenOpacity -= 0.1;
					context.globalAlpha = screenOpacity;
					if(screenOpacity <= 0) {
						context.fillStyle="#0f1d3a";
						context.fillRect(0, 0, screenWidth, screenHeight);
						scene = 2;
						charPosX = 0;
						charPosY = screenHeight/2 - charSizes[cursorIdx].height/2;
						clearInterval(fadeOutId);
					}
				}, 100);
			}
		} else if(scene == 2) {
			if(keyCode == 37) LEFTMOVE = true;
			if(keyCode == 38) UPMOVE = true;
			if(keyCode == 39) RIGHTMOVE = true;
			if(keyCode == 40) DOWNMOVE = true;

			if(keyCode == 32 && canFire) {
				var newMissile = {
					x: parseInt(charPosX+charSizes[cursorIdx].width),
					y: parseInt(charPosY+charSizes[cursorIdx].height/2-missileSizes[0].height/2),
					endX: parseInt(charPosX+charSizes[cursorIdx].width + charStats[cursorIdx].range * screenWidth / 3),
					width: parseInt(missileSizes[cursorIdx].width),
					height: parseInt(missileSizes[cursorIdx].height),
					isHit: false
				}

				missileList.push(newMissile);

				canFire = false;
				setTimeout(function() {
					canFire = true;
				}, 600/charStats[cursorIdx].speed);
			}
		}
	});

	$(document).keyup(function(e){
		var keyCode = e.which;
		if(keyCode == 37) $('.game-btn-arrow').css('left', '418px');
		if(keyCode == 38) $('.game-btn-arrow').css('top', '706px');
		if(keyCode == 39) $('.game-btn-arrow').css('left', '418px');
		if(keyCode == 40) $('.game-btn-arrow').css('top', '706px');
		if(keyCode == 32) $('.game-btn-space').css('top', '707px');
		if(keyCode == 13) $('.game-btn-enter').css('top', '716px');

		if(scene == 2) {
			if(keyCode == 37) LEFTMOVE = false;
			if(keyCode == 38) UPMOVE = false;
			if(keyCode == 39) RIGHTMOVE = false;
			if(keyCode == 40) DOWNMOVE = false;
		}
	});
});








