define(function(require) {
	var exporter = {
		exporting: ko.observable(false),

		setsList: ko.observableArray(),
		bodiesList: ko.observableArray(),
		datesList: ko.observableArray(),
		fileList: ko.observableArray(),
		toSave:[],
		initialize: function() {
			this.fillData();
			this.bindEvents();
			this.show();
		},
		fillData: function(){
			window.App.db.getFullSets( this.setsList, true );
			window.App.db.getFullGSP( this.datesList, true );
			window.App.db.getFullBodies( this.bodiesList );

			this.fileList.push({'groupName': 'Zestawy', 'values':this.setsList, 'hasSublist': true});
			this.fileList.push({'groupName': 'Ciała', 'values':this.bodiesList, 'hasSublist': false});
			this.fileList.push({'groupName': 'Daty', 'values':this.datesList, 'hasSublist': true});
		},
		bindEvents: function(){
			$('#DataMenuBack').unbind('click').bind('click', this.goBack.bind(this)); 

			$('.root ul').hide();
			$('.midleaf ul').hide();

			$('.root').unbind('click').bind('click',function(evt) {
				evt.stopPropagation();
			    $(this).find('.rootUl').slideToggle();
			});
			$('.midleaf').unbind('click').bind('click',function(evt) {
				evt.stopPropagation();
			    $(this).find('.midleafUl').slideToggle();
			});
		},
		checkElement: function(dm, evt){
			evt.stopPropagation();
			if(evt.target.className == 'fa fa-square'){ //dodanie elementu do listy zapisu
				$('.fa-square',evt.target.parentElement.parentElement.children).removeClass('fa-square').addClass('fa-check-square');
				evt.target.className ='fa fa-check-square';
				if(dm.values && dm.values().length>0){ //zaznaczenie dzieci elementow jesli posiada
					dm.values().forEach(function(el){
					  if (window.App.exporter.toSave.indexOf(el)==-1) window.App.exporter.toSave.push(el);
					});
				}
			}else{ //usuwanie elementu z listy zapisu
				$('.fa-check-square',evt.target.parentElement.parentElement.children).removeClass('fa-check-square').addClass('fa-square');
				evt.target.className='fa fa-square';
				if(dm.values && dm.values().length>0){
					dm.values().forEach(function(el){
						window.App.exporter.toSave = window.App.exporter.toSave.filter(function(el2) {
						    return el2 !== el;
						});
					});
				}else{
					window.App.exporter.toSave = window.App.exporter.toSave.filter(function(el) {
				  	   return el !== dm;
					});
				}
			}
		},

		prepareSaveData: function(){
			var result = [];
			this.toSave.forEach(function(element){
				var obj = ko.toJS(element);
				if(obj.cards){ //zestaw
					delete obj.icon;
					delete obj.size;
					delete obj.set_id;
					obj.cards.forEach(function(card){
						delete card.card_id;
						delete card.set_id;
						delete card.success;
						delete card.error;
					});
				}
				if(obj.bodyparts) //ciało
				{
					delete obj.id;
					obj.bodyparts.forEach(function(part){
						delete part.color;
						delete part.image;
					});
				}
				result.push(obj);
			});
			return JSON.stringify(result);
		},
		save: function(){
			var res = this.prepareSaveData();
			if(res.length){
				event.stopPropagation();
				var parent = document.createElement('div');
				parent.id='DialogContent';
				var title = document.createElement('span');
				title.innerText= "Kliknij tekst aby skopiować do schowka";
				parent.appendChild(title);
				var content = document.createElement('textarea');
				content.id="ExportDialogContent";
				content.innerText = res;
				content.style.resize='none';
				content.style.width="100%";
				content.style.height="3em";
				content.addEventListener('click', function(){
				    $(content).select();
				    document.execCommand('copy');
				    $(content).parent().find("span")[0].innerText="SKOPIOWANO";
				    $(content).parent().find("span")[0].style.color="#52a359";
				});
				parent.appendChild(content);
				window.App.dialogNode(parent);
			}else{
				window.App.toast("Zaznacz elementy które chcesz zapisać");
			}
		},
		importDialog: function(){
			event.stopPropagation();
			var parent = document.createElement('div');
			parent.id='DialogContent';
			
			var title = document.createElement('span');
			title.innerText= "Wklej kod danych do zaimportowania";
			parent.appendChild(title);
			var content = document.createElement('textarea');
			
			content.id="ImportDialogContent";
			content.style.resize='none';
			content.style.width="100%";
			content.style.height="3em";
			parent.appendChild(content);

			var importButton = document.createElement('div');
			importButton.className="Menubutton lightBlue";
			importButton.innerText="Importuj";
			importButton.addEventListener('click', this.importData);
			parent.appendChild(importButton);

			window.App.dialogNode(parent);
		},
		importData: function(){
			var data = this.parentElement.children[1].value;
			try{
				data = JSON.parse(data);
				data.forEach(function(obj, idx, arr){
					if(obj.cards)
					{
						window.App.db.saveSet(obj.name, obj.icon_id, function(insertId){
							obj.cards.forEach(function(card){
								window.App.db.saveCard(card.front,card.back,card.color, insertId,null, card.description);
							});
						}, obj.gsp);
					}else if(obj.bodyparts)
					{
						window.App.db.saveBody(obj.name, obj.bodyparts);
					}
					if (idx === arr.length - 1){ 
						window.App.dialogClose(window.App.dialogElement);
						window.App.toast("Poprawnie zaimportowano dane!");
					}
				});
				
			}catch(ex){
				window.App.toast("Błędny kod danych");
			}
		},
		clear: function(){
			this.setsList([]);
			this.bodiesList([]);
			this.datesList([]);
			this.fileList([]);
			this.toSave = [];
		},
		goBack: function(){
			document.getElementById('MainMenuScreen').style.display='block';
			document.getElementById('DataMenuScreen').style.display='none';
			this.clear();
		},

		show: function(){
			document.getElementById('MainMenuScreen').style.display='none';
			document.getElementById('DataMenuScreen').style.display='block';
		},
	};
	ko.applyBindings(exporter, document.getElementById('DataMenuScreen'));
	return exporter;
});