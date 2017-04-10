define(function(require) {
	var quizTest = {
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
			this.allCards(cards());
			this.gsp = gsp;
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
            document.getElementById('QuizScreen').style.display='block';
		},

		prepareQuestions: function( questions ){
			var tests = [];
			if( questions.length == 5){ //dla testu S bez powtorzen
				for(var i = 0; i< questions.length; i++){
					var ans = this.allCards().slice(); //duplicate allcards
					ans = ans.filter(function(card){return card.card_id != questions[i].card_id }); //filter out answer
					tests[i] = {
						question: questions[i],
						answers: [Object.create(ans.pop()), Object.create(ans.pop()), Object.create(ans.pop()), Object.create(questions[i])]
					}
					tests[i].answers = window.App.testMenu.shuffle(tests[i].answers);
				}
			}
			else{ // dla M i L moga sie powtarzac
				for(var i = 0; i< questions.length; i++){
					var ans = this.allCards().slice(); //duplicate allcards
					ans = ans.filter(function(card){return card.card_id != questions[i].card_id }); //filter out answer
					tests[i] = {
						question: questions[i],
						answers: [Object.create(questions[i])]
					}
					for(var j=0; j<3; j++){
						var x = questions[i].card_id;
						while( x == questions[i].card_id ){
							x = Math.floor(Math.random()*ans.length);
						}
						tests[i].answers.push(Object.create(ans[x]));
						ans.splice(x,1);
					}
					tests[i].answers = window.App.testMenu.shuffle(tests[i].answers);
				}
			}

			for(var i=0; i<tests.length; i++){ //wymieszaj czy pytaniem jest front czy back
				var showfront = Math.random();
				tests[i].wrong = true;
				if(showfront<0.5){ //pytanie malarz
					tests[i].question.content = ko.observable(tests[i].question.front());
					for(var j=0; j<tests[i].answers.length; j++){
						if(this.gsp){
							tests[i].answers[j].content = ko.observable(tests[i].answers[j].description());
						}else{
							tests[i].answers[j].content = ko.observable(tests[i].answers[j].back());
						}
					}
				}
				else{
					if(this.gsp){
						tests[i].question.content = ko.observable(tests[i].question.description());
					}else{
						tests[i].question.content = ko.observable(tests[i].question.back());
					}
					for(var j=0; j<tests[i].answers.length; j++){
						tests[i].answers[j].content = ko.observable(tests[i].answers[j].front());
					}
				}
			}
			this.tests(tests);
		},

		goBack: function(){ //TODO
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
			var right = this.testIndex() - this.errorCount()/4;
			this.allCards([]);
			this.tests([]);
			this.currentTest(null);
			var endingResult = "Twój wynik to:<BR>Poprawnych <span style='color=green'>"+ right +"</span> na "+this.testIndex()+" pytań.";


			document.getElementById('TestsMenuScreen').style.display='block';
       		document.getElementById('QuizScreen').style.display='none';
			event.stopPropagation();
			window.App.dialog(endingResult);
		},
		questionTimer: function(){
			var width = 25;
			this.timer = setInterval(function(){
				// if(width<74.9){
				if(width<49.9){
					width+=0.02; //przesuniecie o 20 to jedna sekunda
					document.getElementById("quizTimer").style.marginRight = width +'%';
					document.getElementById("quizTimer").style.marginLeft = width +'%';
				}
				else{
					this.calculateQuestionResults(false);
				}
			}.bind(this),10);
		},

		answer: function(answer){
			if(answer.card_id == this.currentTest().question.card_id){
				this.calculateQuestionResults(true);
			}else{
				this.calculateQuestionResults(false);
			}
		},

		calculateQuestionResults: function(result){
			var set = null;
			if(this.gsp){
				set = window.App.gspSetList.gspSets().filter(function(el){return el.set_id == this.setId; }.bind(this))[0]
			}else{
				set =  window.App.setList.sets().filter(function(el){return el.set_id == this.setId; }.bind(this))[0];
			}
			this.currentTest().answers.forEach(function(card){
				if(this.gsp){
					var editing = set.cards()
						.filter(function(el){return el.card_id == card.card_id;})[0];
				}
				else{
					var editing = set.cards()
					.filter(function(el){return el.card_id == card.card_id;})[0];
				}
				if(result){
					editing.success++;
				}else{
					editing.error++;
					this.errorCount(this.errorCount()+1);
				}
				var diff = (editing.error / (editing.success+editing.error)).toFixed(2);
				editing.difficulty(  (diff*100).toFixed(0) );
				window.App.db.updateCardSuccess(result,card.card_id);
			}.bind(this));
			var setDifficulty = 0;
			set.cards().forEach(function(card){setDifficulty += parseInt(card.difficulty());});
			setDifficulty = (setDifficulty / set.cards().length).toFixed(0);
			set.difficulty(setDifficulty);
			window.App.db.updateSetDifficulty(setDifficulty,set.set_id);
			this.nextQuestion();
		},
	};
	ko.applyBindings(quizTest, document.getElementById('QuizScreen'));
	return quizTest;
});