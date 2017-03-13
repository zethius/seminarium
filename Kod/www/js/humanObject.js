define(function(require) {
	
	var humanObject = {
		human: ko.observable(),
		humanBody: ko.observableArray([
			{id: 0, color:"#231f20", text:ko.observable(''), image:ko.observable('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjcAAABECAYAAAB9ARToAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA1VJREFUeNrs3dFRE1EYhuFPhwJSwjLjvbECYwdQAUkFQgWOFTBWEKzAWIGxAlOAM6wVmA7wgo06CCiEyJ6zzzOTgQuBc85/4TubTfLk4uIiAAC1eOoIAABxAwAgbgAAdm/PEUA9njX7u/i1TZJJkudJxt1jdMu/b7vHKsm3JMvu+5342p4bPCBugH8yTXLUhc1dY6i58nNtFznvu68AO+NpKeC6qDlPMr9H2NwWPNMkn7rfPXXMgLgBdq3p4mPefb/LvzPvImfi2AFxA+zCJMmX/xwbm5g6ze338ACIG+BOpl1kPFZgHD/y3wfEDVBZ2Mx7sI6xwAHEDfAQQXHas/UIHEDcAPcy6mlIbAIHQNwAd/Ih/b1CMk6/rigB4gboueP0/yXYJawREDdADzRJ3hSy1nncfwOIG6CiYCgpxABxAzyCScp7quc4u323ZEDcAAV7Xei6Xb0BxA3whybJQaFrn8bVG0DcAFccFL7+qREC4gb43ZH1A+IGqMUol2+MV7Kmgj0A4gZ4IJNK9nFglIC4AZJ6rni8NEpA3ABJ8lykAeIGqMmoon00xgmIG2BS0V7EDSBugKqMHQEgboCajBwBIG4AAHEDACBuAADEDQCAuAEAEDdAFdaOABA3QFvRXlbGCYgboLUXYEj2HAFUaZpfH1XQVLSvtdEC4gaG5zTJcaV7+57LqzerJG/jaSpA3ED1RhWHzUbTPcZJ9o0cuMo9N1CX8YD2uokcAHEDVBU4AOIGABA3QBnW9guIG6AmqwH9h9/Gq6UAcQODsBjIPt8aNSBuYBhOUv/Vm0WSM6MGxA0MwzrJq4oDZ5FkZsyAuIFhWVUYOG2Sw+6xNmJA3MAwA+dFkmUl+5llOPcTAeIGuEGbyys4NUTB0jgBcQNsfKwg0gDEDfDTovD1L40QEDfA79Yp+w3vPhshIG6Aq0p+amphfIC4AWoJhEW89BsQN8A1Vinzxtx3RgeIG+AmJ4Wtdxk3EwPiBrjFImV9JtOJkQHiBvibWcq4GjJL2a/wAsQN8B8d9jwcZvGp34C4Ae5gncuPZehj4AgbQNwAWwVO26M1nQkbQNwA2wbOukfrcQMxIG6ArY17so423qwPEDdARVpHAIgbYFsTRwDU5gcAAAD//wMAoYhyqJ5faxkAAAAASUVORK5CYII=')},
			{id: 1, color:"#231f20", text:ko.observable(''), image:ko.observable('data:image/png;base64,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')},
			{id: 2, color:"#231f20", text:ko.observable(''), image:ko.observable('data:image/png;base64,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')},
			{id: 3, color:"#231f20", text:ko.observable(''), image:ko.observable('data:image/png;base64,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')},
			{id: 4, color:"#231f20", text:ko.observable(''), image:ko.observable('data:image/png;base64,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')},
			{id: 5, color:"#231f20", text:ko.observable(''), image:ko.observable('data:image/png;base64,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')}
		]),
	
		initialize: function( human ){
			console.log(human);
			this.human(human);
			for(var i = 0; i < this.humanBody().length; i++){
				human.bodyparts[i].text() ? this.humanBody()[i].text(human.bodyparts[i].text()) : this.humanBody()[i].text('');
				this.setColor(this.humanBody()[i], i);
			}
			if(screen.width<480){
				$('.bodyPart').css({"width":"100%"});
            }       
			this.bindEvents();
			this.show();
		},
		bodypartClicked: function(bodypart, event){
			event.target.style.display='none';
			$('#partText'+bodypart.id).show().focus();
			// window.App.db.changeColor(bodypart.image(), bodypart.color,"#d6eff4", function(newColor){
			// 	bodypart.image(newColor);
			// 	bodypart.color = '#d6eff4';
			// }.bind(this));
		},
		setColor: function(bodypart, index){
			if(bodypart.text().length){
					window.App.db.changeColor(bodypart.image(), bodypart.color,"#52a359", function(newColor, ind){				
						this.humanBody()[ind].image(newColor);
						this.humanBody()[ind].color = '#52a359';
					}.bind(this), index);	
				}else{
					window.App.db.changeColor(bodypart.image(), bodypart.color,"#8ce5ff", function(newColor, ind){				
						this.humanBody()[ind].image(newColor);
						this.humanBody()[ind].color = '#8ce5ff';
					}.bind(this), index);	
				}	
		},

		bodypartSave: function(bodypart, event){
			bodypart.text(event.target.value);
			window.App.db.updateBodyPart(bodypart.id, event.target.value, window.App.humanObject.human().id );
			event.target.style.display='none';
			$('#part'+bodypart.id).show();
			window.App.humanObject.setColor(bodypart, bodypart.id);
		},

		bindEvents: function(){
			document.getElementById('HumanBodyBack').addEventListener('click',this.goBack.bind(this));
			document.getElementById('HumanName').addEventListener('click',this.changeName.bind(this),false);  
			document.getElementById('HumanName').addEventListener('blur',this.changeNameSave.bind(this),false);  
		},

		changeName: function(){
            document.getElementById('HumanName').contentEditable=true;
        },
        changeNameSave: function(){
            var humanNameDOM = document.getElementById('HumanName');
            humanNameDOM.contentEditable=false;
            this.human().name(humanNameDOM.innerText);
            window.App.db.updateBodyName(this.human().id, humanNameDOM.innerText );
        },

		show: function(  ){
			document.getElementById('HumanMenuScreen').style.display='none';
			document.getElementById('HumanScreen').style.display='block';
		},
		goBack: function( ){
			this.human(null);
			document.getElementById('HumanMenuScreen').style.display='block';
			document.getElementById('HumanScreen').style.display='none';
		},
	};

  	ko.applyBindings(humanObject, document.getElementById('HumanScreen'));
	return humanObject;
});