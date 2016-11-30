define(function(require) {
    var cardList={
        setIcon: ko.observable(null),
        setName: ko.observable(null),
        cards: ko.observableArray([]),
        set: ko.observable(null),

        initialize: function(set) {
            window.App.cardList.set = set;
            window.App.cardList.setName(set.name());
            window.App.cardList.setIcon(set.icon());
            window.App.cardList.cards(set.cards());
            window.App.cardList.show();      
        },

        bindEvents: function(){
            document.getElementById('SetIcon').addEventListener('click',this.showIconList.bind(this),false);  
            document.getElementById('SetName').addEventListener('click',this.changeName.bind(this),false);  
            document.getElementById('SetName').addEventListener('blur',this.changeNameSave.bind(this),false);  
            document.getElementById('CardsMenuBack').addEventListener('click', this.goBack);     
        },

        fillIconList: function(){
            var iconsList = document.getElementById("IconList");
            window.App.icons.forEach(function(el){ 
                    var icon = document.createElement('img');
                    icon.style.width= '32px';
                    icon.style.height= '32px';
                    icon.src = el.icon_value;
                    icon.id = 'icon_'+el.id;     
                    iconsList.appendChild(icon);
                    icon.addEventListener('click',function(){window.App.cardList.changeIcon(el);},false);
            });
        },

        newCard: function(){
            window.App.dbObject.saveCard("New Card Front","New Card Back",2, this.set.set_id);
            var card =  {  
                            card_id: window.App.dbObject.lastInserted,
                            set_id: this.set.set_id,
                            front: ko.observable("New Card Front"),
                            back: ko.observable('New Card Back'), 
                            difficulty: ko.observable(0.5),
                            color: ko.observable(window.App.colors[2])
                        };
            setTimeout(function(){  
                this.set.cards.push(card);
                window.App.cardList.cards(this.set.cards());
            }.bind(this),100);
        },

        removeCard: function(card, event){
            event.stopPropagation();
            navigator.notification.confirm(
                    'Do you really want to delete this card:"'+card.front() +'"?' , 
                                        window.App.cardList.onRemoveConfirm.bind(this),   //  callback to invoke with index of button pressed
                                                        'Deleting card',    // title
                                                        ['Delete','Cancel']     // buttonLabels
                                                        );
        },
        goToCardEdit: function(card){
            window.App.cardObject.initialize(card);
        },
        onRemoveConfirm: function(buttonIndex){
            console.log(this);
            if(buttonIndex==1){
                window.App.dbObject.deleteCard(this.card_id);
                window.App.cardList.set.cards.remove( function (card) 
                    { return card.card_id == this.card_id;}.bind(this) );
                window.App.cardList.cards(window.App.cardList.set.cards());
            }        
        },

        showIconList:function(){
            this.iconsList = document.getElementById("IconList");
            if(this.iconsList.style.height=='0px'){          
                this.iconsList.style.height='40px';
            }else{
                this.iconsList.style.height=0;
            }
        },
        
        changeIcon:function(icon){
            this.set.icon(icon.icon_value);
            window.App.dbObject.updateSetIcon(icon.id, this.set.set_id);
            this.setIcon(icon.icon_value);
        },
        changeName: function(){
            document.getElementById('SetName').contentEditable=true;
        },
        changeNameSave: function(){
            var setNameDOM =  document.getElementById('SetName');
            setNameDOM.contentEditable=false;
            this.set.name(setNameDOM.innerText);
            window.App.dbObject.updateSetName(setNameDOM.innerText, this.set.set_id);
        },

        show: function(){
            document.getElementById('SetsMenuScreen').style.display='none';
            document.getElementById('CardsMenuScreen').style.display='block';
        },

        goBack: function(){
            document.getElementById('CardsMenuScreen').style.display='none';
            document.getElementById('SetsMenuScreen').style.display='block';
            document.getElementById("IconList").style.height = 0;
        },
               
    };
    ko.applyBindings(cardList, document.getElementById('CardsMenuScreen'));

    return cardList;
});