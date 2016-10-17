// var tempData= [
//      {'filename':'fizyka/info.json', 'object':{
//                                                 "cardSet": [
//                                                     {
//                                                         "back": "mc^2", 
//                                                         "color": "#fff", 
//                                                         "difficulty": 0.2, 
//                                                         "front": "e=", 
//                                                         "id": 0
//                                                     }
//                                                 ], 
//                                                 "description": "", 
//                                                 "difficulty": 0.2, 
//                                                 "icon": "atom.png", 
//                                                 "name": "fizyka", 
//                                                 "path": "resources/sets/fizyka"
//                                             }
//     },
//      {'filename':'ludzie/info.json', 'object':{
//                                                 "cardSet": [
//                                                     {
//                                                         "back": "Parzych", 
//                                                         "color": "#99f", 
//                                                         "difficulty": 0.3, 
//                                                         "front": "Patrycja", 
//                                                         "id": 0
//                                                     }, 
//                                                     {
//                                                         "back": "Stalewski", 
//                                                         "color": "#99f", 
//                                                         "difficulty": 0.3, 
//                                                         "front": "Patryk", 
//                                                         "id": 0
//                                                     }, 
//                                                     {
//                                                         "back": "Eli\u0144ski", 
//                                                         "color": "#99f", 
//                                                         "difficulty": 0.4, 
//                                                         "front": "Remek", 
//                                                         "id": 0
//                                                     }, 
//                                                     {
//                                                         "back": "Stalewska", 
//                                                         "color": "#aff", 
//                                                         "difficulty": 0.3, 
//                                                         "front": "Julia", 
//                                                         "id": 0
//                                                     }, 
//                                                     {
//                                                         "back": "Stalewski K.", 
//                                                         "color": "#f9a", 
//                                                         "difficulty": 0.1, 
//                                                         "front": "Kacper", 
//                                                         "id": 0
//                                                     }, 
//                                                     {
//                                                         "back": "Stalewski M.", 
//                                                         "color": "#fa9", 
//                                                         "difficulty": 0.2, 
//                                                         "front": "Mariusz", 
//                                                         "id": 0
//                                                     }, 
//                                                     {
//                                                         "back": "Parzych", 
//                                                         "color": "#fa9", 
//                                                         "difficulty": 0.3, 
//                                                         "front": "Patrycja", 
//                                                         "id": 0
//                                                     }
//                                                 ], 
//                                                 "description": "", 
//                                                 "difficulty": 0.27142857142857146, 
//                                                 "icon": "scientist.png", 
//                                                 "name": "ludzie", 
//                                                 "path": "resources/sets/ludzie"
//                                             }
//     },
//      {'filename':'matematyka/info.json', 'object':{
//                                                 "cardSet": [
//                                                     {
//                                                         "back": "a^2+b^2 = c^2", 
//                                                         "color": "#ffa", 
//                                                         "difficulty": 0.2, 
//                                                         "front": "Wz\u00f3r pitagorasa", 
//                                                         "id": 0
//                                                     }
//                                                 ], 
//                                                 "description": "", 
//                                                 "difficulty": 0.2, 
//                                                 "icon": "brain.png", 
//                                                 "name": "matematyka", 
//                                                 "path": "resources/sets/matematyka"
//                                             }
//     },
// ];


// var app = {
//     initialize: function() {
//         // var self = this;
//         this.bindEvents();
//         this.db=null;
//         this.fs=null;
//         this.fsroot=null;
//         console.log(tempData);
       
//     },

//     // Bind any events that are required on startup. Common events are:
//     // 'load', 'deviceready', 'offline', and 'online'.
//     bindEvents: function() {
//         // window.addEventListener('filePluginIsReady',  this.onDeviceReady, false);
//         document.addEventListener('deviceready', this.onDeviceReady, false);
//         document.getElementById('MainMenuSetsButton').addEventListener('click', setList.initialize.bind(setList));
        
//     },
 
//     showMain: function(){
//         document.getElementById('MainMenuScreen').style.display='block';
//         document.getElementById('SetsMenuScreen').style.display='none';
//     },

//     onDeviceReady: function() {
//             this.db = window.openDatabase("mnemo", "2.0", "Mnemo DB", 1000000);

//             this.db.transaction(function(tx) {
//                 //create table
//                 tx.executeSql("CREATE TABLE IF NOT EXISTS demo (id integer primary key, data text, data_num integer)", [], function(tx, res){

//                     //insert data
//                     tx.executeSql("REPLACE INTO demo (id, data, data_num) VALUES (?,?,?)", [1, "test", 100], function(tx,res){

//                         //retrieve data
//                         tx.executeSql("SELECT * FROM demo WHERE id = ?", [1], function(tx, res){
//                             for(var iii = 0; iii < res.rows.length; iii++)
//                             {
//                                 console.log(res);
//                                 // alert(res.rows.item(iii).id);
//                                 // alert(res.rows.item(iii).data);
//                                 // alert(res.rows.item(iii).data_num);
//                             }
//                         })

//                     });

//                 });

//             }, function(err){
//                 console.log("Error: " + err.message)

//             });
        
//     }.bind(this),
// };

// var setList = {
//     sets: [],
//    s etsFilled: false,
//     initialize: function() {
//         document.getElementById('SetsMenuBack').addEventListener('click', app.showMain);
//         setTimeout(this.renderTable.bind(this), 10);
//         this.show();
//     },

//     show: function(){
//         document.getElementById('MainMenuScreen').style.display='none';
//         document.getElementById('CardsMenuScreen').style.display='none';
//         document.getElementById('SetsMenuScreen').style.display='block';
//     },

//     renderTable: function () {

//         var body = document.getElementById('SetsMenuScreen');
//         var tbl = document.getElementById('SetsTable');
//         while (tbl.firstChild) {
//             tbl.removeChild(tbl.firstChild);
//         }
//         tbl.className="SetsTable"

//         var tbdy = document.createElement('tbody');
//         if(!this.setsFilled){  //pozniej dodawac tylko nowe sety
//             tempData.forEach(function(entry) {
//                 this.sets.push(entry.object);
//             }.bind(this));
//             this.setsFilled=true;
//         }

//         this.sets.forEach(function(el){
//             var tr = document.createElement('tr');
//             tr.id=el.name;
//             tr.className = "setRow";
//             var icon = document.createElement('td');
//             icon.className="icon";
//             icon.innerHTML = '<img src=\''+el.icon+'\'height="32" width="32">';
//             // icon.innerHTML=el.icon;
//             icon.appendChild(document.createTextNode('\u0020'))

//             var label = document.createElement('td');
//             label.className="label";
//             label.innerHTML=el.name;
//             label.appendChild(document.createTextNode('\u0020'))
//             var button = document.createElement('td');
//             button.className="button";
//             button.innerHTML="X";
//             button.appendChild(document.createTextNode('\u0020'))
//             tr.appendChild(icon);
//             tr.appendChild(label);
//             tr.appendChild(button);
//             tr.addEventListener('click',cardList.initialize.bind(el), false);
//             tr.Set = el;
//             console.log(tr);
//             tbdy.appendChild(tr);
//         }.bind(this));
//         tbl.appendChild(tbdy);
//         // body.appendChild(tbl)
//     },

//     iterateFolders: function(){
//         var set= [];
//         // var xhttp = new XMLHttpRequest();
//         //   xhttp.onreadystatechange = function() {
//         //     if (this.readyState == 4 && this.status == 200) {
//         //         var obj = JSON.parse(this.response);
//         //         set.push(obj);
//         //     }
//         //   };
//         //   xhttp.open("GET", "resources/sets/fizyka/.info.json", true);
//         //   xhttp.send();
//         var dir = "file://res/sets/fizyka/";
//         var fileextension = ".json";
//         $.ajax({
//             //This will retrieve the contents of the folder if the folder is configured as 'browsable'
//             url: dir,
//             success: function (data) {
//                 console.log(data);
//                 //List all .png file names in the page
//                 // $(data).find("a:contains(" + fileextension + ")").each(function () {
//                 //     var filename = this.href.replace(window.location.host, "").replace("http://", "");
//                 //     $("body").append("<img src='" + dir + filename + "'>");
//                 // });
//             }
//         });
//           return set;
//     } 
// };


// var cardList={
//     initialize: function() {
//         $.extend(this,cardList);
//         document.getElementById('SetIcon').innerHTML ='<img src=\''+this.icon+'\'height="128" width="128">'
//         document.getElementById('SetName').innerHTML=this.name;
//         document.getElementById('MainMenuScreen').style.display='none';
//         document.getElementById('SetsMenuScreen').style.display='none';
//         document.getElementById('CardsMenuScreen').style.display='block';
//         document.getElementById('CardsMenuBack').addEventListener('click', setList.show);
//         setTimeout(this.renderTable.bind(this), 10);
//     },

//     renderTable: function () {

//         var body = document.getElementById('CardsMenuScreen');
//         var tbl = document.getElementById('CardsTable');
//         while (tbl.firstChild) {
//             tbl.removeChild(tbl.firstChild);
//         }
//         tbl.className="SetsTable"
//         var tbdy = document.createElement('tbody');


//         this.cardSet.forEach(function(el){
//             var tr = document.createElement('tr');
//             tr.style.background = el.color;
//             tr.id=el.front;
//             tr.className = "setRow";

//             var front = document.createElement('td');
//             front.className="front";
//             front.innerHTML = el.front;
//             front.appendChild(document.createTextNode('\u0020'));

//             var back = document.createElement('td');
//             back.className="back";
//             back.innerHTML=el.back;
//             back.appendChild(document.createTextNode('\u0020'));

//             var difficulty = document.createElement('td');
//             difficulty.className="difficulty";
//             difficulty.innerHTML=el.difficulty;
//             difficulty.appendChild(document.createTextNode('\u0020'));

//             var button = document.createElement('td');
//             button.className="button";
//             button.innerHTML="X";
//             button.appendChild(document.createTextNode('\u0020'));
//             tr.appendChild(front);
//             tr.appendChild(back);
//             tr.appendChild(difficulty);
//             tr.appendChild(button);
//             // tr.addEventListener('click',cardList.initialize.bind(el), false);
//             tbdy.appendChild(tr);
//         }.bind(this));
//         tbl.appendChild(tbdy);
//         // body.appendChild(tbl)
//     },


// };



// app.initialize();


