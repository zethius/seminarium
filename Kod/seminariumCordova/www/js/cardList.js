define(function(require) {
    var cardList={
        cardSet: [],
        cardsFilled: false,
        initialize: function() {
            $.extend(this,cardList);           
            document.getElementById('SetIcon').innerHTML ='<img src=\''+this.icon+'\'height="128" width="128">'
            document.getElementById('SetName').innerHTML=this.name;
            this.show();
            document.getElementById('CardsMenuBack').addEventListener('click', this.back);
            this.cardSet=[];
            if(!this.cardsFilled){
                this.fill();
            }
            // setTimeout(this.renderTable.bind(this), 10);
        },

        show: function(){
            document.getElementById('SetsMenuScreen').style.display='none';
            document.getElementById('CardsMenuScreen').style.display='block';
        },

        fill: function(){
            window.App.dbObject.getCards(this.set_id,function(cards){
                for(var i = 0; i < cards.rows.length; i++)
                {
                    this.cardSet.push(cards.rows.item(i));
                }
                setTimeout(function(){  
                        this.renderTable();
                        this.cardsFilled=true;
                }.bind(this),0);
            }.bind(this));      
        },

        back: function(){
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

            this.cardSet.forEach(function(el){
                var tr = document.createElement('tr');
                tr.style.background = el.color;
                tr.id=el.front;
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
                tr.addEventListener('click',function(){
                    window.App.cardObject.initialize(el);
                }.bind(el), false);
                tbdy.appendChild(tr);
            }.bind(this));
            tbl.appendChild(tbdy);
            // body.appendChild(tbl)
        },
    };
    return cardList;
});