define(function(require) {
	
	var cardObject={
		card: null,
		front: ko.observable(null),
		back: ko.observable(null),
		id: ko.observable(null),
		color: ko.observable(null),
		initialize: function(options){
			$.extend(this, cardObject);  
			this.card = options;

			this.front(options.front());
			this.back(options.back());
			this.difficulty = options.difficulty();
			this.color(options.color());
			// this.color = options.color();

            this.build();
			this.show();
		},
		bindEvents: function(){
			document.getElementById('CardEditBack').addEventListener('click', this.goBack.bind(this));
			document.getElementById('CardfrontEdit').addEventListener('blur', this.frontEditor.bind(this));
            document.getElementById('CardbackEdit').addEventListener('blur', this.backEditor.bind(this));
            document.getElementById('CardcolorEdit').addEventListener('click',this.colorPicker.bind(this));
		},

		show: function(){
            document.getElementById('CardsMenuScreen').style.display='none';
            document.getElementById('CardEditScreen').style.display='block';
		},

		goBack: function(){
			this.front(null);
			this.back(null);
			this.card = {};
			this.id(null);
			this.color(null);
            document.getElementById('CardEditScreen').style.display='none';
            document.getElementById('CardsMenuScreen').style.display='block';
            document.getElementById("ColorList").style.height = 0;
		},

		build: function(){
			// var form = document.getElementById('CardEditForm');
			// document.getElementById('CardfrontEdit').value = this.front();
			// document.getElementById('CardbackEdit').value = this.back();
			// document.getElementById('CardcolorEdit').style.background = this.card.color();
		},

		fillColorList: function(){
            var colorList = document.getElementById("ColorList");
            window.App.colors.forEach(function(el){ 
                    var color = document.createElement('div');
                    // color.innerText= "";
                    color.className = "color"
                    color.style.background = el.color_value;
                    color.id = 'color_'+el.id;     
                    colorList.appendChild(color);
                    color.addEventListener('click',function(){window.App.cardObject.changeColor(el);},false);
                    color = null;            
            });

        },
        changeColor: function(color){
        	this.color(color.color_value);
            window.App.db.updateCardColor(color.id, this.card.card_id);
            this.card.color(color.color_value);
        },
		colorPicker: function(){
			var colorList = document.getElementById("ColorList");
            if(colorList.style.height=='0px'){          
                colorList.style.height='4em';
            }else{
                colorList.style.height=0;
            }
            colorList = null;
		},
		backEditor: function(){
			var val = document.getElementById('CardbackEdit').value;
			this.card.back(val);
			window.App.db.updateCardBack(val, this.card.card_id);
			val = null
		},
		frontEditor: function(){
			var val = document.getElementById('CardfrontEdit').value;
			this.card.front(val);
			window.App.db.updateCardFront(val, this.card.card_id);
			val = null;
		},


	};
	ko.applyBindings(cardObject, document.getElementById('CardEditScreen'));

	return cardObject;
});