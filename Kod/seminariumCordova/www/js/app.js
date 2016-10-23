define(function(require) {
  
    var setList = require('setList');
    var tempData = require('tempData');
    var dbObject = require('dbObject');
    var cardList = require('cardList');
    var cardObject = require('cardObject');
    var app = {

        initialize: function() {
            window.App = this;
            window.App.cardList = cardList;     
            window.App.dbObject = dbObject;
            window.App.setList = setList;
            window.App.cardObject= cardObject;
            this.bindEvents();
        },

        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function() {
            // window.addEventListener('filePluginIsReady',  this.onDeviceReady, false);
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
            document.getElementById('MainMenuSetsButton').addEventListener('click', setList.initialize.bind(setList));
            
        },

        showMain: function(){
            document.getElementById('MainMenuScreen').style.display='block';
            document.getElementById('SetsMenuScreen').style.display='none';
        },

        onDeviceReady: function() {
           dbObject.prepareDb();
        },
    };
    return app;
});
