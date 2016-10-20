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
            
        },

        showMain: function(){
            document.getElementById('MainMenuScreen').style.display='block';
            document.getElementById('SetsMenuScreen').style.display='none';
        },

        onDeviceReady: function() {
            this.db = window.openDatabase("mnemo", "2.0", "Mnemo DB", 1000000);


            // CREATE TABLE IF NOT EXISTS icons(id INTEGER PRIMARY KEY AUTOINCREMENT, icon_value TEXT);
            // CREATE TABLE IF NOT EXISTS sets(id INTEGER PRIMARY KEY AUTOINCREMENT,
            //                     description TEXT,
            //                     difficulty FLOAT,
            //                     name TEXT,
            //                     icon_id INTEGER,
            //                     FOREIGN KEY(icon_id) REFERENCES icons(id)
            //                    );
            // CREATE TABLE IF NOT EXISTS colors(id INTEGER PRIMARY KEY AUTOINCREMENT,
            //                                                      color_value TEXT);
            // CREATE TABLE IF NOT EXISTS cards(id INTEGER PRIMARY KEY AUTOINCREMENT,
            //                     front TEXT,
            //                     back TEXT,
            //                     difficulty FLOAT,
            //                     set_id INTEGER,
            //                     color_id INTEGER,
            //                     FOREIGN KEY(color_id) REFERENCES colors(id),
            //                     FOREIGN KEY(set_id) REFERENCES sets(id)
            //                    );



            this.db.transaction(function(tx) {
                    //create table
                    console.log("1");
                    tx.executeSql("CREATE TABLE IF NOT EXISTS icons(id INTEGER PRIMARY KEY AUTOINCREMENT, icon_value TEXT)");
                     console.log("2");

                     var icons = ['alien.png','atom.png','brain.png',
                                'compass.png','dna.png', 'earth-globe.png',
                                'flask.png','gears.png','light-bulb.png',
                                'pulse.png','rat.png','scientist.png'
                    ];
                      console.log("3");
                    for(var i=0; i<icons.length; i++){
                        // tx.executeSql("INSERT INTO icons(icon_value) VALUES(?)",[icons[i]]);
                    }    
                      console.log("4");
                    tx.executeSql("SELECT * FROM icons",[], function(tx, res){
                                    console.log(res);
                                    // alert(res.rows.item(iii).id);
                                    // alert(res.rows.item(iii).data);
                                    // alert(res.rows.item(iii).data_num);
                            });
                      console.log("5");
                    tx.executeSql("CREATE TABLE IF NOT EXISTS sets(id INTEGER PRIMARY KEY AUTOINCREMENT,description TEXT,difficulty FLOAT, name TEXT,icon_id INTEGER,FOREIGN KEY(icon_id) REFERENCES icons(id))");
                    tx.executeSql("CREATE TABLE IF NOT EXISTS colors(id INTEGER PRIMARY KEY AUTOINCREMENT,color_value TEXT)");
                    tx.executeSql("CREATE TABLE IF NOT EXISTS cards(id INTEGER PRIMARY KEY AUTOINCREMENT,front TEXT,back TEXT,difficulty FLOAT,set_id INTEGER,color_id INTEGER,FOREIGN KEY(color_id) REFERENCES colors(id),FOREIGN KEY(set_id) REFERENCES sets(id))");
                      console.log("6");
                }, function(err){
                    console.log("Error: " + err.message)

                });

        }.bind(this),
    };
    return app;
});
