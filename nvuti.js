var money = 10
var summaVar = summa.value
var coefficientVar = coefficient.value
var targetMenshe = coefficientVar * 10000 - 1
var targetBolshe = 1000000 - (coefficientVar * 10000) 
var succesScore

$('.money').html(money + "$")
$('.targetMenshe').html("0 - " + targetMenshe)
$('.targetBolshe').html(targetBolshe + " - 999999")

	summa.oninput = function displayPreResult() {
		summaVar = summa.value
		coefficientVar = coefficient.value
		var resultVar = summaVar / coefficientVar * 100
		$('.result').html(resultVar.toFixed(2))
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
		var randomCount = getRandomFloat(0, 999999)

		if(coefficientVar < 95 && coefficientVar > 0 && money >= summaVar) {
			if(randomCount < targetMenshe) {
				resultVar = summaVar / coefficientVar * 100
				money += resultVar - summaVar
				$('.result').html(resultVar.toFixed(2))
				$('.money').html(money.toFixed(2) + "$")

				$('.winorlose').removeClass("youLose")
				$('.winorlose').addClass("youWin")
				$('.winorlose').html("Вы выиграли! Выпало: " + randomCount)
			} else {
				money -= summaVar
				$('.money').html(money.toFixed(2) + "$")
				$('.winorlose').removeClass("youWin")
				$('.winorlose').addClass("youLose")
				$('.winorlose').html("Вы проиграли! Выпало: " + randomCount)
			}
		} else {
			$('.winorlose').addClass("youLose")
			$('.winorlose').html("Недостаточно средств")
		}
		console.log(randomCount)
	})
	$('#bolshe').click(function () {

		var randomCount = getRandomFloat(0, 999999)

		if(coefficientVar < 95 && coefficientVar > 0 && money >= summaVar) {
			if(randomCount > targetBolshe) {
				resultVar = summaVar / coefficientVar * 100
				money += resultVar - summaVar
				$('.result').html(resultVar.toFixed(2))
				$('.money').html(money.toFixed(2) + "$")

				$('.winorlose').removeClass("youLose")
				$('.winorlose').addClass("youWin")
				$('.winorlose').html("Вы выиграли! Выпало: " + randomCount)
			} else {
				money -= summaVar
				$('.money').html(money.toFixed(2) + "$")
				$('.winorlose').removeClass("youWin")
				$('.winorlose').addClass("youLose")
				$('.winorlose').html("Вы проиграли! Выпало: " + randomCount)
			}
		console.log(randomCount)
		} else {
			$('.winorlose').removeClass("youWin")
			$('.winorlose').addClass("youLose")
			$('.winorlose').html("Недостаточно средств")
		}
	})



	function getRandomFloat (min, max) {
		return Math.floor(Math.random() * 999999)
	}
