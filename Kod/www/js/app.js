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
            window.App.exporter = require('exporter');

            window.App.gspSetList = require('gspSetList');
            window.App.datesList = require('datesList');

            window.App.testMenu = require('testMenu');
            window.App.quizTest = require('quizTest');
            window.App.yonTest = require('yonTest');
            window.App.bodyTest = require('bodyTest');
           
            window.App.bodyList = require('humanList');
            window.App.humanObject = require('humanObject');
            window.App.wordList = require('wordList');
            

            console.log("APP INIT");
            this.appReady(true);
            this.bindAllEvents();
        },
        getTimerColor: function(percent, start, end) {
          var a = percent / 100,
              b = (end - start) * a,
              c = b + start;

          return 'hsl('+c+', 65%, 50%)';
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
        dialogClose: function(dialogElement){
            if(dialogElement.shown || dialogElement.el.className == 'shown'){
                dialogElement.el.className = 'closing';
            }
            setTimeout(function(){  dialogElement.el.className = dialogElement.el.className.replace("closing", "closed"); dialogElement.shown = false;  }, 400); 
        },
        dialogNode: function(DOM){
            this.dialogElement.el.className='shown';
            this.dialogElement.shown = true;
            window.App.dialogElement.el.replaceChild(DOM, window.App.dialogElement.el.children[0]);
        },
        toast: function( text ){
            var x = document.getElementById("toast")
            x.innerText = text;
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        },
        deviceReadyBinding: function(){
           document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        },
        bindAllEvents: function() {
            $(window).click(function() {
                if(event.target.parentElement && (event.target.parentElement.id!='Dialog' && event.target.parentElement.id!='GSPDialog' && event.target.parentElement.id!='DialogContent' && event.target.parentElement.id!='GSPDialogContent')){
                    window.App.dialogClose(window.App.dialogElement);
                    window.App.dialogClose(window.App.gspdialogElement);
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
            this.initialize();
            this.db.prepareDb.bind(this.db)();
            this.fill();
        },
    };
    ko.applyBindings(app, document.getElementById('MainMenuScreen'));
    return app;
});
