define(function(require) {
	var yonTest = {
		currentTest: ko.observable(),
		tests: ko.observableArray([]),
		allCards:  ko.observableArray([]),
		testIndex: ko.observable(0),
		timer: null,
		setId:0,
		errorCount: ko.observable(0),
		gsp: false,
		initialize: function(questions, cards, gsp){
			event.stopPropagation();
			this.gsp = gsp;
			this.allCards(cards());
			this.testIndex(0);
			this.errorCount(0);
			this.currentTest(null);
			this.setId = cards()[0].set_id;
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
				var getSameCard = Math.random()>0.5;
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
				if(showfront<0.5){
					if(this.gsp){
						tests[i].right.content = ko.observable(tests[i].right.description());
					}else{
						tests[i].right.content = ko.observable(tests[i].right.back());	
					}
					tests[i].left.content = ko.observable(tests[i].left.front());
				}
				else{
					if(this.gsp){
						tests[i].left.content = ko.observable(tests[i].left.description());
					}else{
						tests[i].left.content = ko.observable(tests[i].left.back());
					}
					tests[i].right.content = ko.observable(tests[i].right.front());
				}			

			}
			this.tests(tests);
		},

		goBack: function(){
			if(this.gsp){
				document.getElementById('GSPMenuScreen').style.display='block';
			}else{	
				document.getElementById('SetsMenuScreen').style.display='block';
			}
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
			var right = this.testIndex() - this.errorCount();
			this.allCards([]);
			this.tests([]);
			this.currentTest(null);
			var endingResult = "Twój wynik to:<BR>Poprawnych <span style='color=green'>"+ right +"</span> na "+this.testIndex()+" pytań.";
			document.getElementById('TestsMenuScreen').style.display='block';
       		document.getElementById('YonScreen').style.display='none';
       		event.stopPropagation();
			window.App.dialog(endingResult);
		},
		questionTimer: function(){
			var width = 25;
			var percent = 0;
			this.timer = setInterval(function(){
				// if(width<74.9){
				if(width<49.9){
					width+=0.02; //przesuniecie o 20 to jedna sekunda
					percent++;
					$('#yonTimer').css('background-color',window.App.getTimerColor( percent/12.44, 120, 0 ));
					document.getElementById("yonTimer").style.marginRight = width +'%';
					document.getElementById("yonTimer").style.marginLeft = width +'%';
				}
				else{
					this.calculateQuestionResults(false);
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
			var set = null;
			if(this.gsp){
				set = window.App.gspSetList.gspSets().filter(function(el){return el.set_id == this.setId; }.bind(this))[0];
				var editingL = set.cards()
					.filter(function(el){return el.card_id == this.currentTest().left.card_id;}.bind(this))[0];
				var editingR = set.cards()
					.filter(function(el){return el.card_id == this.currentTest().right.card_id;}.bind(this))[0];
			}else{
				set = window.App.setList.sets().filter(function(el){return el.set_id == this.setId; }.bind(this))[0];
				var editingL = set.cards()
						.filter(function(el){return el.card_id == this.currentTest().left.card_id;}.bind(this))[0];
				var editingR = set.cards()
						.filter(function(el){return el.card_id == this.currentTest().right.card_id;}.bind(this))[0];
			}
			var setDifficulty = 0;
			set.cards().forEach(function(card){setDifficulty += parseInt(card.difficulty());});
			setDifficulty = (setDifficulty / set.cards().length).toFixed(0);
			set.difficulty(setDifficulty);
			if(result){
				editingL.success++;
				editingR.success++;
			}else{
				editingL.error++;
				editingR.error++;
				this.errorCount(this.errorCount()+1);
			}
			var diffL = (editingL.error / (editingL.success+editingL.error)).toFixed(2);
				editingL.difficulty(  (diffL*100).toFixed(0) );
			var diffR = (editingR.error / (editingR.success+editingR.error)).toFixed(2);
				editingR.difficulty(  (diffR*100).toFixed(0));
			window.App.db.updateSetDifficulty(setDifficulty,set.set_id);
			window.App.db.updateCardSuccess(result,this.currentTest().left.card_id);
			window.App.db.updateCardSuccess(result,this.currentTest().right.card_id);
			this.nextQuestion();
		},
	};
	ko.applyBindings(yonTest, document.getElementById('YonScreen'));
	return yonTest;
});