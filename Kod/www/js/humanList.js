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
			$('#BodiesMenuBack').unbind('click').bind('click', this.goBack); 
			$('#AddNewBody').unbind('click').bind('click', this.newBody.bind(this)); 
			document.getElementById('helpBodies').addEventListener('click', 
                function(){
                    event.stopPropagation();
                    window.App.dialog("Ciało jest mnemotechniką ułatwiającą zapamiętywanie hierarchii oraz kolejności wydarzeń, poprzez dopasowywanie informacji do konkretnych części postaci.");
            }.bind(this));
		},

		newBody: function(){
			window.App.db.saveBody("Adam", null, function(insertId){
				this.bodies.push(
					{ id: insertId,
					 name: ko.observable('Adam'),
					 bodyparts: [
					 				{id:0, color:"#231f20", image:'img/body_1.svg', text:  ko.observable('')},
									{id:1, color:"#231f20", image:'img/body_2.svg', text:  ko.observable('')},
									{id:2, color:"#231f20", image:'img/body_3.svg', text:  ko.observable('')},
									{id:3, color:"#231f20", image:'img/body_4.svg', text:  ko.observable('')},
									{id:4, color:"#231f20", image:'img/body_5.svg', text:  ko.observable('')},
									{id:5, color:"#231f20", image:'img/body_6.svg', text:  ko.observable('')}
								]
					});
			}.bind(this));
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
        goToTest: function(body){
    		event.stopPropagation();
    		window.App.bodyTest.initialize(body);
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