define(function(require) {
	var tempData = require('tempData');
	var setList = {
		initialize: function() {
			console.log('setlist init');
			this.bindEvents();
			if(!this.setsFilled){
				this.fill();	               
			}
		},
		bindEvents: function(){
			document.getElementById('SetsMenuBack').addEventListener('click', this.goBack);
			document.getElementById('AddNewSet').addEventListener('click', this.newSet.bind(this));
		},
		newSet: function(){
			window.App.dbObject.saveSet("New Set","New",8);
			window.App.dbObject.getFullSets();
			document.getElementById("SetsTableTBody").appendChild(this.addRow(window.App.sets[window.App.sets.length-1]))
		},
		fill: function(){
			document.getElementById('IconList').style.height='0px';
			this.renderTable();
		},

		goBack: function(){
			document.getElementById('MainMenuScreen').style.display='block';
			document.getElementById('SetsMenuScreen').style.display='none';
		},

		show: function(){
			document.getElementById('MainMenuScreen').style.display='none';
			document.getElementById('SetsMenuScreen').style.display='block';
		},
		addRow:function(set){
			var tr = document.createElement('tr');
			tr.id='set_'+set.set_id;
			tr.className = "setRow";
			var icon = document.createElement('td');
			icon.className="icon";
			icon.innerHTML = '<img src=\''+set.icon+'\'height="32" width="32">';

			var label = document.createElement('td');
			label.className="label";
			label.innerHTML=set.name;
			var button = document.createElement('td');
			button.className="button";
			button.innerHTML="X";
			button.addEventListener('click',function(){
				navigator.notification.confirm(
					'Do you really want to delete this set:"'+this.name+'"?' , 
													  	window.App.setList.onRemoveConfirm.bind(this),     //  callback to invoke with index of button pressed
													    'Deleting set',    // title
													    ['Delete','Cancel']     // buttonLabels
													    );	            	
			}.bind(set)
			,false);
			tr.appendChild(icon);
			tr.appendChild(label);
			tr.appendChild(button);
			icon.addEventListener('click', window.App.cardList.initialize.bind(set), false);
			label.addEventListener('click', window.App.cardList.initialize.bind(set), false);
			tr.Set = set;
			return tr;
		},
		renderTable: function () {
			var body = document.getElementById('SetsMenuScreen');
			var tbl = document.getElementById('SetsTable');
			tbl.className="SetsTable"

			var tbdy = document.createElement('tbody');
			tbdy.id = "SetsTableTBody";

			window.App.sets.forEach(function(el){
				tbdy.appendChild(this.addRow(el));
			}.bind(this));
			tbl.appendChild(tbdy);
	    },

	    onRemoveConfirm:function(buttonIndex){
	    	if(buttonIndex==1){
	    		window.App.dbObject.deleteSet(this.set_id);
	    		document.getElementById('set_'+this.set_id).remove();
	    	}
	    },
	};
	return setList;
});