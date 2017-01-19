define(function(require) {  

    var app = {
        icons: [],
        colors: [],
        sets: ko.observableArray([]),
        initialize: function() {
            window.App = this;
            window.App.cardList = require('cardList');    
            window.App.db =  require('db')
            window.App.setList = require('setList');
            window.App.cardObject = require('cardObject');
            window.App.testMenu = require('testMenu');
            window.App.quizTest = require('quizTest');
            window.App.UNITTESTS = require('UNITTESTS');
            this.bindAllEvents();
        },

        fill: function(callback, callback2){
            window.App.db.getIcons(function(icons){
                for(var i=0; i<icons.rows.length; i++){
                    this.icons.push(icons.rows.item(i));
                }
                callback();
            }.bind(this));

            window.App.db.getColors(function(colors){
                for(var i = 0; i<colors.rows.length; i++){
                    this.colors.push(colors.rows.item(i));
                }
                callback2();
            }.bind(this));
            
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
            window.App.cardList.bindEvents();
            window.App.cardObject.bindEvents();
            window.App.testMenu.bindEvents(); 
        },

        onDeviceReady: function() {
            window.App.db.prepareDb();
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
