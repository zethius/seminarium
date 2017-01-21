define(function(require) {
	var yonTest = {
		currentTest: ko.observable(),
		tests: ko.observableArray([]),
		allCards:  ko.observableArray([]),
		testIndex: ko.observable(0),
		timer: null,
		initialize: function(questions, cards){
			event.stopPropagation();
			this.allCards(cards());
			this.prepareQuestions(questions());
			this.show();
			this.nextQuestion();
		},

		show: function(){
            document.getElementById('TestsMenuScreen').style.display='none';
            document.getElementById('YonScreen').style.display='block';
		},

		prepareQuestions: function( questions ){
			var tests = [];
			for(var i = 0; i < questions.length; i++){
				var ans = this.allCards().slice(); //duplicate allcards
					// ans = ans.filter(function(card){return card.card_id != questions[i].card_id }); //filter out answer
				var getSameCard = Math.random()>0.7;
				var right = null;
				if(getSameCard){
					console.log("same");
					right = Object.create(questions[i]);
				}
				else{
				 	right = Object.create(ans.pop());
				}
				tests[i] = { 	left: 	questions[i],
								right:  right,
								wrong:  true
							};
				var showfront = Math.random()<0.5;
				if(showfront<0.5){ //pytanie malarz
					tests[i].left.content = ko.observable(tests[i].left.front());
					tests[i].right.content = ko.observable(tests[i].right.back());
				}
				else{
					tests[i].left.content = ko.observable(tests[i].left.back());
					tests[i].right.content = ko.observable(tests[i].right.front());
				}			

			}
			this.tests(tests);
		},

		goBack: function(){
			document.getElementById('SetsMenuScreen').style.display='block';
            document.getElementById('TestsMenuScreen').style.display='none';
		},

		nextQuestion: function(){
			clearInterval(this.timer);
			if(this.testIndex() < this.tests().length){
				this.currentTest(this.tests()[this.testIndex()]);
				this.questionTimer();		
				this.testIndex(this.testIndex()+1);

			}else{
				console.log("END");
				this.finishQuiz();
			}		
		},
		finishQuiz: function(){
			this.testIndex(0);
			this.allCards([]);
			this.tests([]);
			this.currentTest();
			document.getElementById('TestsMenuScreen').style.display='block';
       		document.getElementById('YonScreen').style.display='none';
		},
		questionTimer: function(){
			var width = 25;
			this.timer = setInterval(function(){
				// if(width<74.9){
				if(width<49.9){
					width+=0.02; //przesuniecie o 20 to jedna sekunda
					document.getElementById("yonTimer").style.marginRight = width +'%';
					document.getElementById("yonTimer").style.marginLeft = width +'%';
				}
				else{
					this.calculateQuestionResults(false);
					this.nextQuestion();
				}
			}.bind(this),10);
		},

		answer: function(same){
			if(same)
			{
				if(this.currentTest().left.card_id == this.currentTest().right.card_id){
					this.calculateQuestionResults(true);
				}
				else{
					this.calculateQuestionResults(false);
				}
			}else{
				if(this.currentTest().left.card_id != this.currentTest().right.card_id){
					this.calculateQuestionResults(true);
				}
				else{
					this.calculateQuestionResults(false);
				}
			}
		},

		calculateQuestionResults: function(result){
			window.App.db.updateCardSuccess(result,this.currentTest().left.card_id);
			window.App.db.updateCardSuccess(result,this.currentTest().right.card_id);
			this.nextQuestion();
		},
	};
	ko.applyBindings(yonTest, document.getElementById('YonScreen'));
	return yonTest;
});