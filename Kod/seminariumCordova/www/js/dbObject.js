define(function(require){
	
	var dbObject = {

		db: window.openDatabase("mnemo", "2.0", "Mnemo DB", 1000000),

		query: function(str,arr,res){
			this.db.transaction(function(tx){
				tx.executeSql(str,arr,res);
			},function(err){
				console.log(err.message);
			});
		}.bind(this),

		getSets:function(fn){
			this.selectQuery("SELECT s.id as set_id, s.name, s.difficulty, s.description, i.icon_value AS icon FROM sets s LEFT JOIN icons i ON i.id=s.icon_id",[],fn);
		},
		getCards:function(id,fn){
			this.selectQuery("SELECT c.id as card_id, c.front, c.difficulty, c.back, cc.color_value AS color FROM cards c LEFT JOIN sets s ON c.set_id=s.id LEFT JOIN colors cc ON c.color_id = cc.id WHERE c.set_id=(?)",[id],fn);
		},

		saveSet:function(name,desc,icon){
			this.db.transaction(function(tx){
				tx.executeSql("INSERT INTO sets(name,difficulty,description,icon_id) VALUES (?,?,?,?)",[name,0.5,desc,icon]);
			},function(err){
				console.log(err.message);
			});
		},

		saveCard:function(front,back,color,set){
			this.db.transaction(function(tx){
				tx.executeSql("INSERT INTO cards(front,back,difficulty,color_id,set_id) VALUES (?,?,?,?,?)",[front,back,0.5,color,set]);
			},function(err){
				console.log(err.message);
			});
		},

		selectQuery: function(str,arr,callback){
			this.result=null;
			this.db.transaction(
				function(tx){
					tx.executeSql(str,arr,
						function(tx,res){
							this.SQLResult=res.rows;
							// console.log("SQLResult filled:");
							// console.log(this.SQLResult);
							if(callback){
								callback(res);						
							}
						}.bind(this));
				}.bind(this),
				function(err){
					console.log(err.message);
				}
			);
		},

		prepareDb: function(){
			this.db=window.openDatabase("mnemo", "2.0", "Mnemo DB", 1000000),
			this.db.transaction(
				function(tx) {
                    //create table
                    this.prepareTables(tx);
                    this.prepareIcons(tx);
                    this.prepareColors(tx); 
                    // tx.executeSql("SELECT * FROM colors",[], function(tx, res){
                    // 	// console.log(res);
                    //                 // alert(res.rows.item(iii).id);
                    //                 // alert(res.rows.item(iii).data);
                    //                 // alert(res.rows.item(iii).data_num);
                    //             });
                }.bind(dbObject), function(err){
                	console.log("Error: " + err.message);
                });  
		}.bind(this),

		prepareTables:function(tx){
			tx.executeSql("CREATE TABLE IF NOT EXISTS icons(id INTEGER PRIMARY KEY AUTOINCREMENT, icon_value TEXT)");
			tx.executeSql("CREATE TABLE IF NOT EXISTS sets(id INTEGER PRIMARY KEY AUTOINCREMENT,description TEXT,difficulty FLOAT, name TEXT,icon_id INTEGER,FOREIGN KEY(icon_id) REFERENCES icons(id))");
			tx.executeSql("CREATE TABLE IF NOT EXISTS colors(id INTEGER PRIMARY KEY AUTOINCREMENT,color_value TEXT)");
			tx.executeSql("CREATE TABLE IF NOT EXISTS cards(id INTEGER PRIMARY KEY AUTOINCREMENT,front TEXT,back TEXT,difficulty FLOAT,set_id INTEGER,color_id INTEGER,FOREIGN KEY(color_id) REFERENCES colors(id),FOREIGN KEY(set_id) REFERENCES sets(id))");        
		},

		prepareIcons:function(tx){
			var icons = [
			{'id':1,'val':'alien.png'},
			{'id':2,'val': 'atom.png'},
			{'id':3,'val':'brain.png'},
			{'id':4,'val':'compass.png'},
			{'id':5,'val': 'dna.png'}, 
			{'id':6,'val': 'earth-globe.png'},
			{'id':7,'val': 'flask.png'},
			{'id':8,'val': 'gears.png'},
			{'id':9,'val': 'light-bulb.png'},
			{'id':10,'val': 'pulse.png'},
			{'id':11,'val':'rat.png'},
			{'id':12,'val':'scientist.png'}
			];

			tx.executeSql("DELETE FROM icons");
			for(var i=0; i<icons.length; i++){
				tx.executeSql("REPLACE INTO icons(id,icon_value) VALUES (?,?)",[icons[i].id, icons[i].val]);
			}           
		},

		prepareColors:function(tx){
			var colors = [	
			{'id':1,'val':'#ff9'},
			{'id':2,'val':'#fff'},
			{'id':3,'val':'#99f'},
			{'id':4,'val':'#aff'},
			{'id':5,'val':'#f9a'},
			{'id':6,'val':'#ffa'}
			];
			tx.executeSql("DELETE FROM colors");
			for(var i=0; i<colors.length; i++){
				tx.executeSql("REPLACE INTO colors(id,color_value) VALUES (?,?)",[colors[i].id, colors[i].val]);
			}      
		}

	};

	return dbObject;
});