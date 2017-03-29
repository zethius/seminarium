define(function(require) {
	
	var humanObject = {
		human: ko.observable(),

		humanBody: ko.observableArray([
			{id: 0, color:"#231f20", text:ko.observable(''), image:'img/body_1.svg'},
			{id: 1, color:"#231f20", text:ko.observable(''), image:'img/body_2.svg'},
			{id: 2, color:"#231f20", text:ko.observable(''), image:'img/body_3.svg'},
			{id: 3, color:"#231f20", text:ko.observable(''), image:'img/body_4.svg'},
			{id: 4, color:"#231f20", text:ko.observable(''), image:'img/body_5.svg'},
			{id: 5, color:"#231f20", text:ko.observable(''), image:'img/body_6.svg'}
			]),
		initialize: function( human ){
			console.log(human);
			this.human(human);
			this.show();

			for(var i = 0; i < this.humanBody().length; i++){
				human.bodyparts[i].text() ? this.humanBody()[i].text(human.bodyparts[i].text()) : this.humanBody()[i].text('');
				var svgholder = $('#part'+i).find("object")[0];
				svgholder.number = i;
				svgholder.onload = function( event ){ 
					this.setColor(this.humanBody()[event.currentTarget.number], event.currentTarget.number, event.currentTarget);
				}.bind(this);


			}
    
			this.bindEvents();
		},

		bodypartClicked: function(bodypart, event){
			event.target.style.display='none';
			$('#partText'+bodypart.id).show().focus();
		},

		setColor: function(bodypart, index, svg){
			var colorFilled = '#11718d';
			var colorEmpty = '#d6eff4'
			// if(bodypart.id)

			if(bodypart.text().length){
				svg.contentDocument.styleSheets[0].cssRules[0].style.fill=colorFilled;
			}else{
				svg.contentDocument.styleSheets[0].cssRules[0].style.fill=colorEmpty;
			}	
		},

		bodypartSave: function(bodypart, event){
			bodypart.text(event.target.value);
			window.App.db.updateBodyPart(bodypart.id, event.target.value, window.App.humanObject.human().id );
			event.target.style.display='none';


			$('#part'+bodypart.id).show(0, function(){
				var svgholder = $('#part'+this.id).find("object")[0];
				svgholder.onload = function(){ 
					window.App.humanObject.setColor(bodypart, bodypart.id, this);
				};
			}.bind(bodypart));
		},

		bindEvents: function(){
			$('#HumanBodyBack').unbind('click').bind('click', this.goBack.bind(this)); 
			$('#HumanName').unbind('click').bind('click', this.changeName.bind(this)); 
			$('#HumanName').unbind('blur').bind('blur', this.changeNameSave.bind(this)); 
			$('#HumanNameEdit').unbind('click').bind('click', this.changeName.bind(this)); 
		},

		changeName: function(){
            var el =  document.getElementById('HumanName');
            el.contentEditable=true;
            window.App.placeCaretAtEnd(el)
        },
        changeNameSave: function(){
            var humanNameDOM = document.getElementById('HumanName');
            humanNameDOM.contentEditable=false;
            this.human().name(humanNameDOM.innerText);
            window.App.db.updateBodyName(this.human().id, humanNameDOM.innerText );
        },

		show: function(  ){
			document.getElementById('HumanMenuScreen').style.display='none';
			document.getElementById('HumanScreen').style.display='block';
		},
		goBack: function( ){
			this.human(null);
			document.getElementById('HumanMenuScreen').style.display='block';
			document.getElementById('HumanScreen').style.display='none';
		},
	};

  	ko.applyBindings(humanObject, document.getElementById('HumanScreen'));
	return humanObject;
});