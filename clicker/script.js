var score = JSON.parse(localStorage.getItem('score'))
var addScore = JSON.parse(localStorage.getItem('addScore'))
var addScoreTime = JSON.parse(localStorage.getItem('addScoreTime'))
var upgradeBttnPriceFirst = JSON.parse(localStorage.getItem('upgradeBttnPriceFirst'))
var upgradeLevelFirtst = 1
var upgradeLevelSecond = 1
var unlockBttnPrice = 200
var upgradeBttnTimePrice = JSON.parse(localStorage.getItem('upgradeBttnTimePrice'))
var checkSave = JSON.parse(localStorage.getItem('checkSave'))
var checkUnlock = JSON.parse(localStorage.getItem('checkUnlock'))
if(checkSave == 1){setAllValue()} else {score = 0; upgradeBttnPriceFirst = 30; upgradeBttnTimePrice = 100; addScore = 1; addScoreTime = 0; checkUnlock = 0;}
checkUpgrade()
setAllValue() 

//CLICK CLICK CLICK 
$('.clickBttn').click(function(){
	score += addScore
	$('.clickBttn').addClass("animationClick")
		setTimeout(function(){ $('.clickBttn').removeClass("animationClick")
			$('.score').css({'font-size': '3.7vw', 'top': '2.9vw'})
		}, 100)
	checkUpgrade()
	saveAll()
	setAllValue()
})
//CLICK CLICK CLICK 


// UPGRADE UPGRADE UPGRADE
$('.upgradeBttn').click(function(){
	if(score >= upgradeBttnPriceFirst) {
		score -= upgradeBttnPriceFirst
		addScore += 0.5
		upgradeLevelFirtst++
		upgradeBttnPriceFirst += upgradeBttnPriceFirst / 2 / 2

		checkUpgrade()
		setAllValue()
		saveAll ()
		$(this).addClass("animationUpgrade")
		$('.upgradeLevel').html("Level " + upgradeLevelFirtst)
		setTimeout(function(){ $('.upgradeBttn').removeClass("animationUpgrade")}, 100)
	}	
})
// UPGRADE UPGRADE UPGRADE



// SECOND BLOCK SECOND BLOCK

if(checkUnlock == 1){
		$('.unlockBttn').remove()	
		p = setInterval(clickTime, 60)
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
		if(upgradeBttnTimePrice == 100){p = setInterval(clickTime, 60)}
		score -= upgradeBttnTimePrice
	 	addScoreTime += 0.5; 
		upgradeBttnTimePrice += upgradeBttnTimePrice / 2 / 2
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
	if(y == 100) {y = 0; sec = 0; score += addScoreTime; setAllValue(); checkUpgrade(); saveAll();}
	$('.barTimeText1').html(((3000 - sec) / 1000).toFixed(1) + "sec")
	sec += 60
	y += 2
	$('.barTime').css('background-size', "100%" + y + "%")
}



function checkUpgrade () {
	if(score >= upgradeBttnPriceFirst) { $('.upgradeBttn').removeClass("unlockBttnNoMoney")} else { $('.upgradeBttn').addClass("unlockBttnNoMoney")}
	if(score >= upgradeBttnTimePrice) { $('.upgradeBttnTime').removeClass("unlockBttnNoMoney")} else { $('.upgradeBttnTime').addClass("unlockBttnNoMoney")}
	if(score >= unlockBttnPrice){ $('.unlockBttn').removeClass("unlockBttnNoMoney")} else {$('.unlockBttn').addClass("unlockBttnNoMoney")}
}

function setAllValue () {
	console.log(upgradeBttnTimePrice)
	$('.score').html("$" + score.toFixed(1))
	$('.clickBttn').html("CLICK " + "$" + addScore)
	$('.upgradeBttn').html("Upgrade " + "$" + upgradeBttnPriceFirst.toFixed(0))
	$('.upgradeBttnTime').html("Upgrade " + "$" + upgradeBttnTimePrice.toFixed(0))
	$('.score').css({'font-size': '3.6vw', 'top': '3vw'})
	$('.barTimeText2').html('$' + addScoreTime)
}

function saveAll (){
	localStorage.setItem('score', JSON.stringify(score))
	localStorage.setItem('upgradeBttnPriceFirst', JSON.stringify(upgradeBttnPriceFirst))
	localStorage.setItem('upgradeBttnTimePrice', JSON.stringify(upgradeBttnTimePrice))
	localStorage.setItem('addScore', JSON.stringify(addScore))
	localStorage.setItem('addScoreTime', JSON.stringify(addScoreTime))
	localStorage.setItem('checkSave', JSON.stringify(checkSave = 1))
}