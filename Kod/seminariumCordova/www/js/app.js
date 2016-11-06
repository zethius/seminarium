define(function(require) {  

    var app = {
        icons: [],
        sets: ko.observableArray([]),
        initialize: function() {
            window.App = this;
            window.App.cardList = require('cardList');    
            window.App.dbObject =  require('dbObject')
            window.App.setList = require('setList');
            window.App.cardObject = require('cardObject');

            this.bindEvents();
        },

        fill: function(){
            window.App.dbObject.getIcons(function(icons){
                for(var i=0; i<icons.rows.length; i++){
                    this.icons.push(icons.rows.item(i));
                }
            }.bind(this));

            window.App.dbObject.getFullSets();  
        },

        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
            document.getElementById('MainMenuSetsButton').addEventListener('click', window.App.setList.show.bind(window.App.setList));
        },

        onDeviceReady: function() {
            window.App.dbObject.prepareDb();
            this.fill();
            window.App.setList.initialize();
            setTimeout(window.App.cardList.fillIconList,200);
            window.App.cardList.bindEvents();
        },
    };
   ko.applyBindings(app, document.getElementById('SetsMenuScreen'));
   // ko.applyBindings(window.App.cardList, document.getElementById('CardsMenuScreen'));
 return app;
});
