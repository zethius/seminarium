define(function(require) {
	var bodyList = {
		bodies: ko.observableArray([]),
		initialize: function() {
			console.log("BODIES INITIALZIE");
			if(!this.bodies().length){
				window.App.db.getFullBodies( this.bodies );
			}
			this.bindEvents();
			this.show();
		},
		bindEvents: function(){
			document.getElementById('BodiesMenuBack').addEventListener('click', this.goBack);
			document.getElementById('AddNewBody').addEventListener('click', this.newBody.bind(this));
		},

		newBody: function(){
			window.App.db.saveBody("Adam");

			setTimeout(function(){
				this.bodies.push(
					{ id: window.App.db.lastInserted,
					 name: ko.observable('Adam'),
					 bodyparts: [
					 				{id:0, text:  ko.observable('')},
									{id:1, text:  ko.observable('')},
									{id:2, text:  ko.observable('')},
									{id:3, text:  ko.observable('')},
									{id:4, text:  ko.observable('')},
									{id:5, text:  ko.observable('')}
								]
					});
			}.bind(this),100);
		},

        removeBody:function(body){
        	event.stopPropagation();
        	navigator.notification.confirm(
					'Czy na pewno chcesz usunąć ciało:"'+body.name() +'"?' , 
										window.App.bodyList.onRemoveConfirm.bind(this),   //  callback to invoke with index of button pressed
													    'Usuwanie ciała',    // title
													    ['Usuń','Anuluj']     // buttonLabels
													    );
        },

        gotoBodyEdit: function(el){
        	window.App.humanObject.initialize(el);
        },

        onRemoveConfirm:function(buttonIndex){
	    	if(buttonIndex==1){
	    		console.log(this);
	    		window.App.db.deleteBody(this.id);
	    		window.App.bodyList.bodies.remove( function (bodies) { return bodies.id == this.id; }.bind(this) );
	    	}
	    },

		goBack: function(){
			$("HumanMenuScreen").children().off();
			window.App.bodyList.bodies([]);
			document.getElementById('MainMenuScreen').style.display='block';
			document.getElementById('HumanMenuScreen').style.display='none';
		},
		
		show: function(  ){
			document.getElementById('MainMenuScreen').style.display='none';
			document.getElementById('HumanMenuScreen').style.display='block';
		},
	};
	ko.applyBindings(bodyList, document.getElementById('HumanMenuScreen'));
	return bodyList;
});