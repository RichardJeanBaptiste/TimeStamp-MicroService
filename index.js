const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.get('/',function(req,res){
    res.send('Hello WOrld');
});

app.get('/getTime/api/timestamp/:time', function(req,res){

    function isDateString(x){
        let patt = new RegExp("((?:19|20)\\d\\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])");
        return patt.test(x);
    }

    let y = req.params.time;
    let x = parseInt(req.params.time);
    
    if(isDateString(y)){

        let dateUTC = new Date(y);

        if(dateUTC == "Invalid Date"){
            res.json({"error": "Invalid Date"});
        }else{
            let unix = Math.floor(dateUTC.getTime());

            res.json({"unix": unix , "date": dateUTC.toUTCString()});
        }
        
    }else{

        let dateUTC = new Date(x);
        if(dateUTC == "Invalid Date"){
            res.json({"error": "Invalid Date"});
        }else{
            let unix = Math.floor(dateUTC.getTime());

            res.json({"unix": unix , "date": dateUTC.toUTCString()});
        }

    }
    
});


app.listen(PORT,()=>{ console.log('Server Started')});