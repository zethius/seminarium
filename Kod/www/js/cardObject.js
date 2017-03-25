define(function(require) {
	
	var cardObject={
		card: null,
		front: ko.observable(null),
		back: ko.observable(null),
		id: ko.observable(null),
		color: ko.observable(null),
		maxlength: 255,
		initialize: function(options){
			$.extend(this, cardObject);  
			this.card = options;

			this.front(options.front());
			this.back(options.back());
			this.difficulty = options.difficulty();
			this.color(options.color());
			// this.color = options.color();
			this.bindEvents();
			this.show();
		},
		bindEvents: function(){
            $('#CardEditBack').unbind('click').bind('click', this.goBack.bind(this)); 
            $('#CardfrontEdit').unbind('blur').bind('blur', this.frontEditor.bind(this)); 
            $("#CardfrontEdit").unbind('keyup').bind('keyup', function(){
            	var val = $(this).val();
			    if (val.length > maxlength) {
			        $(this).val(val.slice(0, maxlength));
			    }
            });
            $("#CardbackEdit").unbind('keyup').bind('keyup', function(){
            	var val = $(this).val();
			    if (val.length > maxlength) {
			        $(this).val(val.slice(0, maxlength));
			    }
            });

            $('#CardbackEdit').unbind('blur').bind('blur', this.backEditor.bind(this)); 
			$('#CardcolorEdit').unbind('click').bind('click',this.colorPicker.bind(this)); 
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
			$(".noColor").removeClass("transparent");
            document.getElementById('CardEditScreen').style.display='none';
            document.getElementById('CardsMenuScreen').style.display='block';
            document.getElementById("ColorList").style.height = 0;
		},

		fillColorList: function(){
            var colorList = document.getElementById("ColorList");
            window.App.colors.forEach(function(el){ 
                    var color = document.createElement('div');
                    // color.innerText= "";
                    color.className = "color"
                    if(el.color_value=="transparent"){
                    	color.className+=" noColor";
                    	// color.className+=" transparent";
                    }
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
            	var marginBottom = '0em';
            	if(screen.width<400){
            		marginBottom = '5em';
            	}       
            	colorList.style.height='4em';
                colorList.style.marginBottom= marginBottom;
                $(".noColor").addClass("transparent");
            }else{
            	$(".noColor").removeClass("transparent");
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