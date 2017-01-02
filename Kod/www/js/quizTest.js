define(function(require) {
	var quizTest = {
		tests: ko.observableArray([]),
		allCards:  ko.observableArray([]),
		initialize: function(questions, cards){
			event.stopPropagation();
			this.allCards(cards());
			this.prepareQuestions(questions());
			this.show();
			console.log(this);
		},

		show: function(){
            document.getElementById('TestsMenuScreen').style.display='none';
            document.getElementById('QuizScreen').style.display='block';
		},
		
		bindEvents: function(){

		}, 

		prepareQuestions: function( questions ){
			var tests = [];
			if( questions.length == 5){ //dla testu S bez powtorzen
				for(var i = 0; i< questions.length; i++){
					tests[i] = {
						question: questions[i],
						answers: [this.allCards().pop(), this.allCards().pop(), this.allCards().pop(), questions[i]]
					}
					tests[i].answers = window.App.testMenu.shuffle(tests[i].answers);
				}
			}
			else{ // dla M i L moga sie powtarzac
				for(var i = 0; i< questions.length; i++){
					var ans = this.allCards().slice();
					ans=ans.filter(function(card){return card.card_id != questions[i].card_id });
					console.log(ans);
					tests[i] = {
						question: questions[i],
						answers: [questions[i]]
					}
					console.log("====");
					for(var j=0; j<3; j++){
						var x = questions[i].card_id;
						while( x == questions[i].card_id ){
							x = Math.floor(Math.random()*ans.length);
						}
						console.log(x);
						tests[i].answers.push(ans[x]);
						ans.splice(x,1);
					}
					tests[i].answers = window.App.testMenu.shuffle(tests[i].answers);
				}

			}
			this.tests(tests);
			// console.log(tests);
		},

		goBack: function(){
			document.getElementById('SetsMenuScreen').style.display='block';
            document.getElementById('TestsMenuScreen').style.display='none';
		},

		questionTimer: function(){



		},

		startTimer: function(duration, display) {
		    var timer = duration, minutes, seconds;
		    setInterval(function () {
		        minutes = parseInt(timer / 60, 10);
		        seconds = parseInt(timer % 60, 10);

		        minutes = minutes < 10 ? "0" + minutes : minutes;
		        seconds = seconds < 10 ? "0" + seconds : seconds;

		        display.textContent = minutes + ":" + seconds;

		        if (--timer < 0) {
		            timer = duration;
		        }
		    }, 1000);
		}
		
	};
	ko.applyBindings(quizTest, document.getElementById('QuizScreen'));
	return quizTest;
});