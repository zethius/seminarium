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
            this.setIconDom.addEventListener('click',this.showIconList.bind(this),false);
            this.iconsList = document.getElementById("IconList");
            document.getElementById('CardsMenuBack').addEventListener('click', this.goBack);
            // this.cardSet=[];
            if(!this.cardsFilled){
                this.fill();
            }
            this.show();           
        },
        showIconList:function(){
            console.log(this.iconsList.style.height);
            if(this.iconsList.style.height=='0px'){          
                this.iconsList.style.height='40px';
            }else{
                this.iconsList.style.height=0;
            }
        },
        changeIcon:function(){
            console.log(window.App);
            document.getElementById('SetIcon').src = this.icon_value;
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
                    icon.addEventListener('click',this.changeIcon.bind(el),false);
            }.bind(this));
            this.renderTable();
            // window.App.dbObject.getCards(this.set_id,function(cards){
            //     for(var i = 0; i < cards.rows.length; i++)
            //     {
            //         this.cardSet.push(cards.rows.item(i));
            //     }
            //     setTimeout(function(){  
            //             this.renderTable();
            //             this.cardsFilled=true;
            //     }.bind(this),0);
            // }.bind(this));   
            // this.cardsFilled = true;   
        },

        goBack: function(){
            document.getElementById('CardsMenuScreen').style.display='none';
            document.getElementById('SetsMenuScreen').style.display='block';
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
                console.log(el);
                var tr = document.createElement('tr');
                tr.style.background = el.color;
                tr.id='card_'+el.card_id;
                tr.className = "setRow";

                var front = document.createElement('td');
                front.className="front";
                front.innerHTML = el.front;
                front.appendChild(document.createTextNode('\u0020'));

                var back = document.createElement('td');
                back.className="back";
                back.innerHTML=el.back;
                back.appendChild(document.createTextNode('\u0020'));

                var difficulty = document.createElement('td');
                difficulty.className="difficulty";
                difficulty.innerHTML=el.difficulty;
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
                    window.App.cardObject.initialize(el);
                }.bind(el), false);
                back.addEventListener('click',function(){
                    window.App.cardObject.initialize(el);
                }.bind(el), false);
                difficulty.addEventListener('click',function(){
                    window.App.cardObject.initialize(el);
                }.bind(el), false);
                button.addEventListener('click',function(){
                                                    navigator.notification.confirm(
                                                        'Do you really want to delete this card: "'+this.front+ '/'+this.back+'"?' , 
                                                        window.App.cardList.onRemoveConfirm.bind(this),     //  callback to invoke with index of button pressed
                                                        'Deleting card',    // title
                                                        ['Delete','Cancel']     // buttonLabels
                                                    );                  
                                        }.bind(el), 
                false);

                tbdy.appendChild(tr);
            }.bind(this));
            tbl.appendChild(tbdy);
            // body.appendChild(tbl)
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