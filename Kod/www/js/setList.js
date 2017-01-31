define(function(require) {
	var setList = {
		// sets: ko.observableArray([]),
		initialize: function() {
			this.bindEvents();
		},
		bindEvents: function(){
			document.getElementById('SetsMenuBack').addEventListener('click', this.goBack);
			document.getElementById('AddNewSet').addEventListener('click', this.newSet.bind(this));
		},

		newSet: function(){
			window.App.db.saveSet("Nowy zestaw",1);
			
			setTimeout(function(){
				window.App.sets.push(
					{ set_id: window.App.db.lastInserted,
					 cards: ko.observableArray([]),
					 name:ko.observable('Nowy zestaw'), 
					 icon: ko.observable(window.App.icons[0].icon_value()),
					 deadline: ko.observable('')
					});
			},100);
		},

        removeSet:function(set){
        	event.stopPropagation();
        	navigator.notification.confirm(
					'Czy na pewno chcesz usunąć zestaw:"'+set.name() +'"?' , 
										window.App.setList.onRemoveConfirm.bind(this),   //  callback to invoke with index of button pressed
													    'Usuwanie zestawu',    // title
													    ['Usuń','Anuluj']     // buttonLabels
													    );
        },

        onRemoveConfirm:function(buttonIndex){
	    	if(buttonIndex==1){
	    		console.log(this);
	    		window.App.db.deleteSet(this.set_id);
	    		window.App.sets.remove( function (set) { return set.set_id == this.set_id; }.bind(this) );
	    	}
	    },

		goBack: function(){
			window.App.showTests(false);
			document.getElementById('MainMenuScreen').style.display='block';
			document.getElementById('SetsMenuScreen').style.display='none';
		},
		
		show: function(  ){
			window.App.showTests(true);
			document.getElementById('MainMenuScreen').style.display='none';
			document.getElementById('SetsMenuScreen').style.display='block';
		},

	};
	return setList;
});