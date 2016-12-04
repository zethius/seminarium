define(function(require) {  

    var app = {
        icons: [],
        colors: [],
        sets: ko.observableArray([]),
        initialize: function() {
            window.App = this;
            window.App.cardList = require('cardList');    
            window.App.dbObject =  require('dbObject')
            window.App.setList = require('setList');
            window.App.cardObject = require('cardObject');
            window.App.testMenu = require('testMenu');
            window.App.UNITTESTS = require('UNITTESTS');
            this.bindAllEvents();
        },

        fill: function(callback, callback2){
            window.App.dbObject.getIcons(function(icons){
                for(var i=0; i<icons.rows.length; i++){
                    this.icons.push(icons.rows.item(i));
                }
                callback();
            }.bind(this));

            window.App.dbObject.getColors(function(colors){
                for(var i = 0; i<colors.rows.length; i++){
                    this.colors.push(colors.rows.item(i));
                }
                callback2();
            }.bind(this));
            
            window.App.dbObject.getFullSets();  
        },

        bindAllEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
            document.getElementById('MainMenuSetsButton').addEventListener('click', window.App.setList.show.bind(window.App.setList));
            window.App.cardList.bindEvents();
            window.App.cardObject.bindEvents();
        },

        onDeviceReady: function() {
            window.App.dbObject.prepareDb();
            this.fill(function(){
                window.App.cardList.fillIconList();
            }, function(){
                window.App.cardObject.fillColorList();
            });
            window.App.setList.initialize();
            // setTimeout(window.App.cardList.fillIconList,200);
            // setTimeout(window.App.cardObject.fillColorList,200);
        },
    };
   ko.applyBindings(app, document.getElementById('SetsMenuScreen'));
   // ko.applyBindings(window.App.cardList, document.getElementById('CardsMenuScreen'));
 return app;
});
