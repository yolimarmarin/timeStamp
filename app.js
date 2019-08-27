//REQUIRED IMPORTS FOR NODE
var bodyParser = require("body-parser");
var express = require("express");
var app = express();


var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//API endpoint... 

app.get("/api/timestamp/:time?", (req,res)=>{
  
  var data = req.params.time;
  
  var unix = null;
  var utc = "Invalid Date";
  
  
  if(data==undefined){
     var aux = new Date();
     unix = aux.getTime();
     utc = aux.toUTCString();
     return res.json({"unix":unix,"utc":utc});
    
  }else if(/^[0-9]*$/.test(data)){
    unix = Number(data);
    utc = new Date(Number(data));
    utc = utc.toUTCString();
    
  }else{
    var utc = new Date(data);
    if(utc !== null){
      unix = utc.getTime();
      utc = utc.toUTCString();
    }
    
  }
  

  return res.json({"unix":unix,"utc":utc});
 

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

