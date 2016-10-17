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

            this.db.transaction(function(tx) {
                    //create table
                    tx.executeSql("CREATE TABLE IF NOT EXISTS demo (id integer primary key, data text, data_num integer)", [], function(tx, res){

                        //insert data
                        tx.executeSql("REPLACE INTO demo (id, data, data_num) VALUES (?,?,?)", [1, "test", 100], function(tx,res){

                            //retrieve data
                            tx.executeSql("SELECT * FROM demo WHERE id = ?", [1], function(tx, res){
                                for(var iii = 0; iii < res.rows.length; iii++)
                                {
                                    console.log(res);
                                    // alert(res.rows.item(iii).id);
                                    // alert(res.rows.item(iii).data);
                                    // alert(res.rows.item(iii).data_num);
                                }
                            })

                        });

                    });

                }, function(err){
                    console.log("Error: " + err.message)

                });

        }.bind(this),
    };
    return app;
});
