define(function(require) {  

    var app = {
        icons: [],
        colors: [],
        appReady: ko.observable(false),
        dialogElement: {el: document.getElementById("Dialog"), shown: false},
        gspdialogElement: {el: document.getElementById("GSPDialog"), shown: false},
        initialize: function() {
            window.App = this;
            window.App.db =  require('db')
            
            window.App.setList = require('setList');
            window.App.cardList = require('cardList');    
            window.App.cardObject = require('cardObject');

            window.App.gspSetList = require('gspSetList');
            window.App.datesList = require('datesList');

            window.App.testMenu = require('testMenu');
            window.App.quizTest = require('quizTest');
            window.App.yonTest = require('yonTest');

            window.App.bodyList = require('humanList');
            window.App.humanObject = require('humanObject');
            window.App.wordList = require('wordList');
            

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

        dialog: function(content){
            this.dialogElement.el.className='shown';
            this.dialogElement.shown = true;
            window.App.dialogElement.el.children[0].innerHTML = content; 
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
                if(event.target.id!='DialogContent' && (event.target.id!="GSPDialogContent" && event.target.parentNode.id!='GSPDialogContent') ){
                    if(window.App.dialogElement.shown || window.App.dialogElement.el.className == 'shown'){
                        window.App.dialogElement.el.className = 'closing';
                    }
                    setTimeout(function(){  window.App.dialogElement.el.className = window.App.dialogElement.el.className.replace("closing", "closed"); window.App.dialogElement.shown = false;  }, 400); 
                    if(window.App.gspdialogElement.shown || window.App.gspdialogElement.el.className == 'shown'){
                        window.App.gspdialogElement.el.className = 'closing';
                    }
                    setTimeout(function(){  window.App.gspdialogElement.el.className = window.App.gspdialogElement.el.className.replace("closing", "closed"); window.App.gspdialogElement.shown = false;  }, 400); 
             
                }
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
