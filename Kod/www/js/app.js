define(function(require) {  

    var app = {
        icons: [],
        colors: [],
        appReady: ko.observable(false),
        initialize: function() {
            window.App = this;
            window.App.db =  require('db')
            
            window.App.setList = require('setList');
            window.App.cardList = require('cardList');    
            window.App.cardObject = require('cardObject');

            window.App.testMenu = require('testMenu');
            window.App.quizTest = require('quizTest');
            window.App.yonTest = require('yonTest');

            window.App.bodyList = require('humanList');
            window.App.humanObject = require('humanObject');

            console.log("APP INIT");
            this.appReady(true);
            this.bindAllEvents();            
        },

        fill: function( ){
            window.App.icons = window.App.db.icons;
            window.App.colors = window.App.db.colors;  
            window.App.cardObject.fillColorList();
        },

        dialog: function(content, onAccept, onCancel){
            el = document.getElementById("Dialog");
            el.className='shown';
            document.getElementById("DialogContent").innerText = content;
            if(onAccept){
                //show button
                document.getElementById("DialogButtonRight").addEventListener('click', function(){ 
                       document.getElementById("Dialog").style.display='none';
                       onAccept();
                   });
            }
            if(onCancel){
                //show button
                document.getElementById("DialogButtonLeft").addEventListener('click', function(){ 
                    document.getElementById("Dialog").style.display='none';
                    onCancel();
                });
            }
        },

        toast: function( text ){
            var x = document.getElementById("snackbar")
            x.innerText = text;
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        },

        bindAllEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

            $(window).click(function() {
                el = document.getElementById("Dialog");
                if(el.className=='shown'){
                    el.className = 'closing';
                }
                setTimeout(function(){  el.className = el.className.replace("closing", "closed");  }, 500);
            });

            document.getElementById('helpIntro').addEventListener('click', 
                function(){
                    event.stopPropagation();
                    this.dialog("MAIN");
            }.bind(this));


            window.App.testMenu.bindEvents(); 
        },

        onDeviceReady: function() {
            window.App.db.prepareDb.bind(window.App.db)();
            window.App.fill();
        },
    };
   ko.applyBindings(app, document.getElementById('MainMenuScreen'));
 return app;
});
