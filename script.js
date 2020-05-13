var blockRandomValueArray = [
"b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1",
"b2", "b2", "b2", "b2", "b2", "b2", "b2", "b2", "b2", "b2", "b2", "b2", 
"b3", "b3", "b3", "b3", "b3", "b3", "b3", "b3", "b3", "b3", "b3", "b3",
"b4", "b4", "b4", "b4", "b4", "b4", "b4", "b4", "b4", "b4", "b4", "b4"]
blockRandomValueArray.sort(() => Math.random() - 0.5);

var clickedFirstBlock = null;
var clickedSecondBlock = null;
var clFirst;
var clSecond;
var id;
var sleep;
var score = 0;
var time = 150;
var stepEnd = 24;
var round = 1;


	function check() {
		if(clFirst == clSecond){
			setTimeout(succes, 100)
		} else {
			setTimeout(reset, 400)
		}

		function succes(){
			$("." + clFirst).addClass('noVisible')
			score += 100
			$('.score').html('Score: ' + score)
			stepEnd--;
			if(stepEnd == 0) setTimeout(newRound, 500)

			clickedFirstBlock = null;
			clickedSecondBlock = null;
			clFirst = null;
			clSecond = null;
			id = null;
			sleep = null;
		}
		function reset(){
			$("." + clFirst).removeClass(clFirst)
			$("." + clSecond).removeClass(clSecond)
			if(score != 0) score -= 50
			$('.score').html('Score: ' + score)

			clickedFirstBlock = null;
			clickedSecondBlock = null;
			clFirst = null;
			clSecond = null;
			id = null;
			sleep = null;
		}
	}

$('.block').click(function() {
	var id = this.id
	id -= 1;
	if(clickedSecondBlock == null)
		$(this).addClass(blockRandomValueArray[id])
		
		if(clickedFirstBlock == null && sleep != this.id) {
			sleep = this.id
			clickedFirstBlock = id;
			clFirst = this.classList[1]
		} else if(clickedSecondBlock == null && sleep != this.id){
			clickedSecondBlock = id;
			clSecond = this.classList[1]
			check();
		}
}) 
var seconds = time
	timer()
	function timer() {
		s = seconds % 60
		if(s < 10) s = '0' + s
		m = (seconds - s)/60
		$('.time').html('Time: 0' + m + ':' + s)
		seconds--;
		if(seconds < 0){ 
			alert("Вы играли достойно! \n Ваш счет: " + score + "\n Раунд: " + round)
			location.reload()
		}
		setTimeout(timer, 1000)
	}

		function newRound() {
			$('.block').removeClass("noVisible")
			$('.block').removeClass("b1")
			$('.block').removeClass("b2")
			$('.block').removeClass("b3")
			$('.block').removeClass("b4")
			
			time -= 30;
			seconds = time
			stepEnd = 24
			round++;
		}

