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
        document.getElementById('MainMenuSetsButton').addEventListener('click', setList.SetsMenu);
        
    },

    

   

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


var setList = {

    initialize: function() {
        setList.renderTable();
    },

    renderTable: function () {
        var body = document.getElementById('SetsMenuScreen');
        console.log(body);
        var tbl = document.getElementById('SetsTable');
        tbl.className="SetsTable"
        var tbdy = document.createElement('tbody');
        //sets = skanowanie folderu /resources/sets
        //foreach set

        for (var i = 0; i < 3; i++) {
            var tr = document.createElement('tr');
            var icon = document.createElement('td');
            icon.className="icon";
            icon.innerHTML="icona";
            icon.appendChild(document.createTextNode('\u0020'))

            var label = document.createElement('td');
            label.className="label";
            label.innerHTML="nazwa zestawu";
            label.appendChild(document.createTextNode('\u0020'))
            var button = document.createElement('td');
            button.className="button";
            button.innerHTML="X";
            button.appendChild(document.createTextNode('\u0020'))

            tr.appendChild(icon);
            tr.appendChild(label);
            tr.appendChild(button);
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
        body.appendChild(tbl)
    },

    SetsMenu: function(event){
        document.getElementById('MainMenuScreen').style.display='none';
        document.getElementById('SetsMenuScreen').style.display='block';
        setList.initialize();
    },
};

app.initialize();


