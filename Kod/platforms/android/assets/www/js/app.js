define(function(require) {

    var setList = require('setList');
    var tempData = require('tempData');
    var dbObject = require('dbObject');
    var cardList = require('cardList');
    var cardObject = require('cardObject');
    var app = {
        icons: [],
        sets: [],
        initialize: function() {
            window.App = this;
            window.App.cardList = cardList;     
            window.App.dbObject = dbObject;
            window.App.setList = setList;
            window.App.cardObject= cardObject;
            this.fill();
            setTimeout(function(){  
                window.App.setList.initialize();
            }.bind(this),500);
            this.bindEvents();
        },

        fill: function(){

            window.App.dbObject.getIcons(function(icons){
                for(var i=0; i<icons.rows.length; i++){
                    this.icons.push(icons.rows.item(i));
                }
            }.bind(this));
            window.App.dbObject.getFullSets();
            
            // window.App.dbObject.getSets(function(res){
            //     for(var i = 0; i < res.rows.length; i++)
            //     {
            //         this.sets.push(res.rows.item(i));
            //     }        
            // }.bind(this));      
        },

        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
            document.getElementById('MainMenuSetsButton').addEventListener('click', setList.show.bind(setList));
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
