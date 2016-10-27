define(function(require) {
	var tempData = require('tempData');
	var setList = {
	    sets: [],
	    initialize: function() {
	        document.getElementById('SetsMenuBack').addEventListener('click', this.back);
	        if(!this.setsFilled){
	       	 	this.fill();	               
	        }
			// this.show();
	    },

	    fill: function(){
	    	window.App.dbObject.getSets(function(sets){
	        	for(var i = 0; i < sets.rows.length; i++)
                {
	        		this.sets.push(sets.rows.item(i));
                }
	   			setTimeout(function(){  
	       				this.renderTable();
				}.bind(this),0);
	       	}.bind(this));		
	    },

	    back: function(){
	    	document.getElementById('MainMenuScreen').style.display='block';
            document.getElementById('SetsMenuScreen').style.display='none';
	    },

	    show: function(){
	        document.getElementById('MainMenuScreen').style.display='none';
	        document.getElementById('SetsMenuScreen').style.display='block';
	    },

	    renderTable: function () {
	        var body = document.getElementById('SetsMenuScreen');
	        var tbl = document.getElementById('SetsTable');
	        tbl.className="SetsTable"

	        var tbdy = document.createElement('tbody');

	        this.sets.forEach(function(el){
	            var tr = document.createElement('tr');
	            tr.id='set_'+el.set_id;
	            tr.className = "setRow";
	            var icon = document.createElement('td');
	            icon.className="icon";
	            icon.innerHTML = '<img src=\''+el.icon+'\'height="32" width="32">';

	            var label = document.createElement('td');
	            label.className="label";
	            label.innerHTML=el.name;
	            var button = document.createElement('td');
	            button.className="button";
	            button.innerHTML="X";
	            button.addEventListener('click',function(){
								            		navigator.notification.confirm(
													    'Czy na pewno chcesz usunąć zestaw "'+this.name+'"?' , 
													  	window.App.setList.onRemoveConfirm.bind(this),     //  callback to invoke with index of button pressed
													    'Usuwanie zestawu',    // title
													    ['Usuń','Anuluj']     // buttonLabels
													);	            	
	            								}.bind(el)
	            ,false);
	            tr.appendChild(icon);
	            tr.appendChild(label);
	            tr.appendChild(button);
	            icon.addEventListener('click', window.App.cardList.initialize.bind(el), false);
	            label.addEventListener('click', window.App.cardList.initialize.bind(el), false);
	            tr.Set = el;
	            tbdy.appendChild(tr);
	        }.bind(this));
	        tbl.appendChild(tbdy);
	        // body.appendChild(tbl)
	    },

	    onRemoveConfirm:function(buttonIndex){
	    	if(buttonIndex==1){
	    		window.App.dbObject.deleteSet(this.set_id);
	    		var dom=document.getElementById('set_'+this.set_id);
	    		dom.remove();
	    	}
	    },
	};
	return setList;
});