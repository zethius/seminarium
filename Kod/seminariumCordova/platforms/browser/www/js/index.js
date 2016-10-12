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
    // Application Constructor
    initialize: function() {
        var self = this;
        this.bindEvents();
        this.fs=null;
        this.fsroot=null;
        console.log(tempData);
       
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        window.addEventListener('filePluginIsReady',  this.onDeviceReady, false);
        // document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('MainMenuSetsButton').addEventListener('click', setList.initialize);
        
    },
 
    showMain: function(){
        document.getElementById('MainMenuScreen').style.display='block';
        document.getElementById('SetsMenuScreen').style.display='none';
    },

    
    errorHandler: function (fileName, e) {  
        var msg = '';

        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'Storage quota exceeded';
                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'File not found';
                break;
            case FileError.SECURITY_ERR:
                msg = 'Security error';
                break;
            case FileError.INVALID_MODIFICATION_ERR:
                msg = 'Invalid modification';
                break;
            case FileError.INVALID_STATE_ERR:
                msg = 'Invalid state';
                break;
            default:
                msg = 'Unknown error';
                break;
        };

        console.log('Error (' + fileName + '): ' + msg);
    },

    gotFile: function(fileEntry) {
        console.log(fileEntry);
        this.fs=fileEntry;
        this.fsroot=fileEntry.root;
        app.createFile("1.txt");
        app.getFiles();

        // console.log(this);
        // fileEntry.file(function(file) {
        //     var reader = new FileReader();

        //     reader.onloadend = function(e) {
        //         console.log("Text is: "+this.result);
        //         document.querySelector("#textArea").innerHTML = this.result;
        //     }

        //     reader.readAsText(file);
        // });
    },
    getFile: function(name) { 
       this.fsroot.getFile(name, null, function(fileEntry) { 
           fileEntry.file(function(file) { 
                console.log(file);
              
                
           }, app.fail); 
       }, app.fail ); 
    }.bind(this),
    getFiles: function() { 
       var dirReader = this.fsroot.createReader(); 
                console.log(dirReader);
       dirReader.readEntries(function(files) { 
            console.log("readEntries");
            console.log(files);
           for (var i = 0, len = files.length; i < len; i++) { 
               if(files[i].isFile) { 
                   app.getFile(files[i].name); 
                   console.log(files[i]);
               } 
           } 
       }, app.fail); 
    }.bind(this),

    createFile: function(path) { 
    this.fsroot.getFile(path, 
        { create:true, exclusive:true }, 
        function() { 
            console.log(path+ " file created"); 
        }, 
        app.fail ); 
    }.bind(this),

    readFromFile: function(fileName, cb) {
        var pathToFile = cordova.file.dataDirectory + fileName;
        window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();

                reader.onloadend = function (e) {
                    cb(JSON.parse(this.result));
                };

                reader.readAsText(file);
            }, app.errorHandler.bind(null, fileName));
        }, app.errorHandler.bind(null, fileName));
    },

    onDeviceReady: function() {
         cordova.file.options={  
            basePath: cordova.file.dataDirectory, // working directory
            create: true, // always create files
            type: 'text/plain' // read/write all files as plain text
        };   
        var fileData;
        app.readFromFile('/res', function (data) {
            fileData = data;
            console.log(fileData);
        });
        
    }.bind(this),
};


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
            console.log(entry);
            setList.sets.push(entry.object);
        });


        setList.sets.forEach(function(el){
            var tr = document.createElement('tr');
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


