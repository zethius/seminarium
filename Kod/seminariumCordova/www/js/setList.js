define(function(require) {
	var tempData = require('tempData');
	var setList = {
	    sets: [],
	    setsFilled: false,
	    initialize: function() {

	        document.getElementById('SetsMenuBack').addEventListener('click', this.back);
	        if(!this.setsFilled){
	       	 	this.fill();	               
	        }
			this.show();

	    },

	    fill: function(){
	    	window.App.dbObject.getSets(function(sets){
	        	for(var i = 0; i < sets.rows.length; i++)
                {
	        		this.sets.push(sets.rows.item(i));
                }
	   			setTimeout(function(){  
	       				this.renderTable();
				   		this.setsFilled=true;
				}.bind(this),0);
	       	}.bind(this));		
	    },

	    back: function(){
	    	document.getElementById('MainMenuScreen').style.display='block';
            document.getElementById('SetsMenuScreen').style.display='none';
	    },

	    show: function(){
	        document.getElementById('MainMenuScreen').style.display='none';
	        document.getElementById('CardsMenuScreen').style.display='none';
	        document.getElementById('SetsMenuScreen').style.display='block';
	    },

	    renderTable: function () {
	        var body = document.getElementById('SetsMenuScreen');
	        var tbl = document.getElementById('SetsTable');
	        while (tbl.firstChild) {
	            tbl.removeChild(tbl.firstChild);
	        }
	        tbl.className="SetsTable"

	        var tbdy = document.createElement('tbody');
	        // if(!this.setsFilled){  //pozniej dodawac tylko nowe sety
	        //     tempData.forEach(function(entry) {
	        //         this.sets.push(entry.object);
	        //     }.bind(this));
	        //     this.setsFilled=true;
	        // }

	        this.sets.forEach(function(el){
	            var tr = document.createElement('tr');
	            tr.id=el.name;
	            tr.className = "setRow";
	            var icon = document.createElement('td');
	            icon.className="icon";
	            icon.innerHTML = '<img src=\''+el.icon+'\'height="32" width="32">';
	            // icon.innerHTML=el.icon;
	            icon.appendChild(document.createTextNode('\u0020'));

	            var label = document.createElement('td');
	            label.className="label";
	            label.innerHTML=el.name;
	            label.appendChild(document.createTextNode('\u0020'));
	            var button = document.createElement('td');
	            button.className="button";
	            button.innerHTML="X";
	            button.appendChild(document.createTextNode('\u0020'));
	            tr.appendChild(icon);
	            tr.appendChild(label);
	            tr.appendChild(button);
	            tr.addEventListener('click', window.App.cardList.initialize.bind(el), false);
	            tr.Set = el;
	            tbdy.appendChild(tr);
	        }.bind(this));
	        tbl.appendChild(tbdy);
	        // body.appendChild(tbl)
	    },

	};
	return setList;
});