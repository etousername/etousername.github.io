var money = 10
var summaVar = summa.value
var coefficientVar = coefficient.value
var resultVar = summaVar / coefficientVar * 100
var targetMenshe = coefficientVar * 10000 - 1
var targetBolshe = 1000000 - (coefficientVar * 10000) 
var randomCount


$('.money').html(money + "$")
$('.targetMenshe').html("0 - " + targetMenshe)
$('.targetBolshe').html(targetBolshe + " - 999999")

	summa.oninput = function displayPreResult() {
		summaVar = summa.value
		coefficientVar = coefficient.value
		resultVar = summaVar / coefficientVar * 100
		$('.result').html(resultVar.toFixed(2))
		if(summaVar == "tiloh") {
			money = 10000
			$('.money').html(money + "$")
		}
	}
	coefficient.oninput = function displayPreResult() {
		summaVar = summa.value
		coefficientVar = coefficient.value
		if(coefficientVar > 95) {
			coefficient.value = 95
			coefficientVar = 95
		}
			var resultVar = summaVar / coefficientVar * 100
			$('.result').html(resultVar.toFixed(2))

		targetMenshe = coefficientVar * 10000 - 1
		targetBolshe = 1000000 - (coefficientVar * 10000) 
		$('.targetMenshe').html("0 - " + targetMenshe)
		$('.targetBolshe').html(targetBolshe + " - 999999")
	}

	

	$('#menshe').click(function() {
		summaVar = summa.value
		randomCount = getRandomFloat(0, 999999)

		if(coefficientVar < 95 && coefficientVar > 0 && money >= summaVar) {
			if(randomCount < targetMenshe) {
				resultVar = summaVar / coefficientVar * 100
				$('.result').html(resultVar.toFixed(2))

				var moneyWin = money + (resultVar - summaVar)
				zxc()
				function zxc() {
					setTimeout(function() {
						money += (resultVar - summaVar) / 8
						$('.money').html(money.toFixed(2) + "$")
						if(money < moneyWin){
							zxc()
						}
					}, 50)
				}

				succesResult()
			} else {
				var moneyLose = money - summaVar
				zxc()
				function zxc() {
					setTimeout(function() {
						money -= summaVar / 8
						$('.money').html(money.toFixed(2) + "$")
						if(money > moneyLose){
							zxc()
						}
					}, 50)
				}
				loseResult()
			}
		} else {
			$('.winorlose').addClass("youLose")
			$('.winorlose').html("Недостаточно средств")
		}
	})
	$('#bolshe').click(function () {

		randomCount = getRandomFloat(0, 999999)

		if(coefficientVar < 95 && coefficientVar > 0 && money >= summaVar) {
			if(randomCount > targetBolshe) {
				resultVar = summaVar / coefficientVar * 100
				$('.result').html(resultVar.toFixed(2))

				var moneyWin = money + (resultVar - summaVar)
				zxc()
				function zxc() {
					setTimeout(function() {
						money += (resultVar - summaVar) / 8
						$('.money').html(money.toFixed(2) + "$")
						if(money < moneyWin){
							zxc()
						}
					}, 50)
				}

				succesResult()
			} else {
				var moneyLose = money - summaVar
				zxc()
				function zxc() {
					setTimeout(function() {
						money -= summaVar / 8
						$('.money').html(money.toFixed(2) + "$")
						if(money > moneyLose){
							zxc()
						}
					}, 50)
				}
				loseResult()
			}
		} else {
			$('.winorlose').removeClass("youWin")
			$('.winorlose').addClass("youLose")
			$('.winorlose').html("Недостаточно средств")
		}
	})
           

	$('.doubleSumma').click(function(){
		summaVar = summaVar * 2
		summa.value = summaVar
	})
	$('.maxSumma').click(function(){
		summaVar = money
		summa.value = summaVar.toFixed(2)
	})




	function getRandomFloat (min, max) {
		return Math.floor(Math.random() * 999999)
	}

	function succesResult() {
		$('.winorlose').html("")
		$('.winorlose').removeClass("youLose")
		$('.winorlose').removeClass("youWin")
		setTimeout(function() { 
			$('.winorlose').addClass("youWin")
			$('.winorlose').html("Вы выиграли! Выпало: " + randomCount)
		}, 70)
	}
	function loseResult() {
		$('.winorlose').html("")
		$('.winorlose').removeClass("youLose")
		$('.winorlose').removeClass("youWin")
		setTimeout(function() { 
			$('.winorlose').addClass("youLose")
			$('.winorlose').html("Вы проиграли! Выпало: " + randomCount)
		}, 70)
	}









