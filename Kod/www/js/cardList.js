define(function(require) {
    var cardList={
        setIcon: ko.observable(null),
        setName: ko.observable(null),
        setDeadline: ko.observable("bez terminu"),
        set: ko.observable(null),
        cardCount: ko.observable(0),
        initialize: function(set) {
            console.log("CARDS INITIALIZE");
            event.stopPropagation();
            this.fillIconList(); 
            this.set(set);
            if(!this.set().cards().length){
                this.fillCards(this.set(), function(){  
                }.bind(this));
            }
            this.setName(set.name());
            this.setIcon(set.icon());
            this.prepareDeadline(set.deadline);
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
                        card.difficulty = ko.observable(  diff );
                        set.cards.push(card);
                    }
                window.App.cardList.cardCount(set.cards().length);
                fn(); //uzyte do wyswietlenia listy kart lub menu testow
            }.bind(this)); 
        },

        prepareDeadline: function(deadline){
            if(deadline && deadline()){
                window.App.cardList.setDeadline(deadline());             
            }else{
                window.App.cardList.setDeadline("bez terminu"); 
            }
            document.getElementById('SetDeadlineInput').style.display='none';  
            document.getElementById('SetDeadlineSpan').style.display='';  
        },  

        bindEvents: function(){
            document.getElementById('SetIcon').addEventListener('click',this.showIconList.bind(this),false);  
            document.getElementById('SetName').addEventListener('click',this.changeName.bind(this),false);  
            document.getElementById('SetName').addEventListener('blur',this.changeNameSave.bind(this),false);  
            document.getElementById('SetDeadlineSpan').addEventListener('click',this.changeDate.bind(this),false); 
            document.getElementById('SetDeadlineInput').addEventListener('blur',this.changeDateSave.bind(this),false); 
            document.getElementById('CardsMenuBack').addEventListener('click', this.goBack.bind(this),false);     
        },

        fillIconList: function(){
            var iconsList = document.getElementById("IconList");
            if(!iconsList.children.length){
                window.App.db.icons.forEach(function(el){ 
                        var icon = document.createElement('img');
                        icon.style.width= '32px';
                        icon.style.height= '32px';
                        icon.src = el.icon_value();
                        icon.id = 'icon_'+el.id;     
                        iconsList.appendChild(icon);
                        icon.addEventListener('click',function(){window.App.cardList.changeIcon(el);},false);
                });
            }
        },

        newCard: function(){
            window.App.db.saveCard("New Card Front","New Card Back",2, this.set().set_id);
            var card =  {  
                            card_id: window.App.db.lastInserted,
                            set_id: this.set().set_id,
                            front: ko.observable("New Card Front"),
                            back: ko.observable('New Card Back'), 
                            difficulty: ko.observable(0.5),
                            color: ko.observable(window.App.colors[6])
                        };
            setTimeout(function(){  
                this.set().cards.push(card);
                var objDiv = document.getElementById("CardsTable").children[0];
                objDiv.scrollTop = objDiv.scrollHeight;
                this.cardCount(this.set().cards().length);
            }.bind(this),100);
        },

        removeCard: function(card, event){
            event.stopPropagation();
            navigator.notification.confirm(
                    'Czy na pewno chcesz usunąć tą fiszkę:"'+card.front() +'"?' , 
                                        window.App.cardList.onRemoveConfirm.bind(this),   //  callback to invoke with index of button pressed
                                                        'Usuwanie fiszki',    // title
                                                        ['Usuń','Anuluj']     // buttonLabels
                                                        );
        },
       
        goToCardEdit: function(card){
            window.App.cardObject.initialize(card);
        },

        onRemoveConfirm: function(buttonIndex){
            if(buttonIndex==1){
                window.App.db.deleteCard(this.card_id);
                window.App.cardList.set().cards.remove( function (card) 
                    { return card.card_id == this.card_id;}.bind(this) );
                window.App.cardList.cardCount(window.App.cardList.set().cards().length);
                // window.App.cardList.cards(window.App.cardList.set().cards());f
            }        
        },

        showIconList:function(){

            this.iconsList = document.getElementById("IconList");
            if(this.iconsList.style.height=='0px'){  
                $('.fold').first().removeClass('down').addClass('up');
                var width = '40px';  
                if(screen.width<400){
                    width = '80px';
                }      
                  this.iconsList.style.height=width;
            }else{
                $('.fold').first().removeClass('up').addClass('down');
                this.iconsList.style.height=0;
            }
        },
        
        changeIcon:function(icon){
            this.set().icon(icon.icon_value());
            window.App.db.updateSetIcon(icon.id, this.set().set_id);
            this.setIcon(icon.icon_value());
        },
        
        changeName: function(){
            document.getElementById('SetName').contentEditable=true;
        },
        changeNameSave: function(){
            var setNameDOM = document.getElementById('SetName');
            setNameDOM.contentEditable=false;
            this.set().name(setNameDOM.innerText);
            window.App.db.updateSetName(setNameDOM.innerText, this.set().set_id);
        },

        changeDate: function(){
            document.getElementById('SetDeadlineInput').style.display='';  
            document.getElementById('SetDeadlineSpan').style.display='none';  
            document.getElementById('SetDeadlineInput').focus();
        },
        changeDateSave: function(){
            var dom = document.getElementById('SetDeadlineInput');
            if(dom.value){
                this.set().deadline(dom.value);
                this.setDeadline(dom.value);
                window.App.db.updateSetDeadline(dom.value, this.set().set_id);
            }else{
                this.setDeadline('bez terminu');
                this.set().deadline('');
                window.App.db.updateSetDeadline('', this.set().set_id);
            }
            document.getElementById('SetDeadlineInput').style.display='none';  
            document.getElementById('SetDeadlineSpan').style.display='';  
        },


        show: function(){
            document.getElementById('SetsMenuScreen').style.display='none';
            document.getElementById('CardsMenuScreen').style.display='block';
        },

        goBack: function(){
            this.setDeadline(null);
            this.set(null);
            this.setIcon(null);
            this.setName(null);
            document.getElementById('CardsMenuScreen').style.display='none';
            document.getElementById('SetsMenuScreen').style.display='block';
            document.getElementById("IconList").style.height = 0;
        },
               
    };
    ko.applyBindings(cardList, document.getElementById('CardsMenuScreen'));

    return cardList;
});