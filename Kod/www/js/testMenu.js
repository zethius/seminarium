define(function(require) {
	var testMenu = {
		set: ko.observable(null),
		size: ko.observable("S"),
		gsp: false,
		initialize: function(set, event, gsp){
           window.App.testMenu.set = set;
           window.App.testMenu.gsp = gsp;
            if(set.cards().length>=20){
	            window.App.testMenu.show();     
            }
            else{
            	window.App.toast("Testy wymagają min. 20 kart w zestawie");
            }
		},

		show: function(){
			document.getElementById('SetsMenuScreen').style.display='none';
			document.getElementById('GSPMenuScreen').style.display='none';
            document.getElementById('TestsMenuScreen').style.display='block';
		},

		bindEvents: function(){
			var sizes = document.getElementById('TestSize').childNodes;
			 for (var i = 0; i < sizes.length; i++) {
		        sizes[i].addEventListener("click", function(){window.App.testMenu.setSize(this); }, false);
		    }
		    document.getElementById('TestsMenuBack').addEventListener('click', this.goBack, false);  
		    document.getElementById('YesorNot').addEventListener('click', function(){ window.App.testMenu.prepareYoNTest(this.gsp);}.bind(this), false);
		    document.getElementById('Quiz').addEventListener('click', function(){ window.App.testMenu.prepareQuizTest(this.gsp);}.bind(this), false);
		    document.getElementById('helpTests').addEventListener('click', 
                function(){
                    event.stopPropagation();
                    window.App.dialog("Do sprawdzenia swojej wiedzy z danego zestawu można wybrać jeden z dwóch testów. <BR><BR>Rozwiązując Quiz należy dopasować odpowiedni tył fiszki do jej przodu. <BR>Test Para polega na zweryfikowaniu, czy podana para informacji jest ze sobą dobrze dobrana.<BR><BR>Rozmiar testu wybierany jest poprzez naciśnięcie jednego z symboli:<BR>S - 5 pytań<BR>M - 15 pytań<BR>L - wszystkie pytania");
                }.bind(this));
		}, 

		setSize: function(el){
			window.App.testMenu.size(el.id);
			el.className +=" selected";
			$('.SizeButton').not('#'+el.id).removeClass("selected");
		},
		
		goBack: function(){
			if(window.App.testMenu.gsp){
				document.getElementById('GSPMenuScreen').style.display='block';
			}else{	
				document.getElementById('SetsMenuScreen').style.display='block';
			}
            document.getElementById('TestsMenuScreen').style.display='none';
		},
		prepareYoNTest: function( gsp ){
			var questions = this.getCardsForTest();	
			window.App.yonTest.initialize(questions, this.set.cards, gsp);
		},
		prepareQuizTest: function( gsp ){
			var questions = this.getCardsForTest();	
			window.App.quizTest.initialize(questions, this.set.cards, gsp);
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
				for(var i = 0; i<min; i++){
					cards.push(allCards[i]);
				}
			}
			else{// 30%  ale minimum 5 kart? zawsze 5 kart?
				var min = 5;
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