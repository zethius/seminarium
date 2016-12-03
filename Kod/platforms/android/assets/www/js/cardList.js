define(function(require) {
    var cardList={
        // cardSet: [],
        cardsFilled: false,
        initialize: function() {
            console.log("cardlist init");
            $.extend(this,cardList);    
            console.log(this);
            this.setIconDom = document.getElementById('SetIcon');
            this.setIconDom.style.width = '128px';
            this.setIconDom.style.height= '128px';
            this.setIconDom.src = this.icon;
            this.setNameDom = document.getElementById('SetName');       
            this.setNameDom.innerHTML=this.name;
            this.iconsList = document.getElementById("IconList");
            if(!this.cardsFilled){
                this.bindEvents();
                this.fill();
            }
            this.show();           
        },
        bindEvents: function(){
            document.getElementById('SetIcon').addEventListener('click',this.showIconList.bind(this),false);   
            document.getElementById('CardsMenuBack').addEventListener('click', this.goBack);
               
        },
        showIconList:function(){
            console.log(this.iconsList.style.height);
            if(this.iconsList.style.height=='0px'){          
                this.iconsList.style.height='40px';
            }else{
                this.iconsList.style.height=0;
            }
        },
        changeIcon:function(icon){
            console.log(this);
            window.App.sets[this.set_id].icon = icon.icon_value;
            document.getElementById('SetIcon').src = icon.icon_value;
        },
        show: function(){
            document.getElementById('SetsMenuScreen').style.display='none';
            document.getElementById('CardsMenuScreen').style.display='block';
        },

        fill: function(){
            this.iconsList.innerHTML='';
            window.App.icons.forEach(function(el){ 
                    var icon = document.createElement('img');
                    icon.style.width= '32px';
                    icon.style.height= '32px';
                    icon.src = el.icon_value;
                    icon.id = 'icon_'+el.id;                  
                    this.iconsList.appendChild(icon);
                    icon.addEventListener('click',function(){this.changeIcon(el);}.bind(this),false);
            }.bind(this));
            this.renderTable();
            this.cardsFilled = true;
        },

        goBack: function(){
            document.getElementById('CardsMenuScreen').style.display='none';
            document.getElementById('SetsMenuScreen').style.display='block';
        },
        addRow: function(card){
             var tr = document.createElement('tr');
                tr.style.background = card.color;
                tr.id='card_'+card.card_id;
                tr.className = "setRow";

                var front = document.createElement('td');
                front.className="front";
                front.innerHTML = card.front;
                front.appendChild(document.createTextNode('\u0020'));

                var back = document.createElement('td');
                back.className="back";
                back.innerHTML=card.back;
                back.appendChild(document.createTextNode('\u0020'));

                var difficulty = document.createElement('td');
                difficulty.className="difficulty";
                difficulty.innerHTML=card.difficulty;
                difficulty.appendChild(document.createTextNode('\u0020'));

                var button = document.createElement('td');
                button.className="button";
                button.innerHTML="X";
                button.appendChild(document.createTextNode('\u0020'));
                tr.appendChild(front);
                tr.appendChild(back);
                tr.appendChild(difficulty);
                tr.appendChild(button);
                front.addEventListener('click',function(){
                    window.App.cardObject.initialize(card);
                }.bind(card), false);
                back.addEventListener('click',function(){
                    window.App.cardObject.initialize(card);
                }.bind(card), false);
                difficulty.addEventListener('click',function(){
                    window.App.cardObject.initialize(card);
                }.bind(card), false);
                button.addEventListener('click',function(){
                                                    navigator.notification.confirm(
                                                        'Do you really want to delete this card: "'+this.front+ '/'+this.back+'"?' , 
                                                        window.App.cardList.onRemoveConfirm.bind(this),     //  callback to invoke with index of button pressed
                                                        'Deleting card',    // title
                                                        ['Delete','Cancel']     // buttonLabels
                                                    );                  
                                        }.bind(card), 
                false);
            return tr;
        },
        renderTable: function () {
            var body = document.getElementById('CardsMenuScreen');
            var tbl = document.getElementById('CardsTable');

            while (tbl.firstChild) {
                tbl.removeChild(tbl.firstChild);
            }
            tbl.className="SetsTable"
            var tbdy = document.createElement('tbody');

            this.cards.forEach(function(el){           
                tbdy.appendChild(this.addRow(el));
            }.bind(this));
            tbl.appendChild(tbdy);
        },
        onRemoveConfirm:function(buttonIndex){
            if(buttonIndex==1){
                window.App.dbObject.deleteCard(this.card_id);
                var dom=document.getElementById('card_'+this.card_id);
                dom.remove();
            }
        },
    };
    return cardList;
});