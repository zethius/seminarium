define(function(require) {
    var cardList={
        setIcon:ko.observable(null),
        setName:ko.observable(null),
        cards: ko.observableArray([]),
        set: ko.observable(null),

        initialize: function(set) {
            console.log(set);
            window.App.cardList.set = set;
            window.App.cardList.setName(set.name());
            window.App.cardList.setIcon(set.icon());
            window.App.cardList.cards(set.cards());
            window.App.cardList.show();      
        },

        bindEvents: function(){
            document.getElementById('SetIcon').addEventListener('click',this.showIconList.bind(this),false);  
            document.getElementById('SetName').addEventListener('dblclick',this.changeName.bind(this),false);  
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
            console.log("NEW CARD");
            window.App.dbObject.saveCard("New Card Front","New Card Back",4, this.set.set_id);
            var card =  {  
                            card_id: window.App.dbObject.lastInserted,
                            set_id: this.set.set_id,
                            front: ko.observable("New Card Front"),
                            back: ko.observable('New Card Back'), 
                            difficulty: ko.observable(0.5)
                        };

              
            // window.App.cardList.cards.push(card);
            setTimeout(function(){  
               // var set =  ko.utils.arrayFirst( window.App.sets(), function(set) {
               //          return set.set_id == this.setId;
               //      }.bind(this)
               //  );
                this.set.cards.push(card);
                window.App.cardList.cards(this.set.cards());
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

        onRemoveConfirm: function(buttonIndex){
            console.log(this);
            if(buttonIndex==1){
                window.App.dbObject.deleteCard(this.card_id);
                // var set = ko.utils.arrayFirst( window.App.sets(), function(set) {
                //         return set.set_id ==this.set_id;
                //     }.bind(this)
                // );
                window.App.cardList.set.cards.remove( function (card) 
                    { return card.card_id == this.card_id;}.bind(this) );
                window.App.cardList.cards(window.App.cardList.set.cards());
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
            // ko.utils.arrayFirst( window.App.sets(), function(set) {
            //             return set.set_id == this.set.set_id;
            //         }.bind(this)
            //     )
            this.set.icon(icon.icon_value);
            window.App.dbObject.updateSet(this.setName(), icon.id, this.set.set_id);
            this.setIcon(icon.icon_value);
        },
        changeName: function(){
            console.log('changename');
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