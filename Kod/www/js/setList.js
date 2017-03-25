define(function(require) {
	var setList = {
		sets: ko.observableArray([]),
		initialize: function() {
			console.log("SETS INITIALZIE");
			if(!this.sets().length){
				window.App.db.getFullSets( this.sets );
			}
			this.bindEvents();
			this.show();
		},
		bindEvents: function(){
			$('#SetsMenuBack').unbind('click').bind('click', this.goBack); 
			$('#AddNewSet').unbind('click').bind('click', this.newSet.bind(this)); 
			document.getElementById('helpSets').addEventListener('click', 
                function(){
                    event.stopPropagation();
               		window.App.dialog("SETS");
            }.bind(this));
		},

		newSet: function(){
			window.App.db.saveSet("Nowy zestaw",1, function(insertId){
				this.sets.push(
					{ set_id: insertId,
					 cards: ko.observableArray([]),
					 size: ko.observable(0),
					 name:ko.observable('Nowy zestaw'), 
					 icon: ko.observable(window.App.icons[0].icon_value()),
					 deadline: ko.observable('')
					});
			}.bind(this));
		},

        removeSet:function(set){
        	event.stopPropagation();
        	if(set.size()>0){
	        	navigator.notification.confirm(
						'Zestaw "'+set.name() +'" zawiera fiszki, czy na pewno chcesz go usunąć?' , 
											window.App.setList.onRemoveConfirm.bind(this),   //  callback to invoke with index of button pressed
														    'Usuwanie zestawu',    // title
														    ['Usuń','Anuluj']     // buttonLabels
														    );
        	}else{
        		window.App.db.deleteSet(this.set_id);
	    		window.App.setList.sets.remove( function (set) { return set.set_id == this.set_id; }.bind(this) );
        	}
        },

        gotoTestMenu: function(el){
        	if(!el.cards().length){
        		window.App.cardList.fillCards(el, function(){window.App.testMenu.initialize(el)});
        	}else{
        		window.App.testMenu.initialize(el);
        	}
        },
        gotoCardList: function(el){
        	window.App.cardList.initialize(el);
        },

        onRemoveConfirm:function(buttonIndex){
	    	if(buttonIndex==1){
	    		window.App.db.deleteSet(this.set_id);
	    		window.App.setList.sets.remove( function (set) { return set.set_id == this.set_id; }.bind(this) );
	    	}
	    },

		goBack: function(){
			$("SetsMenuScreen").children().off();
			window.App.setList.sets([]);
			document.getElementById('MainMenuScreen').style.display='block';
			document.getElementById('SetsMenuScreen').style.display='none';
		},
		
		show: function(  ){
			document.getElementById('MainMenuScreen').style.display='none';
			document.getElementById('SetsMenuScreen').style.display='block';
		},
	};
	ko.applyBindings(setList, document.getElementById('SetsMenuScreen'));
	return setList;
});