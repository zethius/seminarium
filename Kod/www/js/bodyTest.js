define(function(require) {
	var bodyTest = {
		timer: null,
		human:null,
		bodyparts: ko.observable(),
		initialize: function( human ){
			event.stopPropagation();
			this.human = human;
			this.bodyparts(human.bodyparts.slice());
			this.prepareTest();
			this.show();
		},

		show: function(){
            document.getElementById('HumanMenuScreen').style.display='none';
            document.getElementById('BodyTestScreen').style.display='block';
            this.startTimer();
		},
		prepareTest: function(){
			this.bodyparts(this.shuffle(this.bodyparts()));
			$(".testBodyparts").sortable();

		},
		startTimer: function(){
			var width = 25;
			var percent = 0;
			this.timer = setInterval(function(){
				// if(width<74.9){
				if(width<49.9){
					percent++;
					$('#bodyTimer').css('background-color',window.App.getTimerColor( percent/24.9, 120, 0 ));
					width+=0.01; //przesuniecie o 20 to jedna sekunda
					document.getElementById("bodyTimer").style.marginRight = width +'%';
					document.getElementById("bodyTimer").style.marginLeft = width +'%';
				}
				else{
					this.checkResult(true);
				}
			}.bind(this),10);
		},

		shuffle: function(bodyparts){
			var j, x, i;
		    for (i = bodyparts.length; i; i--) {
		        j = Math.floor(Math.random() * i);
		        x = bodyparts[i - 1];
		        bodyparts[i - 1] = bodyparts[j];
		        bodyparts[j] = x;
		    }
		    return bodyparts;
		},
		checkResult: function( timeout ){
			this.bodyparts(null);
			clearInterval(this.timer);
			var endingResult = "";
			if( timeout == true ){
				endingResult = "Czas minął!";
			}else{
				var correct = 0;
				$('.testBodypart').each(function(index){
					if(this.id == 'testBodypart'+index){
						correct++;
					}
				});
								
				endingResult = "Twój wynik to:<BR>Poprawnych <span style='color=green'>"+ correct +"</span> z 6.";
		       	event.stopPropagation();
			}

			document.getElementById('BodyTestScreen').style.display='none';
	       	document.getElementById('HumanMenuScreen').style.display='block';
			window.App.dialog(endingResult);
		},

	};
	ko.applyBindings(bodyTest, document.getElementById('BodyTestScreen'));
	return bodyTest;
});