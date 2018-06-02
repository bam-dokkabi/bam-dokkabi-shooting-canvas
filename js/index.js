$(document).ready(function() {
	$('html')
	.css('background-size', 'auto ' + screen.height + 'px')
	.css('min-width', screen.width +'px');

	var canvas = document.querySelector("#game-canvas");
	var context = canvas.getContext("2d");

	var screenWidth = 914, screenHeight = 490;
	var screenTopBorder = 20;
	var screenBottomBorder = 30;
	var scene = 1;
	var screenOpacity = 0;
	var startBtnColor = "#df6f5f";
	var lifeBarMargin = 2;
	var lifeBarWidth = 8;
	var lifeBarHeight = 3;

	var charSizes = [
		{width: 73, height: 80},
		{width: 82, height: 67},
		{width: 75, height: 63},
		{width: 89, height: 73}
	];

	var gameCharSizes = [
		{width: 54, height: 84},
		{width: 78, height: 77},
		{width: 85, height: 84},
		{width: 78, height: 57}
	];

	var charStats = [
		{range:3, speed:3, splash:1, skill: "6초간 무적"},
		{range:2, speed:2, splash:2, skill: "맵 전체에 포크 공격"},
		{range:1, speed:2, splash:3, skill: "공격을 한 번 방어해주는 보호막 생성"},
		{range:3, speed:1, splash:2, skill: "전방에 강력한 빔 공격"}
	];

	var missileSizes = [
		{width: 32, height: 4},
		{width: 19, height: 13},
		{width: 25, height: 18},
		{width: 20, height: 15}
	];

	var monsterSizes = [
		{width: 27, height: 27},
		{width: 51, height: 44},
		{width: 29, height: 45},
		{width: 31, height: 62},
		{width: 41, height: 61}
	];

	var monsterStats = [
	//1
		{life: 1, speed: 1, isOpacityChange: false},
		{life: 2, speed: 1, isOpacityChange: false},
		{life: 1, speed: 1, isOpacityChange: true},
		{life: 1, speed: 2, isOpacityChange: true},
		{life: 1, speed: 1.5, isOpacityChange: false},
	//5
		{life: 1, speed: 1.5, isOpacityChange: false},
		{life: 1, speed: 1.5, isOpacityChange: false},
		{life: 1, speed: 1.5, isOpacityChange: false},
		{life: 1, speed: 1.5, isOpacityChange: false},
		{life: 1, speed: 1.5, isOpacityChange: false},
	//10
		{life: 1, speed: 2.5, isOpacityChange: false},
		{life: 5, speed: 1.5, isOpacityChange: false},
		{life: 5, speed: 1.5, isOpacityChange: false},
		{life: 1, speed: 1.5, isOpacityChange: false},
		{life: 1, speed: 1.5, isOpacityChange: false},
	];


	var explosionSizes = [
		{width:128, height:128}
	]

	var charNames = ['타코', '큐크', '투이', '피치'];
	var mainStageName = [
		'[1 문화비축기지]', 
		'[2 여의도]', 
		'[3 청계천]', 
		'[4 DDP]'
	];
	var stageNames = [
		['[문화비축기지 1]', '[문화비축기지 2]', '[문화비축기지 3]', '[문화비축기지 4]', '[문화비축기지 5]'],
		['[여의도 1]','[여의도 2]','[여의도 3]','[여의도 4]','[여의도 5]'],
		['[청계천 1]','[청계천 2]','[청계천 3]','[청계천 4]','[청계천 5]'],
		['[DDP 1]','[DDP 2]','[DDP 3]','[DDP 4]','[DDP 5]']
	];
	var mainStageNum = 4;
	var subStageNum = [5,5,5,5];

	var stageMonsters = [
		//main 1
		[
			{base: [0], sparse: []},
			{base: [0], sparse: [1]},
			{base: [0], sparse: [1, 2]},
			{base: [0], sparse: [1, 3]},
			{base: [0], sparse: []}
		],
		//main 2
		[
			{base: [0], sparse: []},
			{base: [0], sparse: [4]},
			{base: [0], sparse: [4,5]},
			{base: [0], sparse: [4,6]},
			{base: [0], sparse: [5]}
		],
		//main 3
		[
			{base: [1], sparse: [8]},
			{base: [1], sparse: [7, 8]},
			{base: [1], sparse: [8, 9]},
			{base: [1], sparse: [9, 10]},
			{base: [1], sparse: [8, 9]}
		],
		//main 4
		[
			{base: [1], sparse: [11, 2, 5]},
			{base: [1], sparse: [12, 6, 10]},
			{base: [1], sparse: [13]},
			{base: [1], sparse:[14]},
			{base: [1], sparse: []}
		]
	];

	var charMovingSpeed = 5;
	var missileMovingSpeed = 5;

	var LEFTMOVE = false;
	var UPMOVE = false;
	var RIGHTMOVE = false;
	var DOWNMOVE = false;

	var canPressBtn = true;
	var canFire = true;
	var sceneCount = 0;
	var life = 3;
	var skillBar = 0;
	var skillBarSize = {width:240, height:12};
	var timeMin = 3;
	var timeSec = 0;
	var monsterKills = 0;
	var monsterKillMax = 30;
	var isPlaying = true;
	var showGameOver = false;
	var completeGameOver = false;
	var fadeOutScene = false;
	var showingMainStage = false;
	var showingNextStage = false;
	var mainStageIdx = 0;
	var subStageIdx = 0;
	

	var chooseChar1 = new Image();
	var chooseChar2 = new Image();
	var chooseChar3 = new Image();
	var chooseChar4 = new Image();
	var gameChar1 = new Image();
	var gameChar2 = new Image();
	var gameChar3 = new Image();
	var gameChar4 = new Image();
	var cursor = new Image();
	var startBtn = new Image();
	var missileImg1 = new Image();
	var missileImg2 = new Image();
	var missileImg3 = new Image();
	var missileImg4 = new Image();
	var missileImg5 = new Image();
	var backImg = new Image();
	var monsterImg1 = new Image();
	var monsterImg2 = new Image();
	var monsterImg3 = new Image();
	var monsterImg4 = new Image();
	var monsterImg5 = new Image();
	var skillBarFrameImg = new Image();
	var skillBarImg = new Image();
	var skillMaxImg = new Image();
	var gameOverImg = new Image();
	var nextStageImg = new Image();

	chooseChar1.src = "images/c01.png";
	chooseChar2.src = "images/c02.png";
	chooseChar3.src = "images/c03.png";
	chooseChar4.src = "images/c04.png";
	var charImgs = [chooseChar1, chooseChar2, chooseChar3, chooseChar4];

	gameChar1.src = "images/c01.png";
	gameChar2.src = "images/c02.png";
	gameChar3.src = "images/c03.png";
	gameChar4.src = "images/c04.png";
	var gameCharImgs = [gameChar1, gameChar2, gameChar3, gameChar4];

	cursor.src = "images/pin.png";
	startBtn.src = "images/start_btn.png";

	missileImg1.src = "images/attack1.png";
	missileImg2.src = "images/attack2.png";
	missileImg3.src = "images/attack3.png";
	missileImg4.src = "images/attack4_1.png";
	missileImg5.src = "images/attack4_2.png";
	var missileImgs = [missileImg1, missileImg2, missileImg3, missileImg4, missileImg5];

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
	gameOverImg.src = "images/gameover.png";
	nextStageImg.src = "images/next.png";


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
		} else if(scene==2 && !completeGameOver) {
			drawScene2();
		}
	}

	function drawScene1() {
		if(!fadeOutScene) {
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
		} else {
			context.globalAlpha = screenOpacity;
			context.fillStyle = "#0f1d3a";
			context.fillRect(0, 0, screenWidth, screenHeight);

			context.globalAlpha = 1;
			context.fillStyle = "white";
			context.font = "30px Dohyeon";
			context.textAlign = "center";
			context.fillText("Loading...", screenWidth/2, screenHeight/2);
		}
	}

	function drawScene2() {
		sceneCount++;
		if(sceneCount > 10000) sceneCount = 0;
		context.drawImage(backImg, back1X, 0, 2736, 490);
		context.drawImage(backImg, back2X, 0, 2736, 490);

		context.drawImage(gameCharImgs[cursorIdx], charPosX, charPosY);

		for(var i=0;i<missileList.length;i++) {
			context.save();
			context.translate(missileList[i].x + missileList[i].width, missileList[i].y);
			context.rotate(missileList[i].angle * (Math.PI / 180));
			context.drawImage(missileImgs[missileList[i].idx], -missileList[i].width , 0, missileList[i].width, missileList[i].height);
			context.restore();
		}

		for(var i=0;i<monsterList.length;i++) {
			if(monsterList[i].isOpacityChange) {
				if(sceneCount % 5 == 0) {
					if(monsterList[i].opacityUp) {
						monsterList[i].opacity += 0.1;
					} else {
						monsterList[i].opacity -= 0.1;
					}

					if(monsterList[i].opacity <= 0.1) {
						monsterList[i].opacity = 0.1;
						if(monsterList[i].opacityStep < 10) {
							monsterList[i].opacityStep++;
						} else {
							monsterList[i].opacityStep = 0;
							monsterList[i].opacityUp = true;
						}
					} else if(monsterList[i].opacity >= 1) {
						monsterList[i].opacity = 1;
						monsterList[i].opacityUp = false;
					}
				}
				context.save();
				context.globalAlpha = monsterList[i].opacity;
			}
			context.drawImage(monsterImgs[monsterList[i].idx], monsterList[i].x, monsterList[i].y, monsterList[i].width, monsterList[i].height);
			context.restore();
			var lifeX = monsterList[i].x;
			var lifeY = monsterList[i].y + monsterList[i].height + 10;
			for(var j=0;j<monsterList[i].life;j++) {
				context.fillStyle = "red";
				context.fillRect(lifeX, lifeY, lifeBarWidth, lifeBarHeight);
				lifeX += lifeBarWidth + lifeBarMargin;
			}
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
		context.font = "18px SandollGothicM";
		context.fillText(heartString, 60, 10);
		context.font = "20px SandollGothicM";
		context.fillText("SKILL", 165, 10);
		context.fillText("TIME", 565, 10);
		if(timeMin == 0 && timeSec == 0) {
			context.fillStyle = "red";
		}
		context.fillText(getTimeText(), 624, 10);
		context.fillStyle = "white";
		context.fillText("STAGE", 696, 10);
		context.fillText(stageNames[mainStageIdx][subStageIdx],762, 10);
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
		doPlayerCollision();
		removeUselessThings();

		if(showGameOver) {
			context.drawImage(gameOverImg, screenWidth/2 - 88, screenHeight/2 - 13);
			context.fillStyle = "white";
			context.font = "18px SandollGothicM";
			context.textAlign = "center";
			context.fillText("게임을 다시 시작하려면 게임 화면을 클릭하세요.", screenWidth/2, screenHeight/2 + 30);
			completeGameOver = true;
		}

		if(showingMainStage) {
			context.fillStyle = "white";
			context.font = "30px DoHyeon";
			context.textAlign = "center";
			context.fillText(mainStageName[mainStageIdx], screenWidth/2, screenHeight/2 - 30);
		}

		if(showingNextStage) {
			context.drawImage(nextStageImg, screenWidth/2 - 147, screenHeight/2 - 19);
		}

		if(!isPlaying) {
			showGameOver = true;
		}

		if(fadeOutScene) {
			screenOpacity -= 0.1;
			context.globalAlpha = screenOpacity;
			context.fillStyle = "#0f1d3a";
			context.fillRect(0, 0, screenWidth, screenHeight);
			canPressBtn = true;

			if(screenOpacity <= 0) {
				fadeOutScene = false;
				screenOpacity = 1;
				context.globalAlpha = screenOpacity;
			}
		}
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
		if(sceneCount%2 == 0) {
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
	}

	function movePlayer() {
		if(LEFTMOVE) charPosX -= charMovingSpeed;
		if(UPMOVE) charPosY -= charMovingSpeed;
		if(RIGHTMOVE) charPosX += charMovingSpeed;
		if(DOWNMOVE) charPosY += charMovingSpeed;
		if(charPosX < 0) charPosX = 0;
		if(charPosY < screenTopBorder) charPosY = screenTopBorder;
		if(charPosX > screenWidth*(2/3) - charSizes[cursorIdx].width) charPosX = screenWidth*(2/3)- charSizes[cursorIdx].width;
		if(charPosY > screenHeight - screenBottomBorder - charSizes[cursorIdx].height) charPosY = screenHeight - screenBottomBorder - charSizes[cursorIdx].height;
	}

	function moveMissile() {
		for(var i=0;i<missileList.length;i++) {
			missileList[i].x += missileMovingSpeed;
			missileList[i].y += missileMovingSpeed * missileList[i].speedY;
			missileList[i].angle += missileList[i].speedAngular;
			if(missileList[i].angle >= 360) missileList[i].angle = 0;
		}
	}

	function moveMonster() {
		for(var i=0;i<monsterList.length;i++) {
			monsterList[i].x -= monsterList[i].speed;

			if(sceneCount%3 !=0) continue;

			/*var moveYRandom = parseInt(Math.random() * 3);
			if(moveYRandom == 0) monsterList[i].y -= Math.random() * 5;
			if(moveYRandom == 1 && monsterList[i].y < screenHeight - monsterList[i].height) monsterList[i].y += Math.random() * 5;

			if(monsterList[i].y < screenTopBorder) monsterList[i].y = screenTopBorder;*/
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

		if(timeMin == 0 && timeSec == 0) {
			life = 0;
			isPlaying = false;
		}
	}

	function createMonster() {
		var baseMonsterTypeNum = stageMonsters[mainStageIdx][subStageIdx].base.length;
		if(baseMonsterTypeNum == 0) return;
		var monsterTableIdx = parseInt(Math.random() * baseMonsterTypeNum);
		var monsterIdx = stageMonsters[mainStageIdx][subStageIdx].base[monsterTableIdx];

		var monsterY = screenTopBorder + Math.random() * (screenHeight - screenTopBorder - monsterSizes[monsterIdx].height- screenTopBorder);
		var newMonster = {
			idx: monsterIdx,
			x: screenWidth,
			y: monsterY,
			width: monsterSizes[monsterIdx].width,
			height: monsterSizes[monsterIdx].height,
			isDead: false,
			life: monsterStats[monsterIdx].life,
			speed: monsterStats[monsterIdx].speed,
			isOpacityChange : monsterStats[monsterIdx].isOpacityChange,
			opacityUp : false,
			opacity : 1,
			opacityStep: 0
		}

		monsterList.push(newMonster);

		var randomForSparse = parseInt(Math.random() * 2);
		if(randomForSparse == 1) {
			var sparseMonsterTypeNum = stageMonsters[mainStageIdx][subStageIdx].sparse.length;
			if(sparseMonsterTypeNum == 0) return;
			var sparseMonsterTableIdx = parseInt(Math.random() * sparseMonsterTypeNum);
			var sparseMonsterIdx = stageMonsters[mainStageIdx][subStageIdx].sparse[sparseMonsterTableIdx];
			console.log(sparseMonsterIdx);
			var monsterY = screenTopBorder + Math.random() * (screenHeight - screenTopBorder - monsterSizes[sparseMonsterIdx].height- screenTopBorder);
			var newMonster = {
				idx: sparseMonsterIdx,
				x: screenWidth,
				y: monsterY,
				width: monsterSizes[sparseMonsterIdx].width,
				height: monsterSizes[sparseMonsterIdx].height,
				isDead: false,
				life: monsterStats[sparseMonsterIdx].life,
				speed: monsterStats[sparseMonsterIdx].speed,
				isOpacityChange : monsterStats[sparseMonsterIdx].isOpacityChange,
				opacityUp : false,
				opacity : 1,
				opacityStep: 0
			}

			monsterList.push(newMonster);
		}
	}

	function createMissile() {
		
		if(cursorIdx == 2) {
			var newMissile1 = {};
			var newMissile2 = {};

			newMissile1.idx = 3;
			newMissile1.x = charPosX+charSizes[cursorIdx].width;
			newMissile1.y = charPosY+charSizes[cursorIdx].height/2-missileSizes[cursorIdx].height;
			newMissile1.endX = charPosX+charSizes[cursorIdx].width + charStats[cursorIdx].range * screenWidth / 3;
			newMissile1.width = missileSizes[cursorIdx].width;
			newMissile1.height = missileSizes[cursorIdx].height;
			newMissile1.isHit = false;
			newMissile1.speedY = -1;
			newMissile1.speedAngular = 0;
			newMissile1.angle = 0;

			missileList.push(newMissile1);

			newMissile2.idx = 4;
			newMissile2.x = charPosX+charSizes[cursorIdx].width;
			newMissile2.y = charPosY+charSizes[cursorIdx].height/2+missileSizes[cursorIdx].height;
			newMissile2.endX = charPosX+charSizes[cursorIdx].width + charStats[cursorIdx].range * screenWidth / 3;
			newMissile2.width = missileSizes[cursorIdx].width;
			newMissile2.height = missileSizes[cursorIdx].height;
			newMissile2.isHit = false;
			newMissile2.speedY = 1;
			newMissile2.speedAngular = 0;
			newMissile2.angle = 0;

			missileList.push(newMissile2);
		} else if(cursorIdx == 3) {
			var newMissile = {};

			newMissile.idx = cursorIdx;
			newMissile.x = charPosX+charSizes[cursorIdx].width;
			newMissile.y = charPosY+charSizes[cursorIdx].height/2-missileSizes[cursorIdx].height/2;
			newMissile.endX = charPosX+charSizes[cursorIdx].width + charStats[cursorIdx].range * screenWidth / 3;
			newMissile.width = missileSizes[cursorIdx].width;
			newMissile.height = missileSizes[cursorIdx].height;
			newMissile.isHit = false;
			newMissile.speedY = 0;
			newMissile.speedAngular = 10;
			newMissile.angle = 0;

			missileList.push(newMissile);
		} else {
			var newMissile = {};

			newMissile.idx = cursorIdx;
			newMissile.x = charPosX+charSizes[cursorIdx].width;
			newMissile.y = charPosY+charSizes[cursorIdx].height/2-missileSizes[cursorIdx].height/2;
			newMissile.endX = charPosX+charSizes[cursorIdx].width + charStats[cursorIdx].range * screenWidth / 3;
			newMissile.width = missileSizes[cursorIdx].width;
			newMissile.height = missileSizes[cursorIdx].height;
			newMissile.isHit = false;
			newMissile.speedY = 0;
			newMissile.speedAngular = 0;
			newMissile.angle = 0;

			missileList.push(newMissile);
		}
		canFire = false;
		setTimeout(function() {
			canFire = true;
		}, 600/charStats[cursorIdx].speed);
	}

	function checkOverrapSquares(squareA, squareB) {
		if(squareA.left > squareB.right || squareB.left > squareA.right) {
			return false;
		}

		if(squareA.top > squareB.bottom || squareB.top > squareA.bottom) {
			return false;
		}

		return true;
	}

	function checkCollision() {
		for(var i=0;i<missileList.length;i++) {
			for(var j=0;j<monsterList.length;j++) {

				var missileCoor = {};
				var monsterCoor = {};

				topTemp = missileList[i].y - missileList[i].width * Math.sin(missileList[i].angle * Math.PI/180);
				bottomTemp = missileList[i].y + missileList[i].height * Math.cos(missileList[i].angle * Math.PI/180);
				leftTemp = missileList[i].x + missileList[i].width * (1 - Math.cos(missileList[i].angle * Math.PI/180));
				rightTemp = missileList[i].x + missileList[i].width - missileList[i].height * Math.sin(missileList[i].angle * Math.PI/180);

				missileCoor.top = topTemp < bottomTemp ? topTemp : bottomTemp;
				missileCoor.bottom = topTemp > bottomTemp ? topTemp : bottomTemp;
				missileCoor.left = leftTemp < rightTemp ? leftTemp : rightTemp;
				missileCoor.right = leftTemp > rightTemp ? leftTemp : rightTemp;

				monsterCoor.top = monsterList[j].y;
				monsterCoor.bottom = monsterList[j].y + monsterList[j].height;
				monsterCoor.left = monsterList[j].x;
				monsterCoor.right = monsterList[j].x + monsterList[j].width;

				if(checkOverrapSquares(missileCoor, monsterCoor)) {
					missileList[i].isHit = true;
					monsterList[j].life--;
					if(monsterList[j].life <= 0) {
						monsterList[j].isDead = true;	

						skillBar += 20;
						if(skillBar > 100) skillBar = 100;
						if(monsterKills < monsterKillMax) {
							monsterKills++;

							if(monsterKills == monsterKillMax) {
								goNextStage();
							}
						}
					}
					
					var newExplosion = {
						imgIdx: 0,
						x: monsterList[j].x + monsterList[j].width - explosionSizes[0].width/2,
						y: monsterList[j].y + monsterList[j].height - explosionSizes[0].height/2,
						width: explosionSizes[0].width,
						height: explosionSizes[0].height,
						isEnd: false
					}
					explosionList.push(newExplosion);

					
				}
			}
		}
	}



	function goNextStage() {
		if(mainStageIdx == mainStageNum - 1 && subStageIdx == subStageNum[mainStageIdx] - 1) return;
		for(var i=monsterList.length-1; i>=0; i--) {
			if(!monsterList[i].isDead) {
				var newExplosion = {
					imgIdx: 0,
					x: monsterList[i].x + monsterList[i].width/2 - explosionSizes[0].width/2,
					y: monsterList[i].y + monsterList[i].height/2 - explosionSizes[0].height/2,
					width: explosionSizes[0].width,
					height: explosionSizes[0].height,
					isEnd: false
				}
				explosionList.push(newExplosion);

				monsterList[i].isDead = true;
			}
		}

		monsterKills = 0;
		timeMin = 3;
		timeSec = 0;
		setStageIndex();
	}

	function setStageIndex() {
		if(subStageIdx < subStageNum[mainStageIdx] - 1) {
			subStageIdx++;
			showingNextStage = true;
			setTimeout(function() {showingNextStage = false;}, 3000);
		} else {
			if(mainStageIdx < mainStageNum - 1) {
				mainStageIdx++;
				subStageIdx = 0;
				showingMainStage = true;
				setTimeout(function() {showingMainStage = false;}, 3000);
				var pre;
				$('.map-guide > .map-dot').each(function(idx, item) {
					console.log('in each');
					if(idx == mainStageIdx) {
						console.log('change css');
						$(this).css('background', 'url(images/map_dot2.png) no-repeat left top');
						$(this).children().css('color', 'white');
						pre.css('background', 'url(images/map_dot1.png) no-repeat left top');
						pre.children().css('color', '#474747');
					}

					pre = $(this);
				});

				$('.map-guide > .map-name').each(function(idx, item) {
					console.log('change css');
					if(idx == mainStageIdx) {
						$(this).css('color', 'white');
						pre.css('color', '#474747');
					}

					pre = $(this);
				});
			}
		}
	}

	function checkPlayerCollision(monsterObj) {
		var charCoor = {};
		charCoor.left = charPosX;
		charCoor.right = charPosX + charSizes[cursorIdx].width;
		charCoor.top = charPosY;
		charCoor.bottom = charPosY + charSizes[cursorIdx].height;

		var monsterCoor = {};
		monsterCoor.left = monsterObj.x;
		monsterCoor.right = monsterObj.x + monsterObj.width;
		monsterCoor.top = monsterObj.y;
		monsterCoor.bottom = monsterObj.y + monsterObj.height;

		if(checkOverrapSquares(charCoor, monsterCoor)) {
			return {isCollide: true, x: monsterObj.x + monsterObj.width/2, y: monsterObj.y + monsterObj.height/2};
		}

		return {isCollide : false, x:0, y:0};
	}

	function doPlayerCollision() {
		for(var i=monsterList.length-1;i>=0;i--) {
			var checkObj = checkPlayerCollision(monsterList[i]);
			if(checkObj.isCollide) {
				var newExplosion = {
					imgIdx: 0,
					x: checkObj.x - explosionSizes[0].width/2,
					y: checkObj.y - explosionSizes[0].height/2,
					width: explosionSizes[0].width,
					height: explosionSizes[0].height,
					isEnd: false
				}
				explosionList.push(newExplosion);
				life--;
				if(life<=0) {
					life = 0;
					isPlaying = false;
				}
				monsterList[i].isDead = true;
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

	function initGame() {
		screenOpacity = 0;
		isPlaying = true;
		showGameOver = false;
		completeGameOver = false;
		scene = 1;
		canFire = true;
		sceneCount = 0;
		life = 3;
		skillBar = 0;
		timeMin = 3;
		timeSec = 0;
		monsterKills = 0;
		isPlaying = true;
		showGameOver = false;
		completeGameOver = false;
		fadeOutScene = false;
		showingNextStage = false;
		showingMainStage = false;
		mainStageIdx = 0;
		subStageIdx = 0;

		explosionList = [];
		monsterList = [];
		missileList = [];

		$('.map-guide > .map-dot').each(function(idx, item) {
			console.log('in each');
			if(idx == 0) {
				$(this).css('background', 'url(images/map_dot2.png) no-repeat left top');
				$(this).children().css('color', 'white');
			} else {
				$(this).css('background', 'url(images/map_dot1.png) no-repeat left top');
				$(this).children().css('color', '#474747');
			}
		});

		$('.map-guide > .map-name').each(function(idx, item) {
			console.log('change css');
			if(idx == mainStageIdx) {
				$(this).css('color', 'white');
			} else {
				$(this).css('color', '#474747');
			}
		});
	}

	$('#game-canvas').click(function() {
		if(completeGameOver)
			initGame();
	});

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
				screenOpacity = 0;
				fadeOutScene = true;
				var fadeOutId = setInterval(function() {
					screenOpacity += 0.1;
					context.globalAlpha = screenOpacity;
					if(screenOpacity >= 1) {
						//screenOpacity = 0;
						scene = 2;
						charPosX = 0;
						charPosY = screenHeight/2 - charSizes[cursorIdx].height/2;
						showingMainStage = true;
						setTimeout(function() {showingMainStage = false;}, 3000);
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
				createMissile();
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








