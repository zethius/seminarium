define(function(require) {
	var gspSetList = {
		gspSets: ko.observableArray([]),
		initialize: function() {
			console.log("GSP INITIALZIE");
			if(!this.gspSets().length){
				window.App.db.getFullGSP( this.gspSets );
			}
			this.bindEvents();
			this.show();
		},
		bindEvents: function(){
			$('#GSPSetsMenuBack').unbind('click').bind('click', this.goBack); 
			$('#GSPAddNewSet').unbind('click').bind('click', this.newSet.bind(this)); 
			document.getElementById('helpGSP').addEventListener('click', 
                function(){
                    event.stopPropagation();
               		window.App.dialog('Główny System Pamięciowy jest mechanizmem, który z podanych dat generuje zdania według określonych zasad (szczegółowo opisanych pod ikoną <i class="fa fa-commenting-o" aria-hidden="true"></i>).');
            }.bind(this));
		},

		newSet: function(){
			window.App.db.saveSet("Nowy GSP",1, function(insertId){
				this.gspSets.push(
					{ set_id: insertId,
					 cards: ko.observableArray([]),
					 size: ko.observable(0),
					 name:ko.observable('Nowy GSP'), 
					 icon: ko.observable(window.App.icons[0].icon_value()),
					 deadline: ko.observable('')
					});
			}.bind(this), true);
		},

        removeSet:function(set){
        	event.stopPropagation();
        	if(set.size()>0 && navigator && navigator.notification){
	        	navigator.notification.confirm(
						'Zestaw "'+set.name() +'" zawiera fiszki, czy na pewno chcesz go usunąć?' , 
											window.App.gspSetList.onRemoveConfirm.bind(this),   //  callback to invoke with index of button pressed
														    'Usuwanie zestawu',    // title
														    ['Usuń','Anuluj']     // buttonLabels
														    );
        	}else{
        		window.App.db.deleteSet(this.set_id);
	    		window.App.gspSetList.gspSets.remove( function (set) { return set.set_id == this.set_id; }.bind(this) );
        	}
        },

        gotoTestMenu: function(el, event){
        	event.stopPropagation();
        	if(!el.cards().length){
        		window.App.cardList.fillCards(el, function(){window.App.testMenu.initialize(el,event, true);}, true);
        	}else{
        		window.App.testMenu.initialize(el,event, true);
        	}
        },
        gotoDatesList: function(el, event){
        	event.stopPropagation();
        	window.App.datesList.initialize(el, event);
        },

        onRemoveConfirm:function(buttonIndex){
	    	if(buttonIndex==1){
	    		window.App.db.deleteSet(this.set_id);
	    		window.App.gspSetList.gspSets.remove( function (set) { return set.set_id == this.set_id; }.bind(this) );
	    	}
	    },

		goBack: function(){
			$("GSPMenuScreen").children().off();
			window.App.gspSetList.gspSets([]);
			document.getElementById('MainMenuScreen').style.display='block';
			document.getElementById('GSPMenuScreen').style.display='none';
		},
		
		show: function(  ){
			document.getElementById('MainMenuScreen').style.display='none';
			document.getElementById('GSPMenuScreen').style.display='block';
		},
	};
	ko.applyBindings(gspSetList, document.getElementById('GSPMenuScreen'));
	return gspSetList;
});