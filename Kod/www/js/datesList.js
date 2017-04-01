define(function(require) {
    var datesList={
        setIcon: ko.observable(null),
        setName: ko.observable(null),
        setSize: ko.observable(null),
        setDeadline: ko.observable("bez terminu"),
        set: ko.observable(null),
        description:'',
        newDateValue: new Date().toISOString().split('T')[0],
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
                        card.description = ko.observable(card.description);
                        var diff = 0.5;
                        if(card.success > 0 ||  card.error > 0){
                            diff = (card.error / (card.success+card.error)).toFixed(2);
                        }
                        card.difficulty = ko.observable(  (diff*100).toFixed(0) );
                        set.cards.push(card);
                    }
                window.App.datesList.setSize(set.cards().length);
                fn(); //uzyte do wyswietlenia listy kart lub menu testow
            }.bind(this), true); 
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
            event.stopPropagation();
            window.App.gspdialogElement.el.className='shown';
            window.App.gspdialogElement.shown = true;
        },

        gspDialogClose:function(){
            window.App.gspdialogElement.el.className = 'closing';
            setTimeout(function(){  window.App.gspdialogElement.el.className = window.App.gspdialogElement.el.className.replace("closing", "closed"); window.App.gspdialogElement.shown = false;  }, 400);    
        },
        save: function(){
            console.log(this.newDateValue);
            if(this.newDateValue.length){
                console.log('data');
                var generated = this.newDateValue.split('-');
                var year = generated[0].split('');
                var month = parseInt(generated[1]);
                var day = parseInt(generated[2]);
                var result = window.App.wordList.days[day];
                result+=' '+ window.App.wordList.months[month];
                // result+=' ';
                if(year[0]>0){
                    if(year[0]<3){
                        result+=' '+window.App.wordList.year[1000][year[0]];
                    }else{
                        result+=' futurystycznie'; //rok wiekszy niz 2999
                    }
                }
                result+=' '+window.App.wordList.year[100][year[1]];
                result+=' '+window.App.wordList.year[10][year[2]];
                result+=' '+window.App.wordList.year[1][year[3]];
                this.newDateValue = generated[2]+'-'+generated[1]+'-'+generated[0];

                window.App.db.saveCard(this.newDateValue,result,7, this.set().set_id,
                    function(insertId){
                        var card =  {  
                                card_id: insertId,
                                set_id: this.set().set_id,
                                description: ko.observable(this.description),
                                front: ko.observable(this.newDateValue),
                                back: ko.observable(result), 
                                difficulty: ko.observable(50),
                                color: ko.observable(window.App.colors[6])
                            };
                        this.set().cards.push(card);
                        this.set().size(this.set().cards().length);
                        this.newDateValue = new Date().toISOString().split('T')[0];
                        this.description = '';
                        this.gspDialogClose();
                        var objDiv = document.getElementById("DatesTable").children[0];
                        objDiv.scrollTop = objDiv.scrollHeight;
                        this.setSize(this.set().cards().length);

                }.bind(this), this.description);
         
            }else{
                window.App.toast("Nie rozpoznano daty");
            }  
        },

        removeCard: function(card, event){
            event.stopPropagation();
            window.App.db.deleteCard(this.card_id);
            window.App.datesList.set().cards.remove( function (card) 
                { return card.card_id == this.card_id;}.bind(this) );
            window.App.datesList.setSize(window.App.datesList.set().cards().length);
            window.App.datesList.set().size(window.App.datesList.set().cards().length);
        },
       
        showDate: function(card){
            event.stopPropagation();
            var str = "<b>"+card.front()+"</b><BR><BR>"+card.description()+"<BR><BR>"+card.back();
            window.App.dialog(str);
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
    ko.applyBindings(datesList, document.getElementById('GSPDialog'));
    return datesList;
});