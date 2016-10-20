define(function(require) {
  
    var setList = require('setList');
    var tempData = require('tempData');
    var app = {
        initialize: function() {
            // var self = this;
            this.bindEvents();
            this.db=null;
            this.fs=null;
            this.fsroot=null;
            console.log(tempData);
        },

        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function() {
            // window.addEventListener('filePluginIsReady',  this.onDeviceReady, false);
            document.addEventListener('deviceready', this.onDeviceReady, false);
            document.getElementById('MainMenuSetsButton').addEventListener('click', setList.initialize.bind(setList));
            
        }.bind(this),

        showMain: function(){
            document.getElementById('MainMenuScreen').style.display='block';
            document.getElementById('SetsMenuScreen').style.display='none';
        },

      

        prepareDb: function(){
            this.db = window.openDatabase("mnemo", "2.0", "Mnemo DB", 1000000);

            this.db.transaction(function(tx) {
                    //create table
                    tx.executeSql("CREATE TABLE IF NOT EXISTS icons(id INTEGER PRIMARY KEY AUTOINCREMENT, icon_value TEXT)");
                    tx.executeSql("DELETE FROM icons");

                    var icons = [{'id':1,'val':'alien.png'},
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
                    for(var i=0; i<icons.length; i++){
                        tx.executeSql("REPLACE INTO icons(id,icon_value) VALUES (?,?)",[icons[i].id, icons[i].val]);
                    }    
                    tx.executeSql("SELECT * FROM icons",[], function(tx, res){
                                    console.log(res);
                                    // alert(res.rows.item(iii).id);
                                    // alert(res.rows.item(iii).data);
                                    // alert(res.rows.item(iii).data_num);
                            });
                    tx.executeSql("CREATE TABLE IF NOT EXISTS sets(id INTEGER PRIMARY KEY AUTOINCREMENT,description TEXT,difficulty FLOAT, name TEXT,icon_id INTEGER,FOREIGN KEY(icon_id) REFERENCES icons(id))");
                    tx.executeSql("CREATE TABLE IF NOT EXISTS colors(id INTEGER PRIMARY KEY AUTOINCREMENT,color_value TEXT)");
                    tx.executeSql("CREATE TABLE IF NOT EXISTS cards(id INTEGER PRIMARY KEY AUTOINCREMENT,front TEXT,back TEXT,difficulty FLOAT,set_id INTEGER,color_id INTEGER,FOREIGN KEY(color_id) REFERENCES colors(id),FOREIGN KEY(set_id) REFERENCES sets(id))");
                }, function(err){
                    console.log("Error: " + err.message)
                });  

        }.bind(this),

        onDeviceReady: function() {
            console.log(this);
           this.prepareDb();
        }.bind(this),
    };
    return app;
});
