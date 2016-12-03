define(function(require) {
	var setList = {
		initialize: function() {
			this.bindEvents();
		},
		bindEvents: function(){
			document.getElementById('SetsMenuBack').addEventListener('click', this.goBack);
			document.getElementById('AddNewSet').addEventListener('click', this.newSet.bind(this));
		},

		newSet: function(){
			window.App.dbObject.saveSet("New Set",8);
			
			setTimeout(function(){
				window.App.sets.push(
					{ set_id: window.App.dbObject.lastInserted,
					 cards: ko.observableArray([]),
					 name:ko.observable('New Set'), 
					 icon:ko.observable(window.App.icons[7].icon_value)}
					 );
			},100);
		},

        removeSet:function(set){
        	navigator.notification.confirm(
					'Do you really want to delete this set:"'+set.name() +'"?' , 
										window.App.setList.onRemoveConfirm.bind(this),   //  callback to invoke with index of button pressed
													    'Deleting set',    // title
													    ['Delete','Cancel']     // buttonLabels
													    );
        },

        onRemoveConfirm:function(buttonIndex){
	    	if(buttonIndex==1){
	    		console.log(this);
	    		window.App.dbObject.deleteSet(this.set_id);
	    		window.App.sets.remove( function (set) { return set.set_id == this.set_id; }.bind(this) );
	    	}
	    },

		goBack: function(){
			document.getElementById('MainMenuScreen').style.display='block';
			document.getElementById('SetsMenuScreen').style.display='none';
		},
		
		show: function(){
			document.getElementById('MainMenuScreen').style.display='none';
			document.getElementById('SetsMenuScreen').style.display='block';
		},

	};
	return setList;
});