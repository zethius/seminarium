define(function(require) {
	var testMenu = {
		set: ko.observable(null),
		size: ko.observable("S"),
		initialize: function(set){
			event.stopPropagation();
            window.App.testMenu.set = set;
            if(set.cards().length>=5){
	            window.App.testMenu.show();     
            }
            else{
            	console.log("potrzeba wiecej kart");
            }
		},

		show: function(){
			document.getElementById('SetsMenuScreen').style.display='none';
            document.getElementById('TestsMenuScreen').style.display='block';
		},

		bindEvents: function(){
			var sizes = document.getElementById('TestSize').childNodes;
			 for (var i = 0; i < sizes.length; i++) {
		        sizes[i].addEventListener("click", function(){window.App.testMenu.setSize(this); }, false);
		    }
		    document.getElementById('TestsMenuBack').addEventListener('click', this.goBack, false);  
		    document.getElementById('YesorNot').addEventListener('click', function(){ window.App.testMenu.prepareYoNTest();}, false);
		    document.getElementById('Quiz').addEventListener('click', function(){ window.App.testMenu.prepareQuizTest();}, false);
		}, 

		setSize: function(el){
			window.App.testMenu.size(el.id);
			el.className +=" selected";
			$('.SizeButton').not('#'+el.id).removeClass("selected");
		},
		goBack: function(){
			document.getElementById('SetsMenuScreen').style.display='block';
            document.getElementById('TestsMenuScreen').style.display='none';
		},
		prepareYoNTest: function(){
			console.log("YON");
			var cards = this.getCardsForTest();	
			console.log(cards());
		},
		prepareQuizTest: function(){
			if( this.size() == 'S' && this.set.cards().length<20){
				console.log("ZA MALO NA QUIZ"); //TODO
			}else{
				var questions = this.getCardsForTest();	
				window.App.quizTest.initialize(questions, this.set.cards);
			}
		},

		getCardsForTest: function(){
			var size = this.size();
			var allCards = this.shuffle(this.set.cards());
			var cards = ko.observableArray([]);
			if(size == 'L'){  //100%
				cards(allCards);
			}
			else if(size=='M'){ // 15 kart? 
				var min = 15;
				// var calculatedMin = allCards.length*0.5;
				// if(calculatedMin>min){
					// min = calculatedMin;
				// }
				for(var i = 0; i<min; i++){
					cards.push(allCards[i]);
				}
			}
			else{// 30%  ale minimum 5 kart? zawsze 5 kart?
				var min = 5;
				// var calculatedMin = allCards.length*0.3;
				// if(calculatedMin>min){
					// min = calculatedMin;
				// }
				for(var i = 0; i<min; i++){
					cards.push(allCards[i]);
				}
			}
			return cards;
		},

		shuffle: function(cards) {
			var currentIndex = cards.length, temporaryValue, randomIndex;

		  	while (0 !== currentIndex) 
		  	{
				    randomIndex = Math.floor(Math.random() * currentIndex);
				    currentIndex -= 1;
				    temporaryValue = cards[currentIndex];
				    cards[currentIndex] = cards[randomIndex];
				    cards[randomIndex] = temporaryValue;
			}
		 	return cards;
		}
	};
	return testMenu;
});