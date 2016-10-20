define(function(require) {
    var cardList={
        initialize: function() {
            $.extend(this,cardList);
            document.getElementById('SetIcon').innerHTML ='<img src=\''+this.icon+'\'height="128" width="128">'
            document.getElementById('SetName').innerHTML=this.name;
            document.getElementById('MainMenuScreen').style.display='none';
            document.getElementById('SetsMenuScreen').style.display='none';
            document.getElementById('CardsMenuScreen').style.display='block';
            document.getElementById('CardsMenuBack').addEventListener('click', this.back);
            setTimeout(this.renderTable.bind(this), 10);
        },
        
        back: function(){
            document.getElementById('MainMenuScreen').style.display='none';
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
                // tr.addEventListener('click',cardList.initialize.bind(el), false);
                tbdy.appendChild(tr);
            }.bind(this));
            tbl.appendChild(tbdy);
            // body.appendChild(tbl)
        },
    };
    return cardList;
});