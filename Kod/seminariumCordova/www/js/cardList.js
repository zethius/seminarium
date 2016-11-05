define(function(require) {
    var cardList={
        setIcon:ko.observable(null),
        setName:ko.observable(null),
        cards: ko.observableArray([]),
        setId: null,

        initialize: function(set) {
            console.log(set);
            window.App.cardList.setId = set.set_id;
            window.App.cardList.setName(set.name());
            window.App.cardList.setIcon(set.icon());
            window.App.cardList.cards(set.cards());
            window.App.cardList.show();      
        },

        bindEvents: function(){
            document.getElementById('SetIcon').addEventListener('click',this.showIconList.bind(this),false);   
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
            window.App.dbObject.saveCard("New Card Front","New Card Back",4, this.setId);
            setTimeout(function(){  
                ko.utils.arrayFirst( window.App.sets(), function(set) {
                        return set.set_id == this.setId;
                    }.bind(this)
                ).cards.push(
                            {
                             set_id: this.setId,
                             front: ko.observable("New Card Front"),
                             back: ko.observable('New Card Back'), 
                             difficulty: ko.observable(0.5)
                            }
                        );
            }.bind(this),100);
        },

        removeCard: function(card){
            console.log(card);
            navigator.notification.confirm(
                    'Do you really want to delete this card:"'+card.front() +'"?' , 
                                        window.App.cardList.onRemoveConfirm.bind(this),   //  callback to invoke with index of button pressed
                                                        'Deleting card',    // title
                                                        ['Delete','Cancel']     // buttonLabels
                                                        );
        },

         onRemoveConfirm:function(buttonIndex){
            console.log(this);
            if(buttonIndex==1){
                window.App.dbObject.deleteCard(this.card_id);
                ko.utils.arrayFirst( window.App.sets(), function(set) {
                        return set.set_id ==this.set_id;
                    }.bind(this)
                ).cards.remove( function (card) 
                    { return card.card_id == this.card_id;}.bind(this) );
            }        
        },

        showIconList:function(){
            this.iconsList = document.getElementById("IconList");
            console.log(this.iconsList.style.height);
            if(this.iconsList.style.height=='0px'){          
                this.iconsList.style.height='40px';
            }else{
                this.iconsList.style.height=0;
            }
        },
        
        changeIcon:function(icon){
            console.log(icon);
            console.log(this);
            ko.utils.arrayFirst( window.App.sets(), function(set) {
                        return set.set_id == this.setId;
                    }.bind(this)
                ).icon(icon.icon_value);
            window.App.dbObject.updateSet(this.setName(), icon.id, this.setId);
            this.setIcon(icon.icon_value);
        },

        show: function(){
            document.getElementById('SetsMenuScreen').style.display='none';
            document.getElementById('CardsMenuScreen').style.display='block';
        },

        goBack: function(){
            document.getElementById('CardsMenuScreen').style.display='none';
            document.getElementById('SetsMenuScreen').style.display='block';
        },
               
    };
    ko.applyBindings(cardList, document.getElementById('CardsMenuScreen'));

    return cardList;
});