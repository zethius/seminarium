define(function(require) {
	
	var cardObject={
		initialize:function(options){
			$.extend(this,cardObject);  
			this.card_id = options.card_id;
			this.front = options.front;
			this.back = options.back;
			this.difficulty = options.difficulty;
			this.color = options.color;
			console.log(this);
            document.getElementById('CardEditBack').addEventListener('click', this.goBack);
            this.build();
			this.show();
		},
		show: function(){
            document.getElementById('CardsMenuScreen').style.display='none';
            document.getElementById('CardEditScreen').style.display='block';
		}.bind(this),

		goBack: function(){
            document.getElementById('CardEditScreen').style.display='none';
            document.getElementById('CardsMenuScreen').style.display='block';
		},

		build: function(){
			// var form = document.getElementById('CardEditForm');
			console.log(this);
			document.getElementById('Cardfront').value = this.front;
			document.getElementById('Cardback').value = this.back;
		}
	};
	return cardObject;
});