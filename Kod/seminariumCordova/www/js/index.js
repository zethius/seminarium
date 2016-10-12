var tempData= [
     {'filename':'fizyka/info.json', 'object':{
                                                "cardSet": [
                                                    {
                                                        "back": "mc^2", 
                                                        "color": "#92031", 
                                                        "difficulty": 0.2, 
                                                        "front": "e=", 
                                                        "id": 0
                                                    }
                                                ], 
                                                "description": "", 
                                                "difficulty": 0.2, 
                                                "icon": "atom.png", 
                                                "name": "fizyka", 
                                                "path": "resources/sets/fizyka"
                                            }
    },
     {'filename':'ludzie/info.json', 'object':{
                                                "cardSet": [
                                                    {
                                                        "back": "Parzych", 
                                                        "color": "#92031", 
                                                        "difficulty": 0.3, 
                                                        "front": "Patrycja", 
                                                        "id": 0
                                                    }, 
                                                    {
                                                        "back": "Stalewski", 
                                                        "color": "#92031", 
                                                        "difficulty": 0.3, 
                                                        "front": "Patryk", 
                                                        "id": 0
                                                    }, 
                                                    {
                                                        "back": "Eli\u0144ski", 
                                                        "color": "#92031", 
                                                        "difficulty": 0.4, 
                                                        "front": "Remek", 
                                                        "id": 0
                                                    }, 
                                                    {
                                                        "back": "Stalewska", 
                                                        "color": "#92031", 
                                                        "difficulty": 0.3, 
                                                        "front": "Julia", 
                                                        "id": 0
                                                    }, 
                                                    {
                                                        "back": "Stalewski K.", 
                                                        "color": "#92031", 
                                                        "difficulty": 0.1, 
                                                        "front": "Kacper", 
                                                        "id": 0
                                                    }, 
                                                    {
                                                        "back": "Stalewski M.", 
                                                        "color": "#92031", 
                                                        "difficulty": 0.2, 
                                                        "front": "Mariusz", 
                                                        "id": 0
                                                    }, 
                                                    {
                                                        "back": "Parzych", 
                                                        "color": "#92031", 
                                                        "difficulty": 0.3, 
                                                        "front": "Patrycja", 
                                                        "id": 0
                                                    }
                                                ], 
                                                "description": "", 
                                                "difficulty": 0.27142857142857146, 
                                                "icon": "scientist.png", 
                                                "name": "ludzie", 
                                                "path": "resources/sets/ludzie"
                                            }
    },
     {'filename':'matematyka/info.json', 'object':{
                                                "cardSet": [
                                                    {
                                                        "back": "a^2+b^2 = c^2", 
                                                        "color": "#92031", 
                                                        "difficulty": 0.2, 
                                                        "front": "Wz\u00f3r pitagorasa", 
                                                        "id": 0
                                                    }
                                                ], 
                                                "description": "", 
                                                "difficulty": 0.2, 
                                                "icon": "brain.png", 
                                                "name": "matematyka", 
                                                "path": "resources/sets/matematyka"
                                            }
    },
];


var app = {
    initialize: function() {
        var self = this;
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
        document.getElementById('MainMenuSetsButton').addEventListener('click', setList.initialize);
        
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

function onDeviceReady()
{
   
}

var setList = {
    sets: [],
    initialize: function() {
        var self = this;
        document.getElementById('MainMenuScreen').style.display='none';
        document.getElementById('SetsMenuScreen').style.display='block';
        document.getElementById('SetsMenuBack').addEventListener('click', app.showMain);

        setTimeout(function(){  setList.renderTable();}, 10);
    },

    renderTable: function () {
        var body = document.getElementById('SetsMenuScreen');
        var tbl = document.getElementById('SetsTable');
        tbl.innerHTML="";
        tbl.className="SetsTable"
        var tbdy = document.createElement('tbody');

        tempData.forEach(function(entry) {
            setList.sets.push(entry.object);
        });


        setList.sets.forEach(function(el){
            var tr = document.createElement('tr');
            tr.id=el.name;
            tr.className = "setRow";
            var icon = document.createElement('td');
            icon.className="icon";
            icon.innerHTML = '<img src=\''+el.icon+'\'height="32" width="32">';
            // icon.innerHTML=el.icon;
            icon.appendChild(document.createTextNode('\u0020'))

            var label = document.createElement('td');
            label.className="label";
            label.innerHTML=el.name;
            label.appendChild(document.createTextNode('\u0020'))
            var button = document.createElement('td');
            button.className="button";
            button.innerHTML="X";
            button.appendChild(document.createTextNode('\u0020'))
            tr.appendChild(icon);
            tr.appendChild(label);
            tr.appendChild(button);
            tr.addEventListener('click',function(event){console.log(el.name);}, false);
            tbdy.appendChild(tr);
        });
        tbl.appendChild(tbdy);
        body.appendChild(tbl)
    },

    iterateFolders: function(){
        var set= [];
        // var xhttp = new XMLHttpRequest();
        //   xhttp.onreadystatechange = function() {
        //     if (this.readyState == 4 && this.status == 200) {
        //         var obj = JSON.parse(this.response);
        //         set.push(obj);
        //     }
        //   };
        //   xhttp.open("GET", "resources/sets/fizyka/.info.json", true);
        //   xhttp.send();
        var dir = "file://res/sets/fizyka/";
        var fileextension = ".json";
        $.ajax({
            //This will retrieve the contents of the folder if the folder is configured as 'browsable'
            url: dir,
            success: function (data) {
                console.log(data);
                //List all .png file names in the page
                // $(data).find("a:contains(" + fileextension + ")").each(function () {
                //     var filename = this.href.replace(window.location.host, "").replace("http://", "");
                //     $("body").append("<img src='" + dir + filename + "'>");
                // });
            }
        });




          return set;
    } 


};

app.initialize();


