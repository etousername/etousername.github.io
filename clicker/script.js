var score = JSON.parse(localStorage.getItem('score'))
var addScore = JSON.parse(localStorage.getItem('addScore'))
var addScoreTime = JSON.parse(localStorage.getItem('addScoreTime'))
var upgradeBttnPriceFirst = JSON.parse(localStorage.getItem('upgradeBttnPriceFirst'))
var upgradeLevelFirst = JSON.parse(localStorage.getItem('upgradeLevelFirst'))
var upgradeLevelSecond = JSON.parse(localStorage.getItem('upgradeLevelSecond'))
var unlockBttnPrice = 200
var upgradeBttnTimePrice = JSON.parse(localStorage.getItem('upgradeBttnTimePrice'))
var checkSave = JSON.parse(localStorage.getItem('checkSave'))
var checkUnlock = JSON.parse(localStorage.getItem('checkUnlock'))


//CLICK CLICK CLICK 
$('.clickBttn').click(function(){
	clickSound()
	score += addScore
	score = +score.toPrecision(6)
	$('.clickBttn').addClass("animationClick")
		setTimeout(function(){ $('.clickBttn').removeClass("animationClick")
		}, 100)
	checkUpgrade()
	saveAll()
	setAllValue()
})
//CLICK CLICK CLICK 


// UPGRADE UPGRADE UPGRADE
var multiplierPow = JSON.parse(localStorage.getItem('multiplierPow'))
$('.upgradeBttn').click(function(){
	if(score >= upgradeBttnPriceFirst) {
		score -= upgradeBttnPriceFirst
		upgradeLevelFirst++

		upgradeBttnPriceFirst = 2 * Math.pow(1.06, multiplierPow) 
		multiplierPow++
		if(boostActive){addScore += addScore += 0.2 * Math.pow(1.04, multiplierPow) * 2} else{ addScore += 0.2 * Math.pow(1.04, multiplierPow) }
		checkUpgrade()
		setAllValue()
		saveAll ()
		$(this).addClass("animationUpgrade")
		$('.upgradeLevel').html("Level " + upgradeLevelFirst)
		setTimeout(function(){ $('.upgradeBttn').removeClass("animationUpgrade")}, 100)
	}	
})
// UPGRADE UPGRADE UPGRADE



// SECOND BLOCK SECOND BLOCK

if(checkUnlock == 1){
		$('.unlockBttn').remove()	
		if(upgradeLevelSecond > 0)p = setInterval(clickTime, 60)
		$('.unlockBttn').removeClass()
		$('.lock_img').remove()
		$('.clickContainerLock').remove()
		$('.barTimeText1').css('display', 'flex')
		$('.barTimeText2').css('display', 'flex')
		setAllValue()
		checkUpgrade()
		saveAll()
	}

$('.unlockBttn').click(function(){
	if(score >= unlockBttnPrice) {
		localStorage.setItem('checkUnlock', JSON.stringify(checkUnlock = 1))
		score -= unlockBttnPrice
		$(this).removeClass()
		$(this).remove()
		$('.lock_img').remove()
		$('.clickContainerLock').remove()
		$('.barTimeText1').css('display', 'flex')
		$('.barTimeText2').css('display', 'flex')
		setAllValue()
		checkUpgrade()
		saveAll()
	}
})

$('.upgradeBttnTime').click(function(){
	if(score >= upgradeBttnTimePrice) {
		if(upgradeBttnTimePrice == 20){p = setInterval(clickTime, 50)}
		score -= upgradeBttnTimePrice
	 	addScoreTime += 10; 
		upgradeBttnTimePrice = 40 * Math.pow(1.07, upgradeLevelSecond)
		upgradeLevelSecond++
		setAllValue()
		saveAll()
		checkUpgrade()
		$('.barTimeText2').html('$' + addScoreTime)
	}
})


var p;
var y = 0
var sec = 0
function clickTime() {
	if(sec == 1000) {y = 0; sec = 0; score += addScoreTime; setAllValue(); checkUpgrade(); saveAll();}
	$('.barTimeText1').html(((1000 - sec) / 1000).toFixed(1) + "sec")
	sec += 50
	y += 5
	$('.barTime').css('background-size', "100%" + y + "%")
}
// SECOND BLOC SECOND BLOCK SECOND BLOCK

	
var settingsTrue = false
$('.settingsBttn').click(function(){
	if(settingsTrue){
		$('.settingsPanel').removeClass("settingsPanelStyle")
		settingsTrue = false
	} else {
		$('.settingsPanel').addClass("settingsPanelStyle")
		settingsTrue = true;
	}
})

$('.restartGame').click(function(){
	var acceptReload = confirm("Вы точно хотите перезаписать игру? Вы потеряете весь процесс!")
	if(acceptReload){ localStorage.setItem('checkUnlock', checkUnlock = 0); localStorage.setItem('checkSave', checkSave = 0); location.reload() }
})
var darkTheme = false
$('.darkThemeBttn').click(function(){ if(darkTheme){$('body').css('background-color', '#fff'); $('.darkThemeBttn').html("DARK THEME OFF"); darkTheme = false} 
	else { $('body').css('background-color', '#3b3b3b'); $('.darkThemeBttn').html("DARK THEME ON"); darkTheme = true }
})
var soundOffOn = true
$('.soundOffOnBttn').click(function(){ if(soundOffOn){soundOffOn = false; $('.soundOffOnBttn').html("SOUND OFF")} else {soundOffOn = true; $('.soundOffOnBttn').html("SOUND ON")} })

//loadScreen()
var s = 0
function loadScreen() {
	if(s > 100){ $('.loadScreen').remove() }
	$('.loadingFill').css('width', s + '%')
	s += 20
	setTimeout(loadScreen, 50)
}

function clickSound () {
	if(soundOffOn){
	var audio = new Audio(); // Создаём новый элемент Audio
	 audio.src = 'click_sound.mp3'; // Указываем путь к звуку "клика"
	 audio.volume = 0.3;
	 audio.autoplay = true; // Автоматически запускаем
}}

function checkUpgrade () {
	if(score >= upgradeBttnPriceFirst) { $('.upgradeBttn').removeClass("unlockBttnNoMoney")} else { $('.upgradeBttn').addClass("unlockBttnNoMoney")}
	if(score >= upgradeBttnTimePrice) { $('.upgradeBttnTime').removeClass("unlockBttnNoMoney")} else { $('.upgradeBttnTime').addClass("unlockBttnNoMoney")}
	if(score >= unlockBttnPrice){ $('.unlockBttn').removeClass("unlockBttnNoMoney")} else {$('.unlockBttn').addClass("unlockBttnNoMoney")}
}

function setAllValue () {
	$('.score').html("$" + score.toFixed(1))
	$('.clickBttn').html("CLICK " + "$" + addScore.toFixed(1))
	$('.upgradeBttn').html("Upgrade " + "$" + upgradeBttnPriceFirst.toFixed(1))
	$('.upgradeBttnTime').html("Upgrade " + "$" + upgradeBttnTimePrice.toFixed(0))
	$('.upgradeLevelFirst').html("Level " + upgradeLevelFirst)
	$('.upgradeLevelTime').html("Level " + upgradeLevelSecond)
	$('.barTimeText2').html('$' + addScoreTime)
}

setInterval(boost, 180000)
var pageHeight = document.documentElement.clientHeight;
var pageWidth = document.documentElement.clientWidth;
console.log(pageHeight)
var boostTrue = false
function boost () {
	if(!boostTrue) {
		if(pageWidth < 480) {
			if(pageHeight > 800 && pageHeight < 900){ $('.boost').css('display', 'flex').animate({top: '-=190px'}, 400).fadeIn(200); console.log(">800")}
			else if(pageHeight < 800 && pageHeight > 700){ $('.boost').css('display', 'flex').animate({top: '-=330px'}, 400).fadeIn(200); console.log(">700")}
			else if(pageHeight < 700 && pageHeight > 600){ $('.boost').css('display', 'flex').animate({top: '-=320px'}, 400).fadeIn(200); console.log(">600")}
			else if(pageHeight < 600 && pageHeight > 500){ $('.boost').css('display', 'flex').animate({top: '-=270px'}, 400).fadeIn(200); console.log(">500")}
		} else { $('.boost').css('display', 'flex').animate({top: '-=180px'}, 400).fadeIn(200); console.log("standart") }
		boostAnimStart()
		function boostAnimStart (){	$('.boostBttn').animate({width: '168px', height: '44px', marginTop: '-=2px'}, 300); setTimeout(boostAnimEnd, 300)}
		function boostAnimEnd (){ $('.boostBttn').animate({width: '160px', height: '40px', marginTop: '+=2px'}, 300); setTimeout(boostAnimStart, 300)}
		boostTrue = true
	}
}
var boostActive = false
$('.boostBttn').click(function(){
		boostActive = true
		addScore = addScore * 2;
		setAllValue()
		$('.boostTime').slideToggle(100)
		var seconds30 = 30000
		$('.boostTime').html('x2 00:' + seconds30 / 1000)
		var z = setInterval(function(){
			$('.boostTime').html('x2 00:' + seconds30 / 1000)
			seconds30 -= 1000
			if(seconds30 < 0) {seconds30 = 30000; boostTrue = false; boostActive = false; clearInterval(z); $('.boostTime').slideToggle(100); addScore = addScore / 2; setAllValue(); console.log(addScore);}
		}, 1000)
		$('.boost').animate({top: '+=180px'}, 400).fadeOut(100)
	})
$('.boostClose').click(function(){boostTrue = false; $('.boost').fadeOut(300).animate({top: '+=180px'}, 400)})

function saveAll (){
	localStorage.setItem('score', JSON.stringify(score))
	localStorage.setItem('upgradeBttnPriceFirst', JSON.stringify(upgradeBttnPriceFirst))
	localStorage.setItem('upgradeBttnTimePrice', JSON.stringify(upgradeBttnTimePrice))
	localStorage.setItem('upgradeLevelFirst', JSON.stringify(upgradeLevelFirst))
	localStorage.setItem('upgradeLevelSecond', JSON.stringify(upgradeLevelSecond))
	localStorage.setItem('addScore', JSON.stringify(addScore))
	localStorage.setItem('addScoreTime', JSON.stringify(addScoreTime))
	localStorage.setItem('multiplierPow', JSON.stringify(multiplierPow))
	localStorage.setItem('checkSave', JSON.stringify(checkSave = 1))
}

if(checkSave == 1){setAllValue(); noUseTime()} else {checkSave = 0; score = 0; upgradeBttnPriceFirst = 2; upgradeBttnTimePrice = 20; addScore = 0.2; addScoreTime = 0; upgradeLevelFirst = 1; upgradeLevelSecond = 0; multiplierPow = 1; checkUnlock = 0;}
checkUpgrade()
setAllValue() 



window.addEventListener("unload", function() {
	var date = new Date()
	var month = date.getMonth()
	var day = date.getDate()
	var hrs = date.getHours()
	var minutes = date.getMinutes()
	localStorage.setItem('month', JSON.stringify(month))
	localStorage.setItem('day', JSON.stringify(day))
	localStorage.setItem('hrs', JSON.stringify(hrs))
	localStorage.setItem('minutes', JSON.stringify(minutes))
});



function noUseTime () {
	var month = JSON.parse(localStorage.getItem('month'))
	var day = JSON.parse(localStorage.getItem('day'))
	var hrs = JSON.parse(localStorage.getItem('hrs'))
	var minutes = JSON.parse(localStorage.getItem('minutes'))
	console.log(hrs)
	console.log(minutes)

	var startDate = new Date()
	var pastMinutes = 60 - minutes + startDate.getMinutes();
	var pastHrs = startDate.getHours() - hrs
	if(pastMinutes >= 60){ pastMinutes -= 60 } else { pastHrs-- }
	pastMinutes = pastMinutes + pastHrs * 60
	var noUseTimeScore = pastMinutes * 60 * addScoreTime
	if(noUseTimeScore != 0){ alert("Пока вас небыло вы заработали: " + noUseTimeScore); score += noUseTimeScore; }
	console.log(pastMinutes)
	console.log(noUseTimeScore)
}











$('.getMoneyBttn').click(function(){
	if($('.getMoney').val() == "update") {
		score += 10000
		alert("Вы получили 10 000 за промокод update")
		setAllValue() 
	} else if ($('.getMoney').val() == "updateMAX") {
		score += 5000000
		alert("Вы получили 5 000 000 за промокод updateMAX")
		setAllValue() 
	} else {
		alert("Error: false code")
		console.log($('.getMoney').val())
	}
})