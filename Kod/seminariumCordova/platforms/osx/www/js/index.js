var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('MainMenuSetsButton').addEventListener('click', setList.initialize);
        
    },
 
    showMain: function(){
        document.getElementById('MainMenuScreen').style.display='block';
        document.getElementById('SetsMenuScreen').style.display='none';
    },

    onDeviceReady: function() {
    },
};


var setList = {
    sets: [],
    initialize: function() {
        var self = this;
        document.getElementById('MainMenuScreen').style.display='none';
        document.getElementById('SetsMenuScreen').style.display='block';
        document.getElementById('SetsMenuBack').addEventListener('click', app.showMain);
        setList.sets =  setList.iterateFolders();
        console.log(setList.sets);

        setTimeout(function(){  setList.renderTable();}, 10);
    },

    renderTable: function () {
        var body = document.getElementById('SetsMenuScreen');
        var tbl = document.getElementById('SetsTable');
        tbl.innerHTML="";
        tbl.className="SetsTable"
        var tbdy = document.createElement('tbody');

        setList.sets.forEach(function(entry) {
            console.log(entry);
        });


        setList.sets.forEach(function(el){
            var tr = document.createElement('tr');
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
            tbdy.appendChild(tr);
        });
        // for (var i = 0; i < 3; i++) {
        //     var tr = document.createElement('tr');
        //     var icon = document.createElement('td');
        //     icon.className="icon";
        //     icon.innerHTML="icona";
        //     icon.appendChild(document.createTextNode('\u0020'))

        //     var label = document.createElement('td');
        //     label.className="label";
        //     label.innerHTML="nazwa zestawu";
        //     label.appendChild(document.createTextNode('\u0020'))
        //     var button = document.createElement('td');
        //     button.className="button";
        //     button.innerHTML="X";
        //     button.appendChild(document.createTextNode('\u0020'))

        //     tr.appendChild(icon);
        //     tr.appendChild(label);
        //     tr.appendChild(button);
        //     tbdy.appendChild(tr);
        // }
        tbl.appendChild(tbdy);
        body.appendChild(tbl)
    },

    iterateFolders: function(){
        var set= [];
        var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var obj = JSON.parse(this.response);
                set.push(obj);
            }
          };
          xhttp.open("GET", "resources/sets/fizyka/.info.json", true);
          xhttp.send();
          return set;
    } 


};

app.initialize();


