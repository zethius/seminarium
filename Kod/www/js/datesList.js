define(function(require) {
    var datesList={
        setIcon: ko.observable(null),
        setName: ko.observable(null),
        setSize: ko.observable(null),
        setDeadline: ko.observable("bez terminu"),
        set: ko.observable(null),
        initialize: function(set, event) {
            console.log("DATES INITIALIZE");
            this.fillIconList(); 
            this.set(set);
            if(!this.set().cards().length){
                this.fillCards(this.set(), function(){  
                }.bind(this));
            }
            this.setName(set.name());
            this.setSize(set.size());
            this.setIcon(set.icon());
            this.prepareDeadline(set.deadline);
            this.bindEvents();
            this.show();
        },

        fillCards: function(set, fn){
              window.App.db.getCards(set.set_id, function(cards){
                for(var j = 0; j < cards.rows.length; j++)
                    {
                        var card =  cards.rows.item(j);
                        card.front = ko.observable(card.front);
                        card.back = ko.observable(card.back);
                        card.color = ko.observable(window.App.db.colors[card.color-1].color_value);
                        var diff = 0.5;
                        if(card.success > 0 ||  card.error > 0){
                            diff = (card.error / (card.success+card.error)).toFixed(2);
                        }
                        card.difficulty = ko.observable(  (diff*100).toFixed(0) );
                        set.cards.push(card);
                    }
                window.App.datesList.setSize(set.cards().length);
                fn(); //uzyte do wyswietlenia listy kart lub menu testow
            }.bind(this)); 
        },

        prepareDeadline: function(deadline){
            if(deadline && deadline()){
                window.App.datesList.setDeadline(deadline());             
            }else{
                window.App.datesList.setDeadline("bez terminu"); 
            }
            document.getElementById('GSPDeadlineInput').style.display='none';  
            document.getElementById('GSPDeadlineSpan').style.display='';  
        },  

        bindEvents: function(){
            $('#GSPIcon').unbind('click').bind('click', this.showIconList.bind(this)); 
            $('#GSPName').unbind('click').bind('click', this.changeName.bind(this)); 
            $('#GSPName').unbind('blur').bind('blur',this.changeNameSave.bind(this)); 
            $("#GSPName").keypress(function(e){ if (e.which === 13) {
                                       window.App.datesList.changeNameSave.bind(datesList)();
                                    } });
            $('#GSPNameEdit').unbind('click').bind('click', this.changeName.bind(this)); 
            $('#GSPDeadlineSpan').unbind('click').bind('click',this.changeDate.bind(this)); 
            $('#GSPDeadlineInput').unbind('blur').bind('blur', this.changeDateSave.bind(this)); 
            $('#DatesMenuBack').unbind('click').bind('click', this.goBack.bind(this)); 
            document.getElementById('helpDates').addEventListener('click', 
                function(){
                    event.stopPropagation();
                    window.App.dialog('DATES');
            }.bind(this));
        },

        fillIconList: function(){
            var iconsList = document.getElementById("GSPIconList");
            if(!iconsList.children.length){
                window.App.db.icons.forEach(function(el){ 
                        var icon = document.createElement('img');
                        icon.style.width= '32px';
                        icon.style.height= '32px';
                        icon.src = el.icon_value();
                        icon.id = 'icon_'+el.id;     
                        iconsList.appendChild(icon);
                        icon.addEventListener('click',function(){window.App.datesList.changeIcon(el);},false);
                });
            }
        },

        newDate: function(){
          console.log("TODO");
        },

        removeCard: function(card, event){
            event.stopPropagation();
            window.App.db.deleteCard(this.card_id);
            window.App.datesList.set().cards.remove( function (card) 
                { return card.card_id == this.card_id;}.bind(this) );
            window.App.datesList.setSize(window.App.datesList.set().cards().length);
            window.App.datesList.set().size(window.App.datesList.set().cards().length);
        },
       
        goToCardEdit: function(card){
            window.App.cardObject.initialize(card);
        },

        showIconList:function(){
            this.iconsList = document.getElementById("GSPIconList");
            if(this.iconsList.style.height=='0px'){  
                $('#DatesMenuScreen .fold').first().removeClass('down').addClass('up');
                var width = '40px';  
                if(screen.width<400){
                    width = '80px';
                }      
                  this.iconsList.style.height=width;
            }else{
                $('#DatesMenuScreen .fold').first().removeClass('up').addClass('down');
                this.iconsList.style.height=0;
            }
        },
        
        changeIcon:function(icon){
            this.set().icon(icon.icon_value());
            window.App.db.updateSetIcon(icon.id, this.set().set_id);
            this.setIcon(icon.icon_value());
        },
        
        changeName: function(){
            var el =  document.getElementById('GSPName');
            el.contentEditable=true;
            window.App.placeCaretAtEnd(el)
        },
        changeNameSave: function(){
            var setNameDOM = document.getElementById('GSPName');
            setNameDOM.contentEditable=false;
            setNameDOM.innerText = setNameDOM.innerText.replace(/(\r\n|\n|\r)/gm,"");
            this.set().name(setNameDOM.innerText);
            window.App.db.updateSetName(setNameDOM.innerText, this.set().set_id);
        },

        changeDate: function(){
            document.getElementById('GSPDeadlineInput').style.display='';  
            document.getElementById('GSPDeadlineSpan').style.display='none';  
            document.getElementById('GSPDeadlineInput').focus();
        },
        changeDateSave: function(){
            var dom = document.getElementById('GSPDeadlineInput');
            if(dom.value){
                this.set().deadline(dom.value);
                this.setDeadline(dom.value);
                window.App.db.updateSetDeadline(dom.value, this.set().set_id);
            }else{
                this.setDeadline('bez terminu');
                this.set().deadline('');
                window.App.db.updateSetDeadline('', this.set().set_id);
            }
            document.getElementById('GSPDeadlineInput').style.display='none';  
            document.getElementById('GSPDeadlineSpan').style.display='';  
        },


        show: function(){
            document.getElementById('GSPMenuScreen').style.display='none';
            document.getElementById('DatesMenuScreen').style.display='block';
        },

        goBack: function(){
            this.setDeadline(null);
            this.set(null);
            this.setIcon(null);
            this.setName(null);
            document.getElementById('DatesMenuScreen').style.display='none';
            document.getElementById('GSPMenuScreen').style.display='block';
            document.getElementById("GSPIconList").style.height = 0;
        },
               
    };
    ko.applyBindings(datesList, document.getElementById('DatesMenuScreen'));

    return datesList;
});