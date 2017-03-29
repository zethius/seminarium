define(function(require) {  

    var app = {
        icons: [],
        colors: [],
        appReady: ko.observable(false),
        dialogElement: {el: document.getElementById("Dialog"), shown: false},
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
        
        placeCaretAtEnd: function(el) {
            el.focus();
            if (typeof window.getSelection != "undefined"
                    && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
        },
        fill: function( ){
            window.App.icons = window.App.db.icons;
            window.App.colors = window.App.db.colors;  
            window.App.cardObject.fillColorList();
        },

        dialog: function(content, onAccept, onCancel){
            this.dialogElement.el.className='shown';
            this.dialogElement.shown = true;
            document.getElementById("DialogContent").innerHTML = content;
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
                if(window.App.dialogElement.shown || window.App.dialogElement.el.className == 'shown'){
                    window.App.dialogElement.el.className = 'closing';
                }
                setTimeout(function(){  window.App.dialogElement.el.className = window.App.dialogElement.el.className.replace("closing", "closed"); window.App.dialogElement.shown = false;  }, 400);
            });

            document.getElementById('helpIntro').addEventListener('click', 
                function(){
                    event.stopPropagation();
                    this.dialog("Witaj w Art of Memory, aplikacji ułatwiającej uczenie się. <BR><BR>Możesz organizować, przechowywać i przypominać sobie informacje korzystając z trzech mnemotechnik: fiszek, ciała oraz głównego systemu pamięciowego.");
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
