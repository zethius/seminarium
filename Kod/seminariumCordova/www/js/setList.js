define(function(require) {
	var tempData = require('tempData');
	var cardList = require('cardList');
	var setList = {
	    sets: [],
	    setsFilled: false,
	    initialize: function() {
	        document.getElementById('SetsMenuBack').addEventListener('click', this.back);
	        setTimeout(this.renderTable.bind(this), 10);
	        this.show();
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
	        if(!this.setsFilled){  //pozniej dodawac tylko nowe sety
	            tempData.forEach(function(entry) {
	                this.sets.push(entry.object);
	            }.bind(this));
	            this.setsFilled=true;
	        }

	        this.sets.forEach(function(el){
	            var tr = document.createElement('tr');
	            tr.id=el.name;
	            tr.className = "setRow";
	            var icon = document.createElement('td');
	            icon.className="icon";
	            icon.innerHTML = '<img src=\''+el.icon+'\'height="32" width="32">';
	            // icon.innerHTML=el.icon;
	            icon.appendChild(document.createTextNode('\u0020'))

	            var label = document.createElement('td');
	            label.className="label";
	            label.innerHTML=el.name;
	            label.appendChild(document.createTextNode('\u0020'))
	            var button = document.createElement('td');
	            button.className="button";
	            button.innerHTML="X";
	            button.appendChild(document.createTextNode('\u0020'))
	            tr.appendChild(icon);
	            tr.appendChild(label);
	            tr.appendChild(button);
	            tr.addEventListener('click',cardList.initialize.bind(el), false);
	            tr.Set = el;
	            console.log(tr);
	            tbdy.appendChild(tr);
	        }.bind(this));
	        tbl.appendChild(tbdy);
	        // body.appendChild(tbl)
	    },

	    iterateFolders: function(){
	        var set= [];
	        // var xhttp = new XMLHttpRequest();
	        //   xhttp.onreadystatechange = function() {
	        //     if (this.readyState == 4 && this.status == 200) {
	        //         var obj = JSON.parse(this.response);
	        //         set.push(obj);
	        //     }
	        //   };
	        //   xhttp.open("GET", "resources/sets/fizyka/.info.json", true);
	        //   xhttp.send();
	        var dir = "file://res/sets/fizyka/";
	        var fileextension = ".json";
	        $.ajax({
	            //This will retrieve the contents of the folder if the folder is configured as 'browsable'
	            url: dir,
	            success: function (data) {
	                console.log(data);
	                //List all .png file names in the page
	                // $(data).find("a:contains(" + fileextension + ")").each(function () {
	                //     var filename = this.href.replace(window.location.host, "").replace("http://", "");
	                //     $("body").append("<img src='" + dir + filename + "'>");
	                // });
	            }
	        });
	        return set;
	    } 
	};
	return setList;
});