define(function(require) {  

    var app = {
        icons: [],
        colors: [],
        sets: ko.observableArray([]),
        showTests: ko.observable(false),
        initialize: function() {
            window.App = this;
            window.App.cardList = require('cardList');    
            window.App.db =  require('db')
            window.App.setList = require('setList');
            window.App.cardObject = require('cardObject');
            window.App.testMenu = require('testMenu');
            window.App.quizTest = require('quizTest');
            window.App.yonTest = require('yonTest');
            window.App.human = require('human');
            this.bindAllEvents();
        },

        fill: function( ){
            window.App.icons = window.App.db.icons;
            window.App.cardList.fillIconList();
            window.App.colors = window.App.db.colors;  
            window.App.cardObject.fillColorList();
            window.App.db.getFullSets();  
        },

        dialog: function(content, onAccept, onCancel){
            document.getElementById("DialogContent").innerText = content;
            document.getElementById("Dialog").style.display='block';
            if(onAccept){
                document.getElementById("DialogButtonRight").addEventListener('click', function(){ 
                       document.getElementById("Dialog").style.display='none';
                       onAccept();
                   });
            }
            if(onCancel){
                document.getElementById("DialogButtonLeft").addEventListener('click', function(){ 
                    document.getElementById("Dialog").style.display='none';
                    onCancel();
                });
            }
        },

        bindAllEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
            document.getElementById('MainMenuSetsButton').addEventListener('click', window.App.setList.show.bind(window.App.setList));
            document.getElementById('MainMenuBodyButton').addEventListener('click', window.App.human.init.bind(window.App.human));
            window.App.cardList.bindEvents();
            window.App.cardObject.bindEvents();
            window.App.testMenu.bindEvents(); 
        },

        onDeviceReady: function() {
            window.App.db.prepareDb.bind(window.App.db)();
            window.App.fill();
            window.App.setList.initialize();
            // setTimeout(window.App.cardList.fillIconList,200);
            // setTimeout(window.App.cardObject.fillColorList,200);
        },
    };
   ko.applyBindings(app, document.getElementById('SetsMenuScreen'));
   // ko.applyBindings(window.App.cardList, document.getElementById('CardsMenuScreen'));
 return app;
});
